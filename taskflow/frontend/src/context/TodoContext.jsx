import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteTask,
  getAllTasks,
  newTask,
  updateCompleted,
  updateTask,
} from "../Services/Api";
import { toast } from "sonner";

const TodoContext = createContext(null);

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [allTask, setAllTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editInputTask, setEditInputTask] = useState("");
  const [globalLoading, setGlobalLoading] = useState(false);

  async function fetchAll() {
    try {
      setGlobalLoading(true);
      const res = await getAllTasks();
      setAllTask(res?.data?.tasks || []);
    } catch (error) {
      console.log("Error fetching all tasks :: ", error);
      toast.error("Failed to load tasks");
    } finally {
      setGlobalLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  const handleNewTask = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmed = (taskInput || "").trim();
    if (trimmed.length <= 2 || !trimmed)
      return toast.warning("Task length must be more than 2");
    try {
      await newTask(trimmed);
      toast.success("New Task added");
      setTaskInput("");
      fetchAll()
    } catch (err) {
      console.log("Error while creating new task ::", err);
      toast.error(err?.response?.data?.message || "Failed to create");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setGlobalLoading(true);
      await deleteTask(id);
      await fetchAll();
      toast.success("Deleted");
    } catch (error) {
      toast.warning(
        error?.response?.data?.message || "Failed to delete Task !"
      );
    } finally {
      setGlobalLoading(false);
    }
    await deleteTask(id)
      .then((res) => toast.success(res?.data?.message))
      .catch((err) => toast.warning(err?.response?.data?.message));
  };

  const cancelEditHandler = () => {
    setEditTask(null);
    setEditInputTask("");
  };

  const editHandler = (id, task) => {
    setEditTask(id);
    setEditInputTask(task);
  };

  const updateTaskHandler = async (id, task) => {
    try {
      setGlobalLoading(true);
      await updateTask(id, task);
      toast.success("Task updated Successfully");
      await fetchAll();
      cancelEditHandler();
    } catch (error) {
      toast.warning(error?.response?.data?.message || "Update failed");
    } finally {
      setGlobalLoading(false);
    }
  };

  const updateCompletedHandler = async (id, completed) => {
    try {
      await updateCompleted(id, completed);
      await fetchAll();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        // state
        allTask,
        taskInput,
        setTaskInput,
        editTask,
        editInputTask,
        setEditInputTask,
        globalLoading, // actions
        fetchAll,
        handleNewTask,
        handleDeleteTask,
        cancelEditHandler,
        editHandler,
        updateTaskHandler,
        updateCompletedHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

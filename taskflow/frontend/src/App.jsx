import { useEffect, useState } from "react";
import { deleteTask, getAllTasks, newTask, updateCompleted, updateTask } from "./Services/Api";
import { CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";

function App() {
  const [allTask, setAllTask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editInputTask, setEditInputTask] = useState("");

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setAllTask(res?.data?.tasks);
      })
      .catch((err) => console.log("Error fetching all tasks :: ", err));
  }, [allTask]);

  const handleNewTask = async (e) => {
    e.preventDefault();
    if(taskInput.length <= 2 || !taskInput) return toast.warning('Task length must be more than 2')
    await newTask(taskInput)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log("Error while creating new task ::", err)
        toast.error(err?.response?.data?.message)
      });
    setTaskInput("")
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id)
      .then((res) =>  toast.success(res?.data?.message))
      .catch((err) => toast.warning(err?.response?.data?.message));
  };

  const cancelEditHandler = () => setEditTask(null);

  const editHandler = (id,task) => {
    setEditTask(id)
    setEditInputTask(task)
  }

  const updateTaskHandler = (id, task) => {
    updateTask(id,task)
    .then(res =>  toast.success(res?.data?.message))
    .catch(err => toast.error(err?.response?.data?.message));
    cancelEditHandler();
  }

  const updateCompletedHandler = (id, completed) => {
    updateCompleted(id, completed)
    .then(res =>  toast.success(res?.data?.message))
    .catch(err => toast.error(err?.response?.data?.message))
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold underline mb-6 text-center">
        Task Manager
      </h1>
      <form className="flex gap-2 mb-8" onSubmit={handleNewTask}>
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      <div className="space-y-3">
        {allTask && allTask.length > 0 ? (
          allTask.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between bg-green-100 px-4 py-3 rounded"
            >
              <div className="flex items-center gap-3">
                {task.completed ? (
                  <CheckSquare
                  onClick={() => (updateCompletedHandler(task._id,!task.completed))}
                  className={`w-6 h-6 cursor-pointer text-green-600`}
                  />
                ) : (
                  <Square
                  onClick={() => (updateCompletedHandler(task._id,!task.completed))}
                  className={`w-6 h-6 cursor-pointer text-gray-400 `}
                />
                )}

                {editTask === task._id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="border-b border-gray-400 px-2 py-1"
                      value={editInputTask}
                      onChange={(e) => setEditInputTask(e.target.value)}
                    />
                    <button className="bg-green-500 px-3 py-1 rounded text-white" onClick={() => updateTaskHandler(task._id, editInputTask)}>
                      Update
                    </button>
                    <button className="bg-gray-400 px-3 py-1 rounded text-white" onClick={cancelEditHandler}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{task.task}</span>
                    <button className="bg-yellow-400 px-3 py-1 rounded text-white" onClick={() => editHandler(task._id, task.task)}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 rounded text-white"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-500">No task available</h1>
        )}
      </div>
    </div>
  );
}

export default App;

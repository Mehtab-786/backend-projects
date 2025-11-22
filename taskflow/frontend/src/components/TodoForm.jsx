import { useTodos } from "../context/TodoContext";

function TodoForm() {
  const { taskInput, setTaskInput, handleNewTask, globalLoading } = useTodos();

  return (
    <form className="flex gap-2 mb-8" onSubmit={handleNewTask}>
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
        placeholder="Enter a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        disabled={globalLoading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;

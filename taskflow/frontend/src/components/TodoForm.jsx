import { useTodos } from "../context/TodoContext";

function TodoForm() {
  const { taskInput, setTaskInput, handleNewTask, globalLoading } = useTodos();

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 items-center"
      onSubmit={handleNewTask}
    >
      <input
        type="text"
        className="flex-1 px-4 py-3 rounded-lg border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
        placeholder="Add a new task, e.g. 'Read 20 pages'"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        disabled={globalLoading}
      />

      <button
        type="submit"
        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-md transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;

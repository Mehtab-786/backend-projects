import { useTodos } from "../context/TodoContext";

function EditTask({ task }) {
  const {
    editInputTask,
    setEditInputTask,
    cancelEditHandler,
    updateTaskHandler,
  } = useTodos();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-2">
      <input
        type="text"
        className="w-full sm:w-auto flex-1 px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-emerald-200 outline-none"
        value={editInputTask}
        onChange={(e) => setEditInputTask(e.target.value)}
      />
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
          onClick={() => updateTaskHandler(task._id, editInputTask)}
        >
          Update
        </button>
        <button
          className="px-3 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-sm"
          onClick={cancelEditHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTask;

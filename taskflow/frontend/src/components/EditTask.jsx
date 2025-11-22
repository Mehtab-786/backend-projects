import { useTodos } from "../context/TodoContext";

function EditTask({ task }) {
  const {
    editInputTask,
    setEditInputTask,
    cancelEditHandler,
    updateTaskHandler,
  } = useTodos();

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="border-b border-gray-400 px-2 py-1"
        value={editInputTask}
        onChange={(e) => setEditInputTask(e.target.value)}
      />
      <button
        className="bg-green-500 px-3 py-1 rounded text-white"
        onClick={() => updateTaskHandler(task._id, editInputTask)}
      >
        Update
      </button>
      <button
        className="bg-gray-400 px-3 py-1 rounded text-white"
        onClick={cancelEditHandler}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditTask;

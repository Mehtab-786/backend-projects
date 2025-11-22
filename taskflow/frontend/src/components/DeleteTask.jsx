import { useTodos } from "../context/TodoContext";

function DeleteTask({ task }) {
  const { editHandler, handleDeleteTask } = useTodos();
  return (
    <div className="flex items-center gap-2">
      <button
        className="text-sm px-3 py-1 rounded-md bg-yellow-400/90 hover:bg-yellow-500 transition-colors text-white shadow-sm"
        onClick={() => editHandler(task._id, task.task)}
      >
        Edit
      </button>
      <button
        className="text-sm px-3 py-1 rounded-md bg-red-500/90 hover:bg-red-600 transition-colors text-white shadow-sm"
        onClick={() => handleDeleteTask(task._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteTask;

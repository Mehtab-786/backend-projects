import { useTodos } from "../context/TodoContext";

function DeleteTask({ task }) {
  const { editHandler, handleDeleteTask } = useTodos();
  return (
    <div className="flex items-center gap-2">
      <span>{task.task}</span>
      <button
        className="bg-yellow-400 px-3 py-1 rounded text-white"
        onClick={() => editHandler(task._id, task.task)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 px-3 py-1 rounded text-white"
        onClick={() => handleDeleteTask(task._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteTask;

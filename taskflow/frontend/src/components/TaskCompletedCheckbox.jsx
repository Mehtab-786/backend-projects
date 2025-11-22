import { CheckSquare, Square } from "lucide-react";
import { useTodos } from "../context/TodoContext";

function TaskCompletedCheckbox({ task }) {
  const { updateCompletedHandler } = useTodos();

  return task.completed ? (
    <CheckSquare
      onClick={() => updateCompletedHandler(task._id, false)}
      className="w-7 h-7 cursor-pointer text-emerald-600 hover:scale-105 transition-transform"
    />
  ) : (
    <Square
      onClick={() => updateCompletedHandler(task._id, true)}
      className="w-7 h-7 cursor-pointer text-slate-300 hover:text-slate-400 hover:scale-105 transition-all"
    />
  );
}

export default TaskCompletedCheckbox;

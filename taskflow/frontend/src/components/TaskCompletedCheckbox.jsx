import { CheckSquare, Square } from "lucide-react";
import { useTodos } from "../context/TodoContext";

function TaskCompletedCheckbox({ task }) {
  const { updateCompletedHandler } = useTodos();

  return (
    <>
      {task.completed ? (
        <CheckSquare
          onClick={() => updateCompletedHandler(task._id, !task.completed)}
          className={`w-6 h-6 cursor-pointer text-green-600`}
        />
      ) : (
        <Square
          onClick={() => updateCompletedHandler(task._id, !task.completed)}
          className={`w-6 h-6 cursor-pointer text-gray-400 `}
        />
      )}
    </>
  );
}

export default TaskCompletedCheckbox;

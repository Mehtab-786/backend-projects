import { useTodos } from "../context/TodoContext";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import TaskCompletedCheckbox from "./TaskCompletedCheckbox";

function AllTask() {
  const { allTask, editTask } = useTodos();

  return (
    <>
      {allTask && allTask.length > 0 ? (
        allTask.map((task) => (
          <div
            key={task._id}
            className="flex items-center justify-between bg-green-100 px-4 py-3 rounded"
          >
            <div className="flex items-center gap-3">
              <TaskCompletedCheckbox task={task} />

              {editTask === task._id ? (
                <EditTask task={task} />
              ) : (
                <DeleteTask task={task} />
              )}
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-gray-500">No task available</h1>
      )}
    </>
  );
}

export default AllTask;

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
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-linear-to-r from-emerald-50 to-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-150"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="shrink-0">
                <TaskCompletedCheckbox task={task} />
              </div>

              <div className="min-w-0 flex-1">
                {editTask === task._id ? (
                  <EditTask task={task} />
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className={`truncate text-slate-800 font-medium text-base ${task.completed && 'line-through'}`} >
                      {task.task}
                    </div>
                    <div className="text-xs text-slate-400 ml-2 whitespace-nowrap">
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleString()
                        : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              {editTask === task._id ? (
                // EditTask contains its own input + buttons — keep logic intact
                <></>
              ) : (
                <DeleteTask task={task} />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center">
          <h1 className="text-lg font-medium text-slate-600">No tasks yet</h1>
          <p className="text-sm text-slate-400 mt-2">
            Add your first task using the form above.
          </p>
        </div>
      )}
    </>
  );
}

export default AllTask;

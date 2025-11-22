import TodoForm from "./components/TodoForm";
import AllTask from "./components/AllTask";
function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold underline mb-6 text-center">
        Task Manager
      </h1>

      <TodoForm />

      <div className="space-y-3">
        <AllTask />
      </div>
    </div>
  );
}

export default App;
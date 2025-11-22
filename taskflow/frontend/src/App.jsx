import TodoForm from "./components/TodoForm";
import AllTask from "./components/AllTask";
function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="bg-white/60 backdrop-blur rounded-2xl shadow-lg p-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                Task Manager
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Simple, fast and responsive todo manager
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-xs text-slate-500">
                Built with React + Tailwind
              </span>
            </div>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow-md p-6">
          <TodoForm />

          <div className="mt-6 space-y-4">
            <AllTask />
          </div>
        </main>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Made with ❤️ — keep learning and building
        </footer>
      </div>
    </div>
  );
}

export default App;

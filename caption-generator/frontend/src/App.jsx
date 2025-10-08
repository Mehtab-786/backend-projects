import { Outlet } from "react-router";

function App() {
  return (
    <div className="w-full h-screen bg-neutral-800 text-white flex items-center justify-center">
      <Outlet />
    </div>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { TodoProvider } from "./context/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoProvider>
      <App />

      <Toaster
        position="top-right"
        theme="system"
        richColors
        toastOptions={{
          className:
            "bg-gray-900 text-white rounded shadow-lg border border-gray-800 px-4 py-3 font-medium",
          style: { fontSize: "1rem" },
        }}
      />
    </TodoProvider>
  </StrictMode>
);

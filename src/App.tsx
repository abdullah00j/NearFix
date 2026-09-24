import { RouterProvider } from "react-router-dom";
import { NavbarProvider } from "./context/NavbarContext";
import router from "./Router";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  console.log("isDark", isDark);
  return (
    <>
      <NavbarProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <RouterProvider router={router} />
      </NavbarProvider>
    </>
  );
}

export default App;

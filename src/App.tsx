import { RouterProvider } from "react-router-dom";
import { NavbarProvider } from "./context/NavbarContext";
import { UserProvider } from "./context/UserContext";
import router from "./Router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const storedTheme = localStorage.getItem("theme");
      const theme =
        storedTheme === "Light" ||
        storedTheme === "Dark" ||
        storedTheme === "System"
          ? storedTheme
          : "Light";
      const isDark =
        theme === "Dark" || (theme === "System" && mediaQuery.matches);
      document.documentElement.dataset.theme = isDark ? "dark" : "light";
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);
    window.addEventListener("nearfix:themechange", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
      window.removeEventListener("nearfix:themechange", applyTheme);
    };
  }, []);

  return (
    <>
      <NavbarProvider>
        <UserProvider>
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
        </UserProvider>
      </NavbarProvider>
    </>
  );
}

export default App;

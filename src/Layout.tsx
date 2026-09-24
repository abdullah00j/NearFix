import Navbar from "./component/common/Navbar";
import Sidebar from "./component/common/Sidebar";
import TopBar from "./component/common/TopBar";
import { useNavbarContext } from "./context/NavbarContext";

function Layout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useNavbarContext();

  return (
    <div className="mx-auto p-4">
      <Navbar />
      <div className="mt-3">
        <TopBar />
      </div>

      <div className="mt-3 flex  min-h-[calc(100vh-200px)] ">
        <aside
          className={`overflow-hidden mr-2 transition-all  duration-300 ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <Sidebar />
        </aside>

        <main className="min-w-0 bg-white flex-1 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

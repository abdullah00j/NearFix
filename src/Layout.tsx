import Navbar from "./component/common/Navbar";
import Sidebar from "./component/common/Sidebar";
import AppWrapper from "./component/common/AppWrapper";
import { useNavbarContext } from "./context/NavbarContext";

function Layout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useNavbarContext();

  return (
    <div className="mx-auto p-4 pb-0  ">
      <Navbar />
      {/* <div className="mt-3">
        <TopBar />
      </div> */}

      <div className="mt-3 flex  overflow-hidden h-[calc(100vh-100px)] ">
        <aside
          className={`overflow-hidden  transition-all  duration-300 ${
            isSidebarOpen ? "w-64 mr-2" : "w-0"
          }`}
        >
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-6">
          <AppWrapper>{children}</AppWrapper>
        </main>
      </div>
    </div>
  );
}

export default Layout;

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import AppWrapper from "./components/common/AppWrapper";
import { useNavbarContext } from "./context/NavbarContext";
import { useCurrentUser } from "./context/UserContext";
import AdminSidebar from "./testing/AdminSidebar";
import { flags } from "./testing/flags";
import { useState } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useNavbarContext();
  const { role } = useCurrentUser();
  const [isNewSidebarCollapsed, setIsNewSidebarCollapsed] = useState(false);
  const useNewAdminSidebar = flags.newSidebar && role?.includes("ADMIN");

  return (
    <div className="mx-auto p-4 pb-0  ">
      <Navbar />
      {/* <div className="mt-3">
        <TopBar />
      </div> */}

      <div className="mt-3 flex  overflow-hidden h-[calc(100vh-100px)] ">
        <aside
          className={`overflow-hidden  transition-all  duration-300 ${
            isSidebarOpen
              ? useNewAdminSidebar
                ? isNewSidebarCollapsed
                  ? "w-[84px] mr-2"
                  : "w-[280px] mr-2"
                : "w-64 mr-2"
              : "w-0"
          }`}
        >
          {useNewAdminSidebar ? (
            <AdminSidebar
              collapsed={isNewSidebarCollapsed}
              onCollapsedChange={setIsNewSidebarCollapsed}
            />
          ) : (
            <Sidebar />
          )}
        </aside>

        <main className="min-w-0 flex-1 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-6">
          <AppWrapper>{children}</AppWrapper>
        </main>
      </div>
    </div>
  );
}

export default Layout;

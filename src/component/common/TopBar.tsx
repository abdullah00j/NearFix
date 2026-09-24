import { ChevronRight, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavbarContext } from "../../context/NavbarContext";

const routeLabels: Record<string, string> = {
  "/": "Dashboard",
  "/activity": "Activity",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/profile": "Profile",
};

function TopBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavbarContext();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [
    "Dashboard",
    ...pathnames.map(
      (segment) => routeLabels[`/${segment}`] ?? segment.replace(/-/g, " "),
    ),
  ];

  return (
    <div className="flex bg-white items-center justify-between rounded-[20px] border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-panel-soft text-[var(--text)] transition hover:border-primary hover:text-primary shadow-md cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>

        <nav className="flex items-center gap-2 overflow-hidden text-sm text-primary ">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div
                key={`${crumb}-${index}`}
                className="flex items-center gap-2 overflow-hidden "
              >
                {index > 0 && (
                  <ChevronRight size={14} className="text-[var(--muted)]/80" />
                )}
                <span
                  className={
                    isLast
                      ? "truncate  font-sans font-semibold text-[var(--text)]"
                      : "truncate font-normal text-[var(--muted)]"
                  }
                >
                  {crumb}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default TopBar;

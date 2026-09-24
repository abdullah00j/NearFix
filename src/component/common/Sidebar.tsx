import {
  Activity,
  Bell,
  ChevronLeft,
  Settings,
  TextQuote,
  UserRound,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNavbarContext } from "../../context/NavbarContext";

// const UserSideBar1 = [
//   {
//     name: "UserLiveFeed",
//     path: "/",
//     icon: TextQuote,
//   },
//   {
//     name: "Favourite",
//     path: "/favourite",
//     icon: Activity,
//   },
// ];

// const UserSideBar2 = [
//   {
//     name: "Notifications",
//     path: "/notifications",
//     icon: Bell,
//   },
//   {
//     name: "Settings",
//     path: "/settings",
//     icon: Settings,
//   },
//   {
//     name: "Profile",
//     path: "/profile",
//     icon: UserRound,
//   },
// ];

const ProviderSideBar1 = [
  { name: "Dashboard", path: "/provider", icon: Activity },
  {
    name: "ProviderLiveFeed",
    path: "/provider/provider-feed",
    icon: TextQuote,
  },
  { name: "Bookings", path: "/provider/bookings", icon: Activity },
  {
    name: "Booking History",
    path: "/provider/booking-history",
    icon: Activity,
  },
  { name: "Reviews", path: "/provider/reviews", icon: Activity },
  {
    name: "Service Management",
    path: "/provider/service-management",
    icon: Activity,
  },
  { name: "Earnings", path: "/provider/earnings", icon: Activity },
];

const ProviderSideBar2 = [
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserRound,
  },
];

// const AdminSideBar = [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: TextQuote,
//   },
//   {
//     name: "payments",
//     path: "/payments",
//     icon: Activity,
//   },
//   {
//     name: "Service Management",
//     path: "/service-management",
//     icon: Activity,
//   },
//   {
//     name: "Category Management",
//     path: "/category-management",
//     icon: Activity,
//   },
//   {
//     name: "Customer Management",
//     path: "/customer-management",
//     icon: Activity,
//   },

//   {
//     name: "Notifications",
//     path: "/notifications",
//     icon: Activity,
//   },

// ];

// const AdminSideBar2 = [
//  {
//     name: "Provider Verification",
//     path: "/provider-verification",
//     icon: Activity,
//   },
// { name: "Reports", path: "/reports", icon: Activity },
// ];

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useNavbarContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full bg-white w-64 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-panel-soft shadow-md px-3 py-2.5">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="NearFix logo"
            className="h-6 w-6 font-sans rounded-lg object-cover"
          />
          <p className="text-sm font-semibold font-sans">
            Near
            <span className="text-primary">Fix</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-white hover:text-primary cursor-pointer"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="space-y-1.5">
        {ProviderSideBar1.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                active
                  ? "bg-panel-soft border-line shadow-md text-[var(--primary)] shadow-[inset_0_0_0_1px_rgba(4,125,149,0.12)]"
                  : "text-[var(--text)] hover:bg-panel-soft hover:border-line hover:shadow-md cursor-pointer  "
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  active
                    ? " text-[var(--primary)]"
                    : "bg-panel-soft border-line shadow-md text-[var(--muted)]"
                }`}
              >
                <Icon size={15} />
              </span>
              <Link to={item.path} className="text-sm font-medium">
                {item.name}
              </Link>
            </button>
          );
        })}
      </div>

      <div className="mt-4 border-t border-[var(--line)] pt-4">
        <div className="space-y-1.5">
          {ProviderSideBar2.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  active
                    ? "bg-panel-soft border-line shadow-md text-[var(--primary)] shadow-[inset_0_0_0_1px_rgba(4,125,149,0.12)]"
                    : "text-[var(--text)]  hover:border-primary hover:bg-panel-soft hover:border-line hover:shadow-md cursor-pointer"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    active
                      ? " text-[var(--primary)]"
                      : "bg-panel-soft border-line shadow-md text-[var(--muted)]"
                  }`}
                >
                  <Icon size={15} />
                </span>
                <Link to={item.path} className="text-sm font-medium">
                  {item.name}
                </Link>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

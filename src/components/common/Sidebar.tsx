import {
  BarChart3,
  Bell,
  Briefcase,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  History,
  LayoutDashboard,
  Radio,
  Settings,
  ShieldCheck,
  Star,
  Sparkles,
  Tags,
  TextQuote,
  UserRound,
  UsersRound,
  Wallet,
  Activity,
  Store,
  Wrench,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavbarContext } from "../../context/NavbarContext";
import { useCurrentUser } from "../../context/UserContext";

const UserSideBar = {
  sideBar: [
    {
      name: "UserLiveFeed",
      path: "/",
      icon: TextQuote,
    },
    {
      name: "Service Providers",
      path: "/service-providers",
      icon: Store,
    },
    {
      name: "Favourite",
      path: "/favourite",
      icon: Activity,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: CalendarDays,
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: Sparkles,
    },
    //  {
    //    name: "Become a provider",
    //    path: "/become-provider",
    //    icon: Briefcase,
    //  },
    {
      name: "Booking History",
      path: "/booking-history",
      icon: History,
    },
  ],

  subSideBar: [
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
  ],
};

const ProviderSideBar = {
  sideBar: [
    {
      name: "Dashboard",
      path: "/provider",
      icon: LayoutDashboard,
    },
    {
      name: "ProviderLiveFeed",
      path: "/provider/provider-feed",
      icon: Radio,
    },
    {
      name: "Bookings",
      path: "/provider/bookings",
      icon: CalendarDays,
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: Sparkles,
    },
    {
      name: "Booking History",
      path: "/provider/booking-history",
      icon: History,
    },
    {
      name: "Reviews",
      path: "/provider/reviews",
      icon: Star,
    },
    {
      name: "Service Management",
      path: "/provider/service-management",
      icon: Briefcase,
    },
    {
      name: "Earnings",
      path: "/provider/earnings",
      icon: Wallet,
    },
  ],

  subSideBar: [
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
  ],
};

const AdminSideBar = {
  sideBar: [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      name: "Service Management",
      path: "/admin/service-management",
      icon: Wrench,
    },
    {
      name: "Category Management",
      path: "/admin/category-management",
      icon: Tags,
    },
    {
      name: "Customer Management",
      path: "/admin/customer-management",
      icon: UsersRound,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
  ],

  subSideBar: [
    {
      name: "Provider Verification",
      path: "/admin/provider-verification",
      icon: ShieldCheck,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
  ],
};

function Sidebar() {
  const { role } = useCurrentUser();

  const allowedSidebar = role
    ?.map((role) => {
      if (role === "CUSTOMER") {
        return UserSideBar;
      }
      if (role === "PROVIDER") {
        return ProviderSideBar;
      }
      if (role === "ADMIN") {
        return AdminSideBar;
      }
    })
    .find((sidebar) => sidebar !== undefined);

  const AllowSideBar1 = allowedSidebar?.sideBar ?? [];
  const AllowSideBar2 = allowedSidebar?.subSideBar ?? [];

  const { isSidebarOpen, setIsSidebarOpen } = useNavbarContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-[calc(100vh-100px)] w-64 flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-panel-soft px-3 py-2.5 shadow-md">
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
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-panel-soft hover:text-primary cursor-pointer"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-1.5">
          {AllowSideBar1.map((item) => {
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
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-4">
          <div className="space-y-1.5">
            {AllowSideBar2?.map((item) => {
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
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {role?.some((roles) => roles === "CUSTOMER" || roles === "PROVIDER") && (
        <button
          type="button"
          className="mt-3  flex w-full shrink-0 cursor-pointer items-center rounded-2xl border border-line bg-panel-soft px-3 py-4 shadow-md"
          onClick={() => navigate("/become-provider")}
        >
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="NearFix logo"
              className="h-6 w-6 font-sans rounded-lg object-cover"
            />
            <p className="text-sm font-semibold font-sans">
              {role?.includes("CUSTOMER")
                ? "Become a Provider"
                : "Change to User"}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

export default Sidebar;

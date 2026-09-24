import {
  Bell,
  Search,
  Settings,
  TextQuote,
  UserRoundArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Logout from "../Auth/Logout";

const UserSideBar = [
  {
    name: "UserLiveFeed",
    path: "/",
    icon: TextQuote,
  },

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
    icon: UserRoundArrowLeft,
  },
  {
    name: "Support",
    path: "/support",
    icon: UserRoundArrowLeft,
  },
];

function Navbar() {
  const navigate = useNavigate();
  const pathname = useLocation();
  //   const { imageUrl } = useImage();
  //   const dispatch = useDispatch<AppDispatch>();
  //   const { projects, loading: projectsLoading } = useSelector(
  //     (state: RootState) => state.projects,
  //   );
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectMenuRef = useRef<HTMLDivElement>(null);
  console.log(projectsOpen, "projectsOpen");
  //   useEffect(() => {
  //     dispatch(fetchProjects());
  //   }, [dispatch]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target as Node)
      ) {
        setProjectsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const getDynamicLogo = () => {
    const currentPath = pathname.pathname;
    const currentItem = UserSideBar.find((item) => item.path === currentPath);

    if (!currentItem) return null;

    const Icon = currentItem.icon;
    return <Icon size={15} className="text-[var(--primary)]" />;
  };

  return (
    <div className="flex bg-white w-full items-center justify-between gap-3 rounded-[22px] border border-[var(--line)] bg-[var(--panel)] px-3 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-panel-soft shadow-md px-2 py-1.5">
          <img
            src="/logo.png"
            alt="NearFix logo"
            className="h-6 w-6 font-sans rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center justify-center rounded-xl bg-[var(--primary-soft)] p-2 text-[var(--primary)]">
          {getDynamicLogo()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="hidden sm:block">
            <SearchBar
              placeholder="Search for projects, tasks, and more"
              shortcutEnable={true}
              bgColor="gray-100"
            />
          </div>
          <div className="flex sm:hidden">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--panel-soft)] text-[var(--text)]"
              aria-label="Search"
            >
              <Search size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-panel-soft text-[var(--text)] transition shadow-md hover:border-primary hover:border-primary  hover:text-primary cursor-pointer"
          aria-label="Settings"
        >
          <Settings size={15} />
        </button>

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="flex h-9 w-9 items-center group  justify-center rounded-xl border border-line shadow-md bg-panel-soft text-[var(--text)] transition  hover:border-primary  hover:text-primary cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={15} className=" " />
        </button>

        <Logout />

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line bg-panel-soft p-0.5 transition shadow-md hover:border-primary cursor-pointer"
          aria-label="Profile"
        >
          <img
            className="h-full w-full rounded-full object-cover"
            src={"/user-icon.webp"}
            alt="Profile"
            // onError={(event) => {
            //   event.currentTarget.src =
            //     "/user-icon.webp";
            // }}
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;

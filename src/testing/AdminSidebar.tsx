import {
  BarChart3,
  Bell,
  CalendarCheck,
  ChevronLeft,
  CreditCard,
  HardHat,
  Image as ImageIcon,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  MapPinned,
  Percent,
  Scale,
  ScrollText,
  Settings,
  ShieldCheck,
  Star,
  Tags,
  TicketPercent,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type Item = { label: string; href: string; icon: LucideIcon; badge?: number };
type Section = { title?: string; items: Item[] };
type AdminSidebarProps = {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

const sections: Section[] = [
  {
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "Operations",
    items: [
      { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
      { label: "Live Dispatch", href: "/admin/dispatch", icon: MapPinned },
      { label: "Disputes & Refunds", href: "/admin/disputes", icon: Scale },
      { label: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Service Management", href: "/admin/services", icon: Wrench },
      { label: "Category Management", href: "/admin/categories", icon: Tags },
      { label: "Service Areas", href: "/admin/areas", icon: MapPin },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Customer Management", href: "/admin/customers", icon: Users },
      { label: "Provider Management", href: "/admin/providers", icon: HardHat },
      {
        label: "Provider Verification",
        href: "/admin/verification",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Payments", href: "/admin/payments", icon: CreditCard },
      {
        label: "Commission & Payouts",
        href: "/admin/payouts",
        icon: Percent,
      },
      {
        label: "Coupons & Promotions",
        href: "/admin/coupons",
        icon: TicketPercent,
      },
    ],
  },
  {
    title: "Engagement",
    items: [
      { label: "Reviews & Ratings", href: "/admin/reviews", icon: Star },
      { label: "Notifications", href: "/admin/notifications", icon: Bell },
      {
        label: "Content & Banners",
        href: "/admin/content",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Insights",
    items: [{ label: "Reports", href: "/admin/reports", icon: BarChart3 }],
  },
  {
    title: "System",
    items: [
      { label: "Roles & Permissions", href: "/admin/roles", icon: KeyRound },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({
  collapsed,
  onCollapsedChange,
}: AdminSidebarProps) {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-full shrink-0 flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-3 text-white transition-[width] duration-200">
      <div className="flex h-14 shrink-0 items-center justify-between rounded-2xl border border-white/10 bg-[#1a1a1a] px-3">
        <Link to="/admin" className="flex min-w-0 items-center gap-2.5">
          <img
            src="/logo.png"
            alt="NearFix"
            width={30}
            height={30}
            className="shrink-0"
          />
          {!collapsed && (
            <span className="text-lg font-semibold">
              Near<span className="text-teal-700">Fix</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            type="button"
            onClick={() => onCollapsedChange(true)}
            aria-label="Collapse sidebar"
            className="rounded-lg p-1 text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={() => onCollapsedChange(false)}
          aria-label="Expand sidebar"
          className="mx-auto shrink-0 rounded-lg p-1 text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600"
        >
          <ChevronLeft size={18} className="rotate-180" />
        </button>
      )}

      <nav className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
        {sections.map((section, index) => (
          <div
            key={section.title ?? "dashboard"}
            className={
              index > 0 ? "mt-3 border-t border-white/10 pt-3" : undefined
            }
          >
            {section.title && !collapsed && (
              <p className="mb-1 px-3 text-xs font-medium text-zinc-500">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map(({ label, href, icon: Icon, badge }) => {
                const active = isActive(href);

                return (
                  <li key={href}>
                    <Link
                      to={href}
                      title={collapsed ? label : undefined}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-2xl px-3 py-2 text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${
                        active
                          ? "bg-[#1f1f1f] text-white"
                          : "text-zinc-200 hover:bg-[#1a1a1a]"
                      }`}
                    >
                      <span
                        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-teal-700/20 text-teal-400"
                            : "bg-[#1c1c1c] text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.75} />
                        {collapsed && !!badge && (
                          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-teal-500" />
                        )}
                      </span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 truncate">{label}</span>
                          {!!badge && (
                            <span className="rounded-full bg-teal-700 px-2 py-0.5 text-xs text-white">
                              {badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

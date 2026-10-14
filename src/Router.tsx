import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Layout from "./Layout";

import Login from "./pages/Auth/Login";
import Profile from "./pages/Common/Profile";
import SupportPage from "./pages/Common/SupportPage";
import NotificationsPage from "./pages/Common/NotificationsPage";
import ChatPage from "./pages/Common/ChatPage";
import ProtectedRoute from "./ProtectedRoute";
import UserLiveFeed from "./pages/User/UserLiveFeed";
import ProviderLiveFeed from "./pages/Provider/ProviderLiveFeed";
import ServiceManagement from "./pages/Provider/ServiceManagement";
import PaymentManagement from "./pages/Admin/PaymentManagement";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CategoryManagement from "./pages/Admin/CategoryManagement";
import ProviderVerification from "./pages/Admin/ProviderVerification";
import Reports from "./pages/Admin/Reports";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import ServiceManagementAdmin from "./pages/Admin/ServiceManagement";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import SupportManagement from "./pages/Admin/SupportManagement";
import AdminPlaceholder from "./pages/Admin/AdminPlaceholder";
import Booking from "./pages/Common/Booking";
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import EarningsPage from "./pages/Provider/EarningsPage";
import ReviewsPage from "./pages/Provider/ReviewsPage";
import RegistrationPage from "./pages/Provider/RegistrationPage";
import BookingHistoryPage from "./pages/Common/BookingHistoryPage";
import FavouritePage from "./pages/Common/FavouritePage";
import AIAssistantPage from "./pages/Common/AIAssistantPage";
import ServiceProvidersPage from "./pages/Common/ServiceProvidersPage";
import SettingsPage from "./pages/Common/SettingsPage";
import BecomeProviderPage from "./pages/Common/BecomeProviderPage";
import { ProviderWorkspaceProvider } from "./pages/Provider/providerData";

//eslint-disable-next-line
const AppLayout = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Outlet />
      </Layout>
    </ErrorBoundary>
  );
};
//eslint-disable-next-line
const AuthLayout = () => {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  // ======USER
  {
    element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <UserLiveFeed />,
          },
          {
            path: "providerProfile/:id",
            element: <ServiceProvidersPage />,
          },
          {
            path: "service-providers",
            element: <ServiceProvidersPage />,
          },
          {
            path: "become-provider",
            element: <BecomeProviderPage />,
          },
          {
            path: "favourite-page",
            element: <FavouritePage />,
          },
        ],
      },
    ],
  },

  // ======PROVIDER
  {
    element: <ProtectedRoute allowedRoles={["PROVIDER"]} />,
    children: [
      {
        path: "/provider",
        element: (
          <ProviderWorkspaceProvider>
            <AppLayout />
          </ProviderWorkspaceProvider>
        ),
        children: [
          {
            index: true,
            element: <ProviderDashboard />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "provider-feed",
            element: <ProviderLiveFeed />,
          },
          {
            path: "earnings",
            element: <EarningsPage />,
          },
          {
            path: "reviews",
            element: <ReviewsPage />,
          },
          {
            path: "registeration",
            element: <RegistrationPage />,
          },
          {
            path: "service-management",
            element: <ServiceManagement />,
          },
        ],
      },
    ],
  },

  // ======ADMIN
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "bookings",
            element: <AdminPlaceholder title="Bookings" />,
          },
          {
            path: "dispatch",
            element: <AdminPlaceholder title="Live Dispatch" />,
          },
          {
            path: "disputes",
            element: <AdminPlaceholder title="Disputes & Refunds" />,
          },
          {
            path: "payments",
            element: <PaymentManagement />,
          },
          {
            path: "service-management",
            element: <ServiceManagementAdmin />,
          },
          {
            path: "support",
            element: <SupportManagement />,
          },
          {
            path: "areas",
            element: <AdminPlaceholder title="Service Areas" />,
          },
          {
            path: "providers",
            element: <AdminPlaceholder title="Provider Management" />,
          },
          {
            path: "payouts",
            element: <AdminPlaceholder title="Commission & Payouts" />,
          },
          {
            path: "coupons",
            element: <AdminPlaceholder title="Coupons & Promotions" />,
          },
          {
            path: "reviews",
            element: <AdminPlaceholder title="Reviews & Ratings" />,
          },
          {
            path: "content",
            element: <AdminPlaceholder title="Content & Banners" />,
          },
          {
            path: "roles",
            element: <AdminPlaceholder title="Roles & Permissions" />,
          },
          {
            path: "audit-logs",
            element: <AdminPlaceholder title="Audit Logs" />,
          },
          {
            path: "settings",
            element: <AdminPlaceholder title="Settings" />,
          },
          {
            path: "category-management",
            element: <CategoryManagement />,
          },
          { path: "customer-management", element: <CustomerManagement /> },
          {
            path: "provider-verification",
            element: <ProviderVerification />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "notifications",
            element: <AdminNotifications />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["CUSTOMER", "PROVIDER"]} />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "support",
            element: <SupportPage />,
          },
          {
            path: "bookings",
            element: <Booking />,
          },
          {
            path: "ai-assistant",
            element: <AIAssistantPage />,
          },
          {
            path: "favourite",
            element: <FavouritePage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          { path: "booking-history", element: <BookingHistoryPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;

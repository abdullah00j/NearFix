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
import BookingRequest from "./pages/Provider/BookingRequest";
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import EarningsPage from "./pages/Provider/EarningsPage";
import ReviewsPage from "./pages/Provider/ReviewsPage";
import RegistrationPage from "./pages/Provider/RegistrationPage";
import BookingHistoryPage from "./pages/Common/BookingHistoryPage";
import FavouritePage from "./pages/Common/FavouritePage";

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
    element: <ProtectedRoute allowedRoles={["USER"]} />,
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
        element: <AppLayout />,
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
          {
            path: "booking-history",
            element: <BookingHistoryPage />,
          },
          {
            path: "bookings",
            element: <BookingRequest />,
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
            path: "payments",
            element: <PaymentManagement />,
          },
          {
            path: "service-managment",
            element: <ServiceManagement />,
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
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["USER", "PROVIDER"]} />,
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
            path: "notifications",
            element: <NotificationsPage />,
          },
          { path: "settings", element: <div>Settings</div> },
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

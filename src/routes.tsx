import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import BlogLayout from "./components/blog/BlogLayout";
import BrowseLayout from "./components/BrowseLayout";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DocsLayout from "./components/docs/DocsLayout";
import GuestGuard from "./components/GuestGuard";
import LoadingScreen from "./components/LoadingScreen";
import MainLayout from "./components/MainLayout";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication pages

const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const PasswordRecovery = Loadable(
  lazy(() => import("./pages/authentication/PasswordRecovery"))
);
const PasswordReset = Loadable(
  lazy(() => import("./pages/authentication/PasswordReset"))
);
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const VerifyCode = Loadable(
  lazy(() => import("./pages/authentication/VerifyCode"))
);

const CustomerList = Loadable(
  lazy(() => import("./pages/dashboard/CustomerList"))
);

const Overview = Loadable(lazy(() => import("./pages/dashboard/Overview")));

// Docs pages

const Docs = Loadable(lazy(() => import("./pages/Docs")));

// Error pages

const AuthorizationRequired = Loadable(
  lazy(() => import("./pages/AuthorizationRequired"))
);
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ServerError = Loadable(lazy(() => import("./pages/ServerError")));

const routes: PartialRouteObject[] = [
  {
    path: "authentication",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: "login-unguarded",
        element: <Login />,
      },
      {
        path: "password-recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "password-reset",
        element: <PasswordReset />,
      },
      // {
      //   path: 'register',
      //   element: (
      //     <GuestGuard>
      //       <Register />
      //     </GuestGuard>
      //   )
      // },
      // {
      //   path: 'register-unguarded',
      //   element: <Register />
      // },
      {
        path: "verify-code",
        element: <VerifyCode />,
      },
    ],
  },
  {
    path: "home",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Overview />,
      },
    ],
  },
  {
    path: "patients",
    children: [
      {
        path: "/",
        element: <CustomerList />,
      },
      // {
      //   path: ":customerId",
      //   element: <CustomerDetails />,
      // },
      // {
      //   path: ":customerId/edit",
      //   element: <CustomerEdit />,
      // },
    ],
  },
  {
    path: "appointments",
    children: [
      {
        path: "/",
        element: <CustomerList />,
      },
      // {
      //   path: ":customerId",
      //   element: <CustomerDetails />,
      // },
      // {
      //   path: ":customerId/edit",
      //   element: <CustomerEdit />,
      // },
    ],
  },
  {
    path: "docs",
    element: <DocsLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/docs/overview/welcome" replace />,
      },
      {
        path: "*",
        element: <Docs />,
      },
    ],
  },
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        path: "401",
        element: <AuthorizationRequired />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "500",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;

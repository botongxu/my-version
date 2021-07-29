import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
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

const Overview = Loadable(lazy(() => import("./pages/dashboard/Overview")));

const AppointmentDashboard = Loadable(
  lazy(() => import("./pages/appointment/AppointmentDashboard"))
);
const PatientDashboard = Loadable(
  lazy(() => import("./pages/patient/PatientDashboard"))
);
const ProviderDashboard = Loadable(
  lazy(() => import("./pages/provider/ProviderDashboard"))
);

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
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <PatientDashboard />,
      },
      // {
      //   path: ":patientId",
      //   element: <PatientDetails />,
      // },
      // {
      //   path: ":patientId/edit",
      //   element: <PatientEdit />,
      // },
    ],
  },
  {
    path: "providers",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <ProviderDashboard />,
      },
      // {
      //   path: ":providerId",
      //   element: <ProviderDetails />,
      // },
      // {
      //   path: ":providerId/edit",
      //   element: <ProviderEdit />,
      // },
    ],
  },
  {
    path: "appointments",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <AppointmentDashboard />,
      },
      // {
      //   path: ":appointmentId",
      //   element: <AppointmentDetails />,
      // },
      // {
      //   path: ":appointmentId/edit",
      //   element: <AppointmentEdit />,
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

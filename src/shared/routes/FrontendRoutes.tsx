import { lazy } from "react";

const Login = lazy(() => import("../../features/frontend/auth/Login"));
const Register = lazy(() => import("../../features/frontend/auth/Register"));

const PageNotFound = lazy(() => import("../../ui/404/PageNotFound"));

export default [
  {
    label: "Login",
    component: <Login />,
    path: "login",
    showInMenu: false,
    hasAuthenticate: "no",
  },
  {
    label: "Register",
    component: <Register />,
    path: "register",
    showInMenu: false,
    hasAuthenticate: "no",
  },

  {
    label: "Page Not Found",
    component: <PageNotFound />,
    path: "/*",
    showInMenu: false,
    hasAuthenticate: "no",
  },
];

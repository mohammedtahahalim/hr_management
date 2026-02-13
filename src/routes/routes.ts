import { lazy } from "react";
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Dashboard = lazy(() => import("../pages/guard/Dashboard"));
const Vacancies = lazy(() => import("../pages/guard/Vacancies"));
const Applicants = lazy(() => import("../pages/guard/Applicants"));
const Employees = lazy(() => import("../pages/guard/Employees"));
const Payroll = lazy(() => import("../pages/guard/Payroll"));
const Vacancy = lazy(() => import("../pages/guard/Vacancy"));
const NotFound = lazy(() => import("../pages/guard/NotFound"));

interface IRoute {
  path: string;
  component: React.FC;
}

export const authRoutes: IRoute[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "signup",
    component: Signup,
  },
];

export const mainRoutes: IRoute[] = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/vacancies",
    component: Vacancies,
  },
  {
    path: "/vacancies/:id",
    component: Vacancy,
  },
  {
    path: "/applicants",
    component: Applicants,
  },
  {
    path: "employees",
    component: Employees,
  },
  {
    path: "/payroll",
    component: Payroll,
  },
  {
    path: "*",
    component: NotFound,
  },
];

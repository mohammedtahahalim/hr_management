import { lazy } from "react";
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/guard/Dashboard"));
const Vacancies = lazy(() => import("../pages/guard/Vacancies"));
const Vacancy = lazy(() => import("../pages/guard/Vacancy"));
const AddVacancy = lazy(() => import("../pages/guard/AddVacancy"));
const Applicants = lazy(() => import("../pages/guard/Applicants"));
const Employees = lazy(() => import("../pages/guard/Employees"));
const AddEmployee = lazy(() => import("../pages/guard/AddEmployee"));
const Payroll = lazy(() => import("../pages/guard/Payroll"));
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
  {
    path: "/forgotPassword",
    component: ForgotPassword,
  },
];

export const mainRoutes: IRoute[] = [
  {
    path: "/",
    component: Dashboard,
  },
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
    path: "/add-vacancy",
    component: AddVacancy,
  },
  {
    path: "/add-employee",
    component: AddEmployee,
  },
  {
    path: "/applicants",
    component: Applicants,
  },
  {
    path: "/employees",
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

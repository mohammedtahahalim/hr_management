import { lazy } from "react";
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Redirect = lazy(() => import("../shared/ui/Redirect"));
const Vacancies = lazy(() => import("../pages/vacancies/Vacancies"));
const Vacancy = lazy(() => import("../pages/vacancies/Vacancy"));
const AddVacancy = lazy(() => import("../pages/vacancies/AddVacancy"));
const Applicants = lazy(() => import("../pages/applicants/Applicants"));
const Employees = lazy(() => import("../pages/employees/Employees"));
const AddEmployee = lazy(() => import("../pages/employees/AddEmployee"));
const Payroll = lazy(() => import("../pages/payroll/Payroll"));
const NotFound = lazy(() => import("../shared/ui/NotFound"));

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
    component: Redirect,
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

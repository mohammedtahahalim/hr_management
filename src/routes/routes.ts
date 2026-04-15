import { lazy } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Vacancies from "../pages/vacancies/Vacancies";
import Applicants from "../pages/applicants/Applicants";
import Employees from "../pages/employees/Employees";
import Payroll from "../pages/payroll/Payroll";
import Vacancy from "../pages/vacancies/vacancy/Vacancy";
import AddVacancy from "../pages/vacancies/addVacancy/AddVacancy";
import Employee from "../pages/employees/employee/Employee";
import Overview from "../pages/overview/Overview";
const Login = lazy(() => import("../pages/auth/Login"));
const Redirect = lazy(() => import("../shared/ui/Redirect"));
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
    path: "/overview",
    component: Overview,
  },
  {
    path: "/vacancy",
    component: Vacancies,
  },
  {
    path: "/vacancy/:id",
    component: Vacancy,
  },
  {
    path: "/vacancy/add-vacancy",
    component: AddVacancy,
  },
  {
    path: "/applicant",
    component: Applicants,
  },
  {
    path: "/employee",
    component: Employees,
  },
  {
    path: "/employee/:id",
    component: Employee,
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

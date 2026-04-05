import { lazy } from "react";
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Redirect = lazy(() => import("../shared/ui/Redirect"));
const Vacancies = lazy(() => import("../pages/vacancies/Vacancies"));
const Vacancy = lazy(() => import("../pages/vacancies/vacancy/Vacancy"));
const AddVacancy = lazy(
  () => import("../pages/vacancies/addVacancy/AddVacancy"),
);
const Applicants = lazy(() => import("../pages/applicants/Applicants"));
const Employees = lazy(() => import("../pages/employees/Employees"));
const Employee = lazy(() => import("../pages/employees/employee/Employee"));
const AddEmployee = lazy(
  () => import("../pages/employees/addEmployee/AddEmployee"),
);
const Payroll = lazy(() => import("../pages/payroll/Payroll"));
const Calendar = lazy(() => import("../pages/calendar/Calendar"));
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
    path: "/employee/add-employee",
    component: AddEmployee,
  },
  {
    path: "/payroll",
    component: Payroll,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "*",
    component: NotFound,
  },
];

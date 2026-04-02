import { createContext, useContext } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { EmployeeEditableFields } from "./employeeSlice";

export const EmployeeFormContext = createContext<
  UseFormRegister<EmployeeEditableFields>
>({} as UseFormRegister<EmployeeEditableFields>);

export const useEmployeeForm = (): UseFormRegister<EmployeeEditableFields> => {
  const context = useContext(EmployeeFormContext);
  if (!context) {
    throw new Error("useEmployeeForm must be used within EmployeeFormProvider");
  }
  return context;
};

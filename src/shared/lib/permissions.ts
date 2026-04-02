import type { TRole, Operation, Resource } from "./types";

export const permissions: Partial<Record<`${TRole}:${Operation}`, Resource[]>> =
  {
    // (empty array = all resources)
    "admin:CREATE": [],
    "admin:READ": [],
    "admin:UPDATE": [],
    "admin:DELETE": [],

    "candidate:CREATE": ["applicant"],
    "candidate:READ": ["dashboard", "vacancy", "applicant"],
    "candidate:UPDATE": ["applicant"],

    "employee:READ": ["dashboard", "employee", "calendar", "vacancy"],
    "employee:UPDATE": ["employee", "calendar"],

    "hr:CREATE": ["employee", "applicant", "vacancy", "calendar"],
    "hr:READ": [
      "dashboard",
      "employee",
      "applicant",
      "payroll",
      "vacancy",
      "calendar",
    ],
    "hr:UPDATE": ["employee", "applicant", "payroll", "vacancy", "calendar"],
    "hr:DELETE": ["employee", "applicant", "vacancy"],

    "manager:CREATE": ["calendar"],
    "manager:READ": ["dashboard", "employee", "calendar", "vacancy"],
    "manager:UPDATE": ["employee", "calendar", "vacancy"],
  };

export const canAccess = (
  role: TRole,
  operation: Operation,
  resource: Resource,
): boolean => {
  const allowedOperations = permissions[`${role}:${operation}`];
  if (!Array.isArray(allowedOperations)) return false;
  if (allowedOperations.length === 0) return true;
  return allowedOperations.includes(resource);
};

import type { TRole, Operation, Resource } from "./types";

export const permissions: Partial<Record<`${TRole}:${Operation}`, Resource[]>> =
  {
    // (empty array = all resources)
    "admin:CREATE": [],
    "admin:READ": [],
    "admin:UPDATE": [],
    "admin:DELETE": [],

    "candidate:CREATE": ["applicant"],
    "candidate:READ": ["dashboard", "vacancy", "applicant", "overview"],
    "candidate:UPDATE": ["applicant"],

    "employee:READ": ["dashboard", "employee", "vacancy", "overview"],
    "employee:UPDATE": ["employee"],

    "hr:CREATE": ["employee", "applicant", "vacancy"],
    "hr:READ": [
      "dashboard",
      "employee",
      "applicant",
      "payroll",
      "vacancy",
      "overview",
    ],
    "hr:UPDATE": ["employee", "applicant", "payroll", "vacancy"],
    "hr:DELETE": ["employee", "applicant", "vacancy"],

    "manager:READ": ["dashboard", "employee", "vacancy", "overview"],
    "manager:UPDATE": ["employee", "vacancy"],
  };

export const isValidResource = (resource: unknown): resource is Resource => {
  if (typeof resource !== "string") return false;
  const operations: Resource[] = [
    "applicant",
    "dashboard",
    "employee",
    "overview",
    "payroll",
    "vacancy",
  ];
  return operations.includes(resource as Resource);
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

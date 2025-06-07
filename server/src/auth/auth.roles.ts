import type { Role } from "@hilma/auth-nest";

export const USER = {
  id: 1,
  roleKey: "Coz6VxHxyFL4RBRM",
  description: "Regular user role",
  name: "USER",
} as const satisfies Role;

export const ADMIN = {
  id: 2,
  roleKey: "EYKZeV1W+H56+YPS",
  description: "Administrator role",
  name: "ADMIN",
} as const satisfies Role;

export const ROLES = [USER, ADMIN];

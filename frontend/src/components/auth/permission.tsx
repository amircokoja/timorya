export type Permission = string;

export type PermissionCheck =
  | Permission // "post:create"
  | Permission[] // ["post:create", "post:edit"]
  | { any: Permission[] } // at least one
  | { all: Permission[] } // all required
  | ((has: (p: Permission) => boolean) => boolean); // advanced predicate

export const Permissions = {
  Read: "Read",
  Write: "Write",
  ManageMembers: "ManageMembers",
  ManageOrganizations: "ManageOrganizations",
  AdminManagement: "AdminManagement",
};

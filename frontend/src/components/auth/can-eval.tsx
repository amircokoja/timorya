import { Permission, PermissionCheck } from "./permission";

export function canEval(
  userPerms: Permission[] | undefined,
  check: PermissionCheck,
): boolean {
  if (!userPerms) return false;
  const has = (p: Permission) => userPerms.includes(p);

  if (typeof check === "function") return check(has);
  if (typeof check === "string") return has(check);

  if (Array.isArray(check)) return check.every(has); // default: all
  if ("any" in check) return check.any.some(has);
  if ("all" in check) return check.all.every(has);

  return false;
}

import { useGet } from "@/src/hooks/use-get";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { canEval } from "./can-eval";
import { PermissionCheck } from "./permission";

export const useHasPermission = (check: PermissionCheck) => {
  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });
  return canEval(userData?.currentOrganization?.permissions, check);
};

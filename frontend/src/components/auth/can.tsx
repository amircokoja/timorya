import { useGet } from "@/src/hooks/use-get";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { ReactNode } from "react";
import { PermissionCheck } from "./permission";
import { canEval } from "./can-eval";

type Props = {
  check: PermissionCheck;
  fallback?: ReactNode;
  children: ReactNode;
  hideWhileLoading?: boolean; // default: show fallback while loading
};

export function Can({
  check,
  fallback = null,
  children,
  hideWhileLoading = false,
}: Props) {
  const { data: userData, isFetching } = useGet<UserDataDto>({
    url: "users/me",
  });
  if (isFetching && hideWhileLoading) return null;
  if (isFetching) return <>{fallback}</>;
  return canEval(userData?.currentOrganization?.permissions, check) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  );
}

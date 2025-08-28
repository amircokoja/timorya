import { OrganizationDto } from "./organization-dto";

export const getWorkspaceType = (org: OrganizationDto): string => {
  return org.isPersonalWorkspace ? "Personal workspace" : "Organization";
};

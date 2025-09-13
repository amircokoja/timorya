export interface OrganizationDto {
  id: number;
  name: string;
  role: string;
  isPersonalWorkspace: boolean;
  permissions: string[];
}

export type WorkspaceType = "organization" | "personal";

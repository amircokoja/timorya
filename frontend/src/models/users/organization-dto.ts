export interface OrganizationDto {
  id: number;
  name: string;
  role: string;
  isPersonalWorkspace: boolean;
}

export type WorkspaceType = "organization" | "personal";

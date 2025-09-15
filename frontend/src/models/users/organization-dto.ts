export interface OrganizationDto {
  id: number;
  name: string;
  role: string;
  isPersonalWorkspace: boolean;
  permissions: string[];
}

export interface UpdateOrganizationRequest {
  name: string;
}

export type WorkspaceType = "organization" | "personal";

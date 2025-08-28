export interface UserDataDto {
  firstName: string;
  lastName: string;
  email: string;
  isPasswordSet: boolean;
  currentOrganizationId?: number;
}

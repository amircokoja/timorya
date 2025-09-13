export interface UserDataDto {
  firstName: string;
  lastName: string;
  email: string;
  isPasswordSet: boolean;
  currentOrganization: {
    id: number;
    name: string;
    permissions: string[];
    role: string;
  };
}

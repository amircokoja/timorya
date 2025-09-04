export interface MemberDto {
  userId?: number;
  invitationId?: number;
  name?: string;
  email: string;
  role: string;
  type: "User" | "Invitation";
}

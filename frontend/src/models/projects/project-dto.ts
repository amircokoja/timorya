export interface ProjectDto {
  id: number;
  name: string;
  color: string;
  isPublic: boolean;
  isBillable: boolean;
  hourlyRate: number;
  clientId: number;
  clientName: string;
}

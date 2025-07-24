export interface TimeLogDto {
  id: number;
  description: string;
  start: Date;
  end: Date;
  seconds: number;
  projectId?: number;
  projectName?: string;
  projectColor?: string;
}

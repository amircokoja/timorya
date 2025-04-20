export interface TimeLogCreateDto {
  description: string;
  start: Date;
  end: Date;
  projectId?: number;
  seconds: number;
}

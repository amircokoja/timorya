export interface TimeLogCreateDto {
  description: string;
  projectId?: number;
  start: Date;
  end?: Date;
  seconds: number;
}

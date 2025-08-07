export interface TimeLogUpdateDto {
  description: string;
  start: Date;
  end?: Date;
  projectId?: number;
  seconds: number;
}

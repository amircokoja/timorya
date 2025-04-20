import { TimeLogDto } from "./time-log-dto";

export interface TimeLogGroup {
  timeLogs: TimeLogDto[];
  date: Date;
}

import { Course } from "./course.types";

export interface ScheduledClass {
  id: string;
  title: string;
  startTime: string; // ISO Date String
  googleMeetUrl: string;
  course: Pick<Course, "title">; // We only need the course title here
}
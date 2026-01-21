export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "COURSE" | "WORKSHOP";
  thumbnail?: string;
}

export interface Enrollment {
  id: string;
  joinedAt: string;
  course: Course;
}
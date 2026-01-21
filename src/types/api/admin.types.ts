export interface DashboardStats {
  revenue: number;
  activeStudents: number;
  upcomingClasses: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  coursesBought: number;
  courseNames: string;
}
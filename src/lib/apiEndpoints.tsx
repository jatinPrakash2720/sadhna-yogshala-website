export const API_ENDPOINTS = {
   // Auth & User
  ME: "/user/me",
  CHECK_ADMIN: "/user/check-admin",
  UPDATE_PROFILE: "/user/profile",

  // Courses (Public)
  COURSES: "/courses",
  COURSE_DETAILS: (courseId: string) => `/courses/${courseId}`,
  COURSE_SCHEDULE: (courseId: string) => `/courses/${courseId}/schedule`,

  // Student Dashboard
  STUDENT_SCHEDULE: "/student/my-schedule",
  STUDENT_ENROLLMENTS: "/student/enrollments",

  // Payments
  CREATE_ORDER: "/payments/create-order",

  // Admin Dashboard
  ADMIN_STATS: "/admin/stats",
  ADMIN_STUDENTS: "/admin/students",
  ADMIN_TRANSACTIONS: "/admin/transactions",
  ADMIN_COURSES: "/admin/courses", // GET (list) & POST (create)
  ADMIN_COURSE_DETAILS: (courseId: string) => `/admin/courses/${courseId}`, // PATCH & DELETE
  ADMIN_CLASSES: "/admin/classes",  // POST (create)
  ADMIN_CLASS_DETAILS: (classId: string) => `/admin/classes/${classId}`, // DELETE
} as const;
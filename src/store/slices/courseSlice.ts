import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseService } from "@/services/course.service";
import { studentService } from "@/services/student.service";
import { Course, Enrollment } from "@/types/api/course.types";
import { ScheduledClass } from "@/types/api/student.types";
interface CourseState {
  courses: Course[];
    myEnrollments: Enrollment[];
    mySchedule: ScheduledClass[];
  selectedCourse: Course | null;       // <--- NEW
  previewSchedule: ScheduledClass[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  myEnrollments: [],
  mySchedule: [],
  selectedCourse: null,      // <--- NEW
  previewSchedule: [],       // <--- NEW
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk("course/fetchAll", async () => {
  return await courseService.getAllCourses();
});

export const fetchEnrollments = createAsyncThunk("course/fetchEnrollments", async () => {
  return await courseService.getMyEnrollments();
});

export const fetchMySchedule = createAsyncThunk("course/fetchSchedule", async () => {
  return await studentService.getMySchedule();
});

export const fetchCourseById = createAsyncThunk("course/fetchOne", async (id: string) => {
  // You need to ensure getCourseDetails exists in course.service.ts
  return await courseService.getCourseDetails(id); 
});

export const fetchCoursePreview = createAsyncThunk("course/fetchPreview", async (id: string) => {
  // You need to ensure getCourseSchedule exists in course.service.ts
  return await courseService.getCourseSchedule(id);
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Courses
    builder.addCase(fetchCourses.pending, (state) => { state.loading = true; });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    });
    
    // Enrollments
    builder.addCase(fetchEnrollments.fulfilled, (state, action) => {
      state.myEnrollments = action.payload;
    });
      
      // ✅ Single Course Details
    builder.addCase(fetchCourseById.pending, (state) => { state.loading = true; });
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
    });

    // ✅ Public Schedule Preview
    builder.addCase(fetchCoursePreview.fulfilled, (state, action) => {
      state.previewSchedule = action.payload;
    });
  },
});

export default courseSlice.reducer;
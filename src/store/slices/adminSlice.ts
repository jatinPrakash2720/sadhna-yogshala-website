import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminService, CreateCoursePayload, CreateClassPayload } from "@/services/admin.service";
import { DashboardStats, Student } from "@/types/api/admin.types";
import { Course } from "@/types/api/course.types";

interface Transaction {
  id: string;
  user: string;
  course: string;
  amount: number;
  date: string;
}

interface AdminState {
  stats: DashboardStats | null;
  students: Student[];
    transactions: Transaction[];
    adminCourses: Course[];
  loading: boolean;
  operationLoading: boolean; // <--- Separate loading for buttons (Save/Delete)
  error: string | null;
}
const initialState: AdminState = {
  stats: null,
  students: [],
    transactions: [],
  adminCourses: [],
  loading: false,
  operationLoading: false,
  error: null,
};


// --- EXISTING READ THUNKS ---
export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async () => {
  return await adminService.getStats();
});
export const fetchStudents = createAsyncThunk("admin/fetchStudents", async () => {
  return await adminService.getStudents();
});
export const fetchTransactions = createAsyncThunk("admin/fetchTransactions", async () => {
  return await adminService.getTransactions();
});
export const fetchAdminCourses = createAsyncThunk("admin/fetchAdminCourses", async () => {
  return await adminService.getAdminCourses();
});
// --- NEW WRITE THUNKS ---

// 1. Create Course
export const createCourse = createAsyncThunk("admin/createCourse", async (data: CreateCoursePayload) => {
  return await adminService.createCourse(data);
});

// 2. Update Course
export const updateCourse = createAsyncThunk("admin/updateCourse", async ({ id, data }: { id: string, data: Partial<CreateCoursePayload> }) => {
  return await adminService.updateCourse(id, data);
});

// 3. Delete Course
export const deleteCourse = createAsyncThunk("admin/deleteCourse", async (id: string) => {
  await adminService.deleteCourse(id);
  return id; // Return ID so we can remove it from state
});

// 4. Create Class
export const createClass = createAsyncThunk("admin/createClass", async (data: CreateClassPayload) => {
  await adminService.createClass(data);
  return true; // Just return success
});

// 5. Delete Class
export const deleteClass = createAsyncThunk("admin/deleteClass", async (id: string) => {
  await adminService.deleteClass(id);
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminStats.pending, (state) => { state.loading = true; });
    builder.addCase(fetchAdminStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
      builder.addCase(fetchAdminCourses.fulfilled, (state, action) => {
      state.adminCourses = action.payload;
    });
      
      builder
      .addCase(createCourse.pending, (state) => { state.operationLoading = true; })
      .addCase(createCourse.fulfilled, (state) => {
        state.operationLoading = false;
        // Note: We don't push to state here because the Course List is in `courseSlice`. 
        // You should dispatch `fetchCourses()` after this succeeds in the component.
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.error.message || "Failed to create course";
      });

    // ✅ Handle Delete Course (Optimistic UI update not possible for cross-slice data)
    builder.addCase(deleteCourse.pending, (state) => { state.operationLoading = true; });
    builder.addCase(deleteCourse.fulfilled, (state) => { state.operationLoading = false; });
    
    // ✅ Handle Create/Delete Class
    builder.addCase(createClass.pending, (state) => { state.operationLoading = true; });
    builder.addCase(createClass.fulfilled, (state) => { state.operationLoading = false; });
    
  },
});

export default adminSlice.reducer;
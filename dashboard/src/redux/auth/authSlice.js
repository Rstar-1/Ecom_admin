import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= API CONFIG =================
const API = axios.create({ baseURL: "http://localhost:8000" });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ================= ERROR HANDLER =================
const handleError = (error, rejectWithValue) => {
  const message =
    error.response?.data?.message || error.message || "Something went wrong";
  return rejectWithValue(message);
};

// ================= THUNKS =================

// ✅ GET USERS
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/getusers", { params });
      return data;
    } catch (e) {
      return handleError(e, rejectWithValue);
    }
  },
);

// ✅ REGISTER USER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data; // full response
    } catch (e) {
      return handleError(e, rejectWithValue);
    }
  },
);

// ✅ LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/login", payload);
      const { user, token } = data.data; // make sure server sends { data: { user, token } }
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
    } catch (e) {
      return handleError(e, rejectWithValue);
    }
  },
);

// ✅ UPDATE USER
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/update/${id}`, data, {
        headers: {
          "Content-Type":
            data instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
      });
      const updatedUser = res.data.data || res.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (e) {
      return handleError(e, rejectWithValue);
    }
  },
);

// ================= INITIAL STATE =================
const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  users: [],
  pagination: {},
  error: null,
  success: null,
};

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      Object.assign(state, initialState, { user: null, token: null });
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    };
    const setRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    // ================= GET USERS =================
    builder
      .addCase(getUsers.pending, setPending)
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(getUsers.rejected, setRejected);

    // ================= REGISTER =================
    builder
      .addCase(registerUser.pending, setPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Registration successful";
      })
      .addCase(registerUser.rejected, setRejected);

    // ================= LOGIN =================
    builder
      .addCase(loginUser.pending, setPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = "Login successful";
      })
      .addCase(loginUser.rejected, setRejected);

    // ================= UPDATE USER =================
    builder
      .addCase(updateUser.pending, setPending)
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(updateUser.rejected, setRejected);
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { login, register, loadUser } from "../actions/userAction";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearUserData(state) {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuthenticated = true;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { clearUserData } = userSlice.actions;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.put(`/api/v1/me/update`, userData, config);
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update profile
export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Forgot Password action
export const forgotPassword = createAsyncThunk(
  "profile/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        "/api/v1/password/forgot",
        { email },
        config
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// reset Password action
export const resetPassword = createAsyncThunk(
  "profile/resetPassword",
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
      );
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "user/clearErrors" });
};

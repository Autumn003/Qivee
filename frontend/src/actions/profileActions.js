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

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "user/clearErrors" });
};

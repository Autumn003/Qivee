import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login action
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// register action
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post(`/api/v1/register`, userData, config);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// load user
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/me`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "user/clearErrors" });
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login action
export const login = createAsyncThunk(
  "user/login",
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
  "user/register",
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

// logout user
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`/api/v1/logout`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get all users
export const allUsers = createAsyncThunk(
  "admin/allUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/admin/users`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get user details - ADMIN
export const userDetails = createAsyncThunk(
  "admin/userDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/admin/user/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update  user - ADMIN
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update  user - ADMIN
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/admin/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "user/clearErrors" });
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      return response.data.ser;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "products/clearErrors" });
};

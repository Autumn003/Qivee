import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products",
  async (apiUrl, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async ({ id, apiUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearErrors = () => (dispatch) => {
  dispatch({ type: "products/clearErrors" });
};

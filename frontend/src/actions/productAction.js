import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all products
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

// Get single product details
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

// Get single product details
export const newReview = createAsyncThunk(
  "product/review",
  async ({ reviewData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put("/api/v1/review", reviewData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "products/clearErrors" });
};

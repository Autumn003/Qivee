import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create order
export const createOrder = createAsyncThunk(
  "order/newOrder",
  async ({ order }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/v1/order/new", order, config);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle server validation error
        return rejectWithValue(error.response.data.message);
      } else {
        // Handle other types of errors
        return rejectWithValue(
          "An error occurred while processing your request."
        );
      }
    }
  }
);

// to clear errors
export const clearErrors = () => (dispatch) => {
  dispatch("order/clearError");
};

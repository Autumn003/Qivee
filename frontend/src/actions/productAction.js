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

// get Admin products
export const getAdminProducts = createAsyncThunk(
  "Admin/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/admin/products");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ADD NEW PRODUCT
export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "createProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete PRODUCT
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/admin/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get single product details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async ({ apiUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ADD REVIEW
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
      return response.data.success;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get all reviews of a product
export const allReviews = createAsyncThunk(
  "producrReview",
  async ({ id }, { rejectWithValue }) => {
    try {
      // const response = await axios.get(`/api/v1/reviews?id=${id}`);
      const response = await axios.get(`/api/v1/reviews?id=${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete review of a product
export const deleteReview = createAsyncThunk(
  "deleteProduct",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/reviews?productId=${productId}&id=${reviewId}`
      );
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

import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductDetails,
  newReview,
} from "../actions/productAction";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProductData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.resultPerPage = action.payload.resultPerPage;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const productDetailSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    productDetail: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload.data;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const newReviewSlice = createSlice({
  name: "review",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // .addCase(newReview.reset, (state) => {
    //   state.loading = false;
    //   state.success = false;
    // });
  },
});

export const { clearProductData } = productSlice.actions;
export const { clearProductDetailData } = productDetailSlice.actions;

export const productReducer = productSlice.reducer;
export const productDetailReducer = productDetailSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer;

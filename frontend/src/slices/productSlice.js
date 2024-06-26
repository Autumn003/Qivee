import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductDetails,
  newReview,
  getAdminProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  allReviews,
  deleteReview,
} from "../actions/productAction";

export const productsSlice = createSlice({
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
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    deleteReset: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
      state.isDeleted = null;
    },
    updateReset: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
      state.isUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const createProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetProduct: (state) => {
      state.product = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
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
  },
});

const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(allReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const reviewSlice = createSlice({
  name: "productReviews",
  initialState: {
    review: {},
    loading: false,
    error: null,
  },
  reducers: {
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductData } = productSlice.actions;
export const { clearProductDetailData } = productDetailSlice.actions;
export const { resetProduct } = createProductSlice.actions;
export const { deleteReset } = productSlice.actions;
export const { updateReset } = productSlice.actions;
export const { deleteReviewReset } = reviewSlice.actions;

export const productsReducer = productsSlice.reducer;
export const productDetailReducer = productDetailSlice.reducer;
export const newReviewReducer = newReviewSlice.reducer;
export const createProductReducer = createProductSlice.reducer;
export const productReducer = productSlice.reducer;
export const productReviewsReducer = productReviewsSlice.reducer;
export const reviewReducer = reviewSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductDetails } from "../actions/productAction";

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
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// export const productDetailSlice = createSlice({
//   name: "productDetails",
//   initialState: {
//     data: {},
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearProductDetailData(state) {
//       state.data = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getProductDetails.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(getProductDetails.fulfilled, (state, action) => {
//       state.loading = false;
//       state.data = action.payload;
//     });
//     builder.addCase(getProductDetails.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//   },
// });

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

export const { clearProductData } = productSlice.actions;
export const { clearProductDetailData } = productDetailSlice.actions;

export const productReducer = productSlice.reducer;
export const productDetailReducer = productDetailSlice.reducer;

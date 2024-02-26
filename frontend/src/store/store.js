import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailReducer } from "../slices/productSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
  },
});

export default store;

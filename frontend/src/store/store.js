import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailReducer } from "../slices/productSlice";
import { userReducer } from "../slices/userSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
  },
});

export default store;

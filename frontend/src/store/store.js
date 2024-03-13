import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailReducer } from "../slices/productSlice";
import { userReducer } from "../slices/userSlice";
import { forgotPasswordReducer, profileReducer } from "../slices/profileSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export default store;

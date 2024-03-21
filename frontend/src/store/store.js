import { configureStore } from "@reduxjs/toolkit";
import { productReducer, productDetailReducer } from "../slices/productSlice";
import { userReducer } from "../slices/userSlice";
import { forgotPasswordReducer, profileReducer } from "../slices/profileSlice";
import { cartReducer } from "../slices/cartSlice";
import { orderReducer } from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
  },
});

export default store;

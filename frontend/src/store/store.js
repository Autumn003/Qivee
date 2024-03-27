import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailReducer,
  newReviewReducer,
} from "../slices/productSlice";
import { userReducer } from "../slices/userSlice";
import { forgotPasswordReducer, profileReducer } from "../slices/profileSlice";
import { cartReducer } from "../slices/cartSlice";
import {
  OrderDetailsReducer,
  myOrderReducer,
  orderReducer,
} from "../slices/orderSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrder: myOrderReducer,
    orderDetails: OrderDetailsReducer,
    newReview: newReviewReducer,
  },
});

export default store;

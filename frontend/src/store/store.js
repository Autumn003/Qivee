import { configureStore } from "@reduxjs/toolkit";
import {
  productsReducer,
  productDetailReducer,
  newReviewReducer,
  createProductReducer,
  productReducer,
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
    products: productsReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrder: myOrderReducer,
    orderDetails: OrderDetailsReducer,
    newReview: newReviewReducer,
    createProduct: createProductReducer,
    product: productReducer,
  },
});

export default store;

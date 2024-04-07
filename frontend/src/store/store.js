import { configureStore } from "@reduxjs/toolkit";
import {
  productsReducer,
  productDetailReducer,
  newReviewReducer,
  createProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "../slices/productSlice";
import {
  allUsersReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "../slices/userSlice";
import { forgotPasswordReducer, profileReducer } from "../slices/profileSlice";
import { cartReducer } from "../slices/cartSlice";
import {
  OrderDetailsReducer,
  allOrdersReducer,
  myOrderReducer,
  orderReducer,
  ordersReducer,
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
    allOrders: allOrdersReducer,
    orders: ordersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    updateUser: updateUserReducer,
    productReview: productReviewsReducer,
    review: reviewReducer,
  },
});

export default store;

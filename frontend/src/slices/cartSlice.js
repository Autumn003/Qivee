import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "../actions/cartAction";

// Define initial state
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: {},
};

// Create slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    });
    //   .addCase(removeCartItem, (state, action) => {
    //     state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
    //   })
    //   .addCase(saveShippingInfo, (state, action) => {
    //     state.shippingInfo = action.payload;
    //   });
  },
});

// Export reducer
export const cartReducer = cartSlice.reducer;

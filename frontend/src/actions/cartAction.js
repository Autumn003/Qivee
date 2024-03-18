import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// add to cart action
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { getState }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);

      const cartItem = {
        product: data.data._id,
        name: data.data.name,
        price: data.data.price,
        image: data.data.images[0].url,
        stock: data.data.stock,
        quantity,
      };

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );

      return cartItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Remove from cart action
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { getState }) => {
    try {
      const updatedCartItems = getState().cart.cartItems.filter(
        (item) => item.product !== id
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

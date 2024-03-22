import { createSlice } from "@reduxjs/toolkit";
import { createOrder, myOrders, orderDetails } from "../actions/orderActions";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const myOrderSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const OrderDetaislSlice = createSlice({
  name: "myOrders/order",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const myOrderReducer = myOrderSlice.reducer;
export const OrderDetailsReducer = OrderDetaislSlice.reducer;

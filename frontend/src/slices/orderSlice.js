import { createSlice } from "@reduxjs/toolkit";
import {
  allOrders,
  createOrder,
  deleteOrder,
  myOrders,
  orderDetails,
  updateOrder,
} from "../actions/orderActions";

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

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {},
  reducers: {
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOrderReset, deleteOrderReset } = ordersSlice.actions;

export const orderReducer = orderSlice.reducer;
export const myOrderReducer = myOrderSlice.reducer;
export const OrderDetailsReducer = OrderDetaislSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const ordersReducer = ordersSlice.reducer;

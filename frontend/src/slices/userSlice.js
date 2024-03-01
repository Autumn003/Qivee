import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/userAction";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    loading: false,
    errror: null,
  },
  reducers: {
    clearProductData(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.resultPerPage = action.payload.resultPerPage;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;

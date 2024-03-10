import { createSlice } from "@reduxjs/toolkit";
import { updateProfile, updatePassword } from "../actions/profileActions";

// const profileSlice = createSlice({
//   name: "profile",
//   initialState = {
//     loading: false,
//     isUpdated: false,
//   //   isDeleted: false,
//     error: null,
//     message: null,
//   },
//   clearUserData(state) {
//     state.data = {};
//     state.isAuthenticated = false;
//   },
// extraReducers: (builder) => {
//     .addcase(updateProfile.pending, (state) => {
//       state.loading = true;
//     })
//     .addCase(updateProfile.fulfilled, (state, action) => {
//       const data = action.payload;
//       state.data = data;
//       state.loading = false;
//       state.isUpdated = true;
//       state.message = `Profile updated successfully!`;
//     })
//     .addCase(updateProfile.rejected, (state, action) => {
//       state.error = action.error;
//       state.loading = false;
//       state.message = `Failed to update the profile.`;
//     });
//     // updatePasswordRequest(state) {
//     //   state.loading = true;
//     // },
//     // updatePasswordSuccess(state, action) {
//     //   state.loading = false;
//     //   state.isUpdated = action.payload;
//     // },
//     // updatePasswordFail(state, action) {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // },
//     // updateUserRequest(state) {
//     //   state.loading = true;
//     // },
//     // updateUserSuccess(state, action) {
//     //   state.loading = false;
//     //   state.isUpdated = action.payload;
//     // },
//     // updateUserFail(state, action) {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // },
//     // deleteUserRequest(state) {
//     //   state.loading = true;
//     // },
//     // deleteUserSuccess(state, action) {
//     //   state.loading = false;
//     //   state.isDeleted = action.payload.success;
//     //   state.message = action.payload.message;
//     // },
//     // deleteUserFail(state, action) {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // },
//     // clearErrors(state) {
//     //   state.error = null;
//     // },
//     // resetUpdateProfile(state) {
//     //   state.isUpdated = false;
//     // },
//     // resetUpdatePassword(state) {
//     //   state.isUpdated = false;
//     // },
//     // resetUpdateUser(state) {
//     //   state.isUpdated = false;
//     // },
//     // resetDeleteUser(state) {
//     //   state.isDeleted = false;
//     // },
//   },
// });

// export const {
//   updateProfileRequest,
//   updateProfileSuccess,
//   updateProfileFail,
//   updatePasswordRequest,
//   updatePasswordSuccess,
//   updatePasswordFail,
//   updateUserRequest,
//   updateUserSuccess,
//   updateUserFail,
//   deleteUserRequest,
//   deleteUserSuccess,
//   deleteUserFail,
//   clearErrors,
//   resetUpdateProfile,
//   resetUpdatePassword,
//   resetUpdateUser,
//   resetDeleteUser,
// } = profileSlice.actions;

// export const profileReducer = profileSlice.reducer;

// ***************************************************************************

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    isUpdated: false,
    error: null,
    message: null,
  },
  reducers: {
    resetUpdate(state) {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.loading = false;
        state.isUpdated = true;
        state.message = `Profile updated successfully!`;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.message = `Failed to update the profile.`;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        const data = action.payload;
        state.data = data;
        state.loading = false;
        state.isUpdated = true;
        state.message = `Profile updated successfully!`;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        state.message = `Failed to update the profile.`;
      });
  },
});

export const { resetUpdate } = profileSlice.actions;

export const profileReducer = profileSlice.reducer;

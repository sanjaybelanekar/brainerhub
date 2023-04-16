import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    addLoggedUser: (state, { payload }) => payload,
    resetLoggedUser: () => {},
  },
});

export const { addLoggedUser, resetLoggedUser } = AuthSlice.actions;

export const selectLoggedUser = (state: RootState) => state?.auth;

export default AuthSlice.reducer;

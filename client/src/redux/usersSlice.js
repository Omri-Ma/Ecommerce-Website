// usersSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    cartCount: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { setUser, setCartCount } = usersSlice.actions;

export const selectUser = (state) => state.users.user;
export const selectCartCount = (state) => state.users.cartCount;

export default usersSlice.reducer;

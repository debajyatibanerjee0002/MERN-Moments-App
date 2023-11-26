import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth(state, action) {
      console.log("Inside authSlice auth -->", action.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      console.log("auth slice -->", action?.payload?.data);
      return { ...state, authData: action?.payload?.data };
    },
    logout(state, action) {
      localStorage.clear();
      // window.location.reload();
      return { ...state, authData: null };
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;

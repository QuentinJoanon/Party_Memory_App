import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.email = initialState.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

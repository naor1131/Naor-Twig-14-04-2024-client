import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IdentityState {
  userId: string;
  score: number;
  prevScore: number;
}

const initialState: IdentityState = {
  userId: "",
  score: 0,
  prevScore: 0,
};

const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    
  },
});

export const { setUserId } = identitySlice.actions;

export default identitySlice.reducer;

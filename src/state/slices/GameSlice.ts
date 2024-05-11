import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState {
  score: number;
  prevScore: number;
}

const initialState: GameState = {
  score: 0,
  prevScore: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.prevScore = state.score;
      state.score = action.payload;
    },
    resetScore: (state) => {
      state.score = 0;
      state.prevScore = 0;
    },
  },
});

export const { setScore, resetScore } = gameSlice.actions;

export default gameSlice.reducer;

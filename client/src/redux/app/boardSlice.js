import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], sections: [] };

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.items = [...action.payload];
    },
    setSections: (state, action) => {
      state.sections = [...action.payload];
    },
  },
});

export const { setBoards, setSections } = boardSlice.actions;

export default boardSlice.reducer;

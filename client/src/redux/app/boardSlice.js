import { createSlice } from "@reduxjs/toolkit";

const initialState = {items: []};

export const boardSlice = createSlice({
    name: "board", 
    initialState,
    reducers: {
        setBoards: (state, action) => {
            state.items = [...action.payload.slice()]
        }
    }
})

export const {setBoards} = boardSlice.actions

export default boardSlice.reducer
import {createSlice} from "@reduxjs/toolkit";
import {slices} from "./slices.ts";

const WordSlice = createSlice({
  name: slices.word,
  initialState: {
    words: [],
    primary_language: 'de',
    secondary_language: 'en',
    word: {},
  },
  reducers: {
    updateWords(state, action): void {
      state.words = action.payload;
    },
  },
});

export const WordActions = WordSlice.actions;
export const WordReducer = WordSlice.reducer;

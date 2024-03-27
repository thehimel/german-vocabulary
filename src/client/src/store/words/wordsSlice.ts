import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export type ErrorType = string | null;

export interface WordsStateProps {
  words: [];
  currentIndex: number;
  loading: boolean;
  error: ErrorType;
}

const initialState: WordsStateProps = {
  words: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: slices.word,
  initialState,
  reducers: {
    setWordsLoading(state): void {
      state.loading = true;
    },
    setCurrentIndex(state, action: {payload: number}): void {
      state.currentIndex = action.payload;
    },
    setWords(state, action): void {
      state.words = action.payload;
      state.loading = false;
    },
    setError(state, action: {payload: ErrorType}): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordsActions = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

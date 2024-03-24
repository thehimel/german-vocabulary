import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export type IndexType = number | null;

export interface WordsStateProps {
  words: [];
  currentIndex: IndexType;
  loading: boolean;
  error: string | null;
}

const initialState: WordsStateProps = {
  words: [],
  currentIndex: null,
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
    setCurrentIndex(state, action: {payload: IndexType}): void {
      state.currentIndex = action.payload;
    },
    setWords(state, action): void {
      state.words = action.payload;
      state.loading = false;
    },
    setWordError(state, action): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordsActions = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

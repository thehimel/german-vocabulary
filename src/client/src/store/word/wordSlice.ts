import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

type Language = "de" | "en" | "bn";

export interface WordStateProps {
  words: [];
  primary_language: Language;
  secondary_language: Language;
  word: { [key: string]: string };
  loading: boolean;
  error: string | null;
}

const initialState: WordStateProps = {
  words: [],
  primary_language: 'de',
  secondary_language: 'en',
  word: {},
  loading: false,
  error: null,
};

const wordSlice = createSlice({
  name: slices.word,
  initialState,
  reducers: {
    updateWords(state, action): void {
      state.words = action.payload;
      state.loading = false; // Set loading to false when data is fetched
    },
    setLoading(state): void {
      state.loading = true; // Set loading to true when fetching data
    },
    setError(state, action): void {
      state.error = action.payload;
      state.loading = false; // Set loading to false on error
    },
  },
});

export const wordActions = wordSlice.actions;
export const wordReducer = wordSlice.reducer;

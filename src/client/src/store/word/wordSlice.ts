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
    setLoading(state): void {
      state.loading = true;
    },
    setPrimaryLanguage(state, action: {payload: Language}): void {
      state.primary_language = action.payload;
    },
    setSecondaryLanguage(state, action: {payload: Language}): void {
      state.secondary_language = action.payload;
    },
    setWord(state, action): void {
      state.word = action.payload;
    },
    setWords(state, action): void {
      state.words = action.payload;
      state.loading = false;
    },
    setError(state, action): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordActions = wordSlice.actions;
export const wordReducer = wordSlice.reducer;

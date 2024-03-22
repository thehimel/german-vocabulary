import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export type Language = "de" | "en" | "bn";

export interface WordsStateProps {
  words: [];
  primaryLanguage: Language;
  secondaryLanguage: Language;
  word: { [key: string]: string };
  loading: boolean;
  error: string | null;
}

const initialState: WordsStateProps = {
  words: [],
  primaryLanguage: 'de',
  secondaryLanguage: 'en',
  word: {},
  loading: false,
  error: null,
};

const wordsSlice = createSlice({
  name: slices.word,
  initialState,
  reducers: {
    setLoading(state): void {
      state.loading = true;
    },
    setPrimaryLanguage(state, action: {payload: Language}): void {
      state.primaryLanguage = action.payload;
    },
    setSecondaryLanguage(state, action: {payload: Language}): void {
      state.secondaryLanguage = action.payload;
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

export const wordsActions = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;

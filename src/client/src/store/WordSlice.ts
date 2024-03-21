import {createSlice} from "@reduxjs/toolkit";
import {slices} from "./slices.ts";

export interface WordState {
  words: [{
    title: string;
    sentence: string;
    articles: [{ title: string; }];
    parts_of_speech: [{ title: string; }];
    level: string;
  }];
  primary_language: string;
  secondary_language: string;
  word: { [key: string]: string };
  loading: boolean;
  error: string | null;
}

const initialState: WordState = {
  words: [{
    title: "",
    sentence: "",
    articles: [{ title: "" }],
    parts_of_speech: [{ title: "" }],
    level: ""
  }],
  primary_language: 'de',
  secondary_language: 'en',
  word: {},
  loading: false,
  error: null,
};

const WordSlice = createSlice({
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

export const WordActions = WordSlice.actions;
export const WordReducer = WordSlice.reducer;

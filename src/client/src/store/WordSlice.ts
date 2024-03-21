import {createSlice} from "@reduxjs/toolkit";
import {slices} from "./slices.ts";

const WordSlice = createSlice({
  name: slices.word,
  initialState: {
    words: [],
    primary_language: 'de',
    secondary_language: 'en',
    word: {},
    loading: false,  // Add loading state to manage API request status
    error: null,  // Add error state to handle API request errors
  },
  reducers: {
    updateWords(state, action): void {
      state.words = action.payload;
      state.loading = false; // Set loading to false when data is fetched
    },
    setError(state, action): void {
      state.error = action.payload;
      state.loading = false; // Set loading to false on error
    },
    setLoading(state): void {
      state.loading = true; // Set loading to true when fetching data
    },
  },
});

export const WordActions = WordSlice.actions;
export const WordReducer = WordSlice.reducer;

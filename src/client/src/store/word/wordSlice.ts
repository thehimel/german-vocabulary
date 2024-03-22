import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export interface WordStateProps {
  word: Record<string, string>;
  loading: boolean;
  error: string | null;
}

const initialState: WordStateProps = {
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
    setWord(state, action): void {
      state.word = action.payload;
    },
    setError(state, action): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordActions = wordSlice.actions;
export const wordReducer = wordSlice.reducer;

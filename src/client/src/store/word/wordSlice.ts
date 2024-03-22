import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {WordProps} from "../../units/Words/Word.tsx";
import {Language} from "../base/baseSlice.ts";

export interface WordStateProps {
  word: WordProps;
  loading: boolean;
  error: string | null;
}

const initialState: WordStateProps = {
  word: {
    id: 0,
    level: "",
    language: { code: "" as Language },
    title: "",
    articles: [{ title: "" }],
    parts_of_speech: [{ title: ""}],
    sentence: "",
    notes: [{ title: ""}],
    linked_words: [{} as WordProps],
    translations: [{} as WordProps],
  },
  loading: false,
  error: null,
};

const wordSlice = createSlice({
  name: slices.word,
  initialState,
  reducers: {
    setWordLoading(state): void {
      state.loading = true;
    },
    setWord(state, action): void {
      state.word = action.payload;
      state.loading = false;
    },
    setWordError(state, action): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordActions = wordSlice.actions;
export const wordReducer = wordSlice.reducer;

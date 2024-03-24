import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {WordProps} from "../../units/Words/Word.tsx";

type StringOrNull = string | null;

export interface WordStateProps {
  word: WordProps;
  loading: boolean;
  error: StringOrNull;
}

export const initialWord: WordProps = {
  id: 0,
  level: "",
  title: "",
  plural: "",
  language: { code: "" },
  articles: [{ title: "" }],
  parts_of_speech: [{ title: ""}],
  sentence: "",
  notes: [{ title: ""}],
  linked_words: [{} as WordProps],
  translations: [{} as WordProps],
}

const initialState: WordStateProps = {
  word: initialWord,
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
    setWord(state, action: {payload: WordProps}): void {
      state.word = action.payload;
      state.loading = false;
    },
    setWordError(state, action: {payload: StringOrNull}): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const wordActions = wordSlice.actions;
export const wordReducer = wordSlice.reducer;

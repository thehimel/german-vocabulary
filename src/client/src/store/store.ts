import { configureStore } from '@reduxjs/toolkit'
import {wordsReducer} from "./words/wordsSlice.ts";
import {baseReducer} from "./base/baseSlice.ts";
import {wordReducer} from "./word/wordSlice.ts";

const store = configureStore({
  reducer: {
    base: baseReducer,
    word: wordReducer,
    words: wordsReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

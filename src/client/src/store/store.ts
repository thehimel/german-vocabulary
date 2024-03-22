import { configureStore } from '@reduxjs/toolkit'
import {wordsReducer} from "./words/wordsSlice.ts";
import {baseReducer} from "./base/baseSlice.ts";

const store = configureStore({
  reducer: {
    base: baseReducer,
    words: wordsReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

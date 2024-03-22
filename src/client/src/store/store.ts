import { configureStore } from '@reduxjs/toolkit'
import {wordReducer} from "./word/wordSlice.ts";
import {baseReducer} from "./base/baseSlice.ts";

const store = configureStore({
  reducer: {
    base: baseReducer,
    words: wordReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit'
import {WordReducer} from "./wordSlice.ts";

const store = configureStore({
  reducer: {
    words: WordReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

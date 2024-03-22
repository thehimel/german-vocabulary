import { configureStore } from '@reduxjs/toolkit'
import {wordReducer} from "./wordSlice.ts";

const store = configureStore({
  reducer: {
    words: wordReducer,
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

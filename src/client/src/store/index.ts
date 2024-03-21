import {configureStore} from '@reduxjs/toolkit';
import {WordReducer} from "./WordSlice.ts";

const store = configureStore({
  reducer: {word: WordReducer},
});

export default store;

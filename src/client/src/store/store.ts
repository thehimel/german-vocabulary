import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {previewsReducer} from "./previews/previewsSlice.ts";
import {wordsReducer} from "./words/wordsSlice.ts";
import {baseReducer} from "./base/baseSlice.ts";
import {wordReducer} from "./word/wordSlice.ts";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["isPlaying", "loading", "error", "word", "words", "currentIndex", "properties"],
};

// combineReducers is mandatory to avoid type issues.
const rootReducer =  combineReducers({
  base: baseReducer,
  word: wordReducer,
  words: wordsReducer,
  previews: previewsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {filterLanguageChoices} from "../../units/utils/utils.ts";

export type Language = "de" | "en" | "bn";
export type Level = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

export const languageChoices = [
  {language: "de", label: "German", country: "de"},
  {language: "en", label: "English", country: "us"},
  {language: "bn", label: "Bengali", country: "bd"}
]

export interface LanguageChoices {
  language: string;
  label: string;
  country: string;
}

interface BaseState {
  darkMode: boolean;
  primaryLanguage: string;
  secondaryLanguage: string;
  level: string;
  isPlaying: boolean;
  secondaryLanguageChoices: LanguageChoices[]
}

// Define the initial state using that type
const initialState: BaseState = {
  darkMode: true,
  primaryLanguage: 'de',
  secondaryLanguage: 'bn',
  level: 'a1',
  isPlaying: false,
  secondaryLanguageChoices: filterLanguageChoices(languageChoices, 'de'),
}

const baseSlice = createSlice({
  name: slices.base,
  initialState,
  reducers: {
    toggleDarkMode(state): void {
      state.darkMode = !state.darkMode;
    },
    setIsPlaying(state, action: {payload: boolean}): void {
      state.isPlaying = action.payload;
    },
    setPrimaryLanguage(state, action: {payload: Language | string}): void {
      state.primaryLanguage = action.payload;
    },
    setSecondaryLanguage(state, action: {payload: Language | string}): void {
      state.secondaryLanguage = action.payload;
    },
    setSecondaryLanguageChoices(state): void {
      state.secondaryLanguageChoices = filterLanguageChoices(languageChoices, state.primaryLanguage);
    },
    setLevel(state, action: {payload: Level | string}): void {
      state.level = action.payload;
    },
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;

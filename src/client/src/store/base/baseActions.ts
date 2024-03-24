import {AppDispatch} from "../store.ts";
import {baseActions} from "./baseSlice.ts";

export const toggleDarkMode = () => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.toggleDarkMode());
  };
};

export const setIsPlayingGlobal = (value: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.setIsPlaying(value));
  };
};

export const setPrimaryLanguage = (value: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.setPrimaryLanguage(value));
  };
};

export const setSecondaryLanguage = (value: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.setSecondaryLanguage(value));
  };
};

export const setLevel = (value: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.setLevel(value));
  };
};

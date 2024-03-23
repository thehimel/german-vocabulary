import {AppDispatch} from "../store.ts";
import {baseActions} from "./baseSlice.ts";

export const toggleDarkMode = () => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.toggleDarkMode());
  };
};

export const setIsPlayingGlobal = (isPlaying: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch(baseActions.setIsPlaying(isPlaying));
  };
};

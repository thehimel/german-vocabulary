import axios, {AxiosError} from "axios";
import {PROPERTIES_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
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

export const fetchProperties = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(PROPERTIES_API_URL);
      dispatch(baseActions.setProperties(response.data));
      dispatch(baseActions.setError(null));
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: PROPERTIES_API_URL, error: error as AxiosError});
      dispatch(baseActions.setError(errorMessage));
    }
  };
};

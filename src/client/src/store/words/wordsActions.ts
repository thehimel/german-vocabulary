import {setIsPlayingGlobal} from "../base/baseActions.ts";
import {wordsActions} from "./wordsSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../store.ts";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";


export const fetchWords = ({primaryLanguage, secondaryLanguage, level, loader, searchQuery}: {
  primaryLanguage: string,
  secondaryLanguage: string,
  level: string,
  loader?: boolean,
  searchQuery?: string
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      if (loader) {
        dispatch(wordsActions.setWordsLoading());
      }
      const params: Record<string, string> = {
        primary_language: primaryLanguage,
        secondary_language: secondaryLanguage,
        level: level,
        ...(searchQuery ? { q: searchQuery } : {})
      };
      const response = await axios.get(WORDS_API_URL, {params: params});
      dispatch(wordsActions.setWords(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: WORDS_API_URL, error: error as AxiosError});
      dispatch(wordsActions.setWordError(errorMessage));
    }
  };
};

export const setCurrentIndex = (value: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(wordsActions.setCurrentIndex(value));
    dispatch(setIsPlayingGlobal(false));
  };
};

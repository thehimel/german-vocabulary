import {wordsActions} from "./wordsSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../store.ts";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";


export const fetchWords = (primaryLanguage: string, level: string, searchQuery?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(wordsActions.setWordsLoading());
      const params: Record<string, string> = {
        primary_language: primaryLanguage,
        level: level,
        ...(searchQuery ? { q: searchQuery } : {})
      };
      const response = await axios.get(WORDS_API_URL, {params: params});
      dispatch(wordsActions.setWords(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage(WORDS_API_URL, error as AxiosError)
      dispatch(wordsActions.setWordError(errorMessage));
    }
  };
};

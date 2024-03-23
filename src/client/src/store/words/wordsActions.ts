import {wordsActions} from "./wordsSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../store.ts";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
import {Language, Level} from "../base/baseSlice.ts";


export const fetchWords = (primaryLanguage: Language | string, level: Level | string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(wordsActions.setWordsLoading());
      const response = await axios.get(WORDS_API_URL, {
        params: {primary_language: primaryLanguage, level: level}
      });
      dispatch(wordsActions.setWords(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage(WORDS_API_URL, error as AxiosError)
      dispatch(wordsActions.setWordError(errorMessage));
    }
  };
};

import {AppDispatch} from "../store.ts";
import {wordActions} from "./wordSlice.ts";
import axios, {AxiosError} from "axios";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
import {Language} from "../base/baseSlice.ts";


export const fetchWord = (id: number, secondaryLanguage: Language) => {
  return async (dispatch: AppDispatch) => {
    const WORDS_API_URL_WITH_ID = `${WORDS_API_URL}/${id}/`
    try {
      dispatch(wordActions.setWordLoading());
      const response = await axios.get(WORDS_API_URL_WITH_ID, {
        params: {secondary_language: secondaryLanguage}
      });
      dispatch(wordActions.setWord(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage(WORDS_API_URL_WITH_ID, error as AxiosError)
      dispatch(wordActions.setWordError(errorMessage));
    }
  };
};

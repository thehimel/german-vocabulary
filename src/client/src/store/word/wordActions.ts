import {AppDispatch} from "../store.ts";
import {wordActions} from "./wordSlice.ts";
import axios, {AxiosError} from "axios";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";


export const fetchWord = ({id, secondaryLanguage}: {id: number, secondaryLanguage: string}) => {
  return async (dispatch: AppDispatch) => {
    const WORDS_API_URL_WITH_ID = `${WORDS_API_URL}${id}/`
    try {
      dispatch(wordActions.setWordLoading());
      const response = await axios.get(WORDS_API_URL_WITH_ID, {
        params: {secondary_language: secondaryLanguage}
      });
      dispatch(wordActions.setWord(response.data));
      dispatch(wordActions.setWordError(null));
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: WORDS_API_URL_WITH_ID, error: error as AxiosError});
      dispatch(wordActions.setWordError(errorMessage));
    }
  };
};

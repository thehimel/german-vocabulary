import {wordsActions} from "./wordsSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../store.ts";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";


export const fetchWords = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(wordsActions.setLoading());
      const response = await axios.get(WORDS_API_URL);
      dispatch(wordsActions.setWords(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage(WORDS_API_URL, error as AxiosError)
      dispatch(wordsActions.setError(errorMessage));
    }
  };
};

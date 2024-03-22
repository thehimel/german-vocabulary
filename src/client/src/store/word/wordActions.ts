import {wordActions} from "./wordSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "../store.ts";
import {WORDS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";


export const fetchWords = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(wordActions.setLoading());
      const response = await axios.get(WORDS_API_URL);
      dispatch(wordActions.updateWords(response.data));
    } catch (error) {
      const errorMessage = getErrorMessage(WORDS_API_URL, error as AxiosError)
      dispatch(wordActions.setError(errorMessage));
    }
  };
};

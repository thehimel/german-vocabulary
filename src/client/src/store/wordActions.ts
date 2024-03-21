import {WordActions} from "./wordSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "./store.ts";
import {WORDS_API_URL} from "./constants.ts";
import {decoratedErrorMessage} from "./utils.ts";

interface AxiosErrorResponseData {
  message: string;
}

export const fetchWords = () => {
  return async (dispatch: AppDispatch) => {
    let errorMessage = "";
    try {
      const response = await axios.get(WORDS_API_URL);
      if (!response.data) {
        errorMessage = 'No data received from server'
        dispatch(WordActions.setError(decoratedErrorMessage(WORDS_API_URL, errorMessage)));
        return;
      }
      dispatch(WordActions.updateWords(response.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response.data as AxiosErrorResponseData;
        errorMessage = responseData.message || 'An error occurred while fetching data';
        dispatch(WordActions.setError(decoratedErrorMessage(WORDS_API_URL, errorMessage)));
      } else {
        errorMessage = axiosError.message || 'An unknown error occurred';
        dispatch(WordActions.setError(decoratedErrorMessage(WORDS_API_URL, errorMessage)));
      }
    }
  };
};

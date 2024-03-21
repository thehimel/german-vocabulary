import {AxiosError} from "axios";
import {AppDispatch} from "./store.ts";
import {WordActions} from "./wordSlice.ts";
import {decoratedErrorMessage} from "./utils.ts";
import {WORDS_API_URL} from "./constants.ts";


interface AxiosErrorResponseData {
  message: string;
}

export const handleAxiosError = (error: AxiosError, dispatch: AppDispatch) => {
  let errorMessage = "";
  if (error.response) {
    const responseData = error.response.data as AxiosErrorResponseData;
    errorMessage = responseData.message || 'An error occurred while fetching data';
    dispatch(WordActions.setError(decoratedErrorMessage(WORDS_API_URL, errorMessage)));
  } else {
    errorMessage = error.message || 'An unknown error occurred';
    dispatch(WordActions.setError(decoratedErrorMessage(WORDS_API_URL, errorMessage)));
  }
};

import {AxiosError} from "axios";
import {AppDispatch} from "./store.ts";
import {WordActions} from "./wordSlice.ts";


interface AxiosErrorResponseData {
  message: string;
}

export const dispatchError = (dispatch: AppDispatch, api_url: string, error: AxiosError) => {
  let errorMessage = "";
  if (error.response) {
    const responseData = error.response.data as AxiosErrorResponseData;
    errorMessage = responseData.message || 'An error occurred while fetching data';
  } else {
    errorMessage = error.message || 'An unknown error occurred';
  }
  dispatch(WordActions.setError(`${api_url}: ${errorMessage}`));
};

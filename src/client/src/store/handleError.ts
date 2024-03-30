import {AxiosError} from "axios";
import {ErrorInterface} from "./previews/previewsSlice.ts";


interface AxiosErrorResponseData {
  message: string[];
}

export const getErrorMessage = ({apiUrl, error} : {apiUrl: string, error: AxiosError}) => {
  const errorMessage: ErrorInterface = {
    apiUrl: apiUrl,
    errors: [],
  }
  if (error.response) {
    const responseData = error.response.data as AxiosErrorResponseData;
    errorMessage.errors = Array.isArray(responseData.message) ? responseData.message : [responseData.message || 'An error occurred'];
  } else {
    errorMessage.errors = [error.message || 'An unknown error occurred'];
  }
  return errorMessage
};

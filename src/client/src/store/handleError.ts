import {AxiosError} from "axios";
import {ErrorInterface} from "./previews/previewsSlice.ts";


export const getErrorMessage = ({apiUrl, error} : {apiUrl: string, error: AxiosError}) => {
  const errorMessage: ErrorInterface = {
    apiUrl: apiUrl,
    errors: [],
  }
  if (error.response) {
    errorMessage.errors = [error.response.data as never]
  } else {
    errorMessage.errors = [error.message || 'An unknown error occurred'];
  }
  return errorMessage
};

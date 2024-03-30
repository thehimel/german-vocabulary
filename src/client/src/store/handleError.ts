import {AxiosError} from "axios";


interface AxiosErrorResponseData {
  message: string;
}

export const getErrorMessage = ({apiUrl, error} : {apiUrl: string, error: AxiosError}) => {
  let errorMessage = {};
  if (error.response) {
    const responseData = error.response.data as AxiosErrorResponseData;
    errorMessage = responseData.message || {errors: ['An error occurred']};
  } else {
    errorMessage = error.message || {errors: ['An unknown error occurred']};
  }
  return {
    apiUrl: apiUrl,
    ...errorMessage
  }
};

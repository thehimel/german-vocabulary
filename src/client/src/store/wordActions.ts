import {WordActions} from "./wordSlice.ts";
import axios, {AxiosError} from "axios";
import {AppDispatch} from "./store.ts";
import {WORDS_API_URL} from "./constants.ts";
import {handleAxiosError} from "./handleError.ts";


export const fetchWords = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(WORDS_API_URL);
      dispatch(WordActions.updateWords(response.data));
    } catch (error) {
      const axiosError = error as AxiosError;
      handleAxiosError(axiosError, dispatch);
    }
  };
};

import {WordActions} from "./wordSlice.ts";
import axios from "axios";
import {AppDispatch} from "./store.ts";

export const fetchWords = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
    const response = await axios.get('/api/words/');
    if (!response.data) {
      throw new Error('Could not fetch cart data!');
    }
    return response.data;
  };

  try {
    const words = await fetchData();
    dispatch(
      WordActions.updateWords(words)
    );
  } catch (error) {
      WordActions.setError(error);
    }
  };
};

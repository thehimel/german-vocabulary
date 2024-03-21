import {WordActions} from "./WordSlice.ts";
import axios from "axios";
import {Dispatch} from "@reduxjs/toolkit";

export const fetchWords = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
    const response = await axios.get('/api/words/');
    if (!response.data) {
        throw new Error('Could not fetch cart data!');
      }
    return response;
  };

  try {
    const words = await fetchData();
    dispatch(
      WordActions.updateWords(words)
    );
  } catch (error) {
      console.log(error);
    }
  };
};

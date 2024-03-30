import axios, {AxiosError} from "axios";
import {PREVIEW_UPDATE_API_URL, PREVIEWS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
import {AppDispatch} from "../store.ts";
import {previewsActions} from "./previewsSlice.ts";


interface FetchPreviews {
  language: string,
  level: string,
  loader?: boolean,
  searchQuery?: string;
}


export interface CreatePreview {
  id: number;
  partOfSpeech: string;
  words: Record<string, string>[];
}

export const fetchPreviews = ({language, level, loader, searchQuery}: FetchPreviews) => {
  return async (dispatch: AppDispatch) => {
    const api_url = PREVIEWS_API_URL
    try {
      if (loader) {
        dispatch(previewsActions.setPreviewsLoading());
      }
      const params: Record<string, string> = {
        primary_language: language,
        level: level,
        ...(searchQuery ? { q: searchQuery } : {})
      };
      const response = await axios.get(api_url, {params: params});
      dispatch(previewsActions.setPreviews(response.data));
      dispatch(previewsActions.setPreviewsError(null));
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: api_url, error: error as AxiosError});
      dispatch(previewsActions.setPreviewsError(errorMessage));
    }
  };
};

export const createPreview = ({id, partOfSpeech, words}: CreatePreview) => {
  return async (dispatch: AppDispatch) => {
    const api_url = PREVIEW_UPDATE_API_URL.replace(':id', id.toString()); // Define your endpoint URL
    try {
      const data = {
        partOfSpeech,
        words,
      };
      const response = await axios.put(api_url, data);
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: api_url, error: error as AxiosError});
      dispatch(previewsActions.setPreviewsError(errorMessage));
    }
  };
};

import axios, {AxiosError} from "axios";
import {PREVIEWS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
import {AppDispatch} from "../store.ts";
import {previewsActions} from "./previewsSlice.ts";


export const fetchPreviews = ({language, level, loader, searchQuery}: {
  language: string,
  level: string,
  loader?: boolean,
  searchQuery?: string
}) => {
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

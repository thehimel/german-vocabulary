import axios, {AxiosError} from "axios";
import {getCookie} from "../../units/utils/utils.ts";
import {PREVIEW_CREATE_API_URL, PREVIEW_UPDATE_API_URL, PREVIEWS_API_URL} from "../constants.ts";
import {getErrorMessage} from "../handleError.ts";
import {AppDispatch} from "../store.ts";
import {ErrorInterface, previewsActions} from "./previewsSlice.ts";


interface FetchPreviews {
  language: string,
  level: string,
  loader?: boolean,
  searchQuery?: string;
}


export interface CreatePreview {
  id?: number;
  title: string;
  languageCode: string;
  partOfSpeech: string;
  level: string;
  article: string;
  plural: string;
  words: Record<string, string>[];
  fetchPreviewsParams: FetchPreviews;
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
      const errorMessage: ErrorInterface = getErrorMessage({apiUrl: api_url, error: error as AxiosError});
      dispatch(previewsActions.setPreviewsError(errorMessage));
    }
  };
};

export const setPreviewsMessage = ({message}: {message: string}) => {
  return async (dispatch: AppDispatch) => {
    dispatch(previewsActions.setPreviewsMessage(message));
  };
};

export const createPreview = (data: CreatePreview) => {
  return async (dispatch: AppDispatch) => {
    let api_url = ''
    let response = {data: {}};
    const headers = {
      'X-CSRFTOKEN': getCookie('csrftoken'),
      'Content-Type': 'application/json',
    }

    try {
      if (data.id) {
        api_url = PREVIEW_UPDATE_API_URL.replace(':id', data.id.toString());
        response = await axios.put(api_url, data, {headers: headers});
      } else {
        api_url = PREVIEW_CREATE_API_URL;
        response = await axios.post(api_url, data, {headers: headers});
      }
      dispatch(previewsActions.setPreviewsError(null));
      dispatch(fetchPreviews(data.fetchPreviewsParams));
      dispatch(previewsActions.setPreviewsMessage('Thanks for your contribution! The content will now be ' +
        'reviewed by the team!'));
      return response.data;
    } catch (error) {
      const errorMessage = getErrorMessage({apiUrl: api_url, error: error as AxiosError});
      dispatch(previewsActions.setPreviewsError(errorMessage));
    }
  };
};

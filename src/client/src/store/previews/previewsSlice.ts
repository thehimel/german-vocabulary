import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export interface ErrorInterface {
  apiUrl: string;
  errors: string[];
}

export interface PreviewsStateProps {
  previews: [];
  message: string | null;
  loading: boolean;
  error: ErrorInterface | null;
}

const initialState: PreviewsStateProps = {
  previews: [],
  message: '',
  loading: false,
  error: {
    apiUrl: '',
    errors: [],
  },
};

const previewsSlice = createSlice({
  name: slices.word,
  initialState,
  reducers: {
    setPreviewsLoading(state): void {
      state.loading = true;
    },
    setPreviews(state, action): void {
      state.previews = action.payload;
      state.loading = false;
    },
    setPreviewsMessage(state, action: {payload: string | null}): void {
      state.message = action.payload;
    },
    setPreviewsError(state, action: {payload: ErrorInterface | null}): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const previewsActions = previewsSlice.actions;
export const previewsReducer = previewsSlice.reducer;

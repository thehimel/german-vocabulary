import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";

export interface ErrorInterface {
  apiUrl: string;
  errors: string[];
}

export interface PreviewsStateProps {
  previews: [];
  loading: boolean;
  error: ErrorInterface | null;
}

const initialState: PreviewsStateProps = {
  previews: [],
  loading: false,
  error: null,
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
    setPreviewsError(state, action: {payload: ErrorInterface | null}): void {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const previewsActions = previewsSlice.actions;
export const previewsReducer = previewsSlice.reducer;

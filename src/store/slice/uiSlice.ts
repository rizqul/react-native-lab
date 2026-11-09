import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  error: string | null;
}

const initialState: uiState = {
  isLoading: false,
  isRefreshing: false,
  isLoadingMore: false,
  error: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
    setLoadingMore: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMore = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    cleanError: (state) => {
      state.error = null;
    },
    resetUiState: (state) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.isLoadingMore = false;
      state.error = null;
    },
  },
});

export const { setLoading, setRefreshing, setLoadingMore, setError, cleanError, resetUiState } = uiSlice.actions;

export default uiSlice.reducer;

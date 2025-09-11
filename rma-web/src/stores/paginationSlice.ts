import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  limit_start: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  limit_start: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setLimitStart: (state, action: PayloadAction<number>) => {
      state.limit_start = action.payload;
    },

    resetPagination: () => initialState,
  },
});

export const { setCurrentPage, setPageSize, setLimitStart, resetPagination } =
  paginationSlice.actions;

export const selectPagination = (state: RootState) => state.pagination;

export default paginationSlice.reducer;

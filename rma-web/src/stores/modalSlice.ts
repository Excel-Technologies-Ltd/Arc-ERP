import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ModalState {
  type: string;
  isOpen: boolean;
}

const initialState: ModalState = {
  type: '',
  isOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleModal: (state, action: PayloadAction<ModalState>) => {
      state.type = action.payload.type;
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { handleModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

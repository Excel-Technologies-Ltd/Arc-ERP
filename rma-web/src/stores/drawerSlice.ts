import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface DrawerState {
  type: string;
  isOpen: boolean;
}

const initialState: DrawerState = {
  type: '',
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    handleDrawer: (state, action: PayloadAction<DrawerState>) => {
      state.type = action.payload.type;
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { handleDrawer } = drawerSlice.actions;

export const selectDrawer = (state: RootState) => state.drawer;

export default drawerSlice.reducer;

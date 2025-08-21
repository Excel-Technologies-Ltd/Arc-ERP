import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { type Themes } from '@/stores/themeSlice';
import { icons } from '@/components/Base/Lucide';
import sideMenu from '@/main/side-menu';

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  badge?: number;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface MenuState {
  menu: Array<Menu | string>;
}

const initialState: MenuState = {
  menu: [],
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

export const selectMenu = (layout: Themes['layout']) => (state: RootState) => {
  return sideMenu;
};

export default menuSlice.reducer;

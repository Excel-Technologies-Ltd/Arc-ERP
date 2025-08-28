import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';
import colorSchemeReducer from './colorSchemeSlice';
import permissionReducer from './permissionSlice';
import modalReducer from './modalSlice';
import paginationReducer from './paginationSlice';
import drawerReducer from './drawerSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    colorScheme: colorSchemeReducer,
    permission: permissionReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    drawer: drawerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

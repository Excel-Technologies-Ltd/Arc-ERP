import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkModeReducer from './darkModeSlice';
import permissionReducer from './permissionSlice';
import modalReducer from './modalSlice';
import paginationReducer from './paginationSlice';
import drawerReducer from './drawerSlice';
import serialReducer from './serialSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    permission: permissionReducer,
    modal: modalReducer,
    pagination: paginationReducer,
    drawer: drawerReducer,
    serial: serialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface PermissionActions {
  read: boolean;
  write: boolean;
  create: boolean;
  delete: boolean;
  submit: boolean;
  cancel: boolean;
  amend: boolean;
  report: boolean;
  export: boolean;
  import: boolean;
  [key: string]: boolean; // Add this index signature
}

export interface PermissionsState {
  user: string;
  roles: string[];
  territory: string[];
  warehouse: string[];
  permissions: Record<string, PermissionActions>;
}

const initialState: PermissionsState = {
  user: '',
  roles: [],
  territory: [],
  warehouse: [],
  permissions: {},
};

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<PermissionsState>) => {
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.territory = action.payload.territory;
      state.warehouse = action.payload.warehouse;
      state.permissions = action.payload.permissions;
    },

    resetPermissions: (state) => {
      state.user = '';
      state.roles = [];
      state.territory = [];
      state.warehouse = [];
      state.permissions = {};
    },
  },
});

export const { setPermissions, resetPermissions } = permissionSlice.actions;

export const selectPermissions = (state: RootState) => state.permission;

export default permissionSlice.reducer;

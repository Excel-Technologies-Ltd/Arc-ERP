import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      localStorage.setItem('permissions', JSON.stringify(action.payload.permissions));
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('roles', JSON.stringify(action.payload.roles));
      localStorage.setItem('territory', JSON.stringify(action.payload.territory));
      localStorage.setItem('warehouse', JSON.stringify(action.payload.warehouse));
      state = action.payload;
    },

    resetPermissions: () => {
      localStorage.removeItem('permissions');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      localStorage.removeItem('territory');
      localStorage.removeItem('warehouse');
    },
  },
});

export const { setPermissions, resetPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;

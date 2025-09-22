import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { SerialItemType } from '@/types/pages/purchase';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface SerialState {
  serialTableData: SerialItemType[];
  inputValues: { [key: string]: string };
}

const initialState: SerialState = {
  serialTableData: [],
  inputValues: {},
};

const SerialSlice = createSlice({
  name: 'serial',
  initialState,
  reducers: {
    addSerials: (
      state,
      action: PayloadAction<{
        record: Pick<PurchaseInvoiceItem, 'item_name' | 'item_code' | 'name' | 'qty'>;
        quantity: number;
      }>
    ) => {
      const { record, quantity } = action.payload;
      const currentCount = state.serialTableData.filter(
        (serial) => serial.item_name === record.item_name
      ).length;

      const newSerials = Array.from({ length: quantity }, (_, i) => ({
        key: `${record.item_name}_${currentCount + i + 1}`,
        item_code: record.item_code || '',
        item_name: record.item_name,
        quantity: 1,
        warranty_date: new Date(),
        serials: '',
      }));

      state.serialTableData.push(...newSerials);
      state.inputValues[record.name] = '';
    },

    deleteSerialTableItem: (state, action: PayloadAction<string>) => {
      state.serialTableData = state.serialTableData.filter((item) => item.key !== action.payload);
    },

    updateSerialTableItem: (
      state,
      action: PayloadAction<{
        key: string;
        field: keyof SerialItemType;
        value: any;
      }>
    ) => {
      const { key, field, value } = action.payload;
      const itemIndex = state.serialTableData.findIndex((item) => item.key === key);
      if (itemIndex !== -1) {
        state.serialTableData[itemIndex] = {
          ...state.serialTableData[itemIndex],
          [field]: value,
        };
      }
    },

    updateInputValue: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      state.inputValues[name] = value;
    },

    clearAllSerialTableData: (state) => {
      state.serialTableData = [];
      state.inputValues = {};
    },

    resetInputValues: (state) => {
      state.inputValues = {};
    },
  },
});

export const {
  addSerials,
  deleteSerialTableItem,
  updateSerialTableItem,
  updateInputValue,
  clearAllSerialTableData,
  resetInputValues,
} = SerialSlice.actions;

// Fixed selectors with proper error handling
export const selectSerialTableData = (state: RootState) => state?.serial?.serialTableData || [];
export const selectInputValues = (state: RootState) => state?.serial?.inputValues || {};

// Get input value for specific item
export const selectInputValue = createSelector(
  [selectInputValues, (_: RootState, name: string) => name],
  (inputValues, name) => inputValues[name] || ''
);

export default SerialSlice.reducer;

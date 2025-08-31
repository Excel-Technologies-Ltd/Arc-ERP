import { Dayjs } from 'dayjs';

export type AddSalesFormData = {
  customer_name: string;
  posting_date: Dayjs | undefined;
  customer_address: string;
  warehouse_name: string;
  due_date: Dayjs | undefined;
  territory_name: string;
  remarks: string;
};

export interface AddSalesItemTableDataType {
  item_name: string;
  available_stock: number | string;
  quantity: number;
  rate: number;
  total: number;
}

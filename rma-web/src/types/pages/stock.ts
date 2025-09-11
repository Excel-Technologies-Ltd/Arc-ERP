import { StockEntryType } from '@/utils/enums';
import { Dayjs } from 'dayjs';

export type AddStockFormData = {
  territory_name: string;
  entry_type: StockEntryType;
  account_name: string;
  customer_name: string;
  posting_date: Dayjs | undefined;
  remarks: string;
  project_name: string;
  file: FileList | undefined;
  from_range: string;
  to_range: string;
  source_warehouse: string;
  target_warehouse: string;
  items: any[];
  transferSerials: any[];
};

export type StockEntryListFilterFormData = {
  stock_id: string;
  status: string;
  from_warehouse: string;
  to_warehouse: string;
  stock_entry_type: StockEntryType;
  date_range: [Dayjs, Dayjs];
};

export type StockSerialQuantityFilterFormData = {
  item_name: string;
  warehouse_name: string;
};

export type StockLadgerFilterFormData = {
  item_name: string;
  warehouse_name: string;
  voucher_no: string;
  item_group: string;
  voucher_type: string;
  brand_name: string;
  date_range: [Dayjs, Dayjs];
};

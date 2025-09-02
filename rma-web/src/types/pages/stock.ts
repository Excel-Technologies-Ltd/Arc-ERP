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
};

import { Dayjs } from 'dayjs';

export type AssignSerialFormData = {
  warehouse: string | undefined;
  date: Dayjs | undefined;
  file: FileList | undefined;
  fromRange: string;
  toRange: string;
};

export type PurchaseListFilterFormData = {
  invoice_number: string;
  status: string;
  supplier: string;
  date_range: [Dayjs, Dayjs];
};

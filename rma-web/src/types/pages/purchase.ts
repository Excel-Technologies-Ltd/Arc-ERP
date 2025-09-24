import { Dayjs } from 'dayjs';

export type AssignSerialFormData = {
  warehouse: string | undefined;
  date: Dayjs | undefined;
  file: FileList | undefined;
  fromRange: string;
  toRange: string;
  totalRangeValue: string;
};

export type PurchaseListFilterFormData = {
  invoice_number: string;
  status: string;
  supplier: string;
  date_range: [Dayjs, Dayjs] | null;
};

export interface DetailsItem {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  isLink?: boolean;
}

export interface DetailsCardProps {
  title?: string;
  items: DetailsItem[];
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  valueClassName?: string;
  border?: boolean;
}

export interface ProductDataType {
  key: string;
  item_code?: string;
  item_name: string;
  quantity: number;
  assigned: number;
  remaining: number;
  has_serial: boolean;
  warrenty_months: number;
}

export interface SerialItemType
  extends Pick<ProductDataType, 'key' | 'item_name' | 'quantity' | 'has_serial'> {
  item_code: string;
  warranty_date: Date;
  serials: string;
}

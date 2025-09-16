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

import { Dayjs } from 'dayjs';

export type CustomerBrandLimitLadgerFilterFormData = {
  customer_name: string;
  brand_name: string;
  doc_id: string;
  date_range: [Dayjs, Dayjs];
};

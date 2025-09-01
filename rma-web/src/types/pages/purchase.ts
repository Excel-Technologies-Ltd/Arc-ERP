import { Dayjs } from 'dayjs';

export type AssignSerialFormData = {
  warehouse: string | undefined;
  date: Dayjs | undefined;
  file: FileList | undefined;
  fromRange: string;
  toRange: string;
};

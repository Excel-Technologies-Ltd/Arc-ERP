import { Upload } from 'antd';

export const PURCHASE_SELECT_STATUS = [
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'submitted', label: 'Submitted' },
];

export const COMPANY_NAME = 'Excel technologies Limited';
export const UPLOAD_FILE_HEADER = ['item_name', 'serial_no', 'mac_no'];
export const ANT_UPLOAD_FILE_LIST_IGNORE = Upload.LIST_IGNORE;

export const PURCHASE_CUSTOM_STATUS = {
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  SUBMITTED: 'Submitted',
};

export const MODAL_TYPE = {
  DOWNLOAD_DELIVERED_CSV: 'download-delivered-csv',
  PURCHASE_SERIAL_RESET: 'purchase_serial_reset',
};

import { Dayjs } from 'dayjs';

export type SerialListSearchFilterFormData = {
  serial_no: string;
  item_name: string;
  warehouse: string;
  brand_name: string;
  mac_address: string;
  date_range: [Dayjs, Dayjs];
  is_sold: boolean;
  is_purchase: boolean;
};

export interface SerialNoDataType {
  _id: string;
  serial_no: string;
  item_code: string;
  item_name: string;
  purchase_time: string;
  warehouse: string;
  purchase_date: string;
  purchase_rate: number;
  supplier: string;
  purchase_document_type: string;
  purchase_invoice_name: string;
  warranty: WarrantyType;
  purchase_document_no: string;
  brand: string;
  mac_no: string;
  customer: string;
  delivery_note: string;
  sales_invoice_name: string;
}

export interface SerialNoHistoryType {
  eventDate: string;
  eventType: string;
  serial_no: string;
  mac_no: any;
  brand: string;
  document_no: string;
  transaction_from: string;
  transaction_to: string;
  document_type: string;
  parent_document: string;
  created_on: string;
  created_by: string;
  item_code: string;
  item_name: string;
}

export interface WarrantyType {
  purchaseWarrantyDate: string | Date;
  purchasedOn: string;
  salesWarrantyDate: string | Date;
  soldOn: string;
}

export type SerialListSearchMongoQueryFilterTypes = {
  serial_no?: string;
  item_code?: string;
  warehouse?: string;
  mac_no?: string;
  brand?: string;
  purchase_date?: string;
  sales_invoice_name?: string;
  delivery_note?: string;
  customer?: string;

  purchase_document_no?: string;
  purchase_invoice_name?: string;
};

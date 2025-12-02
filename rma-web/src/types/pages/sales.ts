import { Dayjs } from 'dayjs';
import { Customer } from '../Selling/Customer';
import { SalesInvoice } from '../Accounts/SalesInvoice';
import { SalesTaxesandCharges } from '../Accounts/SalesTaxesandCharges';

export interface AddSalesItemTableDataType {
  item_name?: string;
  available_stock: number | string;
  quantity?: number;
  rate?: number;
  total?: number;
}

export interface AddSalesTaxesAndChargesTableDataType extends Partial<SalesTaxesandCharges> {
  sl: number;
}

export type AddSalesFormData = {
  customer_name: string;
  posting_date: Dayjs | undefined;
  customer_address: string;
  warehouse_name: string;
  due_date: Dayjs | undefined;
  territory_name: string;
  remarks: string;
  customer_details: Customer | undefined;
  remaining_balance: number;

  // Aditional Details
  customer_mfs_name: string;
  project_name: string;
  customer_purchase_order: string;
  customer_purchase_order_date: Dayjs | undefined;
  invoice_type: SalesInvoice['excel_invoice_type'];
  hand_over_date: Dayjs | undefined;
};

export interface SalesInvoiceListFilterFormData {
  invoice_number: string;
  customer_name: string;
  territory_name: string;
  sales_person_name: string;
  status: string;
  date_range: [Dayjs, Dayjs];
}

export interface StockAvailabilityListFilterFormData {
  item_name: string;
  warehouse_name: string;
  item_group: string;
  brand_name: string;
}

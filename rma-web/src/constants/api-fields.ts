import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';

export const PURCHASE_INVOICE_LIST_FIELDS: (keyof PurchaseInvoice)[] = [
  'name',
  'status',
  'supplier',
  'posting_date',
  'total',
  'supplier_name',
  'creation',
  'owner',
  'total_qty',
  'custom_excel_status',
];

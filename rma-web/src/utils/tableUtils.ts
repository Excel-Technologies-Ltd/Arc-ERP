import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { TableColumn, TableRowData } from '@/types/Table/table-types';

// Function to transform cell data with render function support
export const transformCellData = <T extends Record<string, any>>(
  item: T,
  header: TableColumn<T>,
  index: number
): TableRowData => {
  let content: string | number | JSX.Element;

  if (header.render) {
    // Use the render function if provided
    const cellValue = item[header.key as keyof T];
    content = header.render(cellValue, item, index);
  } else {
    // Default behavior - use the key to get the value
    content = (item[header.key as keyof T] as string | number) || '-';
  }

  return {
    title: content,
    width: header.width,
  };
};

// Function to get the color of the status
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Cancelled':
      return 'red';
    case 'Completed':
      return 'green';
    default:
      return 'blue';
  }
};

// Function to get the text of the status
export const getStatusText = (status: string) => {
  switch (status) {
    case 'Cancelled':
      return 'Cancelled';
    case 'Completed':
      return 'Completed';
    default:
      return 'Submitted';
  }
};

// Function to get the progress of the purchase invoice
export const getProgress = (total_qty: number, receipt_data: PurchaseInvoice['receipt_data']) => {
  const total_receipt_qty = receipt_data?.reduce((acc, curr) => acc + curr.qty, 0);
  const progress = (total_receipt_qty ?? 0) / (total_qty ?? 0);
  return progress;
};

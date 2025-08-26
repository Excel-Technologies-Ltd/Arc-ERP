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

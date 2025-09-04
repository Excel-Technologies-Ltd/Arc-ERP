export interface TableColumn<T> {
  key: string;
  title: string | JSX.Element;
  width?: string;
  render?: (text: string | number, record: T, index: number) => JSX.Element | string | number;
}

export interface TableRowData {
  title: string | number | JSX.Element;
  width?: string;
}

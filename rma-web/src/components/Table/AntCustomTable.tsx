import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';

export type DataTableProps<T extends object> = {
  columns: TableColumnsType<T>;
  data?: T[];
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  onChange?: TableProps<T>['onChange'];
  size?: TableProps<T>['size'];
  scroll?: TableProps<T>['scroll'];
  bordered?: boolean;
  emptyText?: React.ReactNode;
  title?: TableProps<T>['title'];
  footer?: TableProps<T>['footer'];
};

const AntCustomTable = <T extends object>({
  columns,
  data = [],
  loading = false,
  pagination,
  onChange,
  size = 'middle',
  scroll,
  bordered = false,
  emptyText,
  title,
  footer,
}: DataTableProps<T>) => {
  return (
    <>
      <Table<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
        size={size}
        scroll={scroll}
        bordered={bordered}
        locale={{ emptyText: emptyText ?? undefined }}
        title={title}
        footer={footer}
      />
    </>
  );
};

export default AntCustomTable;

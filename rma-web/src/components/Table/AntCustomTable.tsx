import { Table } from 'antd';
import type { TableProps } from 'antd';

export interface DataTableProps<T> extends TableProps<T> {
  data?: T[];
  emptyText?: React.ReactNode;
}

const AntCustomTable = <T extends object>(props: DataTableProps<T>) => {
  const { columns, data = [], loading = false, size = 'middle', emptyText, ...rest } = props;
  return (
    <>
      <Table<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        size={size}
        locale={{ emptyText: emptyText ?? undefined }}
        {...rest}
      />
    </>
  );
};

export default AntCustomTable;

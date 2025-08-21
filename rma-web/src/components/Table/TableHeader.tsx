import { TableColumn } from '@/types/Table/table-types';
import Table from '../Base/Table';

interface TableHeaderProps<T> {
  headers: TableColumn<T>[];
  action?: boolean;
}

const TableHeader = <T,>({ headers, action }: TableHeaderProps<T>) => {
  return (
    <Table.Thead>
      <Table.Tr>
        {headers.map((header, index) => (
          <Table.Th
            key={header.key || index}
            style={{ width: header.width }}
            className='border-b-0 whitespace-nowrap'
          >
            {header.title}
          </Table.Th>
        ))}
        {action && <Table.Th className='border-b-0 whitespace-nowrap'>Action</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHeader;

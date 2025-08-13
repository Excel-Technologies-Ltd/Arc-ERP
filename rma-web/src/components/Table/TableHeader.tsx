import Table from '../Base/Table';

interface Header {
  title: string;
  width?: string;
}

interface TableHeaderProps {
  headers: Header[];
  action?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers, action }) => {
  return (
    <Table.Thead>
      <Table.Tr>
        {headers.map((header, index) => (
          <Table.Th
            key={index}
            style={{ width: header.width }}
            className='px-4 py-2 text-left text-gray-700 dark:text-white font-semibold'
          >
            {header.title}
          </Table.Th>
        ))}
        {action && (
          <Table.Th className='px-4 py-2 text-gray-700 dark:text-white font-semibold text-center'>
            Action
          </Table.Th>
        )}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHeader;

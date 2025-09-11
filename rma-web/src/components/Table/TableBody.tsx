import { TableRowData } from '@/types/Table/table-types';
import Table from '../Base/Table';

interface TableBodyProps {
  data: TableRowData[];
}

const TableBody = ({ data }: TableBodyProps) => {
  return (
    <Table.Tr className={`intro-x`}>
      {data.map((cell, i) => (
        <Table.Td
          key={i}
          style={{ width: cell?.width }}
          className={`box whitespace-wrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600`}
        >
          {cell?.title}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableBody;

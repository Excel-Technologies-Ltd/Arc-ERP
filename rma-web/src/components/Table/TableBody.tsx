import Table from '../Base/Table';

// Table Body data Type
interface BodyData {
  title: string | number | JSX.Element;
  width: string;
}

// Table Body component props
interface TableBodyPropType {
  data: BodyData[];
}

const TableBody = ({ data }: TableBodyPropType) => {
  return (
    <Table.Tr className={`intro-x border-none`}>
      {data.map((cell, i) => (
        <Table.Td key={i} style={{ width: cell?.width }} className={``}>
          {cell?.title}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableBody;

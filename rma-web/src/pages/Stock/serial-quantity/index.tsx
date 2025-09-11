import AntButton from '@/components/Base/Button/AntButton';
import CustomTable from '@/components/Table/CustomTable';
import { StockSerialFilterForm, StockSerialTableColumn } from '@/features/stock';
import { StockSerialQuantityFilterFormData } from '@/types/pages/stock';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const SerialQuantity = () => {
  const { control, reset } = useForm<StockSerialQuantityFilterFormData>({
    mode: 'onChange',
  });

  // Table Columns
  const Column = StockSerialTableColumn();

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Serial Quantity</h2>
        <StockSerialFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />}>Search</AntButton>
          <AntButton icon={<CloudDownloadOutlined />}>Download CSV</AntButton>
          <AntButton
            onClick={() => {
              reset();
            }}
            icon={<ClearOutlined />}
          >
            Clear
          </AntButton>
        </div>
      </div>

      {/* Table */}
      <div className='mt-5'>
        <CustomTable<any>
          data={
            Array.from({ length: 8 }, (_, index) => ({
              item_name: `Item Name ${index + 1}`,
              item_code: `Item Code ${index + 1}`,
              warehouse: `Warehouse ${index + 1}`,
              serial_quantity: parseInt((Math.random() * 100).toString()),
            })) as any
          }
          tableHeader={Column || []}
          loading={false}
          totalItems={10}
        />
      </div>
    </>
  );
};

export default SerialQuantity;

import AntCustomTable from '@/components/Table/AntCustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import {
  PurchaseDetailsProductTableColumns,
  PurchaseDetailsSerialTableColumns,
} from '@/features/purchase';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { AssignSerialFormData, SerialItemType } from '@/types/pages/purchase';
import { selectSerialTableData } from '@/stores/serialSlice';
import { useAppSelector } from '@/stores/hooks';
import { Control, UseFormSetValue } from 'react-hook-form';

const PurchaseDetailsSerialTables = ({
  data,
  control,
  setValue,
}: {
  data: PurchaseInvoice | undefined;
  control: Control<AssignSerialFormData>;
  setValue: UseFormSetValue<AssignSerialFormData>;
}) => {
  const serialTableData = useAppSelector(selectSerialTableData);

  // Table Columns - No props needed!
  const ProductTableColumns = PurchaseDetailsProductTableColumns(control, setValue);
  const SerialTableColumns = PurchaseDetailsSerialTableColumns();

  return (
    <>
      <div className='w-full'>
        <AntCustomTable<PurchaseInvoiceItem>
          columns={ProductTableColumns}
          data={data?.items.map((item, index) => ({ ...item, key: `${index}` })) || []}
          title={() => <div className='text-lg font-bold text-center'>Product Items</div>}
        />
      </div>

      <div className='mt-5 w-full'>
        <AntCustomTable<SerialItemType>
          columns={SerialTableColumns}
          data={serialTableData}
          title={() => (
            <div className='flex justify-between items-center'>
              <div className='text-lg font-bold text-center flex-1'>Serial Items</div>
              <div className='text-sm text-gray-500'>Total Items: {serialTableData.length}</div>
            </div>
          )}
          size='small'
        />
      </div>
    </>
  );
};

export default PurchaseDetailsSerialTables;

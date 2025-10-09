import AntCustomTable from '@/components/Table/AntCustomTable';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import {
  PurchaseDetailsProductTableColumns,
  PurchaseDetailsSerialTableColumns,
} from '@/features/purchase';
import { PurchaseInvoiceItem } from '@/types/Accounts/PurchaseInvoiceItem';
import { AssignSerialFormData, SerialItemType } from '@/types/pages/purchase';
import { clearAllSerialTableData, selectSerialTableData } from '@/stores/serialSlice';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { Control, UseFormSetValue } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PurchaseDetailsSerialTables = ({
  data,
  control,
  setValue,
}: {
  data: PurchaseInvoice | undefined;
  control: Control<AssignSerialFormData>;
  setValue: UseFormSetValue<AssignSerialFormData>;
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Selectors
  const serialTableData = useAppSelector(selectSerialTableData);

  // Clear all serial table data when location changes
  useEffect(() => {
    dispatch(clearAllSerialTableData());
  }, [location.pathname, dispatch]);

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

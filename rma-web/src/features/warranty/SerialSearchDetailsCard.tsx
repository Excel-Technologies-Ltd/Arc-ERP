import { SerialNoDataType } from '@/types/pages/warranty';
import { Spin } from 'antd';

export const SerialSearchDetailsCard = ({
  data,
  loading,
}: {
  data: SerialNoDataType | undefined;
  loading: boolean;
}) => {
  const items = [
    {
      label: 'Serial Number',
      value: data?.serial_no ?? 'N/A',
    },
    {
      label: 'Supplier',
      value: data?.supplier ?? 'N/A',
    },
    {
      label: 'Item Name',
      value: data?.item_name ?? 'N/A',
    },
    {
      label: 'Item Code',
      value: data?.item_code ?? 'N/A',
    },
    {
      label: 'Purchase Receipt',
      value: data?.purchase_document_no ?? 'N/A',
    },
    {
      label: 'Delivery Note',
      value: data?.delivery_note ?? 'N/A',
    },
    {
      label: 'Customer',
      value: data?.customer ?? 'N/A',
    },
    {
      label: 'Warehouse',
      value: data?.warehouse ?? 'N/A',
    },
  ];
  return (
    <>
      {/* Details Card */}
      <Spin spinning={loading}>
        <div className='bg-white rounded-lg border border-gray-200 overflow-hidden mt-3'>
          {/* Grid Layout */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-0'>
            {items.map((item, index) => (
              <div
                key={index}
                className='px-3 py-2 border-b border-r border-gray-200 last:border-r-0 sm:odd:border-r lg:border-r hover:bg-gray-50 transition-colors'
              >
                <dt className='text-sm text-primary'>{item.label}</dt>
                <dd className='text-base font-normal text-black break-words'>{item.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </>
  );
};

import { DetailsItem } from '@/types/pages/purchase';
import { LiaFileInvoiceSolid } from '@/components/Base/Icons';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { Tag } from 'antd';
import { DetailsCard } from '@/components/Cards';

export const PurchaseDetailsCard = ({ data }: { data: PurchaseInvoice }) => {
  const cardItems: DetailsItem[] = [
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Invoice',
      value: data.name || 'N/A',
      isLink: true,
    },
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Order',
      value: data.items[0]?.purchase_order || 'N/A',
      isLink: true,
    },
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Supplier',
      value: data.supplier_name || 'N/A',
    },
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Posting Date',
      value: data.posting_date || 'N/A',
    },
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Warehouse',
      value: data.set_warehouse || 'N/A',
    },
    {
      icon: <LiaFileInvoiceSolid className='text-slate-500' />,
      label: 'Status',
      value: <Tag color='blue'>{data.status || 'Unknown'}</Tag>,
    },
  ];
  return (
    <>
      <DetailsCard title='Purchase Details' items={cardItems} />
    </>
  );
};

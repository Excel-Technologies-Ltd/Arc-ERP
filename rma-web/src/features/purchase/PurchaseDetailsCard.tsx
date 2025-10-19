import { DetailsItem } from '@/types/pages/purchase';
import { LiaFileInvoiceSolid } from '@/components/Base/Icons';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { Tag } from 'antd';
import { DetailsCard } from '@/components/Cards';
import { getStatusColor, getStatusText } from '@/utils/tableUtils';

export const PurchaseDetailsCard = ({ data }: { data: PurchaseInvoice }) => {
  // Make Color for Status
  const statusColor = getStatusColor(data.custom_excel_status.toString());
  const statusText = getStatusText(data.custom_excel_status.toString());

  // Card Items
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
      value: <Tag color={statusColor}>{statusText || 'Unknown'}</Tag>,
    },
  ];
  return (
    <>
      <DetailsCard title='Purchase Details' items={cardItems} />
    </>
  );
};

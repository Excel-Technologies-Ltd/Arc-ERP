import { DetailsItem } from '@/types/pages/purchase';
import { PurchaseInvoice } from '@/types/Accounts/PurchaseInvoice';
import { Tag } from 'antd';
import { DetailsCard } from '@/components/Cards';
import { getStatusColor, getStatusText } from '@/utils/tableUtils';
import { TbInvoice } from 'react-icons/tb';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { FaRegUser } from 'react-icons/fa';
import { CgCalendarDates } from 'react-icons/cg';
import { MdOutlineWarehouse } from 'react-icons/md';
import { BiSolidEdit } from 'react-icons/bi';

export const PurchaseDetailsCard = ({ data }: { data: PurchaseInvoice }) => {
  // Make Color for Status
  const statusColor = getStatusColor(data.custom_excel_status.toString());
  const statusText = getStatusText(data.custom_excel_status.toString());

  // Card Items
  const cardItems: DetailsItem[] = [
    {
      icon: <TbInvoice />,
      label: 'Order No',
      value: data.items[0]?.purchase_order || 'N/A',
      isLink: true,
    },
    {
      icon: <FaRegUser />,
      label: 'Supplier Name',
      value: data.supplier_name || 'N/A',
    },
    {
      icon: <CgCalendarDates />,
      label: 'Posting Date',
      value: data.posting_date || 'N/A',
    },
    {
      icon: <MdOutlineWarehouse />,
      label: 'Warehouse Name',
      value: data.set_warehouse || 'N/A',
    },
    {
      icon: <BiSolidEdit />,
      label: 'Status',
      value: <Tag color={statusColor}>{statusText || 'Unknown'}</Tag>,
    },
  ];
  return (
    <>
      <DetailsCard
        title={data.name || 'N/A'}
        titleIcon={<LiaFileInvoiceSolid className='text-primary' />}
        items={cardItems}
      />
    </>
  );
};

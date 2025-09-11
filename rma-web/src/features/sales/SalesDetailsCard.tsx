import { LiaFileInvoiceSolid } from '@/components/Base/Icons';
import { Flex, Tag } from 'antd';

const SalesDetailsCard = () => {
  return (
    <>
      <div className='p-5 rounded-md box'>
        <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
          <div className='text-base font-medium truncate'>Purchase Details</div>
        </div>
        <div className='flex items-center'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Invoice:
          <span className='ml-1 underline decoration-dotted'>Name</span>
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Posting Date: Date
        </div>

        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Territory: Territory Name
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Customer: Customer Name
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Warehouse: Warehouse Name
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Remarks: Remarks
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          Due Date: Due Date
        </div>
        <div className='flex items-center mt-3'>
          <LiaFileInvoiceSolid className='w-4 h-4 mr-2 text-slate-500' />
          <span className='mr-2'>Status:</span>
          <Flex gap='4px 0' wrap>
            <Tag color='blue'>Status</Tag>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default SalesDetailsCard;

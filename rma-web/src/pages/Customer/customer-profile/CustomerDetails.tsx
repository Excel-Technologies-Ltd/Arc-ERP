import { BrandWiseAllocations } from '@/types/ExcelERPNext/BrandWiseAllocations';
import { Customer } from '@/types/Selling/Customer';
import { formatCurrency } from '@/utils/helper';

type CustomerType = {
  customerDocument: Customer | undefined;
};

const CustomerDetails = ({ customerDocument }: CustomerType) => {
  return (
    <>
      <div className='bg-white dark:bg-darkmode rounded-lg'>
        <div className='flex justify-between items-center my-4'>
          <div className='text-lg font-semibold'>
            Total Remaining Balance:{' '}
            <span className='text-lg font-bold'>
              {formatCurrency(customerDocument?.excel_remaining_balance || 0)}
            </span>
          </div>
          <div className='text-lg font-semibold'>
            Brand Wise Allocated Limit:{' '}
            <span className='text-lg font-bold'>
              {formatCurrency(
                customerDocument?.custom_brand_wise_allocations?.reduce(
                  (acc, item) => acc + item.limit,
                  0
                ) || 0
              )}
            </span>
          </div>
        </div>

        <div className='overflow-x-auto rounded-lg border'>
          <table className='min-w-full table-auto'>
            <thead className='bg-primary text-white'>
              <tr>
                <th className='px-6 py-3 text-left'>Brand Name</th>
                <th className='px-6 py-3 text-left'>Limit Amount</th>
              </tr>
            </thead>
            <tbody className='bg-gray-50'>
              {customerDocument?.custom_brand_wise_allocations?.map(
                (item: BrandWiseAllocations) => (
                  <tr key={item.name}>
                    <td className='px-6 py-4 text-left'>{item.brand}</td>
                    <td className='px-6 py-4 text-left'>{formatCurrency(item.limit)}</td>
                  </tr>
                )
              )}
              <tr>
                <td className='px-6 py-4 text-left'>Others</td>
                <td className='px-6 py-4 text-left'>
                  {formatCurrency(customerDocument?.custom_other_brands_limit || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;

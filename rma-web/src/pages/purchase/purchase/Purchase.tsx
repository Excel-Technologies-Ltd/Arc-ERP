import { useState } from 'react';
import Button from '@/components/Base/Button';
import Table from '@/components/Base/Table';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntRangePicker from '@/components/Base/DatePicker/AntRangePicker';
import { getPurchaseInvoiceList, getSupplierList } from '@/services/purchase/purchase';
import { Link } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import { PURCHASE_SELECT_STATUS } from '@/constants/app-strings';
import AntSpin from '@/components/Base/Spin/AntSpin';
import AntEmpty from '@/components/Empty/Empty';
import AntPagination from '@/components/Pagination/AntPagination';
import { Progress } from 'antd';

const Purchase = () => {
  const [supplierSearch, setSupplierSearch] = useState<string | null>(null);

  // Filter
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  // API Call to get suppliers based on search
  const { data: suppliers, isLoading: isLoadingSuppliers } = getSupplierList(supplierSearch);
  const { data: purchaseInvoices, isLoading: isLoadingPurchaseInvoices } = getPurchaseInvoiceList({
    purchase_invoice_number: purchaseInvoiceNumber ?? '',
    status: status ?? '',
    supplier: supplier ?? '',
  });

  const handleClear = () => {
    setPurchaseInvoiceNumber(null);
    setStatus(null);
    setSupplier(null);
    setDateRange(null);
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        {/* Filter Options */}
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y xl:flex-nowrap gap-3'>
          <h2 className='text-lg font-medium intro-y whitespace-nowrap'>Purchase List</h2>
          <div className='flex w-full gap-2 flex-wrap lg:flex-nowrap'>
            <AntInput
              placeholder='Purchase Invoice Number'
              type='text'
              onChange={(e) => setPurchaseInvoiceNumber(e.target.value)}
              value={purchaseInvoiceNumber ?? ''}
            />
            <AntSelect
              placeholder='Status'
              value={status ?? undefined}
              onChange={(value) => setStatus(value)}
              options={PURCHASE_SELECT_STATUS}
              showSearch={false}
            />
            <AntSelect
              placeholder='Select Supplier'
              value={supplier ?? undefined}
              onChange={(value) => {
                setSupplier(value);
                setSupplierSearch(null);
              }}
              onSearch={(value) => setSupplierSearch(value)}
              loading={isLoadingSuppliers}
              options={suppliers?.map((s) => ({
                value: s.name,
                label: s.supplier_name,
              }))}
              notFoundText='No Supplier Found'
            />
            {/* <DatePicker.RangePicker allowClear={true} size='large' className='w-full' /> */}
            <AntRangePicker
              allowClear={true}
              value={dateRange}
              size='large'
              placeholder={['Start Date', 'End Date']}
              onChange={(value) => setDateRange(value as [Dayjs, Dayjs])}
            />
            <div className='flex items-center gap-2'>
              <Button variant='outline-primary'>Search</Button>
              <Button onClick={handleClear} variant='outline-primary'>
                Clear
              </Button>
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className='col-span-12 overflow-auto intro-y 2xl:overflow-visible'>
          <AntSpin isLoading={isLoadingPurchaseInvoices} tip='Loading'>
            <Table className='border-spacing-y-[10px] border-separate'>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className='border-b-0 whitespace-nowrap'>SL</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>INVOICE NO</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>STATUS</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>PROGRESS</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>POSTING DATE</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>SUPPLIER</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap text-right'>TOTAL</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap text-center'>
                    CREATED BY
                  </Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap text-center'>
                    DELIVERED BY
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {purchaseInvoices?.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={12}>
                      <AntEmpty description='No data found' />
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  <>
                    {purchaseInvoices?.map((invoice, index) => (
                      <Table.Tr key={index} className='intro-x'>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          {index + 1}
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <Link
                            to={`view-purchase-invoice/${invoice.name}`}
                            className='underline decoration-dotted whitespace-nowrap'
                          >
                            {invoice.name}
                          </Link>
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <span className='text-orange-600'>{invoice.status}</span>
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <Progress percent={50} showInfo={false} size='small' status='active' />
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          {invoice.posting_date}
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          {invoice.supplier_name}
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 text-right'>
                          {invoice?.total?.toLocaleString()}
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 text-center'>
                          {invoice.owner}
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 text-center'>
                          {invoice.modified_by}
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </>
                )}
              </Table.Tbody>
            </Table>
          </AntSpin>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className='flex flex-wrap justify-between items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap'>
          <div className='hidden xl:block text-slate-500'>Showing 1 to 10 of 150 entries</div>
          <AntPagination totalItems={150} />
        </div>
        {/* END: Pagination */}
      </div>
    </>
  );
};

export default Purchase;

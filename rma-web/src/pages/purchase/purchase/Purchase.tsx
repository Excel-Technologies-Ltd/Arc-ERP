import _ from 'lodash';
import { useState } from 'react';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import { FormSelect } from '@/components/Base/Form';
import Lucide from '@/components/Base/Lucide';
import Table from '@/components/Base/Table';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import AntRangePicker from '@/components/DatePicker/AntRangePicker';
import { getPurchaseInvoiceList, getSupplierList } from '@/services/purchase/purchase';
import { Link } from 'react-router-dom';
import type { Dayjs } from 'dayjs';
import { PURCHASE_SELECT_STATUS } from '@/constants/app-strings';
import AntSpin from '@/components/Spin/AntSpin';
import AntEmpty from '@/components/Empty/Empty';
import AntPagination from '@/components/Pagination/AntPagination';

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
                        <Table.Td className='box w-40 whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <Link
                            to={`view-purchase-invoice/${invoice.name}`}
                            className='underline decoration-dotted whitespace-nowrap'
                          >
                            {invoice.name}
                          </Link>
                        </Table.Td>
                        <Table.Td className='box w-40 whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <a href='' className='font-medium whitespace-nowrap'>
                            {invoice.status}
                          </a>
                        </Table.Td>
                        <Table.Td className='box whitespace-nowrap rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          {invoice.status}
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
          {/* <Pagination className='w-full sm:w-auto'>
            <Pagination.Link>
              <Lucide icon='ChevronsLeft' className='w-4 h-4' />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon='ChevronLeft' className='w-4 h-4' />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon='ChevronRight' className='w-4 h-4' />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon='ChevronsRight' className='w-4 h-4' />
            </Pagination.Link>
          </Pagination>

          <FormSelect className='w-20 !box sm:mt-0'>
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect> */}
        </div>
        {/* END: Pagination */}
      </div>
    </>
  );
};

export default Purchase;

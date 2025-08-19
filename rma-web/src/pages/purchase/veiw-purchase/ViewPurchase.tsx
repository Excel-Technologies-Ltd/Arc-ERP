import { useParams } from 'react-router-dom';
import { getPurchaseInvoiceDetails } from '@/services/purchase/purchase';
import _ from 'lodash';
import fakerData from '@/utils/faker';
import Button from '@/components/Base/Button';
import Lucide from '@/components/Base/Lucide';
import Table from '@/components/Base/Table';
import { Tag, Flex, Upload, Button as AntButton } from 'antd';
import { CheckCircleOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { RenderController } from '@/lib/hook-form/RenderController';
import AntSelect from '@/components/Base/Form/FormSelect/AntSelect';
import { getWarehouseList } from '@/services/common/commonApi';
import AntDatePicker from '@/components/DatePicker/AntDatePicker';
import AntInput from '@/components/Base/Form/FormInput/AntInput';
import dayjs from 'dayjs';
import Serials from './serials/Serials';

type FormData = {
  warehouse: string | undefined;
  date: string;
  file: FileList | undefined;
  fromRange: string;
  toRange: string;
};

const ViewPurchase = () => {
  const { invoice_number } = useParams();
  // Api Call
  const { data: warehouseList, isLoading: isLoadingWarehouses } = getWarehouseList();
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');

  // From Handel
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      warehouse: undefined,
      date: undefined,
      file: undefined,
      fromRange: '',
      toRange: '',
    },
  });

  const [from, to] = watch(['fromRange', 'toRange']);
  const total = from && to && +from <= +to ? +to - +from + 1 : 0;

  return (
    <>
      <div className='flex flex-col items-center mt-8 intro-y sm:flex-row'>
        <h2 className='mr-auto text-lg font-medium'>Transaction Details</h2>
        <div className='flex w-full mt-4 sm:w-auto sm:mt-0'>
          <Button variant='primary' className='mr-2 shadow-md'>
            Submit
          </Button>
        </div>
      </div>
      {/* BEGIN: Transaction Details */}
      <div className='grid grid-cols-11 gap-5 mt-5'>
        <div className='col-span-12 lg:col-span-4 2xl:col-span-3 intro-y'>
          {/* Purchase Details Box */}
          <div className='p-5 rounded-md box'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Purchase Details</div>
            </div>
            <div className='flex items-center'>
              <Lucide icon='Clipboard' className='w-4 h-4 mr-2 text-slate-500' />
              Invoice:
              <a href='' className='ml-1 underline decoration-dotted'>
                PINV-2025-00012
              </a>
            </div>
            <div className='flex items-center mt-3'>
              <Lucide icon='Clipboard' className='w-4 h-4 mr-2 text-slate-500' />
              Order:
              <a href='' className='ml-1 underline decoration-dotted'>
                PO-2025-00019
              </a>
            </div>

            <div className='flex items-center mt-3'>
              <Lucide icon='Calendar' className='w-4 h-4 mr-2 text-slate-500' />
              Supplier: Md Arif Jahan
            </div>
            <div className='flex items-center mt-3'>
              <Lucide icon='Calendar' className='w-4 h-4 mr-2 text-slate-500' />
              Posting Date: 24 March 2022
            </div>
            <div className='flex items-center mt-3'>
              <Lucide icon='MapPin' className='w-4 h-4 mr-2 text-slate-500' />
              Warehouse: Ho Current Warehouse.
            </div>
            <div className='flex items-center mt-3'>
              <Lucide icon='Clock' className='w-4 h-4 mr-2 text-slate-500' />
              <span className='mr-2'>Status:</span>
              <Flex gap='4px 0' wrap>
                <Tag icon={<CheckCircleOutlined />} color='green'>
                  success
                </Tag>
                <Tag icon={<SyncOutlined spin />} color='processing'>
                  processing
                </Tag>
              </Flex>
            </div>
          </div>
          {/* Serial Details Box */}
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Assign</div>
            </div>
            <div className='space-y-4 w-full'>
              {RenderController<FormData>(
                control,
                'warehouse',
                <AntSelect
                  placeholder='Select Warehouse'
                  options={warehouseList?.map((w) => ({ value: w.name, label: w.warehouse_name }))}
                  loading={isLoadingWarehouses}
                  showSearch={false}
                  notFoundText='No Warehouse Found'
                  size='middle'
                />
              )}

              {RenderController<FormData>(
                control,
                'date',
                <AntDatePicker placeholder='Select Date' size='middle' />
              )}
              {RenderController<FormData>(
                control,
                'file',
                <div>
                  <Upload
                    maxCount={1}
                    style={{
                      width: '100%',
                    }}
                    beforeUpload={(file) => {
                      console.log('Uploaded file:', file);
                      // Return false to prevent default upload behavior
                      return false;
                    }}
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        console.log('File uploaded successfully:', info.file);
                      }
                    }}
                  >
                    <AntButton
                      style={{
                        color: 'gray',
                        width: '100%',
                      }}
                      icon={<UploadOutlined />}
                    >
                      Upload Your File
                    </AntButton>
                  </Upload>
                </div>
              )}
              {RenderController<FormData>(
                control,
                'fromRange',
                <AntInput type='number' placeholder='From Range' size='middle' />
              )}
              {RenderController<FormData>(
                control,
                'toRange',
                <AntInput type='number' placeholder='To Range' size='middle' />
              )}
              <p className='text-lg text-primary'>Total : {total}</p>
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-7 2xl:col-span-8 intro-x'>
          <Serials data={purchaseInvoiceDetails} />
          <div className='p-5 rounded-md box mt-10'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Purchase Items</div>
            </div>
            <div className='-mt-3 overflow-auto lg:overflow-visible'>
              <Table striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className='whitespace-nowrap'>Item Name</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Quantity</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Assigned</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Remaining</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Has Serial</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Warrenty Month</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Add Serial</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <Table.Tr key={fakerKey}>
                      <Table.Td className=''>
                        <div className='flex items-center'>
                          <span className='font-medium whitespace-nowrap'>
                            {faker.products[0].name}
                          </span>
                        </div>
                      </Table.Td>
                      <Table.Td>100</Table.Td>
                      <Table.Td>50</Table.Td>
                      <Table.Td>50</Table.Td>
                      <Table.Td>True</Table.Td>
                      <Table.Td>2025-10-10</Table.Td>
                      <Table.Td>
                        <Button
                          onClick={() => console.log(faker)}
                          variant='outline-primary'
                          className='mr-2 shadow-md'
                          size='sm'
                        >
                          <Lucide icon='Plus' className='w-4 h-4' />
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
          <div className='p-5 rounded-md box mt-5'>
            <div className='flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400'>
              <div className='text-base font-medium truncate'>Serial Items</div>
            </div>
            <div className='-mt-3 overflow-auto lg:overflow-visible'>
              <Table striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className='whitespace-nowrap'>Item Name</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Quantity</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Assigned</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Remaining</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Has Serial</Table.Th>
                    <Table.Th className='whitespace-nowrap'>Warrenty Month</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {_.take(fakerData, 2).map((faker, fakerKey) => (
                    <Table.Tr key={fakerKey}>
                      <Table.Td className='!py-4'>
                        <div className='flex items-center'>
                          <span className='font-medium whitespace-nowrap'>
                            {faker.products[0].name}
                          </span>
                        </div>
                      </Table.Td>
                      <Table.Td>100</Table.Td>
                      <Table.Td>50</Table.Td>
                      <Table.Td>50</Table.Td>
                      <Table.Td>
                        <AntDatePicker
                          size='small'
                          placeholder='Select Date'
                          defaultValue={dayjs()}
                          allowClear={false}
                        />
                      </Table.Td>
                      <Table.Td>
                        <AntInput type='text' placeholder='Enter Serial Number' size='small' />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* END: Transaction Details */}
    </>
  );
};

export default ViewPurchase;

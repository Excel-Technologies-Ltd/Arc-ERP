import _ from 'lodash';
import clsx from 'clsx';
import fakerData from '@/utils/faker';
import Button from '@/components/Base/Button';
import Pagination from '@/components/Base/Pagination';
import { FormInput, FormSelect } from '@/components/Base/Form';
import Alert from '@/components/Base/Alert';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import ReportBarChart1 from '@/components/ReportBarChart1';
import ReportDonutChart2 from '@/components/ReportDonutChart2';
import SimpleLineChart3 from '@/components/SimpleLineChart3';
import SimpleLineChart4 from '@/components/SimpleLineChart4';
import LeafletMap from '@/components/LeafletMap';
import { Menu, Tab } from '@/components/Base/Headless';
import Table from '@/components/Base/Table';

function Main() {
  return (
    <>
      <div className='relative'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='z-20 col-span-12 xl:col-span-9 2xl:col-span-9'>
            <div className='mt-6 -mb-6 intro-y'>
              <Alert
                variant='primary'
                dismissible
                className='flex items-center mb-6 box dark:border-darkmode-600'
              >
                {({ dismiss }) => (
                  <>
                    <span>
                      Introducing new dashboard! Download now at
                      <a
                        href='https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820'
                        className='ml-1 underline'
                        target='blank'
                      >
                        themeforest.net
                      </a>
                      .
                      <button className='rounded-md bg-white bg-opacity-20 dark:bg-darkmode-300 hover:bg-opacity-30 py-0.5 px-2 -my-3 ml-2'>
                        Live Preview
                      </button>
                    </span>
                    <Alert.DismissButton className='text-white' onClick={dismiss}>
                      <Lucide icon='X' className='w-4 h-4' />
                    </Alert.DismissButton>
                  </>
                )}
              </Alert>
            </div>
            <div className='grid grid-cols-12 mb-3 mt-14 sm:gap-10 intro-y'>
              <div className='relative col-span-12 py-6 text-center sm:col-span-6 md:col-span-4 sm:pl-5 md:pl-0 lg:pl-5 sm:text-left'>
                <Menu className='absolute pt-0.5 2xl:pt-0 mt-5 2xl:mt-6 top-0 right-0'>
                  <Menu.Button as='a' className='block' href='#'>
                    <Lucide icon='MoreVertical' className='w-5 h-5 text-slate-500' />
                  </Menu.Button>
                  <Menu.Items className='w-40'>
                    <Menu.Item>
                      <Lucide icon='FileText' className='w-4 h-4 mr-2' />
                      Monthly Report
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon='FileText' className='w-4 h-4 mr-2' />
                      Annual Report
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                <div className='-mb-1 text-sm font-medium 2xl:text-base'>
                  Hi Angelina,{' '}
                  <span className='font-normal text-slate-600 dark:text-slate-300'>
                    welcome back!
                  </span>
                </div>
                <div className='flex items-center justify-center text-base leading-3 2xl:text-lg sm:justify-start text-slate-600 dark:text-slate-300 mt-14 2xl:mt-24'>
                  My Total Assets
                  <Tippy as='div' content='Total value of your sales: $158.409.416'>
                    <Lucide icon='AlertCircle' className='w-5 h-5 ml-1.5 mt-0.5' />
                  </Tippy>
                </div>
                <div className='mt-5 mb-3 2xl:flex'>
                  <div className='flex items-center justify-center sm:justify-start'>
                    <div className='relative pl-3 text-2xl font-medium leading-6 2xl:text-3xl 2xl:pl-4'>
                      <span className='absolute top-0 left-0 -mt-1 text-xl 2xl:text-2xl 2xl:mt-0'>
                        $
                      </span>
                      142,402,210
                    </div>
                    <a className='ml-4 text-slate-500 2xl:ml-16' href=''>
                      <Lucide icon='RefreshCcw' className='w-4 h-4' />
                    </a>
                  </div>
                  <div className='mt-5 2xl:flex 2xl:justify-center 2xl:mt-0 2xl:-ml-20 2xl:w-14 2xl:flex-none 2xl:pl-2.5'>
                    <Tippy
                      as='div'
                      className='inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success 2xl:text-sm 2xl:p-0 2xl:text-success 2xl:bg-transparent 2xl:flex 2xl:justify-center'
                      content='49% Higher than last month'
                    >
                      49%
                      <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                    </Tippy>
                  </div>
                </div>
                <div className='text-slate-500'>Last updated 1 hour ago</div>
                <div className='mt-6 -mb-1 2xl:text-base text-slate-600 dark:text-slate-300'>
                  Total net margin{' '}
                  <a
                    href=''
                    className='underline decoration-dotted underline-offset-4 text-primary dark:text-slate-400'
                  >
                    $12,921,050
                  </a>
                </div>
                <Menu className='mt-14 2xl:mt-24 w-44 2xl:w-52'>
                  <Menu.Button
                    as={Button}
                    variant='primary'
                    rounded
                    className='relative justify-start w-full px-4'
                  >
                    Download Reports
                    <span className='absolute top-0 bottom-0 right-0 flex items-center justify-center w-8 h-8 my-auto ml-auto mr-1'>
                      <Lucide icon='ChevronDown' className='w-4 h-4' />
                    </span>
                  </Menu.Button>
                  <Menu.Items placement='bottom-start' className='w-44 2xl:w-52'>
                    <Menu.Item>
                      <Lucide icon='FileText' className='w-4 h-4 mr-2' />
                      Monthly Report
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon='FileText' className='w-4 h-4 mr-2' />
                      Annual Report
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div className='col-span-12 row-start-2 px-10 py-6 -mx-5 border-t border-black border-dashed md:row-start-auto md:col-span-4 border-opacity-10 md:border-t-0 md:border-l md:border-r sm:px-28 md:px-5'>
                <div className='flex flex-wrap items-center'>
                  <div className='flex items-center justify-center w-full mb-5 mr-auto sm:w-auto sm:justify-start 2xl:mb-0'>
                    <div className='w-2 h-2 -mt-4 rounded-full bg-primary'></div>
                    <div className='ml-3.5'>
                      <div className='relative text-xl 2xl:text-2xl font-medium leading-6 2xl:leading-5 pl-3.5 2xl:pl-4'>
                        <span className='absolute text-base 2xl:text-xl top-0 left-0 2xl:-mt-1.5'>
                          $
                        </span>
                        47,578.77
                      </div>
                      <div className='mt-2 text-slate-500'>Yearly budget</div>
                    </div>
                  </div>
                  <FormSelect className='bg-transparent border-black border-opacity-10 dark:border-darkmode-400 dark:bg-transparent mx-auto sm:mx-0 py-1.5 px-3 w-auto -mt-2'>
                    <option value='daily'>Daily</option>
                    <option value='weekly'>Weekly</option>
                    <option value='monthly'>Monthly</option>
                    <option value='yearly'>Yearly</option>
                    <option value='custom-date'>Custom Date</option>
                  </FormSelect>
                </div>
                <div className='mt-10 text-slate-600 dark:text-slate-300'>
                  You have spent about 35% of your annual budget.
                </div>
                <div className='mt-6'>
                  <ReportBarChart1 height={290} />
                </div>
              </div>
              <Tab.Group className='col-span-12 py-6 pl-4 -ml-4 border-t border-l border-black border-dashed sm:col-span-6 md:col-span-4 border-opacity-10 sm:border-t-0 md:border-l-0 md:ml-0 md:pl-0'>
                <Tab.List
                  variant='pills'
                  className='w-3/4 p-1 mx-auto rounded-md 2xl:w-4/6 bg-slate-200 dark:bg-black/10'
                >
                  <Tab>
                    <Tab.Button as='button' className='w-full py-1.5 px-2'>
                      Active
                    </Tab.Button>
                  </Tab>
                  <Tab>
                    <Tab.Button as='button' className='w-full py-1.5 px-2'>
                      Inactive
                    </Tab.Button>
                  </Tab>
                </Tab.List>
                <Tab.Panels className='mt-6'>
                  <Tab.Panel>
                    <div className='relative mt-8'>
                      <ReportDonutChart2 height={215} />
                      <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full'>
                        <div className='text-xl font-medium 2xl:text-2xl'>2.501</div>
                        <div className='text-slate-500 mt-0.5'>Active Users</div>
                      </div>
                    </div>
                    <div className='w-10/12 mx-auto mt-8 2xl:w-2/3'>
                      <div className='flex items-center'>
                        <div className='w-2 h-2 mr-3 rounded-full bg-primary'></div>
                        <span className='truncate'>17 - 30 Years old</span>
                        <span className='font-medium xl:ml-auto'>62%</span>
                      </div>
                      <div className='flex items-center mt-4'>
                        <div className='w-2 h-2 mr-3 rounded-full bg-pending'></div>
                        <span className='truncate'>31 - 50 Years old</span>
                        <span className='font-medium xl:ml-auto'>33%</span>
                      </div>
                      <div className='flex items-center mt-4'>
                        <div className='w-2 h-2 mr-3 rounded-full bg-warning'></div>
                        <span className='truncate'>&gt;= 50 Years old</span>
                        <span className='font-medium xl:ml-auto'>10%</span>
                      </div>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
          <div
            className={clsx([
              'z-10 col-span-12 px-5 pt-8 -mx-[16px] md:-mx-[22px] relative pb-14',
              "before:content-[''] before:rounded-[30px_30px_0px_0px] before:w-full before:h-full before:bg-slate-200/70 before:dark:bg-opacity-50 before:absolute before:top-0 before:left-0 before:right-0 before:dark:bg-darkmode-500",
            ])}
          >
            <div className='relative grid grid-cols-12 gap-6 intro-y'>
              <div className='col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6'>
                <div className='flex flex-wrap items-center gap-3 lg:flex-nowrap'>
                  <div className='mr-auto text-lg font-medium truncate sm:w-full lg:w-auto'>
                    Summary Report
                  </div>
                  <div className='py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate'>
                    180 Campaign
                  </div>
                </div>
                <div className='px-10 sm:px-0'>
                  <SimpleLineChart3 height={110} className='mt-8 -ml-1 -mb-7' />
                </div>
              </div>
              <div className='col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6'>
                <div className='flex flex-wrap items-center gap-3 lg:flex-nowrap'>
                  <div className='mr-auto text-lg font-medium truncate sm:w-full lg:w-auto'>
                    Social Media
                  </div>
                  <a href='' className='flex items-center text-primary'>
                    <div className='truncate 2xl:mr-auto'>View Details</div>
                    <Lucide icon='ArrowRight' className='w-4 h-4 ml-3' />
                  </a>
                </div>
                <div className='flex items-center justify-center mt-10'>
                  <div className='text-right'>
                    <div className='text-3xl font-medium'>149</div>
                    <div className='mt-1 truncate text-slate-500'>Active Lenders</div>
                  </div>
                  <div className='w-px h-16 mx-4 border border-r border-dashed border-slate-300 dark:border-darkmode-400 xl:mx-6'></div>
                  <div>
                    <div className='text-3xl font-medium'>135</div>
                    <div className='mt-1 truncate text-slate-500'>Total Lenders</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 px-0 sm:col-span-4 xl:col-span-3 lg:px-6 xl:px-0 2xl:px-6'>
                <div className='flex flex-wrap items-center gap-3 lg:flex-nowrap'>
                  <div className='mr-auto text-lg font-medium truncate sm:w-full lg:w-auto'>
                    Posted Ads
                  </div>
                  <div className='py-1 px-2.5 rounded-full text-xs bg-slate-300/50 dark:bg-darkmode-400 text-slate-600 dark:text-slate-300 cursor-pointer truncate'>
                    320 Followers
                  </div>
                </div>
                <div className='px-10 sm:px-0'>
                  <SimpleLineChart4 height={110} className='mt-8 -ml-1 -mb-7' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='top-0 right-0 z-30 grid w-full h-full grid-cols-12 gap-6 pb-6 -mt-8 xl:absolute xl:mt-0 xl:pb-0 xl:z-auto'>
          <div className='z-30 col-span-12 xl:col-span-3 xl:col-start-10 xl:pb-16'>
            <div className='flex flex-col h-full'>
              <div className='p-5 mt-6 box bg-primary intro-x'>
                <div className='flex flex-wrap gap-3'>
                  <div className='mr-auto'>
                    <div className='flex items-center leading-3 text-white text-opacity-70 dark:text-slate-300'>
                      AVAILABLE FUNDS
                      <Tippy as='div' content='Total value of your sales: $158.409.416'>
                        <Lucide icon='AlertCircle' className='w-4 h-4 ml-1.5' />
                      </Tippy>
                    </div>
                    <div className='text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5'>
                      <span className='absolute text-xl top-0 left-0 -mt-1.5'>$</span>
                      479,578.77
                    </div>
                  </div>
                  <a
                    className='flex items-center justify-center w-12 h-12 text-white bg-white rounded-full dark:bg-darkmode-300 bg-opacity-20 hover:bg-opacity-30'
                    href=''
                  >
                    <Lucide icon='Plus' className='w-6 h-6' />
                  </a>
                </div>
              </div>
              <div
                className={clsx([
                  'intro-x xl:min-h-0 relative mt-5',
                  "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                ])}
              >
                <Tab.Group className='max-h-full xl:overflow-y-auto box'>
                  <div className='top-0 px-5 pt-5 pb-6 xl:sticky'>
                    <div className='flex items-center'>
                      <div className='mr-5 text-lg font-medium truncate'>Summary Report</div>
                      <a href='' className='flex items-center ml-auto text-primary'>
                        <Lucide icon='RefreshCcw' className='w-4 h-4 mr-3' />
                        Refresh
                      </a>
                    </div>
                    <Tab.List
                      variant='pills'
                      className='p-1 mx-auto mt-5 border border-dashed rounded-md border-slate-300 dark:border-darkmode-300'
                    >
                      <Tab>
                        <Tab.Button as='button' className='w-full py-1.5 px-2 active'>
                          Weekly
                        </Tab.Button>
                      </Tab>
                      <Tab>
                        <Tab.Button as='button' className='w-full py-1.5 px-2'>
                          Monthly
                        </Tab.Button>
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels className='px-5 pb-5'>
                    <Tab.Panel className='grid grid-cols-12 gap-y-6'>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Unpaid Loan</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>$155.430.000</div>
                          <Tippy
                            as='div'
                            className='flex ml-2 text-xs font-medium cursor-pointer text-danger'
                            content='2% Lower than last month'
                          >
                            2%
                            <Lucide icon='ChevronDown' className='w-4 h-4 ml-0.5' />
                          </Tippy>
                        </div>
                      </div>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Active Funding Partner</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>52 Partner</div>
                          <Tippy
                            as='div'
                            className='flex ml-2 text-xs font-medium cursor-pointer text-success'
                            content='0.1% Lower than last month'
                          >
                            49%
                            <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                          </Tippy>
                        </div>
                      </div>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Paid Installment</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>$75.430.000</div>
                          <Tippy
                            as='div'
                            className='flex ml-2 text-xs font-medium cursor-pointer text-success'
                            content='49% Higher than last month'
                          >
                            36%
                            <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                          </Tippy>
                        </div>
                      </div>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Success Payment</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>100%</div>
                        </div>
                      </div>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Waiting For Disbursement</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>0</div>
                        </div>
                      </div>
                      <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-12'>
                        <div className='text-slate-500'>Unpaid Loan</div>
                        <div className='mt-1.5 flex items-center'>
                          <div className='text-lg'>$21.430.000</div>
                          <Tippy
                            as='div'
                            className='flex ml-2 text-xs font-medium cursor-pointer text-danger'
                            content='2% Lower than last month'
                          >
                            23%
                            <Lucide icon='ChevronDown' className='w-4 h-4 ml-0.5' />
                          </Tippy>
                        </div>
                      </div>
                      <Button
                        variant='outline-secondary'
                        className='relative justify-start col-span-12 mb-2 border-dashed border-slate-300 dark:border-darkmode-300'
                      >
                        <span className='mr-5 truncate'>My Portfolio Details</span>
                        <span className='w-8 h-8 absolute flex justify-center items-center right-0 top-0 bottom-0 my-auto ml-auto mr-0.5'>
                          <Lucide icon='ArrowRight' className='w-4 h-4' />
                        </span>
                      </Button>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx([
          'z-40 grid grid-cols-12 gap-6 -mb-10 -mx-[16px] md:-mx-[22px] relative px-[22px] min-h-[400px] xl:-mt-5 2xl:-mt-8 2xl:z-10',
          "before:content-[''] before:rounded-t-[30px] xl:before:rounded-t-[30px] before:rounded-b-[30px] xl:before:shadow-[0px_3px_20px_#0000000b] before:w-full before:h-full before:bg-slate-100 before:absolute before:top-0 before:left-0 before:right-0 before:dark:bg-darkmode-700",
        ])}
      >
        <div className='relative col-span-12 2xl:col-span-9'>
          <div className='grid grid-cols-12 gap-6'>
            {/* BEGIN: Official Store */}
            <div className='col-span-12 mt-6 xl:col-span-8'>
              <div className='items-center block h-10 intro-y sm:flex'>
                <h2 className='mr-5 text-lg font-medium truncate'>Official Store</h2>
                <div className='relative mt-3 sm:ml-auto sm:mt-0 text-slate-500'>
                  <Lucide
                    icon='MapPin'
                    className='absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3'
                  />
                  <FormInput
                    type='text'
                    className='pl-10 sm:w-56 !box'
                    placeholder='Filter by city'
                  />
                </div>
              </div>
              <div className='p-5 mt-12 intro-y box sm:mt-5'>
                <div>
                  250 Official stores in 21 countries, click the marker to see location details.
                </div>
                <LeafletMap className='h-[310px] mt-5 rounded-md bg-slate-200' />
              </div>
            </div>
            {/* END: Official Store */}
            {/* BEGIN: Weekly Best Sellers */}
            <div className='col-span-12 mt-6 xl:col-span-4'>
              <div className='flex items-center h-10 intro-y'>
                <h2 className='mr-5 text-lg font-medium truncate'>Weekly Best Sellers</h2>
              </div>
              <div className='mt-5'>
                {_.take(fakerData, 4).map((faker, fakerKey) => (
                  <div key={fakerKey} className='intro-y'>
                    <div className='flex items-center px-4 py-4 mb-3 box zoom-in'>
                      <div className='flex-none w-10 h-10 overflow-hidden rounded-md image-fit'>
                        <img alt='Midone Tailwind HTML Admin Template' src={faker.photos[0]} />
                      </div>
                      <div className='ml-4 mr-auto'>
                        <div className='font-medium'>{faker.users[0].name}</div>
                        <div className='text-slate-500 text-xs mt-0.5'>{faker.dates[0]}</div>
                      </div>
                      <div className='px-2 py-1 text-xs font-medium text-white rounded-full cursor-pointer bg-success'>
                        137 Sales
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  href=''
                  className='block w-full py-4 text-center border border-dotted rounded-md intro-y border-slate-400 dark:border-darkmode-300 text-slate-500'
                >
                  View More
                </a>
              </div>
            </div>
            {/* END: Weekly Best Sellers */}
            {/* BEGIN: Weekly Top Products */}
            <div className='col-span-12 mt-6'>
              <div className='items-center block h-10 intro-y sm:flex'>
                <h2 className='mr-5 text-lg font-medium truncate'>Weekly Top Products</h2>
                <div className='flex items-center mt-3 sm:ml-auto sm:mt-0'>
                  <Button className='flex items-center !box text-slate-600 dark:text-slate-300'>
                    <Lucide icon='FileText' className='hidden w-4 h-4 mr-2 sm:block' />
                    Export to Excel
                  </Button>
                  <Button className='flex items-center ml-3 !box text-slate-600 dark:text-slate-300'>
                    <Lucide icon='FileText' className='hidden w-4 h-4 mr-2 sm:block' />
                    Export to PDF
                  </Button>
                </div>
              </div>
              <div className='mt-8 overflow-auto intro-y lg:overflow-visible sm:mt-0'>
                <Table className='border-spacing-y-[10px] border-separate sm:mt-2'>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th className='border-b-0 whitespace-nowrap'>IMAGES</Table.Th>
                      <Table.Th className='border-b-0 whitespace-nowrap'>PRODUCT NAME</Table.Th>
                      <Table.Th className='text-center border-b-0 whitespace-nowrap'>
                        STOCK
                      </Table.Th>
                      <Table.Th className='text-center border-b-0 whitespace-nowrap'>
                        STATUS
                      </Table.Th>
                      <Table.Th className='text-center border-b-0 whitespace-nowrap'>
                        ACTIONS
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {_.take(fakerData, 4).map((faker, fakerKey) => (
                      <Table.Tr key={fakerKey} className='intro-x'>
                        <Table.Td className='box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <div className='flex'>
                            <div className='w-10 h-10 image-fit zoom-in'>
                              <Tippy
                                as='img'
                                alt='Midone Tailwind HTML Admin Template'
                                className='rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]'
                                src={faker.images[0]}
                                content={`Uploaded at ${faker.dates[0]}`}
                              />
                            </div>
                            <div className='w-10 h-10 -ml-5 image-fit zoom-in'>
                              <Tippy
                                as='img'
                                alt='Midone Tailwind HTML Admin Template'
                                className='rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]'
                                src={faker.images[1]}
                                content={`Uploaded at ${faker.dates[1]}`}
                              />
                            </div>
                            <div className='w-10 h-10 -ml-5 image-fit zoom-in'>
                              <Tippy
                                as='img'
                                alt='Midone Tailwind HTML Admin Template'
                                className='rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]'
                                src={faker.images[2]}
                                content={`Uploaded at ${faker.dates[2]}`}
                              />
                            </div>
                          </div>
                        </Table.Td>
                        <Table.Td className='box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <a href='' className='font-medium whitespace-nowrap'>
                            {faker.products[0].name}
                          </a>
                          <div className='text-slate-500 text-xs whitespace-nowrap mt-0.5'>
                            {faker.products[0].category}
                          </div>
                        </Table.Td>
                        <Table.Td className='box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          {faker.stocks[0]}
                        </Table.Td>
                        <Table.Td className='box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600'>
                          <div
                            className={clsx([
                              'flex items-center justify-center',
                              { 'text-success': faker.trueFalse[0] },
                              { 'text-danger': !faker.trueFalse[0] },
                            ])}
                          >
                            <Lucide icon='CheckSquare' className='w-4 h-4 mr-2' />
                            {faker.trueFalse[0] ? 'Active' : 'Inactive'}
                          </div>
                        </Table.Td>
                        <Table.Td
                          className={clsx([
                            'box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600',
                            'before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400',
                          ])}
                        >
                          <div className='flex items-center justify-center'>
                            <a className='flex items-center mr-3' href=''>
                              <Lucide icon='CheckSquare' className='w-4 h-4 mr-1' />
                              Edit
                            </a>
                            <a className='flex items-center text-danger' href=''>
                              <Lucide icon='Trash2' className='w-4 h-4 mr-1' /> Delete
                            </a>
                          </div>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
              <div className='flex flex-wrap items-center mt-3 intro-y sm:flex-row sm:flex-nowrap'>
                <Pagination className='w-full sm:w-auto sm:mr-auto'>
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
                <FormSelect className='w-20 mt-3 !box sm:mt-0'>
                  <option>10</option>
                  <option>25</option>
                  <option>35</option>
                  <option>50</option>
                </FormSelect>
              </div>
            </div>
            {/* END: Weekly Top Products */}
          </div>
        </div>
        <div className='relative z-10 col-span-12 2xl:col-span-3'>
          <div className='pb-10 2xl:border-l intro-y'>
            <div className='grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6'>
              {/* BEGIN: Recent Activities */}
              <div className='col-span-12 mt-3 md:col-span-6 2xl:col-span-12 2xl:mt-6'>
                <div className='flex items-center h-10 intro-x'>
                  <h2 className='mr-5 text-lg font-medium truncate'>Recent Activities</h2>
                  <a href='' className='ml-auto truncate text-primary'>
                    Show More
                  </a>
                </div>
                <div className='mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5'>
                  <div className='relative flex items-center mb-3 intro-x'>
                    <div className='before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5'>
                      <div className='flex-none w-10 h-10 overflow-hidden rounded-full image-fit'>
                        <img
                          alt='Midone Tailwind HTML Admin Template'
                          src={fakerData[9].photos[0]}
                        />
                      </div>
                    </div>
                    <div className='flex-1 px-5 py-3 ml-4 box zoom-in'>
                      <div className='flex items-center'>
                        <div className='font-medium'>{fakerData[9].users[0].name}</div>
                        <div className='ml-auto text-xs text-slate-500'>07:00 PM</div>
                      </div>
                      <div className='mt-1 text-slate-500'>Has joined the team</div>
                    </div>
                  </div>
                  <div className='relative flex items-center mb-3 intro-x'>
                    <div className='before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5'>
                      <div className='flex-none w-10 h-10 overflow-hidden rounded-full image-fit'>
                        <img
                          alt='Midone Tailwind HTML Admin Template'
                          src={fakerData[8].photos[0]}
                        />
                      </div>
                    </div>
                    <div className='flex-1 px-5 py-3 ml-4 box zoom-in'>
                      <div className='flex items-center'>
                        <div className='font-medium'>{fakerData[8].users[0].name}</div>
                        <div className='ml-auto text-xs text-slate-500'>07:00 PM</div>
                      </div>
                      <div className='text-slate-500'>
                        <div className='mt-1'>Added 3 new photos</div>
                        <div className='flex mt-2'>
                          <Tippy
                            as='div'
                            className='w-8 h-8 mr-1 image-fit zoom-in'
                            content={fakerData[0].products[0].name}
                          >
                            <img
                              alt='Midone Tailwind HTML Admin Template'
                              className='border border-white rounded-md'
                              src={fakerData[8].images[0]}
                            />
                          </Tippy>
                          <Tippy
                            as='div'
                            className='w-8 h-8 mr-1 image-fit zoom-in'
                            content={fakerData[1].products[0].name}
                          >
                            <img
                              alt='Midone Tailwind HTML Admin Template'
                              className='border border-white rounded-md'
                              src={fakerData[8].images[1]}
                            />
                          </Tippy>
                          <Tippy
                            as='div'
                            className='w-8 h-8 mr-1 image-fit zoom-in'
                            content={fakerData[2].products[0].name}
                          >
                            <img
                              alt='Midone Tailwind HTML Admin Template'
                              className='border border-white rounded-md'
                              src={fakerData[8].images[2]}
                            />
                          </Tippy>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='my-4 text-xs text-center intro-x text-slate-500'>12 November</div>
                  <div className='relative flex items-center mb-3 intro-x'>
                    <div className='before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5'>
                      <div className='flex-none w-10 h-10 overflow-hidden rounded-full image-fit'>
                        <img
                          alt='Midone Tailwind HTML Admin Template'
                          src={fakerData[7].photos[0]}
                        />
                      </div>
                    </div>
                    <div className='flex-1 px-5 py-3 ml-4 box zoom-in'>
                      <div className='flex items-center'>
                        <div className='font-medium'>{fakerData[7].users[0].name}</div>
                        <div className='ml-auto text-xs text-slate-500'>07:00 PM</div>
                      </div>
                      <div className='mt-1 text-slate-500'>
                        Has changed{' '}
                        <a className='text-primary' href=''>
                          {fakerData[7].products[0].name}
                        </a>{' '}
                        price and description
                      </div>
                    </div>
                  </div>
                  <div className='relative flex items-center mb-3 intro-x'>
                    <div className='before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5'>
                      <div className='flex-none w-10 h-10 overflow-hidden rounded-full image-fit'>
                        <img
                          alt='Midone Tailwind HTML Admin Template'
                          src={fakerData[6].photos[0]}
                        />
                      </div>
                    </div>
                    <div className='flex-1 px-5 py-3 ml-4 box zoom-in'>
                      <div className='flex items-center'>
                        <div className='font-medium'>{fakerData[6].users[0].name}</div>
                        <div className='ml-auto text-xs text-slate-500'>07:00 PM</div>
                      </div>
                      <div className='mt-1 text-slate-500'>
                        Has changed{' '}
                        <a className='text-primary' href=''>
                          {fakerData[6].products[0].name}
                        </a>{' '}
                        description
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Recent Activities */}
              {/* BEGIN: Transactions */}
              <div className='col-span-12 mt-3 md:col-span-6 2xl:col-span-12'>
                <div className='flex items-center h-10 intro-x'>
                  <h2 className='mr-5 text-lg font-medium truncate'>Transactions</h2>
                </div>
                <div className='mt-5'>
                  {_.take(fakerData, 5).map((faker, fakerKey) => (
                    <div key={fakerKey} className='intro-x'>
                      <div className='flex items-center px-5 py-3 mb-3 box zoom-in'>
                        <div className='flex-none w-10 h-10 overflow-hidden rounded-full image-fit'>
                          <img alt='Midone Tailwind HTML Admin Template' src={faker.photos[0]} />
                        </div>
                        <div className='ml-4 mr-auto'>
                          <div className='font-medium'>{faker.users[0].name}</div>
                          <div className='text-slate-500 text-xs mt-0.5'>{faker.dates[0]}</div>
                        </div>
                        <div
                          className={clsx({
                            'text-success': faker.trueFalse[0],
                            'text-danger': !faker.trueFalse[0],
                          })}
                        >
                          {faker.trueFalse[0] ? '+' : '-'}${faker.totals[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                  <a
                    href=''
                    className='block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500'
                  >
                    View More
                  </a>
                </div>
              </div>
              {/* END: Transactions */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

import _ from 'lodash';
import clsx from 'clsx';
import fakerData from '@/utils/faker';
import Button from '@/components/Base/Button';
import Lucide from '@/components/Base/Lucide';
import Tippy from '@/components/Base/Tippy';
import ReportDonutChart from '@/components/ReportDonutChart';
import ReportLineChart from '@/components/ReportLineChart';
import ReportPieChart from '@/components/ReportPieChart';
import { Menu } from '@/components/Base/Headless';

function Main() {
  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 2xl:col-span-9'>
        <div className='grid grid-cols-12 gap-6'>
          {/* BEGIN: General Report */}
          <div className='col-span-12 mt-8'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>General Report</h2>
              <a href='' className='flex items-center ml-auto text-primary'>
                <Lucide icon='RefreshCcw' className='w-4 h-4 mr-3' /> Reload Data
              </a>
            </div>
            <div className='grid grid-cols-12 gap-6 mt-5'>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='ShoppingCart' className='w-[28px] h-[28px] text-primary' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className='cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium'
                          content='33% Higher than last month'
                        >
                          33%
                          <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>4.710</div>
                    <div className='mt-1 text-base text-slate-500'>Item Sales</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='CreditCard' className='w-[28px] h-[28px] text-pending' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className='cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium'
                          content='2% Lower than last month'
                        >
                          2%
                          <Lucide icon='ChevronDown' className='w-4 h-4 ml-0.5' />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>3.721</div>
                    <div className='mt-1 text-base text-slate-500'>New Orders</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='Monitor' className='w-[28px] h-[28px] text-warning' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className='cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium'
                          content='12% Higher than last month'
                        >
                          12% <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>2.149</div>
                    <div className='mt-1 text-base text-slate-500'>Total Products</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:box before:absolute before:inset-x-3 before:mt-3 before:h-full before:bg-slate-50 before:content-['']",
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='User' className='w-[28px] h-[28px] text-success' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className='cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium'
                          content='22% Higher than last month'
                        >
                          22% <Lucide icon='ChevronUp' className='w-4 h-4 ml-0.5' />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>152.040</div>
                    <div className='mt-1 text-base text-slate-500'>Unique Visitor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className='col-span-12 mt-8 lg:col-span-6'>
            <div className='items-center block h-10 intro-y sm:flex'>
              <h2 className='mr-5 text-lg font-medium truncate'>Sales Report</h2>
            </div>
            <div className='p-5 mt-12 intro-y box sm:mt-5'>
              <div className='flex flex-col md:flex-row md:items-center'>
                <div className='flex'>
                  <div>
                    <div className='text-lg font-medium text-primary dark:text-slate-300 xl:text-xl'>
                      $15,000
                    </div>
                    <div className='mt-0.5 text-slate-500'>This Month</div>
                  </div>
                  <div className='w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5'></div>
                  <div>
                    <div className='text-lg font-medium text-slate-500 xl:text-xl'>$10,000</div>
                    <div className='mt-0.5 text-slate-500'>Last Month</div>
                  </div>
                </div>
                <Menu className='mt-5 md:ml-auto md:mt-0'>
                  <Menu.Button as={Button} variant='outline-secondary' className='font-normal'>
                    Filter by Category
                    <Lucide icon='ChevronDown' className='w-4 h-4 ml-2' />
                  </Menu.Button>
                  <Menu.Items className='w-40 h-32 overflow-y-auto'>
                    <Menu.Item>PC & Laptop</Menu.Item>
                    <Menu.Item>Smartphone</Menu.Item>
                    <Menu.Item>Electronic</Menu.Item>
                    <Menu.Item>Photography</Menu.Item>
                    <Menu.Item>Sport</Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div
                className={clsx([
                  'relative',
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                ])}
              >
                <ReportLineChart height={275} className='mt-6 -mb-6' />
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
          {/* BEGIN: Weekly Top Seller */}
          <div className='col-span-12 mt-8 sm:col-span-6 lg:col-span-3'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Weekly Top Seller</h2>
              <a href='' className='ml-auto truncate text-primary'>
                Show More
              </a>
            </div>
            <div className='p-5 mt-5 intro-y box'>
              <div className='mt-3'>
                <ReportPieChart height={213} />
              </div>
              <div className='mx-auto mt-8 w-52 sm:w-auto'>
                <div className='flex items-center'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-primary'></div>
                  <span className='truncate'>17 - 30 Years old</span>
                  <span className='ml-auto font-medium'>62%</span>
                </div>
                <div className='flex items-center mt-4'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-pending'></div>
                  <span className='truncate'>31 - 50 Years old</span>
                  <span className='ml-auto font-medium'>33%</span>
                </div>
                <div className='flex items-center mt-4'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-warning'></div>
                  <span className='truncate'>&gt;= 50 Years old</span>
                  <span className='ml-auto font-medium'>10%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Weekly Top Seller */}
          {/* BEGIN: Sales Report */}
          <div className='col-span-12 mt-8 sm:col-span-6 lg:col-span-3'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Sales Report</h2>
              <a href='' className='ml-auto truncate text-primary'>
                Show More
              </a>
            </div>
            <div className='p-5 mt-5 intro-y box'>
              <div className='mt-3'>
                <ReportDonutChart height={213} />
              </div>
              <div className='mx-auto mt-8 w-52 sm:w-auto'>
                <div className='flex items-center'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-primary'></div>
                  <span className='truncate'>17 - 30 Years old</span>
                  <span className='ml-auto font-medium'>62%</span>
                </div>
                <div className='flex items-center mt-4'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-pending'></div>
                  <span className='truncate'>31 - 50 Years old</span>
                  <span className='ml-auto font-medium'>33%</span>
                </div>
                <div className='flex items-center mt-4'>
                  <div className='w-2 h-2 mr-3 rounded-full bg-warning'></div>
                  <span className='truncate'>&gt;= 50 Years old</span>
                  <span className='ml-auto font-medium'>10%</span>
                </div>
              </div>
            </div>
          </div>
          {/* END: Sales Report */}

          {/* BEGIN: Weekly Best Sellers */}
          <div className='col-span-12 mt-6'>
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
        </div>
      </div>
      <div className='col-span-12 2xl:col-span-3'>
        <div className='pb-10 -mb-10 2xl:border-l'>
          <div className='grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6'>
            {/* BEGIN: Transactions */}
            <div className='col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8'>
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

            {/* BEGIN: Schedules */}
            <div className='col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto'>
              <div className='flex items-center h-10 intro-x'>
                <h2 className='mr-5 text-lg font-medium truncate'>Schedules</h2>
                <a href='' className='flex items-center ml-auto truncate text-primary'>
                  <Lucide icon='Plus' className='w-4 h-4 mr-1' /> Add New Schedules
                </a>
              </div>
              <div className='mt-5'>
                <div className='intro-x box'>
                  <div className='p-5'>
                    <div className='flex'>
                      <Lucide icon='ChevronLeft' className='w-5 h-5 text-slate-500' />
                      <div className='mx-auto text-base font-medium'>April</div>
                      <Lucide icon='ChevronRight' className='w-5 h-5 text-slate-500' />
                    </div>
                    <div className='grid grid-cols-7 gap-4 mt-5 text-center'>
                      <div className='font-medium'>Su</div>
                      <div className='font-medium'>Mo</div>
                      <div className='font-medium'>Tu</div>
                      <div className='font-medium'>We</div>
                      <div className='font-medium'>Th</div>
                      <div className='font-medium'>Fr</div>
                      <div className='font-medium'>Sa</div>
                      <div className='py-0.5 rounded relative text-slate-500'>29</div>
                      <div className='py-0.5 rounded relative text-slate-500'>30</div>
                      <div className='py-0.5 rounded relative text-slate-500'>31</div>
                      <div className='py-0.5 rounded relative'>1</div>
                      <div className='py-0.5 rounded relative'>2</div>
                      <div className='py-0.5 rounded relative'>3</div>
                      <div className='py-0.5 rounded relative'>4</div>
                      <div className='py-0.5 rounded relative'>5</div>
                      <div className='py-0.5 bg-success/20 dark:bg-success/30 rounded relative'>
                        6
                      </div>
                      <div className='py-0.5 rounded relative'>7</div>
                      <div className='py-0.5 bg-primary text-white rounded relative'>8</div>
                      <div className='py-0.5 rounded relative'>9</div>
                      <div className='py-0.5 rounded relative'>10</div>
                      <div className='py-0.5 rounded relative'>11</div>
                      <div className='py-0.5 rounded relative'>12</div>
                      <div className='py-0.5 rounded relative'>13</div>
                      <div className='py-0.5 rounded relative'>14</div>
                      <div className='py-0.5 rounded relative'>15</div>
                      <div className='py-0.5 rounded relative'>16</div>
                      <div className='py-0.5 rounded relative'>17</div>
                      <div className='py-0.5 rounded relative'>18</div>
                      <div className='py-0.5 rounded relative'>19</div>
                      <div className='py-0.5 rounded relative'>20</div>
                      <div className='py-0.5 rounded relative'>21</div>
                      <div className='py-0.5 rounded relative'>22</div>
                      <div className='py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative'>
                        23
                      </div>
                      <div className='py-0.5 rounded relative'>24</div>
                      <div className='py-0.5 rounded relative'>25</div>
                      <div className='py-0.5 rounded relative'>26</div>
                      <div className='py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative'>
                        27
                      </div>
                      <div className='py-0.5 rounded relative'>28</div>
                      <div className='py-0.5 rounded relative'>29</div>
                      <div className='py-0.5 rounded relative'>30</div>
                      <div className='py-0.5 rounded relative text-slate-500'>1</div>
                      <div className='py-0.5 rounded relative text-slate-500'>2</div>
                      <div className='py-0.5 rounded relative text-slate-500'>3</div>
                      <div className='py-0.5 rounded relative text-slate-500'>4</div>
                      <div className='py-0.5 rounded relative text-slate-500'>5</div>
                      <div className='py-0.5 rounded relative text-slate-500'>6</div>
                      <div className='py-0.5 rounded relative text-slate-500'>7</div>
                      <div className='py-0.5 rounded relative text-slate-500'>8</div>
                      <div className='py-0.5 rounded relative text-slate-500'>9</div>
                    </div>
                  </div>
                  <div className='p-5 border-t border-slate-200/60'>
                    <div className='flex items-center'>
                      <div className='w-2 h-2 mr-3 rounded-full bg-pending'></div>
                      <span className='truncate'>UI/UX Workshop</span>
                      <span className='font-medium xl:ml-auto'>23th</span>
                    </div>
                    <div className='flex items-center mt-4'>
                      <div className='w-2 h-2 mr-3 rounded-full bg-primary'></div>
                      <span className='truncate'>VueJs Frontend Development</span>
                      <span className='font-medium xl:ml-auto'>10th</span>
                    </div>
                    <div className='flex items-center mt-4'>
                      <div className='w-2 h-2 mr-3 rounded-full bg-warning'></div>
                      <span className='truncate'>Laravel Rest API</span>
                      <span className='font-medium xl:ml-auto'>31th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Schedules */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

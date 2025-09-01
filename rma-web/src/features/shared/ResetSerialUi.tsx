import { AiOutlineClose, AiOutlineWarning } from '@/components/Base/Icons';

const ResetSerialUi = () => {
  return (
    <>
      <div>
        {/* header */}
        <div className='flex items-start gap-5 py-5'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50 dark:bg-red-900/30 dark:ring-red-900/20'>
            {/* alert icon */}
            <AiOutlineWarning className='h-5 w-5 text-red-600 dark:text-red-400' />
          </div>
          <div className='min-w-0'>
            <h2
              id='reset-invoice-title'
              className='text-lg font-semibold text-red-700 dark:text-red-300'
            >
              Reset Invoice
            </h2>
            <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-300/90'>
              This action will <span className='font-semibold'>cancel</span> and
              <span className='font-semibold'> unlink</span> multiple records. It cannot be undone.
            </p>
          </div>
        </div>

        {/* body */}
        <div className='space-y-4'>
          {/* consequences list */}
          <div className='rounded-xl border border-neutral-200 bg-amber-50 p-3 dark:border-neutral-800 dark:bg-darkmode-700'>
            <p className='mb-4 text-xs font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300'>
              Resetting will cancel linked:
            </p>
            <ul className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {[
                'Sales Invoice',
                'Delivery Notes',
                'Sales Returns',
                'Credit Notes',
                'Linked/Assigned Serials',
                'Serial History',
              ].map((label) => (
                <li key={label} className='flex items-start gap-2 '>
                  <span className='mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md bg-red-100'>
                    {/* small x icon */}
                    <AiOutlineClose className='text-red-400 dark:text-red-400' />
                  </span>
                  <span className='text-sm text-amber-800 dark:text-amber-200'>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetSerialUi;

import { useFrappeAuth } from 'frappe-react-sdk';
import { FaHome } from 'react-icons/fa';

function Main() {
  const { currentUser } = useFrappeAuth({
    revalidateOnMount: false,
  });

  return (
    <div className='mt-5'>
      {/* Welcome Section */}
      <div className='relative rounded-xl border border-slate-200 bg-gradient-to-br from-primary/20 via-info/20 to-success/20 p-8 dark:bg-gradient-to-br dark:from-primary/30 dark:via-info/30 dark:to-success/30 dark:border-primary/30 overflow-hidden'>
        {/* Decorative colorful circles using project colors */}
        <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-info/40 to-primary/40 rounded-full blur-2xl -mr-16 -mt-16'></div>
        <div className='absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-warning/40 to-pending/40 rounded-full blur-2xl -ml-20 -mb-20'></div>
        <div className='absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-success/40 to-info/40 rounded-full blur-xl'></div>

        <div className='relative flex items-center justify-between z-10'>
          <div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-primary via-info to-success bg-clip-text text-transparent dark:from-primary dark:via-info dark:to-success'>
              Welcome back, {currentUser}! 👋
            </h1>
            <p className='mt-2 text-slate-700 dark:text-slate-300 font-medium'>
              Here's what's happening with your RMA system today.
            </p>
          </div>
          <div className='hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary via-info to-success dark:from-primary dark:via-info dark:to-success shadow-lg shadow-primary/50'>
            <FaHome className='text-4xl text-white' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

import logoUrl from '@/assets/images/logo.svg';
import illustrationUrl from '@/assets/images/illustration.svg';
import Button from '@/components/Base/Button';
import clsx from 'clsx';
import { useForm, Controller } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFrappeAuth } from 'frappe-react-sdk';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '@/components/Toast/Toast.utils';
import AntInput from '@/components/Base/Form/FormInput/AntInput';

const schema = z.object({
  username: z.string().min(1, 'User Name is Required!'),
  password: z.string().min(1, 'Password is Required'),
});

type formTypes = z.infer<typeof schema>;

function Main() {
  const { login } = useFrappeAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: 'administrator',
      password: 'admin',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: formTypes) => {
    await login({
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        navigate('/');
        showSuccessToast(res.message || 'Login Successfully');
      })
      .catch((err) => {
        showErrorToast(err.message || 'Something Went Wrong!');
      });
  };
  return (
    <>
      <div
        className={clsx([
          'p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
          "before:hidden before:xl:block before:content-[''] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400",
          "after:hidden after:xl:block after:content-[''] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700",
        ])}
      >
        <div className='container relative z-10 sm:px-10'>
          <div className='block grid-cols-2 gap-4 xl:grid'>
            {/* BEGIN: Login Info */}
            <div className='flex-col hidden min-h-screen xl:flex'>
              <a href='' className='flex items-center pt-5 -intro-x'>
                <img alt='Midone Tailwind HTML Admin Template' className='w-6' src={logoUrl} />
                <span className='ml-3 text-lg text-white'> Excel Rma </span>
              </a>
              <div className='my-auto'>
                <img
                  alt='Midone Tailwind HTML Admin Template'
                  className='w-1/2 -mt-16 -intro-x'
                  src={illustrationUrl}
                />
                <div className='mt-10 text-4xl font-medium leading-tight text-white -intro-x'>
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className='mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400'>
                  Manage all your e-commerce accounts in one place
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className='flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0'>
              <div className='w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto'>
                <h2 className='text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left'>
                  Sign In
                </h2>
                <div className='mt-2 text-center intro-x text-slate-400 xl:hidden'>
                  A few more clicks to sign in to your account. Manage all your e-commerce accounts
                  in one place
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mt-8 intro-x'>
                    <Controller
                      name='username'
                      control={control}
                      render={({ field }) => (
                        <AntInput
                          {...field}
                          type='text'
                          placeholder='User Name'
                          errors={Boolean(errors.username?.message) || false}
                        />
                      )}
                    />
                    {errors.username && (
                      <div className='mt-2 text-danger'>
                        {typeof errors.username.message === 'string' && errors.username.message}
                      </div>
                    )}
                    <Controller
                      name='password'
                      control={control}
                      render={({ field }) => (
                        <AntInput
                          {...field}
                          type='password'
                          className='mt-4'
                          placeholder='Password'
                          errors={Boolean(errors.password?.message) || false}
                        />
                      )}
                    />
                    {errors.password && (
                      <div className='mt-2 text-danger'>
                        {typeof errors.password.message === 'string' && errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className='mt-5 text-center intro-x xl:mt-8 xl:text-left'>
                    <Button
                      variant='primary'
                      className='w-full px-4 py-3 align-top xl:w-32 xl:mr-3'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Loading...' : 'Login'}
                    </Button>
                  </div>
                </form>
                <div className='mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left'>
                  By signin up, you agree to our{' '}
                  <a className='text-primary dark:text-slate-200' href=''>
                    Terms and Conditions
                  </a>{' '}
                  &{' '}
                  <a className='text-primary dark:text-slate-200' href=''>
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

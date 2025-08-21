import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectColorScheme, setColorScheme, ColorSchemes } from '@/stores/colorSchemeSlice';
import { selectTheme, setTheme, setLayout, Themes } from '@/stores/themeSlice';
import { selectDarkMode, setDarkMode } from '@/stores/darkModeSlice';
import { Slideover } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import clsx from 'clsx';

function Main({
  themeSwitcherSlideover,
  setThemeSwitcherSlideover,
}: {
  themeSwitcherSlideover?: boolean | undefined;
  setThemeSwitcherSlideover?: (value: boolean) => void | undefined;
}) {
  const dispatch = useAppDispatch();

  const activeColorScheme = useAppSelector(selectColorScheme);
  const activeDarkMode = useAppSelector(selectDarkMode);

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll('html')[0];
    el.setAttribute('class', activeColorScheme);
    activeDarkMode && el.classList.add('dark');
  };
  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme));
    setColorSchemeClass();
  };
  setColorSchemeClass();

  const setDarkModeClass = () => {
    const el = document.querySelectorAll('html')[0];
    activeDarkMode ? el.classList.add('dark') : el.classList.remove('dark');
  };
  const switchDarkMode = (darkMode: boolean) => {
    dispatch(setDarkMode(darkMode));
    setDarkModeClass();
  };
  setDarkModeClass();

  const colorSchemes: Array<ColorSchemes> = ['default', 'theme-1', 'theme-2', 'theme-3', 'theme-4'];

  return (
    <div>
      <Slideover
        open={themeSwitcherSlideover}
        onClose={() => {
          setThemeSwitcherSlideover && setThemeSwitcherSlideover(false);
        }}
      >
        <Slideover.Panel className='w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]'>
          <a
            href=''
            className='focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105'
            onClick={(e) => {
              e.preventDefault();
              setThemeSwitcherSlideover && setThemeSwitcherSlideover(false);
            }}
          >
            <Lucide className='w-3 h-3 sm:w-8 sm:h-8 stroke-[1]' icon='X' />
          </a>
          <Slideover.Description className='p-0'>
            <div className='flex flex-col'>
              <div className='px-8 pt-6 pb-8'>
                <div className='text-base font-medium'>Color Schemes</div>
                <div className='text-slate-500 mt-0.5'>Choose your color schemes</div>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3.5 mt-5'>
                  {colorSchemes.map((colorScheme, colorKey) => (
                    <div key={colorKey}>
                      <div
                        onClick={() => switchColorScheme(colorScheme)}
                        className={clsx([
                          'h-12 cursor-pointer bg-slate-50 box rounded-full p-1 border-slate-300/80',
                          activeColorScheme == colorScheme && 'border-2 border-theme-1/60',
                        ])}
                      >
                        <div className='h-full overflow-hidden rounded-full'>
                          <div className='flex items-center h-full gap-1 -mx-2'>
                            <div
                              className={clsx(['w-1/2 h-[140%] bg-theme-1 rotate-12', colorScheme])}
                            ></div>
                            <div
                              className={clsx(['w-1/2 h-[140%] bg-theme-2 rotate-12', colorScheme])}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='border-b border-dashed'></div>
              <div className='px-8 pt-6 pb-8'>
                <div className='text-base font-medium'>Appearance</div>
                <div className='mt-0.5 text-slate-500'>Choose your appearance</div>
                <div className='mt-5 grid grid-cols-2 gap-3.5'>
                  <div>
                    <a
                      onClick={() => switchDarkMode(false)}
                      className={clsx([
                        'h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block',
                        '[&.active]:border-2 [&.active]:border-theme-1/60',
                        !activeDarkMode ? 'active' : '',
                      ])}
                    >
                      <div className='h-full overflow-hidden rounded-md bg-slate-200'></div>
                    </a>
                    <div className='mt-2.5 text-center text-xs capitalize'>Light</div>
                  </div>
                  <div>
                    <a
                      onClick={() => switchDarkMode(true)}
                      className={clsx([
                        'h-12 cursor-pointer bg-slate-50 box p-1 border-slate-300/80 block',
                        '[&.active]:border-2 [&.active]:border-theme-1/60',
                        activeDarkMode ? 'active' : '',
                      ])}
                    >
                      <div className='h-full overflow-hidden rounded-md bg-slate-900'></div>
                    </a>
                    <div className='mt-2.5 text-center text-xs capitalize'>Dark</div>
                  </div>
                </div>
              </div>
            </div>
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    </div>
  );
}

export default Main;

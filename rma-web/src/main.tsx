import ScrollToTop from '@/components/Base/ScrollToTop';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/css/app.css';
import { store } from './stores/store';
import { FrappeProvider } from 'frappe-react-sdk';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import '@ant-design/v5-patch-for-react-19';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FrappeProvider
    enableSocket={false}
    swrConfig={{
      revalidateOnFocus: false,
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
      <Toaster position='bottom-center' reverseOrder={false} toastOptions={{ duration: 4000 }} />
    </Provider>
  </FrappeProvider>
);

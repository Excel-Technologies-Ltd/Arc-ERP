import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/css/app.css';
import { store } from './stores/store';
import { FrappeProvider } from 'frappe-react-sdk';
import { Toaster } from 'react-hot-toast';
import '@ant-design/v5-patch-for-react-19';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FrappeProvider
    enableSocket={false}
    socketPort='9000'
    swrConfig={{
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }}
  >
    <Provider store={store}>
      <App />
      <Toaster position='bottom-center' reverseOrder={false} toastOptions={{ duration: 4000 }} />
    </Provider>
  </FrappeProvider>
);

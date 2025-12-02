import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './assets/css/app.css';
import { store } from './stores/store';
import { FrappeProvider } from 'frappe-react-sdk';
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
    </Provider>
  </FrappeProvider>
);

import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../themes';
import {
  URLLogin,
  URLPurchase,
  URLAddSalesInvoice,
  URLSalesInvoiceList,
  URLSalesReturn,
  URLPurchaseDetails,
  URLCustomerProfile,
} from './routes.url';
import PrivateGuard from '@/guard/PrivateGuard';
import PublicGuard from '@/guard/PublicGuard';
import { lazy } from 'react';
import Loadable from '@/shared/loadable/Loadable';

// Lazy Components
const DashboardOverview = Loadable(lazy(() => import('../pages/DashboardOverview')));
const Purchase = Loadable(lazy(() => import('../pages/purchase/purchase/Purchase')));
const AddSalesInvoice = Loadable(
  lazy(() => import('../pages/sales/add-sales-invoice/AddSalesInvoice'))
);
const SalesInvoiceList = Loadable(
  lazy(() => import('../pages/sales/sales-invoice-list/SalesInvoiceList'))
);
const SalesReturn = Loadable(lazy(() => import('../pages/sales/sales-return/SalesReturn')));
const ViewPurchase = Loadable(lazy(() => import('../pages/purchase/veiw-purchase/ViewPurchase')));
const CustomerProfile = Loadable(
  lazy(() => import('../pages/Customer/customer-profile/CustomerProfile'))
);

const routes = [
  {
    path: '/',
    element: <PrivateGuard />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <DashboardOverview />,
          },
          {
            path: URLPurchase(),
            element: <Purchase />,
          },
          {
            path: URLPurchaseDetails(),
            element: <ViewPurchase />,
          },
          {
            path: URLAddSalesInvoice(),
            element: <AddSalesInvoice />,
          },
          {
            path: URLSalesInvoiceList(),
            element: <SalesInvoiceList />,
          },
          {
            path: URLSalesReturn(),
            element: <SalesReturn />,
          },
          {
            path: URLCustomerProfile(),
            element: <CustomerProfile />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <PublicGuard />,
    children: [{ path: URLLogin(), element: <Login /> }],
  },

  {
    path: '/error-page',
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes, { basename: '/' });
export default router;

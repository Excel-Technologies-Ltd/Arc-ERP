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
} from './routes.url';
import PrivateGuard from '@/guard/PrivateGuard';
import PublicGuard from '@/guard/PublicGuard';
import { lazy } from 'react';
import Loadable from '@/shared/loadable/Loadable';

// Lazy Components
const DashboardOverview3 = Loadable(lazy(() => import('../pages/DashboardOverview3')));
const Purchase = Loadable(lazy(() => import('../pages/purchase/Purchase')));
const AddSalesInvoice = Loadable(
  lazy(() => import('../pages/sales/add-sales-invoice/AddSalesInvoice'))
);
const SalesInvoiceList = Loadable(
  lazy(() => import('../pages/sales/sales-invoice-list/SalesInvoiceList'))
);
const SalesReturn = Loadable(lazy(() => import('../pages/sales/sales-return/SalesReturn')));

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
            element: <DashboardOverview3 />,
          },
          {
            path: URLPurchase(),
            element: <Purchase />,
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

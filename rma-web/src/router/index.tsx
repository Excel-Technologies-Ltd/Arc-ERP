import { createBrowserRouter } from 'react-router-dom';
import {
  URLLogin,
  URLPurchase,
  URLAddSalesInvoice,
  URLSalesInvoiceList,
  URLSalesReturn,
  URLPurchaseDetails,
  URLCustomerProfile,
  URLErrorPage,
  URLSalesDetails,
  URLAddStock,
  URLStockEntrylist,
} from './routes.url';
import PrivateGuard from '@/guard/PrivateGuard';
import PublicGuard from '@/guard/PublicGuard';
import { lazy } from 'react';
import Loadable from '@/components/loadable/Loadable';
import PermissionGuard from '@/guard/PermissionGuard';

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
const Layout = Loadable(lazy(() => import('../layout/index')));
const Login = Loadable(lazy(() => import('../pages/Login')));
const ErrorPage = Loadable(lazy(() => import('../pages/ErrorPage')));
const ViewSalesInvoice = Loadable(
  lazy(() => import('../pages/sales/sales-invoice-list/view-sales-invoice/ViewSalesInvoice'))
);
const AddStockEntry = Loadable(lazy(() => import('../pages/Stock/add-stock-entry')));
const StockEntryList = Loadable(lazy(() => import('../pages/Stock/stock-entry-list')));

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
            element: (
              <PermissionGuard entity='Purchase Invoice' action='read'>
                <Purchase />
              </PermissionGuard>
            ),
          },
          {
            path: URLPurchaseDetails(),
            element: (
              <PermissionGuard entity='Purchase Invoice' action='read'>
                <ViewPurchase />
              </PermissionGuard>
            ),
          },
          {
            path: URLAddSalesInvoice(),
            element: (
              <PermissionGuard entity='Sales Invoice' action='create'>
                <AddSalesInvoice />
              </PermissionGuard>
            ),
          },
          {
            path: URLSalesInvoiceList(),
            element: (
              <PermissionGuard entity='Sales Invoice' action='read'>
                <SalesInvoiceList />
              </PermissionGuard>
            ),
          },
          {
            path: URLSalesDetails(),
            element: (
              <PermissionGuard entity='Sales Invoice' action='read'>
                <ViewSalesInvoice />
              </PermissionGuard>
            ),
          },
          {
            path: URLSalesReturn(),
            element: (
              <PermissionGuard entity='Sales Return' action='create'>
                <SalesReturn />
              </PermissionGuard>
            ),
          },
          {
            path: URLCustomerProfile(),
            element: (
              <PermissionGuard entity='Customer' action='read'>
                <CustomerProfile />
              </PermissionGuard>
            ),
          },
          {
            path: URLAddStock(),
            element: <AddStockEntry />,
          },
          {
            path: URLStockEntrylist(),
            element: <StockEntryList />,
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
    path: URLErrorPage(),
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes, { basename: '/rma-web' });
export default router;

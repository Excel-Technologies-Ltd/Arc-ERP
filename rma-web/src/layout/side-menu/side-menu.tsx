import { type Menu } from '@/types/menu/menu.types';
import {
  URLPurchase,
  URLSalesInvoiceList,
  URLSalesReturn,
  URLAddSalesInvoice,
  URLAddStock,
  URLStockEntrylist,
  URLStockAvailability,
  URLStockSerial,
  URLStockLedger,
  URLCustomerProfile,
  URLCustomerBrandLimit,
  URLServer,
  URLItemPrice,
} from '@/router/routes.url';

import { FaHome } from 'react-icons/fa';

const menu: Array<Menu | 'divider'> = [
  {
    icon: 'ShoppingBag',
    icon2: <FaHome />,
    title: 'Home',
    pathname: '/',
  },
  'divider',
  {
    icon: 'ShoppingBag',
    title: 'Purchase',
    pathname: URLPurchase(),
  },
  {
    icon: 'ShoppingBag',
    title: 'Sales',
    subMenu: [
      {
        icon: 'Activity',
        pathname: URLAddSalesInvoice(),
        title: 'Add Sales Invoice',
      },
      {
        icon: 'Activity',
        pathname: URLSalesInvoiceList(),
        title: 'Sales Invoice List',
      },
      {
        icon: 'Activity',
        pathname: URLSalesReturn(),
        title: 'Sales Return',
      },
    ],
  },
  {
    icon: 'ShoppingBag',
    title: 'Stock',
    subMenu: [
      {
        icon: 'Activity',
        pathname: URLAddStock(),
        title: 'Add Stock Entry',
      },
      {
        icon: 'Activity',
        pathname: URLStockEntrylist(),
        title: 'Stock Entry List',
      },
      {
        icon: 'Activity',
        pathname: URLStockAvailability(),
        title: 'Stock Availability',
      },
      {
        icon: 'Activity',
        pathname: URLStockSerial(),
        title: 'Stock Serial',
      },
      {
        icon: 'Activity',
        pathname: URLStockLedger(),
        title: 'Stock Ledger',
      },
    ],
  },
  {
    icon: 'ShoppingBag',
    title: 'Customer',
    subMenu: [
      {
        icon: 'Activity',
        pathname: URLCustomerProfile(),
        title: 'Customer Profile',
      },
      {
        icon: 'Activity',
        pathname: URLCustomerBrandLimit(),
        title: 'Customer Brand Limit',
      },
    ],
  },
  {
    icon: 'ShoppingBag',
    title: 'Settings',
    subMenu: [
      {
        icon: 'Activity',
        pathname: URLServer(),
        title: 'Server',
      },
      {
        icon: 'Activity',
        pathname: URLItemPrice(),
        title: 'Item Price',
      },
    ],
  },
];

export default menu;

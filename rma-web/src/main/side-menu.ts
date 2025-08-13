import { type Menu } from '@/stores/menuSlice';
import {
  URLPurchase,
  URLSalesInvoiceList,
  URLSalesReturn,
  URLAddSalesInvoice,
} from '@/router/routes.url';

const menu: Array<Menu | 'divider'> = [
  {
    icon: 'Home',
    title: 'Home',
    pathname: '/',
  },
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
];

export default menu;

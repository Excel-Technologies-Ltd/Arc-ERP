import { Menu } from '@/types/menu/menu.types';
import { FaHome, FaShoppingBag } from '@/components/Base/Icons';
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

const MainMenu = () => {
  const menu: Array<Menu | 'divider'> = [
    {
      icon: <FaHome />,
      title: 'Home',
      pathname: '/',
    },
    {
      icon: <FaShoppingBag />,
      title: 'Purchase',
      pathname: URLPurchase(),
    },
    {
      icon: <FaShoppingBag />,
      title: 'Sales',
      subMenu: [
        {
          icon: <FaHome />,
          pathname: URLAddSalesInvoice(),
          title: 'Add Sales Invoice',
        },
        {
          icon: <FaHome />,
          pathname: URLSalesInvoiceList(),
          title: 'Sales Invoice List',
        },
        {
          icon: <FaHome />,
          pathname: URLSalesReturn(),
          title: 'Sales Return',
        },
      ],
    },
    {
      icon: <FaHome />,
      title: 'Stock',
      subMenu: [
        {
          icon: <FaHome />,
          pathname: URLAddStock(),
          title: 'Add Stock Entry',
        },
        {
          icon: <FaHome />,
          pathname: URLStockEntrylist(),
          title: 'Stock Entry List',
        },
        {
          icon: <FaHome />,
          pathname: URLStockAvailability(),
          title: 'Stock Availability',
        },
        {
          icon: <FaHome />,
          pathname: URLStockSerial(),
          title: 'Serial Quantity',
        },
        {
          icon: <FaHome />,
          pathname: URLStockLedger(),
          title: 'Stock Ledger',
        },
      ],
    },
    {
      icon: <FaHome />,
      title: 'Customer',
      subMenu: [
        {
          icon: <FaHome />,
          pathname: URLCustomerProfile(),
          title: 'Customer Profile',
        },
        {
          icon: <FaHome />,
          pathname: URLCustomerBrandLimit(),
          title: 'Brand Limit Ladger',
        },
      ],
    },
    {
      icon: <FaHome />,
      title: 'Settings',
      subMenu: [
        {
          icon: <FaHome />,
          pathname: URLServer(),
          title: 'Server',
        },
        {
          icon: <FaHome />,
          pathname: URLItemPrice(),
          title: 'Item Price',
        },
      ],
    },
  ];

  return menu;
};

export default MainMenu;

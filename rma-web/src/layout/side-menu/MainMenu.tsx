import { Menu } from '@/types/menu/menu.types';
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
  URLSerialListSearch,
  URLSerialDetailSearch,
} from '@/router/routes.url';
import { FaHome } from 'react-icons/fa';
import { BiLineChart, BiPurchaseTag } from 'react-icons/bi';
import { RiStockLine } from 'react-icons/ri';
import { IoPeopleCircle } from 'react-icons/io5';
import { MdConfirmationNumber, MdVerifiedUser } from 'react-icons/md';

const MainMenu = () => {
  const menu: Array<Menu | 'divider'> = [
    {
      icon: <FaHome />,
      title: 'Home',
      pathname: '/',
    },
    {
      icon: <BiLineChart />,
      title: 'Purchase',
      pathname: URLPurchase(),
    },
    {
      icon: <BiPurchaseTag />,
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
      icon: <RiStockLine />,
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
      icon: <IoPeopleCircle />,
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
      icon: <MdVerifiedUser />,
      title: 'Warranty Portal',
      subMenu: [
        {
          icon: <FaHome />,
          pathname: URLSerialListSearch(),
          title: 'Serial List Search',
        },
        {
          icon: <FaHome />,
          pathname: URLSerialDetailSearch(),
          title: 'Serial Detail Search',
        },
      ],
    },
    {
      icon: <MdConfirmationNumber />,
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

// Auth URLS
export const URLLogin = () => '/login';

// Purchase URLS
export const URLPurchase = () => '/purchase';
export const URLPurchaseDetails = (invoiceNumber: string = ':invoice_number') =>
  `/purchase/view-purchase-invoice/${invoiceNumber}`;

// Sales URLS
export const URLAddSalesInvoice = () => '/sales/add-sales-invoice';
export const URLSalesInvoiceList = () => '/sales/sales-invoice-list';
export const URLSalesReturn = () => '/sales/sales-return';

// Stock URLS
export const URLAddStock = () => '/add-stock-entry';
export const URLStockEntrylist = () => '/stock-entry-list';
export const URLStockAvailability = () => '/stock-availability';
export const URLStockSerial = () => '/stock-serial';
export const URLStockLedger = () => '/stock-ledger';

// Customer URLS
export const URLCustomerProfile = () => '/customer-profile';
export const URLCustomerBrandLimit = () => '/customer-brand-limit';

// Settings Urls
export const URLServer = () => '/settings-server';
export const URLItemPrice = () => '/settings-item-price';

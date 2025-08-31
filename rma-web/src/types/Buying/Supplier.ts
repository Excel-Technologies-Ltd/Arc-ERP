import { AllowedToTransactWith } from '../Accounts/AllowedToTransactWith';
import { PartyAccount } from '../Accounts/PartyAccount';

export interface Supplier {
  name: string;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
  docstatus: 0 | 1 | 2;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  idx?: number;
  /**	Series : Select	*/
  naming_series?: 'ETLSUP-.#####';
  /**	Supplier Name : Data	*/
  supplier_name: string;
  /**	Country : Link - Country	*/
  country?: string;
  /**	Supplier Group : Link - Supplier Group	*/
  supplier_group: string;
  /**	Supplier Type : Select	*/
  supplier_type: 'Company' | 'Individual' | 'Partnership';
  /**	Is Transporter : Check	*/
  is_transporter?: 0 | 1;
  /**	Image : Attach Image	*/
  image?: string;
  /**	Billing Currency : Link - Currency	*/
  default_currency?: string;
  /**	Default Company Bank Account : Link - Bank Account	*/
  default_bank_account?: string;
  /**	Price List : Link - Price List	*/
  default_price_list?: string;
  /**	Default Payment Terms Template : Link - Payment Terms Template	*/
  payment_terms?: string;
  /**	Is Internal Supplier : Check	*/
  is_internal_supplier?: 0 | 1;
  /**	Represents Company : Link - Company	*/
  represents_company?: string;
  /**	Allowed To Transact With : Table - Allowed To Transact With	*/
  companies?: AllowedToTransactWith[];
  /**	Supplier Details : Text - Statutory info and other general information about your Supplier	*/
  supplier_details?: string;
  /**	Website : Data	*/
  website?: string;
  /**	Print Language : Link - Language	*/
  language?: string;
  /**	Tax ID : Data	*/
  tax_id?: string;
  /**	Tax Category : Link - Tax Category	*/
  tax_category?: string;
  /**	Tax Withholding Category : Link - Tax Withholding Category	*/
  tax_withholding_category?: string;
  /**	Supplier Primary Contact : Link - Contact - Reselect, if the chosen contact is edited after save	*/
  supplier_primary_contact?: string;
  /**	Mobile No : Read Only	*/
  mobile_no?: string;
  /**	Email Id : Read Only	*/
  email_id?: string;
  /**	Supplier Primary Address : Link - Address - Reselect, if the chosen address is edited after save	*/
  supplier_primary_address?: string;
  /**	Primary Address : Text	*/
  primary_address?: string;
  /**	Accounts : Table - Party Account - Mention if non-standard payable account	*/
  accounts?: PartyAccount[];
  /**	Allow Purchase Invoice Creation Without Purchase Order : Check	*/
  allow_purchase_invoice_creation_without_purchase_order?: 0 | 1;
  /**	Allow Purchase Invoice Creation Without Purchase Receipt : Check	*/
  allow_purchase_invoice_creation_without_purchase_receipt?: 0 | 1;
  /**	Is Frozen : Check	*/
  is_frozen?: 0 | 1;
  /**	Disabled : Check	*/
  disabled?: 0 | 1;
  /**	Warn RFQs : Check	*/
  warn_rfqs?: 0 | 1;
  /**	Warn POs : Check	*/
  warn_pos?: 0 | 1;
  /**	Prevent RFQs : Check	*/
  prevent_rfqs?: 0 | 1;
  /**	Prevent POs : Check	*/
  prevent_pos?: 0 | 1;
  /**	Block Supplier : Check	*/
  on_hold?: 0 | 1;
  /**	Hold Type : Select	*/
  hold_type?: '' | 'All' | 'Invoices' | 'Payments';
  /**	Release Date : Date - Leave blank if the Supplier is blocked indefinitely	*/
  release_date?: string;
}

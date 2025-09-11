export interface TaxWithheldVouchers {
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
  /**	Voucher Type : Data	*/
  voucher_type?: string;
  /**	Voucher Name : Data	*/
  voucher_name?: string;
  /**	Taxable Amount : Currency	*/
  taxable_amount?: number;
}

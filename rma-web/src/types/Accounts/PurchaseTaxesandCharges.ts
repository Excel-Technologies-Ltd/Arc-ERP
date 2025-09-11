export interface PurchaseTaxesandCharges {
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
  /**	Consider Tax or Charge for : Select	*/
  category: 'Valuation and Total' | 'Valuation' | 'Total';
  /**	Add or Deduct : Select	*/
  add_deduct_tax: 'Add' | 'Deduct';
  /**	Type : Select	*/
  charge_type:
    | ''
    | 'Actual'
    | 'On Net Total'
    | 'On Previous Row Amount'
    | 'On Previous Row Total'
    | 'On Item Quantity';
  /**	Reference Row # : Data	*/
  row_id?: string;
  /**	Is this Tax included in Basic Rate? : Check - If checked, the tax amount will be considered as already included in the Print Rate / Print Amount	*/
  included_in_print_rate?: 0 | 1;
  /**	Considered In Paid Amount : Check - If checked, the tax amount will be considered as already included in the Paid Amount in Payment Entry	*/
  included_in_paid_amount?: 0 | 1;
  /**	Account Head : Link - Account	*/
  account_head: string;
  /**	Description : Small Text	*/
  description: string;
  /**	Tax Rate : Float	*/
  rate?: number;
  /**	Cost Center : Link - Cost Center	*/
  cost_center?: string;
  /**	Account Currency : Link - Currency	*/
  account_currency?: string;
  /**	Amount : Currency	*/
  tax_amount?: number;
  /**	Tax Amount After Discount Amount : Currency	*/
  tax_amount_after_discount_amount?: number;
  /**	Total : Currency	*/
  total?: number;
  /**	Amount (Company Currency) : Currency	*/
  base_tax_amount?: number;
  /**	Total (Company Currency) : Currency	*/
  base_total?: number;
  /**	Tax Amount After Discount Amount : Currency	*/
  base_tax_amount_after_discount_amount?: number;
  /**	Item Wise Tax Detail  : Code	*/
  item_wise_tax_detail?: string;
}

export interface ItemDefault {
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
  /**	Company : Link - Company	*/
  company: string;
  /**	Default Warehouse : Link - Warehouse	*/
  default_warehouse?: string;
  /**	Default Price List : Link - Price List	*/
  default_price_list?: string;
  /**	Default Discount Account : Link - Account	*/
  default_discount_account?: string;
  /**	Default Buying Cost Center : Link - Cost Center	*/
  buying_cost_center?: string;
  /**	Default Supplier : Link - Supplier	*/
  default_supplier?: string;
  /**	Default Expense Account : Link - Account	*/
  expense_account?: string;
  /**	Default Provisional Account : Link - Account	*/
  default_provisional_account?: string;
  /**	Default Selling Cost Center : Link - Cost Center	*/
  selling_cost_center?: string;
  /**	Default Income Account : Link - Account	*/
  income_account?: string;
  /**	Deferred Expense Account : Link - Account	*/
  deferred_expense_account?: string;
  /**	Deferred Revenue Account : Link - Account	*/
  deferred_revenue_account?: string;
}

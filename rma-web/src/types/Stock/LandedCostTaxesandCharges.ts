export interface LandedCostTaxesandCharges {
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
  /**	Expense Account : Link - Account	*/
  expense_account?: string;
  /**	Account Currency : Link - Currency	*/
  account_currency?: string;
  /**	Exchange Rate : Float	*/
  exchange_rate?: number;
  /**	Description : Small Text	*/
  description: string;
  /**	Amount : Currency	*/
  amount: number;
  /**	Amount (Company Currency) : Currency	*/
  base_amount?: number;
}

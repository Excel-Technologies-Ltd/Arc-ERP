export interface PaymentSchedule {
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
  /**	Payment Term : Link - Payment Term	*/
  payment_term?: string;
  /**	Description : Small Text	*/
  description?: string;
  /**	Due Date : Date	*/
  due_date: string;
  /**	Mode of Payment : Link - Mode of Payment	*/
  mode_of_payment?: string;
  /**	Invoice Portion : Percent	*/
  invoice_portion?: number;
  /**	Discount Type : Select	*/
  discount_type?: 'Percentage' | 'Amount';
  /**	Discount Date : Date	*/
  discount_date?: string;
  /**	Discount : Float	*/
  discount?: number;
  /**	Payment Amount : Currency	*/
  payment_amount: number;
  /**	Outstanding : Currency	*/
  outstanding?: number;
  /**	Paid Amount : Currency	*/
  paid_amount?: number;
  /**	Discounted Amount : Currency	*/
  discounted_amount?: number;
  /**	Payment Amount (Company Currency) : Currency	*/
  base_payment_amount?: number;
}

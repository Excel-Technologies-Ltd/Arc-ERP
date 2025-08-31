export interface CustomerCreditLimit {
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
  company?: string;
  /**	Credit Limit : Currency	*/
  credit_limit?: number;
  /**	Bypass Credit Limit Check at Sales Order : Check	*/
  bypass_credit_limit_check?: 0 | 1;
}

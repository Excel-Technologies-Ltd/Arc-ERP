export interface AdvanceTax {
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
  /**	Reference Type : Link - DocType	*/
  reference_type?: string;
  /**	Reference Name : Dynamic Link	*/
  reference_name?: string;
  /**	Reference Detail : Data	*/
  reference_detail?: string;
  /**	Account Head : Link - Account	*/
  account_head?: string;
  /**	Allocated Amount : Currency	*/
  allocated_amount?: number;
}

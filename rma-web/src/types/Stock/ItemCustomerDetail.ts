export interface ItemCustomerDetail {
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
  /**	Customer Name : Link - Customer	*/
  customer_name?: string;
  /**	Customer Group : Link - Customer Group	*/
  customer_group?: string;
  /**	Ref Code : Data	*/
  ref_code: string;
}

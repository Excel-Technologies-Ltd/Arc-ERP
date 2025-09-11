export interface ItemTax {
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
  /**	Item Tax Template : Link - Item Tax Template	*/
  item_tax_template: string;
  /**	Tax Category : Link - Tax Category	*/
  tax_category?: string;
  /**	Valid From : Date	*/
  valid_from?: string;
  /**	Minimum Net Rate : Float	*/
  minimum_net_rate?: number;
  /**	Maximum Net Rate : Float	*/
  maximum_net_rate?: number;
}

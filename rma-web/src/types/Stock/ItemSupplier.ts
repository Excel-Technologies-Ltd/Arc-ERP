export interface ItemSupplier {
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
  /**	Supplier : Link - Supplier	*/
  supplier: string;
  /**	Supplier Part Number : Data	*/
  supplier_part_no?: string;
}

export interface ItemReorder {
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
  /**	Check in (group) : Link - Warehouse	*/
  warehouse_group?: string;
  /**	Request for : Link - Warehouse	*/
  warehouse: string;
  /**	Re-order Level : Float	*/
  warehouse_reorder_level: number;
  /**	Re-order Qty : Float	*/
  warehouse_reorder_qty?: number;
  /**	Material Request Type : Select	*/
  material_request_type: 'Purchase' | 'Transfer' | 'Material Issue' | 'Manufacture';
}

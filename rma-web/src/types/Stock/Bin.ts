export interface Bin {
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
  /**	Item Code : Link - Item	*/
  item_code: string;
  /**	Item Name : Data	*/
  excel_item_name?: string;
  /**	Item Brand : Link - Brand	*/
  excel_item_brand?: string;
  /**	Item Group : Link - Item Group	*/
  excel_item_group?: string;
  /**	Warehouse : Link - Warehouse	*/
  warehouse: string;
  /**	Actual Qty : Float	*/
  actual_qty?: number;
  /**	Planned Qty : Float	*/
  planned_qty?: number;
  /**	Requested Qty : Float	*/
  indented_qty?: number;
  /**	Ordered Qty : Float	*/
  ordered_qty?: number;
  /**	Reserved Qty : Float	*/
  reserved_qty?: number;
  /**	Reserved Qty for Production : Float	*/
  reserved_qty_for_production?: number;
  /**	Reserved Qty for Subcontract : Float	*/
  reserved_qty_for_sub_contract?: number;
  /**	Reserved Qty for Production Plan : Float	*/
  reserved_qty_for_production_plan?: number;
  /**	Projected Qty : Float	*/
  projected_qty?: number;
  /**	UOM : Link - UOM	*/
  stock_uom?: string;
  /**	Valuation Rate : Float	*/
  valuation_rate?: number;
  /**	Stock Value : Float	*/
  stock_value?: number;
}

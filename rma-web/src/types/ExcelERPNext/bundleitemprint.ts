
export interface bundleitemprint{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Parent Item : Link - Item	*/
	parent_item?: string
	/**	Item Code : Link - Item	*/
	item_code?: string
	/**	Item Name : Data	*/
	item_name?: string
	/**	Description : Text Editor	*/
	description?: string
	/**	From Warehouse : Link - Warehouse	*/
	warehouse?: string
	/**	To Warehouse (Optional) : Link - Warehouse	*/
	target_warehouse?: string
	/**	Qty : Float	*/
	qty?: number
	/**	Serial No : Text	*/
	serial_no?: string
	/**	Batch No : Link - Batch	*/
	batch_no?: string
	/**	Actual Batch Quantity : Float	*/
	actual_batch_qty?: number
	/**	Actual Qty : Float	*/
	actual_qty?: number
	/**	Projected Qty : Float	*/
	projected_qty?: number
	/**	UOM : Link - UOM	*/
	uom?: string
	/**	Page Break : Check	*/
	page_break?: 0 | 1
	/**	Prevdoc DocType : Data	*/
	prevdoc_doctype?: string
	/**	Parent Detail docname : Data	*/
	parent_detail_docname?: string
}
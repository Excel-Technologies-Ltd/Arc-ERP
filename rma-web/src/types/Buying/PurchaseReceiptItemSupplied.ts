
export interface PurchaseReceiptItemSupplied{
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
	/**	Item Code : Link - Item	*/
	main_item_code?: string
	/**	Raw Material Item Code : Link - Item	*/
	rm_item_code?: string
	/**	Item Name : Data	*/
	item_name?: string
	/**	BOM Detail No : Data	*/
	bom_detail_no?: string
	/**	Description : Text Editor	*/
	description?: string
	/**	Stock Uom : Link - UOM	*/
	stock_uom?: string
	/**	Conversion Factor : Float	*/
	conversion_factor?: number
	/**	Reference Name : Data	*/
	reference_name?: string
	/**	Rate : Currency	*/
	rate?: number
	/**	Amount : Currency	*/
	amount?: number
	/**	Available Qty For Consumption : Float	*/
	required_qty?: number
	/**	Qty to Be Consumed : Float	*/
	consumed_qty: number
	/**	Current Stock : Float	*/
	current_stock?: number
	/**	Batch No : Link - Batch	*/
	batch_no?: string
	/**	Serial No : Text	*/
	serial_no?: string
	/**	Purchase Order : Link - Purchase Order	*/
	purchase_order?: string
}
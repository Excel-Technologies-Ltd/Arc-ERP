
export interface SalesInvoiceItem{
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
	/**	Barcode : Data	*/
	barcode?: string
	/**	Has Item Scanned : Check	*/
	has_item_scanned?: 0 | 1
	/**	Item : Link - Item	*/
	item_code?: string
	/**	Item Name : Data	*/
	item_name: string
	/**	Customer's Item Code : Data	*/
	customer_item_code?: string
	/**	Description : Text Editor	*/
	description: string
	/**	Item Group : Link - Item Group	*/
	item_group?: string
	/**	Brand Name : Data	*/
	brand?: string
	/**	Image : Attach	*/
	image?: string
	/**	Image View : Image	*/
	image_view?: string
	/**	Quantity : Float	*/
	qty?: number
	/**	Stock UOM : Link - UOM	*/
	stock_uom?: string
	/**	UOM : Link - UOM	*/
	uom: string
	/**	UOM Conversion Factor : Float	*/
	conversion_factor: number
	/**	Qty as per Stock UOM : Float	*/
	stock_qty?: number
	/**	Price List Rate : Currency	*/
	price_list_rate?: number
	/**	Price List Rate (Company Currency) : Currency	*/
	base_price_list_rate?: number
	/**	Margin Type : Select	*/
	margin_type?: "" | "Percentage" | "Amount"
	/**	Margin Rate or Amount : Float	*/
	margin_rate_or_amount?: number
	/**	Rate With Margin : Currency	*/
	rate_with_margin?: number
	/**	Discount (%) on Price List Rate with Margin : Percent	*/
	discount_percentage?: number
	/**	Discount Amount : Currency	*/
	discount_amount?: number
	/**	Rate With Margin (Company Currency) : Currency	*/
	base_rate_with_margin?: number
	/**	Rate : Currency	*/
	rate: number
	/**	Amount : Currency	*/
	amount: number
	/**	Item Tax Template : Link - Item Tax Template	*/
	item_tax_template?: string
	/**	Rate (Company Currency) : Currency	*/
	base_rate: number
	/**	Amount (Company Currency) : Currency	*/
	base_amount: number
	/**	Pricing Rules : Small Text	*/
	pricing_rules?: string
	/**	Rate of Stock UOM : Currency	*/
	stock_uom_rate?: number
	/**	Is Free Item : Check	*/
	is_free_item?: 0 | 1
	/**	Grant Commission : Check	*/
	grant_commission?: 0 | 1
	/**	Net Rate : Currency	*/
	net_rate?: number
	/**	Net Amount : Currency	*/
	net_amount?: number
	/**	Net Rate (Company Currency) : Currency	*/
	base_net_rate?: number
	/**	Net Amount (Company Currency) : Currency	*/
	base_net_amount?: number
	/**	Delivered By Supplier : Check	*/
	delivered_by_supplier?: 0 | 1
	/**	Income Account : Link - Account	*/
	income_account: string
	/**	Is Fixed Asset : Check	*/
	is_fixed_asset?: 0 | 1
	/**	Asset : Link - Asset	*/
	asset?: string
	/**	Finance Book : Link - Finance Book	*/
	finance_book?: string
	/**	Expense Account : Link - Account	*/
	expense_account?: string
	/**	Discount Account : Link - Account	*/
	discount_account?: string
	/**	Deferred Revenue Account : Link - Account	*/
	deferred_revenue_account?: string
	/**	Service Stop Date : Date	*/
	service_stop_date?: string
	/**	Enable Deferred Revenue : Check	*/
	enable_deferred_revenue?: 0 | 1
	/**	Service Start Date : Date	*/
	service_start_date?: string
	/**	Service End Date : Date	*/
	service_end_date?: string
	/**	Weight Per Unit : Float	*/
	weight_per_unit?: number
	/**	Total Weight : Float	*/
	total_weight?: number
	/**	Weight UOM : Link - UOM	*/
	weight_uom?: string
	/**	Warehouse : Link - Warehouse	*/
	warehouse?: string
	/**	Target Warehouse : Link - Warehouse	*/
	target_warehouse?: string
	/**	Quality Inspection : Link - Quality Inspection	*/
	quality_inspection?: string
	/**	Batch No : Link - Batch	*/
	batch_no?: string
	/**	Incoming Rate (Costing) : Currency	*/
	incoming_rate?: number
	/**	Allow Zero Valuation Rate : Check	*/
	allow_zero_valuation_rate?: 0 | 1
	/**	Serial No : Small Text	*/
	serial_no?: string
	/**	Item Tax Rate : Small Text	*/
	item_tax_rate?: string
	/**	Available Batch Qty at Warehouse : Float	*/
	actual_batch_qty?: number
	/**	Available Qty at Warehouse : Float	*/
	actual_qty?: number
	/**	Sales Order : Link - Sales Order	*/
	sales_order?: string
	/**	Sales Order Item : Data	*/
	so_detail?: string
	/**	Sales Invoice Item : Data	*/
	sales_invoice_item?: string
	/**	Delivery Note : Link - Delivery Note	*/
	delivery_note?: string
	/**	Delivery Note Item : Data	*/
	dn_detail?: string
	/**	Delivered Qty : Float	*/
	delivered_qty?: number
	/**	Purchase Order : Link - Purchase Order	*/
	purchase_order?: string
	/**	Purchase Order Item : Data	*/
	purchase_order_item?: string
	/**	Cost Center : Link - Cost Center	*/
	cost_center: string
	/**	Project : Link - Project	*/
	project?: string
	/**	Page Break : Check	*/
	page_break?: 0 | 1
}
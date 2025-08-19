
export interface PurchaseInvoiceItem{
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
	/**	Item : Link - Item	*/
	item_code?: string
	/**	Product Bundle : Link - Product Bundle	*/
	product_bundle?: string
	/**	Item Name : Data	*/
	item_name: string
	/**	Description : Text Editor	*/
	description?: string
	/**	Brand : Link - Brand	*/
	brand?: string
	/**	Item Group : Link - Item Group	*/
	item_group?: string
	/**	Image : Attach	*/
	image?: string
	/**	Image View : Image	*/
	image_view?: string
	/**	Received Qty : Float	*/
	received_qty?: number
	/**	Accepted Qty : Float	*/
	qty: number
	/**	Rejected Qty : Float	*/
	rejected_qty?: number
	/**	UOM : Link - UOM	*/
	uom: string
	/**	UOM Conversion Factor : Float	*/
	conversion_factor: number
	/**	Stock UOM : Link - UOM	*/
	stock_uom?: string
	/**	Accepted Qty in Stock UOM : Float	*/
	stock_qty: number
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
	/**	Discount on Price List Rate (%) : Percent	*/
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
	/**	Apply TDS : Check	*/
	apply_tds?: 0 | 1
	/**	Net Rate : Currency	*/
	net_rate?: number
	/**	Net Amount : Currency	*/
	net_amount?: number
	/**	Net Rate (Company Currency) : Currency	*/
	base_net_rate?: number
	/**	Net Amount (Company Currency) : Currency	*/
	base_net_amount?: number
	/**	Valuation Rate : Currency	*/
	valuation_rate?: number
	/**	Item Tax Amount Included in Value : Currency	*/
	item_tax_amount?: number
	/**	Landed Cost Voucher Amount : Currency	*/
	landed_cost_voucher_amount?: number
	/**	Raw Materials Supplied Cost : Currency	*/
	rm_supp_cost?: number
	/**	Accepted Warehouse : Link - Warehouse	*/
	warehouse?: string
	/**	From Warehouse : Link - Warehouse	*/
	from_warehouse?: string
	/**	Quality Inspection : Link - Quality Inspection	*/
	quality_inspection?: string
	/**	Serial No : Text	*/
	serial_no?: string
	/**	Rejected Warehouse : Link - Warehouse	*/
	rejected_warehouse?: string
	/**	Batch No : Link - Batch	*/
	batch_no?: string
	/**	Rejected Serial No : Text	*/
	rejected_serial_no?: string
	/**	Manufacturer : Link - Manufacturer	*/
	manufacturer?: string
	/**	Manufacturer Part Number : Data	*/
	manufacturer_part_no?: string
	/**	Expense Head : Link - Account	*/
	expense_account?: string
	/**	WIP Composite Asset : Link - Asset	*/
	wip_composite_asset?: string
	/**	Is Fixed Asset : Check	*/
	is_fixed_asset?: 0 | 1
	/**	Asset Location : Link - Location	*/
	asset_location?: string
	/**	Asset Category : Link - Asset Category	*/
	asset_category?: string
	/**	Deferred Expense Account : Link - Account	*/
	deferred_expense_account?: string
	/**	Service Stop Date : Date	*/
	service_stop_date?: string
	/**	Enable Deferred Expense : Check	*/
	enable_deferred_expense?: 0 | 1
	/**	Service Start Date : Date	*/
	service_start_date?: string
	/**	Service End Date : Date	*/
	service_end_date?: string
	/**	Allow Zero Valuation Rate : Check	*/
	allow_zero_valuation_rate?: 0 | 1
	/**	Item Tax Rate : Code - Tax detail table fetched from item master as a string and stored in this field.
Used for Taxes and Charges	*/
	item_tax_rate?: string
	/**	BOM : Link - BOM	*/
	bom?: string
	/**	Include Exploded Items : Check	*/
	include_exploded_items?: 0 | 1
	/**	Purchase Invoice Item : Data	*/
	purchase_invoice_item?: string
	/**	Purchase Order : Link - Purchase Order	*/
	purchase_order?: string
	/**	Purchase Order Item : Data	*/
	po_detail?: string
	/**	Purchase Receipt : Link - Purchase Receipt	*/
	purchase_receipt?: string
	/**	Purchase Receipt Detail : Data	*/
	pr_detail?: string
	/**	Sales Invoice Item : Data	*/
	sales_invoice_item?: string
	/**	Weight Per Unit : Float	*/
	weight_per_unit?: number
	/**	Total Weight : Float	*/
	total_weight?: number
	/**	Weight UOM : Link - UOM	*/
	weight_uom?: string
	/**	Project : Link - Project	*/
	project?: string
	/**	Cost Center : Link - Cost Center	*/
	cost_center?: string
	/**	Page Break : Check	*/
	page_break?: 0 | 1
}
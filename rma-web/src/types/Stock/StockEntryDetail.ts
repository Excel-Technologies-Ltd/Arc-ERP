
export interface StockEntryDetail{
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
	/**	Source Warehouse : Link - Warehouse	*/
	s_warehouse?: string
	/**	Target Warehouse : Link - Warehouse	*/
	t_warehouse?: string
	/**	Item Code : Link - Item	*/
	item_code: string
	/**	Item Name : Data	*/
	item_name?: string
	/**	Is Finished Item : Check	*/
	is_finished_item?: 0 | 1
	/**	Is Scrap Item : Check	*/
	is_scrap_item?: 0 | 1
	/**	Quality Inspection : Link - Quality Inspection	*/
	quality_inspection?: string
	/**	Subcontracted Item : Link - Item	*/
	subcontracted_item?: string
	/**	Description : Text Editor	*/
	description?: string
	/**	Item Group : Data	*/
	item_group?: string
	/**	Image : Attach	*/
	image?: string
	/**	Image View : Image	*/
	image_view?: string
	/**	Qty : Float	*/
	qty: number
	/**	Qty as per Stock UOM : Float	*/
	transfer_qty: number
	/**	Retain Sample : Check	*/
	retain_sample?: 0 | 1
	/**	UOM : Link - UOM	*/
	uom: string
	/**	Stock UOM : Link - UOM	*/
	stock_uom: string
	/**	Conversion Factor : Float	*/
	conversion_factor: number
	/**	Sample Quantity : Int	*/
	sample_quantity?: number
	/**	Basic Rate (as per Stock UOM) : Currency	*/
	basic_rate?: number
	/**	Additional Cost : Currency	*/
	additional_cost?: number
	/**	Valuation Rate : Currency	*/
	valuation_rate?: number
	/**	Allow Zero Valuation Rate : Check	*/
	allow_zero_valuation_rate?: 0 | 1
	/**	Set Basic Rate Manually : Check	*/
	set_basic_rate_manually?: 0 | 1
	/**	Basic Amount : Currency	*/
	basic_amount?: number
	/**	Amount : Currency	*/
	amount?: number
	/**	Serial No : Small Text	*/
	serial_no?: string
	/**	Batch No : Link - Batch	*/
	batch_no?: string
	/**	Difference Account : Link - Account	*/
	expense_account?: string
	/**	Cost Center : Link - Cost Center	*/
	cost_center?: string
	/**	Project : Link - Project	*/
	project?: string
	/**	Actual Qty (at source/target) : Float	*/
	actual_qty?: number
	/**	Transferred Qty : Float	*/
	transferred_qty?: number
	/**	BOM No : Link - BOM - BOM No. for a Finished Good Item	*/
	bom_no?: string
	/**	Allow Alternative Item : Check	*/
	allow_alternative_item?: 0 | 1
	/**	Material Request : Link - Material Request - Material Request used to make this Stock Entry	*/
	material_request?: string
	/**	Material Request Item : Link - Material Request Item	*/
	material_request_item?: string
	/**	Original Item : Link - Item	*/
	original_item?: string
	/**	Against Stock Entry : Link - Stock Entry	*/
	against_stock_entry?: string
	/**	Stock Entry Child : Data	*/
	ste_detail?: string
	/**	PO Supplied Item : Data	*/
	po_detail?: string
	/**	SCO Supplied Item : Data	*/
	sco_rm_detail?: string
	/**	Putaway Rule : Link - Putaway Rule	*/
	putaway_rule?: string
	/**	Reference Purchase Receipt : Link - Purchase Receipt	*/
	reference_purchase_receipt?: string
	/**	Job Card Item : Data	*/
	job_card_item?: string
}
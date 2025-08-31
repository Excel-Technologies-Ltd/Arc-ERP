
export interface SalesTaxesandCharges{
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
	/**	Type : Select	*/
	charge_type: "" | "Actual" | "On Net Total" | "On Previous Row Amount" | "On Previous Row Total" | "On Item Quantity"
	/**	Reference Row # : Data	*/
	row_id?: string
	/**	Account Head : Link - Account	*/
	account_head: string
	/**	Description : Small Text	*/
	description: string
	/**	Is this Tax included in Basic Rate? : Check - If checked, the tax amount will be considered as already included in the Print Rate / Print Amount	*/
	included_in_print_rate?: 0 | 1
	/**	Considered In Paid Amount : Check - If checked, the tax amount will be considered as already included in the Paid Amount in Payment Entry	*/
	included_in_paid_amount?: 0 | 1
	/**	Cost Center : Link - Cost Center	*/
	cost_center?: string
	/**	Tax Rate : Float	*/
	rate?: number
	/**	Account Currency : Link - Currency	*/
	account_currency?: string
	/**	Amount : Currency	*/
	tax_amount?: number
	/**	Total : Currency	*/
	total?: number
	/**	Tax Amount After Discount Amount : Currency	*/
	tax_amount_after_discount_amount?: number
	/**	Amount (Company Currency) : Currency	*/
	base_tax_amount?: number
	/**	Total (Company Currency) : Currency	*/
	base_total?: number
	/**	Tax Amount After Discount Amount (Company Currency) : Currency	*/
	base_tax_amount_after_discount_amount?: number
	/**	Item Wise Tax Detail : Code	*/
	item_wise_tax_detail?: string
	/**	Dont Recompute tax : Check	*/
	dont_recompute_tax?: 0 | 1
}
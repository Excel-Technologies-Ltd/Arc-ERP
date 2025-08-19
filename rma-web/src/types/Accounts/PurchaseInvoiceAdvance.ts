
export interface PurchaseInvoiceAdvance{
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
	/**	Reference Type : Link - DocType	*/
	reference_type?: string
	/**	Reference Name : Dynamic Link	*/
	reference_name?: string
	/**	Remarks : Text	*/
	remarks?: string
	/**	Reference Row : Data	*/
	reference_row?: string
	/**	Advance Amount : Currency	*/
	advance_amount?: number
	/**	Allocated Amount : Currency	*/
	allocated_amount?: number
	/**	Exchange Gain/Loss : Currency	*/
	exchange_gain_loss?: number
	/**	Reference Exchange Rate : Float	*/
	ref_exchange_rate?: number
	/**	Difference Posting Date : Date	*/
	difference_posting_date?: string
}
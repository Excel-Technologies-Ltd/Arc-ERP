
export interface SalesInvoicePayment{
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
	/**	Default : Check	*/
	default?: 0 | 1
	/**	Mode of Payment : Link - Mode of Payment	*/
	mode_of_payment: string
	/**	Amount : Currency	*/
	amount: number
	/**	Account : Link - Account	*/
	account?: string
	/**	Type : Read Only	*/
	type?: string
	/**	Base Amount (Company Currency) : Currency	*/
	base_amount?: number
	/**	Clearance Date : Date	*/
	clearance_date?: string
}

export interface TargetDetail{
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
	/**	Item Group : Link - Item Group	*/
	item_group?: string
	/**	Fiscal Year : Link - Fiscal Year	*/
	fiscal_year: string
	/**	Target Qty : Float	*/
	target_qty?: number
	/**	Target  Amount : Float	*/
	target_amount?: number
	/**	Target Distribution : Link - Monthly Distribution	*/
	distribution_id: string
}

export interface SalesTeam{
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
	/**	Sales Person : Link - Sales Person	*/
	sales_person: string
	/**	Contact No. : Data	*/
	contact_no?: string
	/**	Contribution (%) : Float	*/
	allocated_percentage?: number
	/**	Contribution to Net Total : Currency	*/
	allocated_amount?: number
	/**	Commission Rate : Data	*/
	commission_rate?: string
	/**	Incentives : Currency	*/
	incentives?: number
}
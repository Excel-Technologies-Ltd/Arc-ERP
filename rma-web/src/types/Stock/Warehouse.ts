
export interface Warehouse{
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
	/**	Disabled : Check	*/
	disabled?: 0 | 1
	/**	Warehouse Name : Data	*/
	warehouse_name: string
	/**	Is Group Warehouse : Check	*/
	is_group?: 0 | 1
	/**	Parent Warehouse : Link - Warehouse	*/
	parent_warehouse?: string
	/**	Is Rejected Warehouse : Check - If yes, then this warehouse will be used to store rejected materials	*/
	is_rejected_warehouse?: 0 | 1
	/**	Account : Link - Account - If blank, parent Warehouse Account or company default will be considered in transactions	*/
	account?: string
	/**	Company : Link - Company	*/
	company: string
	/**	Email Address : Data	*/
	email_id?: string
	/**	Phone No : Data	*/
	phone_no?: string
	/**	Mobile No : Data	*/
	mobile_no?: string
	/**	Address Line 1 : Data	*/
	address_line_1?: string
	/**	Address Line 2 : Data	*/
	address_line_2?: string
	/**	City : Data	*/
	city?: string
	/**	State : Data	*/
	state?: string
	/**	PIN : Data	*/
	pin?: string
	/**	Warehouse Type : Link - Warehouse Type	*/
	warehouse_type?: string
	/**	Default In-Transit Warehouse : Link - Warehouse	*/
	default_in_transit_warehouse?: string
	/**	lft : Int	*/
	lft?: number
	/**	rgt : Int	*/
	rgt?: number
	/**	Old Parent : Link - Warehouse	*/
	old_parent?: string
}
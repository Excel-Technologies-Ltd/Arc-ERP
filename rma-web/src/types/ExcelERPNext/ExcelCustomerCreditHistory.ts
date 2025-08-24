
export interface ExcelCustomerCreditHistory{
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
	/**	Date Time : Datetime	*/
	datetime?: string
	/**	Fixed Limit : Currency	*/
	fixed_limit?: number
	/**	Extended Limit : Currency	*/
	extended_limit: number
	/**	Increased Amount : Currency	*/
	increased_amount?: number
	/**	Conditional Balance : Currency	*/
	conditional_balance?: number
	/**	Remarks : Data	*/
	remarks?: string
	/**	Modified User Name : Data	*/
	modified_user_name?: string
	/**	Modified By User ID : Data	*/
	modified_by_user_id?: string
	/**	Customer : Data	*/
	customer?: string
}
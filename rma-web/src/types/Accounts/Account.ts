
export interface Account{
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
	/**	Disable : Check	*/
	disabled?: 0 | 1
	/**	Account Name : Data	*/
	account_name: string
	/**	Account Number : Data	*/
	account_number?: string
	/**	Is Group : Check	*/
	is_group?: 0 | 1
	/**	Company : Link - Company	*/
	company: string
	/**	Root Type : Select	*/
	root_type?: "" | "Asset" | "Liability" | "Income" | "Expense" | "Equity"
	/**	Report Type : Select	*/
	report_type?: "" | "Balance Sheet" | "Profit and Loss"
	/**	Currency : Link - Currency	*/
	account_currency?: string
	/**	Parent Account : Link - Account	*/
	parent_account: string
	/**	Account Type : Select - Setting Account Type helps in selecting this Account in transactions.	*/
	account_type?: "" | "Accumulated Depreciation" | "Asset Received But Not Billed" | "Bank" | "Cash" | "Chargeable" | "Capital Work in Progress" | "Cost of Goods Sold" | "Depreciation" | "Equity" | "Expense Account" | "Expenses Included In Asset Valuation" | "Expenses Included In Valuation" | "Fixed Asset" | "Income Account" | "Payable" | "Receivable" | "Round Off" | "Stock" | "Stock Adjustment" | "Stock Received But Not Billed" | "Service Received But Not Billed" | "Tax" | "Temporary"
	/**	Rate : Float - Rate at which this tax is applied	*/
	tax_rate?: number
	/**	Frozen : Select - If the account is frozen, entries are allowed to restricted users.	*/
	freeze_account?: "No" | "Yes"
	/**	Balance must be : Select	*/
	balance_must_be?: "" | "Debit" | "Credit"
	/**	Lft : Int	*/
	lft?: number
	/**	Rgt : Int	*/
	rgt?: number
	/**	Old Parent : Data	*/
	old_parent?: string
	/**	Include in gross : Check	*/
	include_in_gross?: 0 | 1
}
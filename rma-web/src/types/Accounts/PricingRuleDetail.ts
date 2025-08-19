
export interface PricingRuleDetail{
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
	/**	Pricing Rule : Link - Pricing Rule	*/
	pricing_rule?: string
	/**	Item Code : Data	*/
	item_code?: string
	/**	Margin Type : Data	*/
	margin_type?: string
	/**	Rate or Discount : Data	*/
	rate_or_discount?: string
	/**	Child Docname : Data	*/
	child_docname?: string
	/**	Rule Applied : Check	*/
	rule_applied?: 0 | 1
}

export interface BrandWiseAllocations{
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
	/**	Brand : Link - Brand	*/
	brand: string
	/**	Limit : Currency	*/
	limit: number
}
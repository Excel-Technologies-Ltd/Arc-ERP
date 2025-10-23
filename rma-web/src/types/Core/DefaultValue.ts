
export interface DefaultValue{
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
	/**	Key : Data	*/
	defkey: string
	/**	Value : Text	*/
	defvalue?: string
}
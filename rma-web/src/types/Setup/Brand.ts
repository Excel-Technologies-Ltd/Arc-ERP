import { ItemDefault } from '../Stock/ItemDefault'

export interface Brand{
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
	/**	Brand Name : Data	*/
	brand: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Description : Text	*/
	description?: string
	/**	Brand Defaults : Table - Item Default	*/
	brand_defaults?: ItemDefault[]
}
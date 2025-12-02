
export interface ExcelMPSProjectAssets{
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
	/**	Asset Code : Link - Asset	*/
	asset_code?: string
	/**	Asset Name : Data	*/
	asset_name?: string
}
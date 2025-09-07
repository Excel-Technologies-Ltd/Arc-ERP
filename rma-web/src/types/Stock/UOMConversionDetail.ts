export interface UOMConversionDetail {
  name: string;
  creation: string;
  modified: string;
  owner: string;
  modified_by: string;
  docstatus: 0 | 1 | 2;
  parent?: string;
  parentfield?: string;
  parenttype?: string;
  idx?: number;
  /**	UOM : Link - UOM	*/
  uom?: string;
  /**	Conversion Factor : Float	*/
  conversion_factor?: number;
}

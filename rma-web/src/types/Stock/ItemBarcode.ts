export interface ItemBarcode {
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
  /**	Barcode : Data	*/
  barcode: string;
  /**	Barcode Type : Select	*/
  barcode_type?: '' | 'EAN' | 'UPC-A';
  /**	UOM : Link - UOM	*/
  uom?: string;
}

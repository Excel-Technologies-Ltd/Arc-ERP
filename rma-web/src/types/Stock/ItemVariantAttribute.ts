export interface ItemVariantAttribute {
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
  /**	Variant Of : Link - Item	*/
  variant_of?: string;
  /**	Attribute : Link - Item Attribute	*/
  attribute: string;
  /**	Attribute Value : Data	*/
  attribute_value?: string;
  /**	Numeric Values : Check	*/
  numeric_values?: 0 | 1;
  /**	From Range : Float	*/
  from_range?: number;
  /**	Increment : Float	*/
  increment?: number;
  /**	To Range : Float	*/
  to_range?: number;
}

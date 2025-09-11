export interface PartyAccount {
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
  /**	Company : Link - Company	*/
  company: string;
  /**	Account : Link - Account	*/
  account?: string;
}

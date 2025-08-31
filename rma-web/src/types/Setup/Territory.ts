import { TargetDetail } from './TargetDetail';

export interface Territory {
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
  /**	Territory Name : Data	*/
  territory_name: string;
  /**	Parent Territory : Link - Territory	*/
  parent_territory?: string;
  /**	Is Group : Check	*/
  is_group?: 0 | 1;
  /**	Territory Manager : Link - Sales Person - For reference	*/
  territory_manager?: string;
  /**	lft : Int	*/
  lft?: number;
  /**	rgt : Int	*/
  rgt?: number;
  /**	old_parent : Link - Territory	*/
  old_parent?: string;
  /**	Targets : Table - Target Detail	*/
  targets?: TargetDetail[];
}

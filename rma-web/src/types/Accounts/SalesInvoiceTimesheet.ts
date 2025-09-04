export interface SalesInvoiceTimesheet {
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
  /**	Activity Type : Link - Activity Type	*/
  activity_type?: string;
  /**	Description : Small Text	*/
  description?: string;
  /**	From Time : Datetime	*/
  from_time?: string;
  /**	To Time : Datetime	*/
  to_time?: string;
  /**	Billing Hours : Float	*/
  billing_hours?: number;
  /**	Billing Amount : Currency	*/
  billing_amount?: number;
  /**	Time Sheet : Link - Timesheet	*/
  time_sheet?: string;
  /**	Timesheet Detail : Data	*/
  timesheet_detail?: string;
  /**	Project Name : Data	*/
  project_name?: string;
}

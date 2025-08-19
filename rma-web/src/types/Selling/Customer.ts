
export interface Customer{
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
	/**	Series : Select	*/
	naming_series?: "ETLCUST-.#####"
	/**	Salutation : Link - Salutation	*/
	salutation?: string
	/**	Customer Name : Data	*/
	customer_name: string
	/**	Customer Type : Select	*/
	customer_type: "Company" | "Individual" | "Partnership"
	/**	Customer Group : Link - Customer Group	*/
	customer_group: string
	/**	Customer BIN ID : Data	*/
	excel_customer_bin_id?: string
	/**	Customer Trade License : Data	*/
	excel_customer_trade_license?: string
	/**	Customer NID : Data	*/
	excel_customer_nid?: string
	/**	Security Cheque Amount : Float	*/
	excel_security_cheque_amount?: number
	/**	Customer TIN ID : Data	*/
	excel_customer_tin_id?: string
	/**	Territory : Link - Territory	*/
	territory: string
	/**	Zone : Link - Zone	*/
	custom_zone: string
	/**	Customer Owner Name : Data	*/
	excel_customer_owner_name?: string
	/**	Customer Owner Farther's Name : Data	*/
	excel_customer_owner_farther_name?: string
	/**	Customer Owner's Permanent Address : Data	*/
	excel_customer_owner_permanent_address?: string
	/**	Gender : Link - Gender	*/
	gender?: string
	/**	From Lead : Link - Lead	*/
	lead_name?: string
	/**	From Opportunity : Link - Opportunity	*/
	opportunity_name?: string
	/**	Account Manager : Link - User	*/
	account_manager?: string
	/**	Send Welcome Notification : Check	*/
	excel_send_welcome_notification?: 0 | 1
	/**	Image : Attach Image	*/
	image?: string
	/**	Default Price List : Link - Price List	*/
	default_price_list?: string
	/**	Default Company Bank Account : Link - Bank Account	*/
	default_bank_account?: string
	/**	Billing Currency : Link - Currency	*/
	default_currency?: string
	/**	Is Internal Customer : Check	*/
	is_internal_customer?: 0 | 1
	/**	Represents Company : Link - Company	*/
	represents_company?: string
	/**	Allowed To Transact With : Table - Allowed To Transact With	*/
	companies?: any
	/**	Market Segment : Link - Market Segment	*/
	market_segment?: string
	/**	Industry : Link - Industry Type	*/
	industry?: string
	/**	Customer POS id : Data	*/
	customer_pos_id?: string
	/**	Website : Data	*/
	website?: string
	/**	Print Language : Link - Language	*/
	language?: string
	/**	Customer Details : Text - Additional information regarding the customer.	*/
	customer_details?: string
	/**	Customer Primary Contact : Link - Contact - Reselect, if the chosen contact is edited after save	*/
	customer_primary_contact?: string
	/**	Mobile No : Read Only	*/
	mobile_no?: string
	/**	Email Id : Read Only	*/
	email_id?: string
	/**	Customer Primary Address : Link - Address - Reselect, if the chosen address is edited after save	*/
	customer_primary_address?: string
	/**	Primary Address : Text	*/
	primary_address?: string
	/**	Tax ID : Data	*/
	tax_id?: string
	/**	Tax Category : Link - Tax Category	*/
	tax_category?: string
	/**	Tax Withholding Category : Link - Tax Withholding Category	*/
	tax_withholding_category?: string
	/**	Default Payment Terms Template : Link - Payment Terms Template	*/
	payment_terms?: string
	/**	Unpaid vs FCL : Currency	*/
	excel_unpaid_vs_fcl?: number
	/**	Allow Unfreeze : Select	*/
	excel_allow_unfreeze?: "Yes" | "No"
	/**	Fixed Credit Limit : Float	*/
	excel_fixed_credit_limit?: number
	/**	Total Conditional Limit : Float	*/
	excel_total_conditional_limit?: number
	/**	Conditional Limit Expiry : Date	*/
	excel_conditional_limit_expiry?: string
	/**	Remaining Balance : Currency	*/
	excel_remaining_balance?: number
	/**	Credit Limit : Table - Customer Credit Limit	*/
	credit_limits?: any
	/**	Brand Wise Allocations : Table - Brand Wise Allocations	*/
	custom_brand_wise_allocations?: any
	/**	Other Brands Limit : Currency	*/
	custom_other_brands_limit?: number
	/**	Source : Data	*/
	custom_source?: string
	/**	Customer Credit History : Table - Excel Customer Credit History	*/
	excel_customer_credit_history?: any
	/**	Receivable Accounts : Table - Party Account - Mention if a non-standard receivable account	*/
	accounts?: any
	/**	Loyalty Program : Link - Loyalty Program	*/
	loyalty_program?: string
	/**	Loyalty Program Tier : Data	*/
	loyalty_program_tier?: string
	/**	Sales Person Name : Data	*/
	excel_sales_person_name?: string
	/**	Sales Person Mobile No : Data	*/
	excel_sales_person_mobile_no?: string
	/**	Sales Person Email : Data	*/
	excel_sales_person_email?: string
	/**	Sales Supervisor : Data	*/
	excel_sales_supervisor?: string
	/**	Sales Team : Table - Sales Team	*/
	sales_team: any
	/**	Sales Partner : Link - Sales Partner	*/
	default_sales_partner?: string
	/**	Commission Rate : Float	*/
	default_commission_rate?: number
	/**	Allow Sales Invoice Creation Without Sales Order : Check	*/
	so_required?: 0 | 1
	/**	Allow Sales Invoice Creation Without Delivery Note : Check	*/
	dn_required?: 0 | 1
	/**	Notification Type : Select	*/
	excel_notification_type?: "" | "SMS" | "Email" | "SMS & Email"
	/**	Is Frozen : Check	*/
	is_frozen?: 0 | 1
	/**	Disabled : Check	*/
	disabled?: 0 | 1
}
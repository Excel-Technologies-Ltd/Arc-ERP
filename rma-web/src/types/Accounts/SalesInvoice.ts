import { SalesInvoiceItem } from './SalesInvoiceItem'
import { bundleitemprint } from '../ExcelERPNext/bundleitemprint'
import { SalesTaxesandCharges } from './SalesTaxesandCharges'
import { PricingRuleDetail } from './PricingRuleDetail'
import { PackedItem } from '../Stock/PackedItem'
import { SalesInvoiceTimesheet } from './SalesInvoiceTimesheet'
import { SalesInvoicePayment } from './SalesInvoicePayment'
import { SalesInvoiceAdvance } from './SalesInvoiceAdvance'
import { PaymentSchedule } from './PaymentSchedule'
import { SalesTeam } from '../Selling/SalesTeam'

export interface SalesInvoice{
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
	/**	Title : Data	*/
	title?: string
	/**	Series : Select	*/
	naming_series: "SINV-.YYYY.-" | "RINV-.YYYY.-" | "WINV-.YYYY.-"
	/**	Customer : Link - Customer	*/
	customer?: string
	/**	Customer Name : Small Text	*/
	customer_name?: string
	/**	Customer Name for MPS Print : Data	*/
	excel_customer_name_for_mps_print?: string
	/**	Arc One So : Data	*/
	arc_one_so?: string
	/**	Tax Id : Data	*/
	tax_id?: string
	/**	Company : Link - Company	*/
	company: string
	/**	Company Tax ID : Data	*/
	company_tax_id?: string
	/**	Date : Date	*/
	posting_date: string
	/**	Posting Time : Time	*/
	posting_time?: string
	/**	Edit Posting Date and Time : Check	*/
	set_posting_time?: 0 | 1
	/**	Payment Due Date : Date	*/
	due_date?: string
	/**	Outstanding Balance : Float	*/
	outstanding_balance?: number
	/**	Credit Limit : Float	*/
	credit_limit?: number
	/**	Remaining Credit : Float	*/
	remaining_credit?: number
	/**	Include Payment (POS) : Check	*/
	is_pos?: 0 | 1
	/**	POS Profile : Link - POS Profile	*/
	pos_profile?: string
	/**	Is Consolidated : Check	*/
	is_consolidated?: 0 | 1
	/**	Is Return (Credit Note) : Check	*/
	is_return?: 0 | 1
	/**	Excel Invoice Type : Select - <b>Please select the "Invoice Type" before submit</b>	*/
	excel_invoice_type?: "Regular Sales" | "In-Progress Project" | "Completed Project"
	/**	Return Against : Link - Sales Invoice	*/
	return_against?: string
	/**	Update Outstanding for Self : Check - Credit Note will update it's own outstanding amount, even if "Return Against" is specified.	*/
	update_outstanding_for_self?: 0 | 1
	/**	Update Billed Amount in Sales Order : Check	*/
	update_billed_amount_in_sales_order?: 0 | 1
	/**	Update Billed Amount in Delivery Note : Check	*/
	update_billed_amount_in_delivery_note?: 0 | 1
	/**	Is Rate Adjustment Entry (Debit Note) : Check - Issue a debit note with 0 qty against an existing Sales Invoice	*/
	is_debit_note?: 0 | 1
	/**	ArcOne Submitted By : Data	*/
	custom_arcone_submitted_by?: string
	/**	Amended From : Link - Sales Invoice	*/
	amended_from?: string
	/**	Excel Short Term Loan : Link - Excel Short Term Loan	*/
	excel_short_term_loan?: string
	/**	Excel Product Team : Link - Excel Product Team	*/
	excel_product_team?: string
	/**	Excel Short Term Investments : Link - Excel Short Term Investments	*/
	excel_short_term_investments?: string
	/**	Excel Other Loans and Advances : Link - Excel Other Loans and Advances	*/
	excel_other_loans_and_advances?: string
	/**	Cost Center : Link - Cost Center	*/
	cost_center?: string
	/**	Excel Dream Project : Link - Excel Dream Project	*/
	excel_dream_project?: string
	/**	Excel Securities Deposits and Prepayment : Link - Excel Securities Deposits and Prepayment	*/
	excel_securities_deposits_and_prepayment?: string
	/**	Excel Long Term Loans : Link - Excel Long Term Loans	*/
	excel_long_term_loans?: string
	/**	Excel LC No : Link - Excel LC No	*/
	excel_lc_no?: string
	/**	Excel Office Locations : Link - Excel Office Locations	*/
	excel_office_locations?: string
	/**	Project : Link - Project	*/
	project?: string
	/**	Currency : Link - Currency	*/
	currency: string
	/**	Exchange Rate : Float - Rate at which Customer Currency is converted to customer's base currency	*/
	conversion_rate: number
	/**	Price List : Link - Price List	*/
	selling_price_list: string
	/**	Price List Currency : Link - Currency	*/
	price_list_currency: string
	/**	Price List Exchange Rate : Float - Rate at which Price list currency is converted to customer's base currency	*/
	plc_conversion_rate: number
	/**	Ignore Pricing Rule : Check	*/
	ignore_pricing_rule?: 0 | 1
	/**	Scan Barcode : Data	*/
	scan_barcode?: string
	/**	Update Stock : Check	*/
	update_stock?: 0 | 1
	/**	Source Warehouse : Link - Warehouse	*/
	set_warehouse?: string
	/**	Set Target Warehouse : Link - Warehouse	*/
	set_target_warehouse?: string
	/**	Items : Table - Sales Invoice Item	*/
	items: SalesInvoiceItem[]
	/**	Bundle Items : Table - bundle item print	*/
	bundle_items?: bundleitemprint[]
	/**	Total Quantity : Float	*/
	total_qty?: number
	/**	Total Net Weight : Float	*/
	total_net_weight?: number
	/**	Total (Company Currency) : Currency	*/
	base_total?: number
	/**	Net Total (Company Currency) : Currency	*/
	base_net_total: number
	/**	Total : Currency	*/
	total?: number
	/**	Net Total : Currency	*/
	net_total?: number
	/**	Tax Category : Link - Tax Category	*/
	tax_category?: string
	/**	Sales Taxes and Charges Template : Link - Sales Taxes and Charges Template	*/
	taxes_and_charges?: string
	/**	Shipping Rule : Link - Shipping Rule	*/
	shipping_rule?: string
	/**	Incoterm : Link - Incoterm	*/
	incoterm?: string
	/**	Named Place : Data	*/
	named_place?: string
	/**	Sales Taxes and Charges : Table - Sales Taxes and Charges	*/
	taxes?: SalesTaxesandCharges[]
	/**	Total Taxes and Charges (Company Currency) : Currency	*/
	base_total_taxes_and_charges?: number
	/**	Total Taxes and Charges : Currency	*/
	total_taxes_and_charges?: number
	/**	Grand Total (Company Currency) : Currency	*/
	base_grand_total: number
	/**	Rounding Adjustment (Company Currency) : Currency	*/
	base_rounding_adjustment?: number
	/**	Rounded Total (Company Currency) : Currency	*/
	base_rounded_total?: number
	/**	In Words (Company Currency) : Small Text - In Words will be visible once you save the Sales Invoice.	*/
	base_in_words?: string
	/**	Grand Total : Currency	*/
	grand_total: number
	/**	Rounding Adjustment : Currency	*/
	rounding_adjustment?: number
	/**	Use Company default Cost Center for Round off : Check	*/
	use_company_roundoff_cost_center?: 0 | 1
	/**	Rounded Total : Currency	*/
	rounded_total?: number
	/**	In Words : Small Text	*/
	in_words?: string
	/**	Total Advance : Currency	*/
	total_advance?: number
	/**	Outstanding Amount : Currency	*/
	outstanding_amount?: number
	/**	Disable Rounded Total : Check	*/
	disable_rounded_total?: 0 | 1
	/**	Apply Additional Discount On : Select	*/
	apply_discount_on?: "" | "Grand Total" | "Net Total"
	/**	Additional Discount Amount (Company Currency) : Currency	*/
	base_discount_amount?: number
	/**	Is Cash or Non Trade Discount : Check	*/
	is_cash_or_non_trade_discount?: 0 | 1
	/**	Discount Account : Link - Account	*/
	additional_discount_account?: string
	/**	Additional Discount Percentage : Float	*/
	additional_discount_percentage?: number
	/**	Additional Discount Amount : Currency	*/
	discount_amount?: number
	/**	Taxes and Charges Calculation : Text Editor	*/
	other_charges_calculation?: string
	/**	Pricing Rule Detail : Table - Pricing Rule Detail	*/
	pricing_rules?: PricingRuleDetail[]
	/**	Packed Items : Table - Packed Item	*/
	packed_items?: PackedItem[]
	/**	Time Sheets : Table - Sales Invoice Timesheet	*/
	timesheets?: SalesInvoiceTimesheet[]
	/**	Total Billing Hours : Float	*/
	total_billing_hours?: number
	/**	Total Billing Amount : Currency	*/
	total_billing_amount?: number
	/**	Cash/Bank Account : Link - Account	*/
	cash_bank_account?: string
	/**	Sales Invoice Payment : Table - Sales Invoice Payment	*/
	payments?: SalesInvoicePayment[]
	/**	MRP Sales Grand Total : Data	*/
	mrp_sales_grand_total?: string
	/**	Paid Amount (Company Currency) : Currency	*/
	base_paid_amount?: number
	/**	Paid Amount : Currency	*/
	paid_amount?: number
	/**	Base Change Amount (Company Currency) : Currency	*/
	base_change_amount?: number
	/**	Change Amount : Currency	*/
	change_amount?: number
	/**	Account for Change Amount : Link - Account	*/
	account_for_change_amount?: string
	/**	Allocate Advances Automatically (FIFO) : Check	*/
	allocate_advances_automatically?: 0 | 1
	/**	Only Include Allocated Payments : Check - Advance payments allocated against orders will only be fetched	*/
	only_include_allocated_payments?: 0 | 1
	/**	Advances : Table - Sales Invoice Advance	*/
	advances?: SalesInvoiceAdvance[]
	/**	Write Off Amount : Currency	*/
	write_off_amount?: number
	/**	Write Off Amount (Company Currency) : Currency	*/
	base_write_off_amount?: number
	/**	Write Off Outstanding Amount : Check	*/
	write_off_outstanding_amount_automatically?: 0 | 1
	/**	Write Off Account : Link - Account	*/
	write_off_account?: string
	/**	Write Off Cost Center : Link - Cost Center	*/
	write_off_cost_center?: string
	/**	Redeem Loyalty Points : Check	*/
	redeem_loyalty_points?: 0 | 1
	/**	Loyalty Points : Int	*/
	loyalty_points?: number
	/**	Loyalty Amount : Currency	*/
	loyalty_amount?: number
	/**	Loyalty Program : Link - Loyalty Program	*/
	loyalty_program?: string
	/**	Don't Create Loyalty Points : Check	*/
	dont_create_loyalty_points?: 0 | 1
	/**	Redemption Account : Link - Account	*/
	loyalty_redemption_account?: string
	/**	Redemption Cost Center : Link - Cost Center	*/
	loyalty_redemption_cost_center?: string
	/**	Customer Address : Link - Address	*/
	customer_address?: string
	/**	Address : Small Text	*/
	address_display?: string
	/**	Contact Person : Link - Contact	*/
	contact_person?: string
	/**	Contact : Small Text	*/
	contact_display?: string
	/**	Mobile No : Small Text	*/
	contact_mobile?: string
	/**	Contact Email : Data	*/
	contact_email?: string
	/**	Territory : Link - Territory	*/
	territory?: string
	/**	Shipping Address Name : Link - Address	*/
	shipping_address_name?: string
	/**	Shipping Address : Small Text	*/
	shipping_address?: string
	/**	Dispatch Address Name : Link - Address	*/
	dispatch_address_name?: string
	/**	Dispatch Address : Small Text	*/
	dispatch_address?: string
	/**	Company Address Name : Link - Address	*/
	company_address?: string
	/**	Company Contact Person : Link - Contact	*/
	company_contact_person?: string
	/**	Company Address : Small Text	*/
	company_address_display?: string
	/**	Ignore Default Payment Terms Template : Check	*/
	ignore_default_payment_terms_template?: 0 | 1
	/**	Payment Terms Template : Link - Payment Terms Template	*/
	payment_terms_template?: string
	/**	Payment Schedule : Table - Payment Schedule	*/
	payment_schedule?: PaymentSchedule[]
	/**	Terms : Link - Terms and Conditions	*/
	tc_name?: string
	/**	Terms and Conditions Details : Text Editor	*/
	terms?: string
	/**	Customer's Purchase Order : Data	*/
	po_no?: string
	/**	Remarks : Small Text	*/
	remarks?: string
	/**	Customer's Purchase Order Date : Date	*/
	po_date?: string
	/**	Debit To : Link - Account	*/
	debit_to: string
	/**	Party Account Currency : Link - Currency	*/
	party_account_currency?: string
	/**	Is Opening Entry : Select	*/
	is_opening?: "No" | "Yes"
	/**	Unrealized Profit / Loss Account : Link - Account - Unrealized Profit / Loss account for intra-company transfers	*/
	unrealized_profit_loss_account?: string
	/**	Against Income Account : Small Text	*/
	against_income_account?: string
	/**	Sales Partner : Link - Sales Partner	*/
	sales_partner?: string
	/**	Amount Eligible for Commission : Currency	*/
	amount_eligible_for_commission?: number
	/**	Commission Rate (%) : Float	*/
	commission_rate?: number
	/**	Total Commission : Currency	*/
	total_commission?: number
	/**	Sales Contributions and Incentives : Table - Sales Team	*/
	sales_team?: SalesTeam[]
	/**	Letter Head : Link - Letter Head	*/
	letter_head?: string
	/**	Group same items : Check	*/
	group_same_items?: 0 | 1
	/**	Print Heading : Link - Print Heading	*/
	select_print_heading?: string
	/**	Print Language : Data	*/
	language?: string
	/**	From Date : Date	*/
	from_date?: string
	/**	Auto Repeat : Link - Auto Repeat	*/
	auto_repeat?: string
	/**	To Date : Date	*/
	to_date?: string
	/**	Status : Select	*/
	status?: "" | "Draft" | "Return" | "Credit Note Issued" | "Submitted" | "Paid" | "Partly Paid" | "Unpaid" | "Unpaid and Discounted" | "Partly Paid and Discounted" | "Overdue and Discounted" | "Overdue" | "Cancelled" | "Internal Transfer"
	/**	Inter Company Invoice Reference : Link - Purchase Invoice	*/
	inter_company_invoice_reference?: string
	/**	Campaign : Link - Campaign	*/
	campaign?: string
	/**	Represents Company : Link - Company - Company which internal customer represents	*/
	represents_company?: string
	/**	Source : Link - Lead Source	*/
	source?: string
	/**	Customer Group : Link - Customer Group	*/
	customer_group?: string
	/**	Is Internal Customer : Check	*/
	is_internal_customer?: 0 | 1
	/**	Is Discounted : Check	*/
	is_discounted?: 0 | 1
	/**	Repost Required : Check	*/
	repost_required?: 0 | 1
}
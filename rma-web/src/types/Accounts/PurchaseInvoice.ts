import { PurchaseInvoiceItem } from './PurchaseInvoiceItem';
import { PurchaseTaxesandCharges } from './PurchaseTaxesandCharges';
import { TaxWithheldVouchers } from './TaxWithheldVouchers';
import { PricingRuleDetail } from './PricingRuleDetail';
import { PurchaseReceiptItemSupplied } from '../Buying/PurchaseReceiptItemSupplied';
import { PurchaseInvoiceAdvance } from './PurchaseInvoiceAdvance';
import { AdvanceTax } from './AdvanceTax';
import { PaymentSchedule } from './PaymentSchedule';

export interface PurchaseInvoice {
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
  /**	Title : Data	*/
  title?: string;
  /**	Series : Select	*/
  naming_series: 'PINV-.YYYY.-' | 'RPINV-.YYYY.-';
  /**	Supplier : Link - Supplier	*/
  supplier: string;
  /**	Supplier Name : Data	*/
  supplier_name?: string;
  /**	Actual Supplier : Link - Supplier	*/
  excel_actual_supplier?: string;
  /**	Actual Supplier Name : Data	*/
  excel_actual_supplier_name?: string;
  /**	Supplier Invoice No : Data	*/
  excel_supplier_invoice_no?: string;
  /**	Tax Id : Read Only	*/
  tax_id?: string;
  /**	Company : Link - Company	*/
  company?: string;
  /**	Date : Date	*/
  posting_date: string;
  /**	Posting Time : Time	*/
  posting_time?: string;
  /**	Edit Posting Date and Time : Check	*/
  set_posting_time?: 0 | 1;
  /**	LC No : Link - Excel LC No	*/
  excel_lc_no?: string;
  /**	LC Date : Date	*/
  excel_lc_date?: string;
  /**	PI No : Data	*/
  excel_pi_no?: string;
  /**	PI Date : Date	*/
  excel_pi_date?: string;
  /**	Due Date : Date	*/
  due_date?: string;
  /**	Is Paid : Check	*/
  is_paid?: 0 | 1;
  /**	Is Return (Debit Note) : Check	*/
  is_return?: 0 | 1;
  /**	Return Against Purchase Invoice : Link - Purchase Invoice	*/
  return_against?: string;
  /**	Update Outstanding for Self : Check - Debit Note will update it's own outstanding amount, even if "Return Against" is specified.	*/
  update_outstanding_for_self?: 0 | 1;
  /**	Update Billed Amount in Purchase Order : Check	*/
  update_billed_amount_in_purchase_order?: 0 | 1;
  /**	Update Billed Amount in Purchase Receipt : Check	*/
  update_billed_amount_in_purchase_receipt?: 0 | 1;
  /**	Apply Tax Withholding Amount : Check	*/
  apply_tds?: 0 | 1;
  /**	Tax Withholding Category : Link - Tax Withholding Category	*/
  tax_withholding_category?: string;
  /**	Excel Remarks : Small Text	*/
  excel_remarks?: string;
  /**	Amended From : Link - Purchase Invoice	*/
  amended_from?: string;
  /**	Supplier Invoice No : Data	*/
  bill_no?: string;
  /**	Supplier Invoice Date : Date	*/
  bill_date?: string;
  /**	Excel Short Term Loan : Link - Excel Short Term Loan	*/
  excel_short_term_loan?: string;
  /**	Excel Product Team : Link - Excel Product Team	*/
  excel_product_team?: string;
  /**	Excel Short Term Investments : Link - Excel Short Term Investments	*/
  excel_short_term_investments?: string;
  /**	Excel Other Loans and Advances : Link - Excel Other Loans and Advances	*/
  excel_other_loans_and_advances?: string;
  /**	Cost Center : Link - Cost Center	*/
  cost_center?: string;
  /**	Excel Dream Project : Link - Excel Dream Project	*/
  excel_dream_project?: string;
  /**	Excel Securities Deposits and Prepayment : Link - Excel Securities Deposits and Prepayment	*/
  excel_securities_deposits_and_prepayment?: string;
  /**	Excel Long Term Loans : Link - Excel Long Term Loans	*/
  excel_long_term_loans?: string;
  /**	Excel Office Locations : Link - Excel Office Locations	*/
  excel_office_locations?: string;
  /**	Project : Link - Project	*/
  project?: string;
  /**	Currency : Link - Currency	*/
  currency?: string;
  /**	Exchange Rate : Float	*/
  conversion_rate?: number;
  /**	Use Transaction Date Exchange Rate : Check	*/
  use_transaction_date_exchange_rate?: 0 | 1;
  /**	Price List : Link - Price List	*/
  buying_price_list?: string;
  /**	Price List Currency : Link - Currency	*/
  price_list_currency?: string;
  /**	Price List Exchange Rate : Float	*/
  plc_conversion_rate?: number;
  /**	Ignore Pricing Rule : Check	*/
  ignore_pricing_rule?: 0 | 1;
  /**	Scan Barcode : Data	*/
  scan_barcode?: string;
  /**	Update Stock : Check	*/
  update_stock?: 0 | 1;
  /**	Set Accepted Warehouse : Link - Warehouse	*/
  set_warehouse?: string;
  /**	Set From Warehouse : Link - Warehouse	*/
  set_from_warehouse?: string;
  /**	Is Subcontracted : Check	*/
  is_subcontracted?: 0 | 1;
  /**	Rejected Warehouse : Link - Warehouse	*/
  rejected_warehouse?: string;
  /**	Supplier Warehouse : Link - Warehouse	*/
  supplier_warehouse?: string;
  /**	Items : Table - Purchase Invoice Item	*/
  items: PurchaseInvoiceItem[];
  /**	Total Quantity : Float	*/
  total_qty?: number;
  /**	Total Net Weight : Float	*/
  total_net_weight?: number;
  /**	Total (Company Currency) : Currency	*/
  base_total?: number;
  /**	Net Total (Company Currency) : Currency	*/
  base_net_total?: number;
  /**	Total : Currency	*/
  total?: number;
  /**	Net Total : Currency	*/
  net_total?: number;
  /**	Tax Withholding Net Total : Currency	*/
  tax_withholding_net_total?: number;
  /**	Base Tax Withholding Net Total : Currency	*/
  base_tax_withholding_net_total?: number;
  /**	Tax Category : Link - Tax Category	*/
  tax_category?: string;
  /**	Purchase Taxes and Charges Template : Link - Purchase Taxes and Charges Template	*/
  taxes_and_charges?: string;
  /**	Shipping Rule : Link - Shipping Rule	*/
  shipping_rule?: string;
  /**	Incoterm : Link - Incoterm	*/
  incoterm?: string;
  /**	Named Place : Data	*/
  named_place?: string;
  /**	Purchase Taxes and Charges : Table - Purchase Taxes and Charges	*/
  taxes?: PurchaseTaxesandCharges[];
  /**	Taxes and Charges Added (Company Currency) : Currency	*/
  base_taxes_and_charges_added?: number;
  /**	Taxes and Charges Deducted (Company Currency) : Currency	*/
  base_taxes_and_charges_deducted?: number;
  /**	Total Taxes and Charges (Company Currency) : Currency	*/
  base_total_taxes_and_charges?: number;
  /**	Taxes and Charges Added : Currency	*/
  taxes_and_charges_added?: number;
  /**	Taxes and Charges Deducted : Currency	*/
  taxes_and_charges_deducted?: number;
  /**	Total Taxes and Charges : Currency	*/
  total_taxes_and_charges?: number;
  /**	Grand Total (Company Currency) : Currency	*/
  base_grand_total?: number;
  /**	Rounding Adjustment (Company Currency) : Currency	*/
  base_rounding_adjustment?: number;
  /**	Rounded Total (Company Currency) : Currency	*/
  base_rounded_total?: number;
  /**	In Words (Company Currency) : Data	*/
  base_in_words?: string;
  /**	Grand Total : Currency	*/
  grand_total?: number;
  /**	Rounding Adjustment : Currency	*/
  rounding_adjustment?: number;
  /**	Use Company Default Round Off Cost Center : Check	*/
  use_company_roundoff_cost_center?: 0 | 1;
  /**	Rounded Total : Currency	*/
  rounded_total?: number;
  /**	In Words : Data	*/
  in_words?: string;
  /**	Total Advance : Currency	*/
  total_advance?: number;
  /**	Outstanding Amount : Currency	*/
  outstanding_amount?: number;
  /**	Disable Rounded Total : Check	*/
  disable_rounded_total?: 0 | 1;
  /**	Apply Additional Discount On : Select	*/
  apply_discount_on?: '' | 'Grand Total' | 'Net Total';
  /**	Additional Discount Amount (Company Currency) : Currency	*/
  base_discount_amount?: number;
  /**	Additional Discount Percentage : Float	*/
  additional_discount_percentage?: number;
  /**	Additional Discount Amount : Currency	*/
  discount_amount?: number;
  /**	Tax Withheld Vouchers : Table - Tax Withheld Vouchers	*/
  tax_withheld_vouchers?: TaxWithheldVouchers[];
  /**	Taxes and Charges Calculation : Text Editor	*/
  other_charges_calculation?: string;
  /**	Pricing Rule Detail : Table - Pricing Rule Detail	*/
  pricing_rules?: PricingRuleDetail[];
  /**	Supplied Items : Table - Purchase Receipt Item Supplied	*/
  supplied_items?: PurchaseReceiptItemSupplied[];
  /**	Mode of Payment : Link - Mode of Payment	*/
  mode_of_payment?: string;
  /**	Paid Amount (Company Currency) : Currency	*/
  base_paid_amount?: number;
  /**	Clearance Date : Date	*/
  clearance_date?: string;
  /**	Cash/Bank Account : Link - Account	*/
  cash_bank_account?: string;
  /**	Paid Amount : Currency	*/
  paid_amount?: number;
  /**	Set Advances and Allocate (FIFO) : Check	*/
  allocate_advances_automatically?: 0 | 1;
  /**	Only Include Allocated Payments : Check - Advance payments allocated against orders will only be fetched	*/
  only_include_allocated_payments?: 0 | 1;
  /**	Advances : Table - Purchase Invoice Advance	*/
  advances?: PurchaseInvoiceAdvance[];
  /**	Advance Tax : Table - Advance Tax	*/
  advance_tax?: AdvanceTax[];
  /**	Write Off Amount : Currency	*/
  write_off_amount?: number;
  /**	Write Off Amount (Company Currency) : Currency	*/
  base_write_off_amount?: number;
  /**	Write Off Account : Link - Account	*/
  write_off_account?: string;
  /**	Write Off Cost Center : Link - Cost Center	*/
  write_off_cost_center?: string;
  /**	Select Supplier Address : Link - Address	*/
  supplier_address?: string;
  /**	Address : Small Text	*/
  address_display?: string;
  /**	Contact Person : Link - Contact	*/
  contact_person?: string;
  /**	Contact : Small Text	*/
  contact_display?: string;
  /**	Mobile No : Small Text	*/
  contact_mobile?: string;
  /**	Contact Email : Small Text	*/
  contact_email?: string;
  /**	Select Shipping Address : Link - Address	*/
  shipping_address?: string;
  /**	Shipping Address : Small Text	*/
  shipping_address_display?: string;
  /**	Select Billing Address : Link - Address	*/
  billing_address?: string;
  /**	Billing Address : Small Text	*/
  billing_address_display?: string;
  /**	Payment Terms Template : Link - Payment Terms Template	*/
  payment_terms_template?: string;
  /**	Ignore Default Payment Terms Template : Check	*/
  ignore_default_payment_terms_template?: 0 | 1;
  /**	Payment Schedule : Table - Payment Schedule	*/
  payment_schedule?: PaymentSchedule[];
  /**	Terms : Link - Terms and Conditions	*/
  tc_name?: string;
  /**	Terms and Conditions : Text Editor	*/
  terms?: string;
  /**	Status : Select	*/
  status?:
    | ''
    | 'Draft'
    | 'Return'
    | 'Debit Note Issued'
    | 'Submitted'
    | 'Paid'
    | 'Partly Paid'
    | 'Unpaid'
    | 'Overdue'
    | 'Cancelled'
    | 'Internal Transfer';
  /**	Per Received : Percent	*/
  per_received?: number;
  /**	Credit To : Link - Account	*/
  credit_to: string;
  /**	Party Account Currency : Link - Currency	*/
  party_account_currency?: string;
  /**	Is Opening Entry : Select	*/
  is_opening?: 'No' | 'Yes';
  /**	Against Expense Account : Small Text	*/
  against_expense_account?: string;
  /**	Unrealized Profit / Loss Account : Link - Account - Unrealized Profit/Loss account for intra-company transfers	*/
  unrealized_profit_loss_account?: string;
  /**	Auto Repeat : Link - Auto Repeat	*/
  auto_repeat?: string;
  /**	From Date : Date - Start date of current invoice's period	*/
  from_date?: string;
  /**	To Date : Date - End date of current invoice's period	*/
  to_date?: string;
  /**	Letter Head : Link - Letter Head	*/
  letter_head?: string;
  /**	Group same items : Check	*/
  group_same_items?: 0 | 1;
  /**	Print Heading : Link - Print Heading	*/
  select_print_heading?: string;
  /**	Print Language : Data	*/
  language?: string;
  /**	Hold Invoice : Check	*/
  on_hold?: 0 | 1;
  /**	Release Date : Date - Once set, this invoice will be on hold till the set date	*/
  release_date?: string;
  /**	Reason For Putting On Hold : Small Text	*/
  hold_comment?: string;
  /**	Is Internal Supplier : Check	*/
  is_internal_supplier?: 0 | 1;
  /**	Represents Company : Link - Company - Company which internal supplier represents	*/
  represents_company?: string;
  /**	Inter Company Invoice Reference : Link - Sales Invoice	*/
  inter_company_invoice_reference?: string;
  /**	Is Old Subcontracting Flow : Check	*/
  is_old_subcontracting_flow?: 0 | 1;
  /**	Remarks : Small Text	*/
  remarks?: string;
  /**	Receipt Data : Table - Purchase Receipt Item	*/
  receipt_data?: PurchaseReceiptItem[];
  custom_excel_status: string;
}

export type PurchaseReceiptItem = {
  purchase_invoice?: string;
  qty: number;
  modified_by: string;
  receipt?: string;
  name?: string;
  creation?: string;
  modified?: string;
  parent?: string;
};

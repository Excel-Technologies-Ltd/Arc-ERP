import { ItemBarcode } from './ItemBarcode';
import { ItemReorder } from './ItemReorder';
import { UOMConversionDetail } from './UOMConversionDetail';
import { ItemVariantAttribute } from './ItemVariantAttribute';
import { ItemDefault } from './ItemDefault';
import { ItemSupplier } from './ItemSupplier';
import { ItemCustomerDetail } from './ItemCustomerDetail';
import { ItemTax } from './ItemTax';

export interface Item {
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
  /**	Hub Sync ID : Data	*/
  hub_sync_id?: string;
  /**	Series : Select	*/
  naming_series?: 'STO-ITEM-.YYYY.-';
  /**	Item Code : Data	*/
  item_code: string;
  /**	Item Name : Data	*/
  item_name?: string;
  /**	Item Group : Link - Item Group	*/
  item_group: string;
  /**	Default Unit of Measure : Link - UOM	*/
  stock_uom: string;
  /**	Has Excel Serials : Select - <b>If product is serialized, make sure to make it serialized on Portal.</b>	*/
  has_excel_serials: '' | 'Yes' | 'No';
  /**	Disabled : Check	*/
  disabled?: 0 | 1;
  /**	Allow Alternative Item : Check	*/
  allow_alternative_item?: 0 | 1;
  /**	Maintain Stock : Check	*/
  is_stock_item?: 0 | 1;
  /**	Has Variants : Check - If this item has variants, then it cannot be selected in sales orders etc.	*/
  has_variants?: 0 | 1;
  /**	Include Item In Manufacturing : Check	*/
  include_item_in_manufacturing?: 0 | 1;
  /**	Opening Stock : Float	*/
  opening_stock?: number;
  /**	Valuation Rate : Currency	*/
  valuation_rate?: number;
  /**	Standard Selling Rate : Currency	*/
  standard_rate?: number;
  /**	Is Fixed Asset : Check	*/
  is_fixed_asset?: 0 | 1;
  /**	Auto Create Assets on Purchase : Check	*/
  auto_create_assets?: 0 | 1;
  /**	Create Grouped Asset : Check	*/
  is_grouped_asset?: 0 | 1;
  /**	Asset Category : Link - Asset Category	*/
  asset_category?: string;
  /**	Asset Naming Series : Select	*/
  asset_naming_series?: string;
  /**	Over Delivery/Receipt Allowance (%) : Float	*/
  over_delivery_receipt_allowance?: number;
  /**	Over Billing Allowance (%) : Float	*/
  over_billing_allowance?: number;
  /**	Image : Attach Image	*/
  image?: string;
  /**	Description : Text Editor	*/
  description?: string;
  /**	Brand : Link - Brand	*/
  brand: string;
  /**	Shelf Life In Days : Int	*/
  shelf_life_in_days?: number;
  /**	End of Life : Date	*/
  end_of_life?: string;
  /**	Default Material Request Type : Select	*/
  default_material_request_type?:
    | 'Purchase'
    | 'Material Transfer'
    | 'Material Issue'
    | 'Manufacture'
    | 'Customer Provided';
  /**	Valuation Method : Select	*/
  valuation_method?: '' | 'FIFO' | 'Moving Average' | 'LIFO';
  /**	Warranty Period (in days) : Data	*/
  warranty_period?: string;
  /**	Weight Per Unit : Float	*/
  weight_per_unit?: number;
  /**	Weight UOM : Link - UOM	*/
  weight_uom?: string;
  /**	Allow Negative Stock : Check	*/
  allow_negative_stock?: 0 | 1;
  /**	Barcodes : Table - Item Barcode	*/
  barcodes?: ItemBarcode[];
  /**	Reorder level based on Warehouse : Table - Item Reorder - Will also apply for variants unless overrridden	*/
  reorder_levels?: ItemReorder[];
  /**	UOMs : Table - UOM Conversion Detail - Will also apply for variants	*/
  uoms?: UOMConversionDetail[];
  /**	Has Batch No : Check	*/
  has_batch_no?: 0 | 1;
  /**	Automatically Create New Batch : Check	*/
  create_new_batch?: 0 | 1;
  /**	Batch Number Series : Data - Example: ABCD.#####. If series is set and Batch No is not mentioned in transactions, then automatic batch number will be created based on this series. If you always want to explicitly mention Batch No for this item, leave this blank. Note: this setting will take priority over the Naming Series Prefix in Stock Settings.	*/
  batch_number_series?: string;
  /**	Has Expiry Date : Check	*/
  has_expiry_date?: 0 | 1;
  /**	Retain Sample : Check	*/
  retain_sample?: 0 | 1;
  /**	Max Sample Quantity : Int - Maximum sample quantity that can be retained	*/
  sample_quantity?: number;
  /**	Has Serial No : Check	*/
  has_serial_no?: 0 | 1;
  /**	Serial Number Series : Data - Example: ABCD.#####
If series is set and Serial No is not mentioned in transactions, then automatic serial number will be created based on this series. If you always want to explicitly mention Serial Nos for this item. leave this blank.	*/
  serial_no_series?: string;
  /**	Variant Of : Link - Item - If item is a variant of another item then description, image, pricing, taxes etc will be set from the template unless explicitly specified	*/
  variant_of?: string;
  /**	Variant Based On : Select	*/
  variant_based_on?: 'Item Attribute' | 'Manufacturer';
  /**	Variant Attributes : Table - Item Variant Attribute	*/
  attributes?: ItemVariantAttribute[];
  /**	Enable Deferred Expense : Check	*/
  enable_deferred_expense?: 0 | 1;
  /**	No of Months (Expense) : Int	*/
  no_of_months_exp?: number;
  /**	Enable Deferred Revenue : Check	*/
  enable_deferred_revenue?: 0 | 1;
  /**	No of Months (Revenue) : Int	*/
  no_of_months?: number;
  /**	Item Defaults : Table - Item Default	*/
  item_defaults?: ItemDefault[];
  /**	Default Purchase Unit of Measure : Link - UOM	*/
  purchase_uom?: string;
  /**	Minimum Order Qty : Float - Minimum quantity should be as per Stock UOM	*/
  min_order_qty?: number;
  /**	Safety Stock : Float	*/
  safety_stock?: number;
  /**	Allow Purchase : Check	*/
  is_purchase_item?: 0 | 1;
  /**	Lead Time in days : Int - Average time taken by the supplier to deliver	*/
  lead_time_days?: number;
  /**	Last Purchase Rate : Float	*/
  last_purchase_rate?: number;
  /**	Is Customer Provided Item : Check	*/
  is_customer_provided_item?: 0 | 1;
  /**	Customer : Link - Customer	*/
  customer?: string;
  /**	Delivered by Supplier (Drop Ship) : Check	*/
  delivered_by_supplier?: 0 | 1;
  /**	Supplier Items : Table - Item Supplier	*/
  supplier_items?: ItemSupplier[];
  /**	Country of Origin : Link - Country	*/
  country_of_origin?: string;
  /**	Customs Tariff Number : Link - Customs Tariff Number	*/
  customs_tariff_number?: string;
  /**	Default Sales Unit of Measure : Link - UOM	*/
  sales_uom?: string;
  /**	Grant Commission : Check	*/
  grant_commission?: 0 | 1;
  /**	Allow Sales : Check	*/
  is_sales_item?: 0 | 1;
  /**	Max Discount (%) : Float	*/
  max_discount?: number;
  /**	Customer Items : Table - Item Customer Detail	*/
  customer_items?: ItemCustomerDetail[];
  /**	Taxes : Table - Item Tax - Will also apply for variants	*/
  taxes?: ItemTax[];
  /**	Inspection Required before Purchase : Check	*/
  inspection_required_before_purchase?: 0 | 1;
  /**	Quality Inspection Template : Link - Quality Inspection Template	*/
  quality_inspection_template?: string;
  /**	Inspection Required before Delivery : Check	*/
  inspection_required_before_delivery?: 0 | 1;
  /**	Supply Raw Materials for Purchase : Check - If subcontracted to a vendor	*/
  is_sub_contracted_item?: 0 | 1;
  /**	Default BOM : Link - BOM	*/
  default_bom?: string;
  /**	Customer Code : Small Text	*/
  customer_code?: string;
  /**	Default Item Manufacturer : Link - Manufacturer	*/
  default_item_manufacturer?: string;
  /**	Default Manufacturer Part No : Data	*/
  default_manufacturer_part_no?: string;
  /**	Published in Website : Check	*/
  published_in_website?: 0 | 1;
  /**	Total Projected Qty : Float	*/
  total_projected_qty?: number;
}

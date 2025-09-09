import { CUSTOMER, ITEM, SUPPLIER, TERRITORY, WAREHOUSE } from '@/constants/doctype-strings';
import { Supplier } from '@/types/Buying/Supplier';
import { Customer } from '@/types/Selling/Customer';
import { Territory } from '@/types/Setup/Territory';
import { Item } from '@/types/Stock/Item';
import { Warehouse } from '@/types/Stock/Warehouse';
import { Filter, useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get warehouse list
export const getWarehouseDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Warehouse>(WAREHOUSE, {
    fields: ['name', 'warehouse_name'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to get Branch List
export const getTerritoryDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Territory>(TERRITORY, {
    fields: ['name', 'territory_name'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// API Call to get suppliers based on search
export const getSupplierDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Supplier>(SUPPLIER, {
    fields: ['name', 'supplier_name'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Customer based on search
export const getCustomerDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Customer>(CUSTOMER, {
    fields: ['name', 'customer_name'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Item based on search
export const getItemDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Item>(ITEM, {
    fields: ['*'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

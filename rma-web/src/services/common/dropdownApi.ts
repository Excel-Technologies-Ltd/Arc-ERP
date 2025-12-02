import {
  ACCOUNT,
  BRAND,
  CUSTOMER,
  ITEM,
  PROJECT,
  SUPPLIER,
  TERRITORY,
  WAREHOUSE,
} from '@/constants/doctype-strings';
import { Account } from '@/types/Accounts/Account';
import { Supplier } from '@/types/Buying/Supplier';
import { Project } from '@/types/Projects/Project';
import { Customer } from '@/types/Selling/Customer';
import { Brand } from '@/types/Setup/Brand';
import { Territory } from '@/types/Setup/Territory';
import { Item } from '@/types/Stock/Item';
import { Warehouse } from '@/types/Stock/Warehouse';
import { Filter, useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get warehouse list
export const getWarehouseDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Warehouse>(WAREHOUSE, {
    fields: ['name', 'warehouse_name'],
    filters: name ? ([['warehouse_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to get Branch List
export const getTerritoryDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Territory>(TERRITORY, {
    fields: ['name', 'territory_name'],
    filters: name ? ([['territory_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// API Call to get suppliers based on search
export const getSupplierDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Supplier>(SUPPLIER, {
    fields: ['name', 'supplier_name'],
    filters: name ? ([['supplier_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Customer based on search
export const getCustomerDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Customer>(CUSTOMER, {
    fields: ['name', 'customer_name'],
    filters: name ? ([['customer_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Item based on search
export const getItemDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Item>(ITEM, {
    fields: ['name', 'item_name', 'item_code'],
    filters: name ? ([['item_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Item based on search
export const getBrandDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Brand>(BRAND, {
    fields: ['name', 'brand'],
    filters: name ? ([['name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Project based on search
export const getProjectDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Project>(PROJECT, {
    fields: ['name', 'project_name', 'customer'],
    filters: name ? ([['project_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

// Api Call to Get Account Head based on search
export const getAccountHeadDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Account>(ACCOUNT, {
    fields: ['name', 'account_name'],
    filters: name ? ([['account_name', 'like', `%${name}%`]] as Filter[]) : undefined,
  });
};

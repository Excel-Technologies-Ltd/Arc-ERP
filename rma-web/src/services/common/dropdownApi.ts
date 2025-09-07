import { Supplier } from '@/types/Buying/Supplier';
import { Customer } from '@/types/Selling/Customer';
import { Territory } from '@/types/Setup/Territory';
import { Warehouse } from '@/types/Stock/Warehouse';
import { useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get warehouse list
export const getWarehouseDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Warehouse>('Warehouse', {
    fields: ['name', 'warehouse_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

// Api Call to get Branch List
export const getTerritoryDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Territory>('Territory', {
    fields: ['name', 'territory_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

// API Call to get suppliers based on search
export const getSupplierDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Supplier>('Supplier', {
    fields: ['name', 'supplier_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

// Api Call to Get Customer based on search
export const getCustomerDropdownList = (name?: string | null) => {
  return useFrappeGetDocList<Customer>('Customer', {
    fields: ['name', 'customer_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

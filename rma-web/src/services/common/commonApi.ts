import { Supplier } from '@/types/Buying/Supplier';
import { Territory } from '@/types/Setup/Territory';
import { Warehouse } from '@/types/Stock/Warehouse';
import { useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get warehouse list
export const getWarehouseList = () => {
  return useFrappeGetDocList<Warehouse>('Warehouse', {
    fields: ['name', 'warehouse_name'],
  });
};

// Api Call to get Branch List
export const getTerritoryList = (name: string | null) => {
  return useFrappeGetDocList<Territory>('Territory', {
    fields: ['name', 'territory_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

// API Call to get suppliers based on search
export const getSupplierList = (name: string | null) => {
  return useFrappeGetDocList<Supplier>('Supplier', {
    fields: ['name', 'supplier_name'],
    filters: name ? [['name', 'like', `%${name}%`]] : undefined,
  });
};

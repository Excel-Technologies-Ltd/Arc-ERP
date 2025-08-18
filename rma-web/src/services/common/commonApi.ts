import { useFrappeGetDocList } from 'frappe-react-sdk';

// Api Call to get warehouse list
export const getWarehouseList = () => {
  return useFrappeGetDocList('Warehouse', {
    fields: ['name', 'warehouse_name'],
  });
};

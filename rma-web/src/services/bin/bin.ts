import { BIN } from '@/constants/doctype-strings';
import { Bin } from '@/types/Stock/Bin';
import { useFrappeGetCall } from 'frappe-react-sdk';

// api get Call From Bin
export const getBinList = (item_name: string, warehouseName: string) => {
  return useFrappeGetCall<{ message: Bin }>(
    'frappe.client.get_value',
    {
      doctype: BIN,
      fieldname: 'actual_qty',
      filters: {
        item_code: item_name,
        warehouse: warehouseName,
      },
    },
    undefined,
    {
      isPaused: () => {
        return !item_name || !warehouseName;
      },
    }
  );
};

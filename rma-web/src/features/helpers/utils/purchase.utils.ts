import { SerialItemType } from '@/types/pages/purchase';

// Make Serial Table Data Merge Items
export const makeSerialTableDataMergeItems = (
  serialTableData: SerialItemType[]
): Record<string, SerialItemType> => {
  return serialTableData.reduce(
    (acc, curr) => {
      const key = curr.item_name;
      if (!acc[key]) {
        acc[key] = { ...curr };
      } else {
        // Sum the quantities for items with same name and amount
        acc[key].qty += curr.qty;
        // Sum the amounts for merged items
        acc[key].amount += curr.amount;
        // Merge serial_with_mac arrays instead of separate arrays
        acc[key].serial_with_mac = [...acc[key].serial_with_mac, ...curr.serial_with_mac];
      }
      return acc;
    },
    {} as Record<string, SerialItemType>
  );
};

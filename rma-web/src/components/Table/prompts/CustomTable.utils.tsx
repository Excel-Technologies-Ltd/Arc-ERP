import dayjs from 'dayjs';

//Trnsform data showing in table
export const TransformTableData = ({ item, header }: { item: any; header: any }) => {
  const value = item[header.key];

  if (header?.key === 'completeStatus') {
    return item?.isCompleted ? 'Resolved' : 'Pending';
  }

  if (value === null || value === undefined) {
    return '--';
  }

  //Date Showing using dayjs format
  if (header?.key?.toLowerCase()?.includes('date')) {
    if (value) {
      return dayjs(value)?.format('DD-MM-YYYY');
    }
    return '--';
  }

  //Check if the value is an array and then map the array
  if (Array.isArray(value)) {
    return value.map((item) => item?.fullname || item?.expenseCategoryDescription || '').join(', ');
  }

  //length set in description
  if (header?.key === 'description') {
    return value?.length > 80 ? `${value?.substring(0, 80)}...` : value;
  }

  //Check if the value is an object and show a Perticular value
  if (typeof value === 'object') {
    if (header?.key === 'userAccount') {
      return value?.firstname + ' ' + value?.surname;
    }
    return value?.vehicleName || value?.formName;
  }

  //Default Showing
  return value;
};

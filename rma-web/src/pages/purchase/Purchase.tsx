import CustomTable from '@/components/Table/CustomTable';

const Purchase = () => {
  const TableHeader = [
    { key: 'name', title: 'Name', width: '100px' },
    { key: 'requestedTripDate', title: 'Trip Date', width: '100px' },
    { key: 'requestedTripStartTime', title: 'Start Time', width: '100px' },
    { key: 'startLocation', title: 'Start Location', width: '100px' },
    { key: 'endLocation', title: 'End Location', width: '100px' },
    { key: 'isRoundTrip', title: 'Round Trip', width: '100px' },
    { key: 'isApproved', title: 'Approved', width: '100px' },
  ];

  const AllPurchase = {
    data: [
      {
        name: '1',
        requestedTripDate: '2021-01-01',
        requestedTripStartTime: '10:00',
        startLocation: 'Location 1',
        endLocation: 'Location 2',
        isRoundTrip: true,
        isApproved: true,
      },
      {
        name: '2',
        requestedTripDate: '2021-01-01',
        requestedTripStartTime: '10:00',
        startLocation: 'Location 1',
        endLocation: 'Location 2',
        isRoundTrip: true,
        isApproved: true,
      },
    ],
    totalItems: 0,
    pageSize: 10,
    pageNumber: 1,
  };
  return (
    <>
      <CustomTable
        tableHeader={TableHeader || []}
        data={AllPurchase || null}
        loading={false}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    </>
  );
};

export default Purchase;

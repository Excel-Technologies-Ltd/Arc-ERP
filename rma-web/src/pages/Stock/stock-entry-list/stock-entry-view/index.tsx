import { useParams } from 'react-router-dom';
import AddStockEntry from '../../add-stock-entry';
import { useEffect, useState } from 'react';
import LottieLoader from '@/components/Loader/LottieLoder';

const StockEntryDetails = () => {
  const { stock_entry_id } = useParams();

  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setId(stock_entry_id);
    }, 2000);
  }, [stock_entry_id]);

  if (!id) {
    return <LottieLoader pageLoader />;
  }

  return (
    <>
      <AddStockEntry id={id} />
    </>
  );
};

export default StockEntryDetails;

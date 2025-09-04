import AntButton from '@/components/Base/Button/AntButton';
import { StockLadgerFilterForm } from '@/features/stock';
import { StockLadgerFilterFormData } from '@/types/pages/stock';
import { ClearOutlined, CloudDownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';

const StockLadger = () => {
  const { control, reset } = useForm<StockLadgerFilterFormData>({
    mode: 'onChange',
  });
  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-2 justify-between mt-5 intro-y'>
        <h2 className='text-lg font-medium whitespace-nowrap'>Stock Ladger</h2>
        <StockLadgerFilterForm
          control={control}
          className='w-full flex flex-col lg:flex-row items-center gap-2'
        />
        <div className='flex items-center gap-2'>
          <AntButton icon={<SearchOutlined />}>Search</AntButton>
          <AntButton icon={<CloudDownloadOutlined />}>Download CSV</AntButton>
          <AntButton
            onClick={() => {
              reset();
            }}
            icon={<ClearOutlined />}
          >
            Clear
          </AntButton>
        </div>
      </div>
    </>
  );
};

export default StockLadger;

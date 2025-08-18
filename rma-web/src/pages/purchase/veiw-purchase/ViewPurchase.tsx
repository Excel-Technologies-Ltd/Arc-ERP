import { Tab } from '@/components/Base/Headless';
import PurchaseDetails from './purchase-details/PurchaseDetails';
import Serials from './serials/Serials';
import { useParams } from 'react-router-dom';
import { getPurchaseInvoiceDetails } from '@/services/purchase/purchase';
import { Spin } from 'antd';

const ViewPurchase = () => {
  const { invoice_number } = useParams();
  const {
    data: purchaseInvoiceDetails,
    isLoading,
    isValidating,
  } = getPurchaseInvoiceDetails(invoice_number ?? '');

  return (
    <div className='mt-5'>
      <Tab.Group>
        <Tab.List variant='boxed-tabs'>
          <Tab>
            <Tab.Button className='w-full py-2' as='button'>
              Details
            </Tab.Button>
          </Tab>
          <Tab>
            <Tab.Button className='w-full py-2' as='button'>
              Serials
            </Tab.Button>
          </Tab>
        </Tab.List>
        <Tab.Panels className='mt-5'>
          <Tab.Panel className='leading-relaxed'>
            <Spin spinning={isLoading || isValidating}>
              {purchaseInvoiceDetails && <PurchaseDetails data={purchaseInvoiceDetails} />}
            </Spin>
          </Tab.Panel>
          <Tab.Panel className='leading-relaxed'>
            <Spin spinning={isLoading || isValidating}>
              {purchaseInvoiceDetails && <Serials data={purchaseInvoiceDetails} />}
            </Spin>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ViewPurchase;

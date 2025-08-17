import { Tab } from '@/components/Base/Headless';
import PurchaseDetails from './purchase-details/PurchaseDetails';
import Serials from './serials/Serials';

const ViewPurchase = () => {
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
            <PurchaseDetails />
          </Tab.Panel>
          <Tab.Panel className='leading-relaxed'>
            <Serials />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ViewPurchase;

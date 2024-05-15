"use client"
import {useState} from 'react';
import OrderedTab from "@/app/user/order/OrderedTab";
import ShippingTab from "@/app/user/order/ShippingTab";
import CompletedTab from "@/app/user/order/CompletedTab";
import DeliveredTab from "@/app/user/order/DeliveredTab";
import CanceledTab from "@/app/user/order/CanceledTab";

export default function order() {
  const [activeTab, setActiveTab] = useState<string>('ordered');
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col gap-10 px-10">
      <div className="flex gap-2">
        <div className="w-full">

          <div className="mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'canceled' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`}
                  onClick={() => handleTabChange('canceled')} type="button" role="tab" aria-controls="canceled"
                  aria-selected={activeTab === 'canceled'}>Canceled
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'ordered' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`}
                  onClick={() => handleTabChange('ordered')} type="button" role="tab" aria-controls="ordered"
                  aria-selected={activeTab === 'ordered'}>Ordered
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'on shipping' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`}
                  onClick={() => handleTabChange('on shipping')} type="button" role="tab" aria-controls="on shipping"
                  aria-selected={activeTab === 'on shipping'}>Shipping
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'delivered' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`}
                  onClick={() => handleTabChange('delivered')} type="button" role="tab" aria-controls="delivered"
                  aria-selected={activeTab === 'completed'}>Delivered
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'completed' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`}
                  onClick={() => handleTabChange('completed')} type="button" role="tab" aria-controls="completed"
                  aria-selected={activeTab === 'completed'}>Completed
                </button>
              </li>

            </ul>
          </div>

          <div className="px-4 rounded-lg">
            {activeTab === 'ordered' && <OrderedTab/>}
            {activeTab === 'canceled' && <CanceledTab/>}
            {activeTab === 'on shipping' && <ShippingTab/>}
            {activeTab === 'delivered' && <DeliveredTab/>}
            {activeTab === 'completed' && <CompletedTab/>}
          </div>

        </div>
      </div>
    </div>
  )
}
"use client"
import {useState} from 'react';
import OrderBill from "@/components/order/orderBill";

export default function order() {
    const [activeTab, setActiveTab] = useState<string>('ordered');

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const products = [
        { 
            id: "1", 
            imageSource: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            productName: "Product 1", 
            validation: "hehehe", 
            number: "1", 
            price: "1"
        },
        { 
            id: "2", 
            imageSource: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
            productName: "Product 1", 
            validation: "hehehe", 
            number: "1", 
            price: "1"
        }
    ];
    return(
        <div className="flex flex-col gap-10 px-10">
            <div className="flex gap-2">
                <div className="w-4/10">
                    <p>Chỗ để cái người tab hay gì đó</p>
                </div>

                <div className="w-full">
                    <div className="mb-4 border-b border-gray-200">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                            <li className="me-2" role="presentation">
                                <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'ordered' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`} onClick={() => handleTabChange('ordered')} type="button" role="tab" aria-controls="ordered" aria-selected={activeTab === 'ordered'}>Ordered</button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'on shipping' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`} onClick={() => handleTabChange('on shipping')} type="button" role="tab" aria-controls="on shipping" aria-selected={activeTab === 'on shipping'}>On shipping</button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'completed' ? 'border-black text-black' : 'border-gray-100 text-gray-500'}`} onClick={() => handleTabChange('completed')} type="button" role="tab" aria-controls="completed" aria-selected={activeTab === 'completed'}>Completed</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="p-4 rounded-lg">
                            {activeTab === 'ordered' && <OrderBill products={products} shopName="Tên shop" totalPrice="200"/>}
                            {activeTab === 'on shipping' && <OrderBill products={products} shopName="Tên shop" totalPrice="200"/>}
                            {activeTab === 'completed' && <OrderBill products={products} shopName="Tên shop" totalPrice="200"/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
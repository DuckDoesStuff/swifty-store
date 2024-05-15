"use client"
import OrderedItem from "@/app/user/order/OrderedItem";
import {CiShop} from "react-icons/ci";
import React, {useEffect, useState} from "react";
import IOrder from "@/types/OrderInfo";
import Loader from "@/components/Loader";
import Link from "next/link";

export default function CanceledTab() {
  const limit = 4;
  const orderby = "createdAt";
  const status = "canceled";
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/order?limit=${limit}&offset=${(page - 1) * limit}&orderby=${orderby}&status=${status}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: "include"
    }).then((response) => {
      if (response.ok) return response.json();
    }).catch((error) => {
      setLoading(false);
      console.error('Error:', error);
    });

    data.then((data) => {
      setLoading(false);
      setTotalPages(data.totalPages);
      setOrders(data.orders);
    });
  }, [page]);

  if (loading) {
    return <Loader/>
  }

  if (orders.length === 0) {
    return <div className={"font-bold text-xl text-center py-20"}>
      Looks like you haven't ordered anything yet
    </div>
  }

  const Pagination = () => {
    if (!totalPages) return null
    if (totalPages === 1) return null
    return (
      <div className="flex justify-center items-center space-x-4 my-5">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
          Previous
        </button>

        {Array.from({length: totalPages}, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              page === index + 1
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
          Next
        </button>
      </div>
    )
  }


  return (
    <div>
      <div className={"flex flex-col gap-5"}>
        {orders.map(order => (
          <div className="p-4 rounded-md shadow-md shadow-neutral-300 border border-neutral-200">
            <div>
              <div className="flex items-center gap-1 p-2 ">
                <CiShop/>
                <Link href={`/shop/${order.shop.nameId}`} className="font-semibold">Shop: {order.shop.nameId} </Link>
                <p className={"ml-auto"}>Order ID: {order.id}</p>
              </div>

              <div className="flex flex-col gap-2">
                <OrderedItem id={order.product.id} imageSource={order.product.productImages[0].url}
                             productName={order.product.displayName} price={order.product.price}
                             quantity={order.quantity}/>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination/>
    </div>
  )
}
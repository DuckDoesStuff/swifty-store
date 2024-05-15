'use client'

import {CiShop} from "react-icons/ci";
import {useAuthContext} from "@/contexts/AuthContext";
import {useEffect, useState} from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import Link from "next/link";
import {message} from "antd";
import {useRouter} from "next/navigation";
import ICartItem from "@/types/CartItem";

const CheckoutPage = () => {
  const authContext = useAuthContext();
  const user = authContext?.user;
  const router = useRouter();

  const [orders, setOrders] = useState<ICartItem[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading && orders) return;
    const data = fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + '/cart', {
      method: "GET",
      headers: {"Content-Type": "application/json",},
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        setOrders(data.cartItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (loading) {
    return <Loader/>
  }

  if (!orders) {
    return <div className={"font-bold text-xl text-center py-20"}>
      Oops! did you try to checkout an empty cart?
    </div>
  }

  const handlePlaceOrder = () => {
    message.open({
      content: "Placing order...",
      duration: 0,
      key: "order",
    })
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + '/cart/checkout', {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        message.success({
          content: "Order placed successfully",
          key: "order",
        });
        setTimeout(() => {
          router.push("/user/order")
        }, 1000)
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error({
          content: "Failed to place order",
          key: "order",
        })
      });
  }

  const canPlaceOrder = !(orders.length === 0 || user?.address == null || user?.phone == null);
  const totalCost = orders.reduce((acc, order) => {
    return acc + order.quantity * order.product.price;
  }, 0);
  const subTotal = totalCost + 10;
  return (
    <div className="bg-gray-100 py-8">
      <div className="flex mx-10 gap-8 justify-center">
        <div className="max-w-xl w-full gap-10">
          {orders.map((order =>
              <div className="mx-auto bg-white mb-5 p-4 shadow-md rounded-md">
                <div className="flex items-center gap-1 mb-3 ">
                  <CiShop/>
                  <Link href={`/shop/${order.product.shop.nameId}`}
                        className="font-semibold"> Shop: {order.product.shop.displayName} </Link>
                </div>
                <div className="flex items-center ">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      width={100}
                      height={100}
                      alt={order.product.displayName}
                      src={order.product.productImages[0].url}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <Link href={`/product/${order.product.id}`}>{order.product.displayName}</Link>
                    <h4 className="">{order.product.price} $</h4>
                    <p className="text-gray-500">Qty {order.quantity}</p>
                  </div>

                  <h1 className="self-end font-bold">{order.quantity * order.product.price} $</h1>
                </div>
              </div>
          ))}
        </div>

        <div className="h-fit w-full max-w-xs">
          <div className="bg-white rounded-md p-4 h-fit shadow-md">
            <div className="flex justify-between">
              <p>Recipient: </p>
              <p className="font-bold"> {user?.lastName} {user?.firstName} </p>
            </div>

            <div className="flex justify-between gap-2 mt-2">
              <p>Address: </p>
              <p>{user?.address || "Unknown"} </p>
            </div>

            <div className="flex justify-between gap-2 mt-2">
              <p>Phone: </p>
              <p>{user?.phone || "Unknown"} </p>
            </div>

            <hr className="mt-4 mb-1"></hr>

            <div className="flex justify-between ">
              <p className="">Orders</p>
              <p>{orders.length} </p>
            </div>

            <div className="flex justify-between ">
              <p className="">Orders cost</p>
              <p>{totalCost} $</p>
            </div>

            <div className="flex justify-between ">
              <p className="">Shipping fee</p>
              <p>10 $</p>
            </div>

            <hr className="mt-4 mb-1"></hr>

            <div className="flex justify-between ">
              <h1 className="font-bold">Subtotal :</h1>
              <p>{subTotal} $</p>
            </div>
          </div>
          {!canPlaceOrder &&
              <p className={"mt-2 text-red-500"}>You need both a phone number and an address to place an order.</p>}
          <button
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder}
            className="disabled:bg-gray-500 disabled:border-gray-500 w-full shadow-lg mt-4 inline-block rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring enabled:active:text-indigo-500">
            Place order
          </button>
        </div>
      </div>
    </div>
  )

}

export default CheckoutPage;


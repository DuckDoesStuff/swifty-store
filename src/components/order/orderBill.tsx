import OrderProduct from "@/components/order/orderProduct";
import { CiShop } from "react-icons/ci";

interface OrderProductPros {
    id: string;
    imageSource:string;
    productName:string;
    validation: string;
    number: string;
    price:string;
  }

interface OrderBillPros {
    products: OrderProductPros[];
    shopName: string;
    totalPrice: string;
  }

export default function OrderBill({ products, shopName, totalPrice}:OrderBillPros) {
    return(
        <div className="border border-gray-300 p-4 rounded-md">
            <div className="flex items-center gap-1 p-2 ">
                <CiShop />
                <p className="font-semibold"> {shopName} </p>
            </div>
            <div className="flex flex-col gap-2">
            {products.map(product => (
                <OrderProduct imageSource={product.imageSource} productName={product.productName} validation={product.validation} price={product.price} number={product.number}/>
            ))}
                
            </div>
            <div className="flex justify-end items-center gap-3 pt-4">
                <p className="font-semibold"> Order total: </p>
                <p className="text-lg font-semibold"> ${totalPrice}</p>
            </div>
        </div>
    )
}
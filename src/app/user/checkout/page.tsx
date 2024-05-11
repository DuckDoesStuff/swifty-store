'use client'

import {faker} from "@faker-js/faker"
import { CiShop } from "react-icons/ci";
import {useAuthContext} from "@/contexts/AuthContext";


interface Product {
    name:string;
    price:string;
    stock:string;
    color:string;
    image: string;
}
interface Order {
    store:string;
    quantity:string;
    total:string;
    image: string;
    product: Product;
}

const generateProductData = (): Product => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.datatype.number({min:0, max:5}).toString(),
    color:faker.color.human(),
    image: faker.image.urlLoremFlickr()
});

// Hàm tạo dữ liệu ảo cho Order
const generateOrderData = (): Order => {
    const product = generateProductData();
    const quantity = faker.datatype.number({min:0, max:5}); // Số lượng sản phẩm đặt hàng
    const total = parseFloat(product.price) * quantity;
    return {
        store: faker.company.name(),
        quantity: quantity.toString(),
        total: total.toString(),
        image: faker.image.imageUrl(),
        product: product}// Sử dụng hàm tạo dữ liệu ảo cho Product
};
const CheckoutPage = ()=>{
    const user = useAuthContext();

    const orders: Order[] = Array.from({ length: 5 }, () => generateOrderData());
    const totalCost = orders.reduce((acc, order) => {
        // Chuyển đổi giá và số lượng từ chuỗi sang số và nhân chúng để tính tổng giá của đơn hàng
        const orderTotal = parseFloat(order.total) * parseInt(order.quantity);
        
        return acc + orderTotal;
    }, 0);
    const subTotal = totalCost+10;
    return (
        <div className="bg-gray-100 py-8">
            <div className="flex mx-10 gap-8 justify-center">
                <div className="max-w-xl w-full gap-10">
                {orders.map((order=>
                    <div className="mx-auto bg-white mb-5 p-4   shadow-md rounded-md">
                            <div className="flex items-center gap-1 mb-3 ">
                                <CiShop />
                                <p className="font-semibold"> Shop {order.store} </p>
                            </div>
                            <div className="flex items-center ">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                        src={order.product.image}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="ml-4 flex-1 ">
                                    <h3 className="">
                                        <a href="#" >{order.product.name}</a>
                                    </h3>
                                    <h4  className="">{order.product.price} $</h4>
                                    
                                    <p className=" text-sm text-gray-500">{order.product.color}</p>
                                
                                    <p className="text-gray-500">Qty {order.quantity}</p>
                                </div>

                                <h1 className="self-end font-bold">{order.total} $</h1>
                            </div>
                            

                        
                        </div>
                    ))}
                </div>
                <div className=" w-full max-w-xs"> 
                    <div className="bg-white rounded-md p-4 h-fit ">
                        <div className="flex justify-between">
                            <p>Recipient</p>
                            <p className="font-bold"> {user?.lastName} {user?.firstName} </p>
                        </div>
                        <div className="flex ">
                            <p>Address: {user?.address||"thanh pho hoc chi minh"} </p>
                            
                        </div>
                        <div className="flex justify-between">
                            <p>Phone</p>
                            <p className=""> {user?.address} </p>
                        </div>
                    <hr className="mt-4 mb-1"></hr>
                        <div className="flex  justify-between ">
                            <p className="">Orders</p>
                            <p>{orders.length} </p>
                        </div>
                        <div className="flex  justify-between ">
                            <p className="">Orders cost</p>
                            <p>{totalCost} $</p>
                        </div>
                        <div className="flex  justify-between ">
                            <p className="">Shipping fee</p>
                            <p>10 $</p>
                        </div>
                        <hr className="mt-4 mb-1"></hr>
                        <div className="flex  justify-between ">
                            <h1 className="font-bold">Subtotal :</h1>
                            <p>{subTotal} $</p>
                        </div>
                    </div>
                    <button className ="w-full mt-4 inline-block rounded border border-black bg-black px-12 py-3 text-sm font-medium text-white hover:bg-gray-500  focus:outline-none focus:ring active:text-indigo-500" >Procced checkout</button>
                </div>
            </div>
        </div>
    )

}

export default CheckoutPage;


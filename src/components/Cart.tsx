import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {faker} from "@faker-js/faker"
import Product from './ProductItem';
import { CiShop } from "react-icons/ci";

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
  }
interface Product {
  name:string;
  price:string;
  stock:number;
  color:string;
  image: string;
  store:string;
}
const generateProduct = ():Product => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      stock:faker.datatype.number({min:0, max:5}),
      color:faker.color.human(),
      store:faker.datatype.number({min:1, max:3}).toString(),
      image: faker.image.urlLoremFlickr(),
});
function  calTotal (products: Product[]) {
  let totalCost:number = 0;
  products.forEach((product) => {
      totalCost += parseFloat(product.price)* product.stock;
    });

  return totalCost;
}
const generateProducts = (count: number) => {
  return Array.from({ length: count }, generateProduct);
};
export default function Cart() {


  const [open, setOpen] = useState(true)
  const groupedProducts: { [storeId: string]: { products: Product[]; totalCost: number } } = {};

  
  const [productList, setProducts] = useState(generateProducts(6));
  
  
  productList.forEach(product => {
    if (!groupedProducts[product.store]) {
        groupedProducts[product.store] = { products: [], totalCost: 0 };
    }
    groupedProducts[product.store].products.push(product);
    groupedProducts[product.store].totalCost +=( parseInt(product.price)* product.stock);
});


  const totalCost = calTotal(productList);
  const handleRemove = (productName: string) => {
    setProducts(productList.filter((product) => product.name !== productName)); // Remove the product by filtering
  };
  
  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">

                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                        {Object.keys(groupedProducts).map(storeName =>
                          <ul className= "bg-gray-100  mb-5 p-4  pb-6 shadow-md rounded-" key={storeName} >
                            <div className="flex items-center gap-1 mb-2">
                              <CiShop />
                              <p className="font-semibold"> Shop {storeName} </p>
                              </div>
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {groupedProducts[parseInt(storeName)].products.map(product => (
                              <li  className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.image}
                                    
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {product.stock}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => handleRemove(product.name)}
                                        className="font-medium text-red-800 hover:text-black"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                  
                                </div>
                              </li>
                            ))}
                            <div className="flex justify-end items-center gap-3 pt-4 mb-2">
                                    <p className="font-semibold"> Order total: </p>
                                    <p className="text-lg font-semibold"> ${groupedProducts[storeName].totalCost}</p>
                                  </div>
                            </ul>
                          </ul>
                        )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{totalCost} $</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="user/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-black hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>


              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
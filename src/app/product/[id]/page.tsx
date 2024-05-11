"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { Carousel } from 'antd';
import { FiShoppingCart } from "react-icons/fi";
import ShopInfo from "@/components/shop/ShopInfo";
import Product from "@/components/ProductItem";
import Link from 'next/link';




const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
interface Product {
  name: string;
  price: string;
  stock: number;
  color: string;
  images: string[];
}

const generateFakeProduct = (): Product => {
  const product: Product = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.datatype.number(),
    color: faker.color.human(),
    images: [],
  };
  

  // Generate 4 image URLs
  for (let i = 0; i < 4; i++) {
    product.images.push(faker.image.urlLoremFlickr());
  }

  return product;
};

export default function ProductDetail() {
  const params = useParams();
  const fakeProduct: Product = generateFakeProduct();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const products = [
    { id: 1, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 1", price: "$100" },
    { id: 2, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 2", price: "$200" },
    { id: 3, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 3", price: "$300" },
    { id: 4, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 4", price: "$400" },
  ];
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <section className="text-gray-700 body-font overflow-hidden max-w-6xl bg-white my-5">
        <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-5/6 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full ">
                <Carousel arrows infinite={false}>
                {fakeProduct.images.map((img) => (
                
                        <img src={img} className="object-cover object-center rounded border border-gray-200"   />
                    
                ))}
                </Carousel></div>
            {/* <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={fakeProduct.images[0]}/> */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
                <div className="flex mb-4">
                
                </div>
                <p className="leading-relaxed mb-5">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
                
                <div className="flex items-center mb-5">
                    <span className="mr-3">Type</span>
                    <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        <option>Option</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                        </svg>
                    </span>
                    </div>
                </div>
                <div className="flex items-center mb-5">
                    <span className="mr-3">Amount</span>
                    <div className="flex gap-4 rounded border appearance-none border-gray-400 p-2">
                        <button onClick={decreaseQuantity}>-</button>
                        <span className="lg:w-10 sm:w-5 text-center">{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                </div>
                <div className="flex mb-5">
                    <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-teal-600 bg-white border border-teal-600 py-2 px-6 focus:outline-none hover:bg-teal-100 rounded"><FiShoppingCart /> Add To Card</button>
                    <button className="flex text-white bg-teal-600 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 rounded">BUY NOW</button>
                </div>
            </div>
            </div>
            <ShopInfo displayName="Tên shop" createdAt="Thời gian tạo" products="Số lượng sản phẩm" solds="Số lượng đã bán" logo="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg"/>
            <div className="flex flex-col items-center pt-10">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold mb-5">Other from this shop</p>
                </div>
                <div className="grid lg:grid-cols-4 gap-10 sm:grid-cols-2 mb-6">
                {products.map(product => (
                    <Product imageSource={product.img} productName={product.name} price={product.price}/>
                    ))}
                </div>
                <Link href="/shop/12345">
                    <p className="text-black-500 hover:underline">See All</p>
                </Link>
            </div>
        </div>
    </section>
    </div>
  );
};


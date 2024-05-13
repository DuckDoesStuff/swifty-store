"use client"
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Carousel, message as notification} from 'antd';
import {FiShoppingCart} from "react-icons/fi";
import ShopInfo from "@/components/shop/ShopInfo";
import Product from "@/components/ProductItem";
import Link from 'next/link';
import Image from "next/image";
import Loader from "@/components/Loader";
import IProductInfo from "@/types/ProductInfo";
import IShopInfo from "@/types/ShopInfo";
import {useAuthContext} from "@/contexts/AuthContext";

export default function ProductDetail() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<IProductInfo | null>(null);
  const [shop, setShop] = useState<IShopInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProductInfo[] | null>(null);
  const authContext = useAuthContext();
  const user = authContext?.user;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/product/${params.id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setShop(data.shop);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/product?shop=${shop?.nameId}&loadImg=true&limit=4`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
      })
      .catch(err => {
        console.error(err);
      });
  }, [shop?.nameId]);


  if (loading) return <Loader/>

  if (!product || !shop) return (
    <div>
      <h1 className="text-3xl text-black-2 font-bold mb-5">Product not found</h1>
    </div>
  )

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    notification.open({
      type: 'loading',
      content: 'Adding to cart...',
      duration: 0,
      key: 'cart'
    })
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/cart`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        productId: product.id,
        quantity: quantity
      })
    }).then(async (response) => {
      if (response.ok) {
        const {message} = await response.json();
        if (message) {
          notification.open({
            type: 'success',
            content: message,
            key: 'cart',
            duration: 1
          })
        }else {
          notification.success({
            type: 'success',
            content: "Added to cart",
            key: 'cart',
            duration: 1
          })
        }
      } else {
        notification.error({
          content: 'Failed to add to cart',
          key: 'cart',
          duration: 1
        })
      }
    })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <section className="text-gray-700 body-font overflow-hidden max-w-6xl bg-white my-5">
        <div className="flex flex-col container px-5 py-24 mx-auto">

          <div className="lg:w-5/6 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full">
              <Carousel arrows infinite={false}>
                {product.productImages.map((img) => (
                  <Image width={600} height={600} alt={product.displayName} src={img.url}
                         className="object-cover object-center rounded border border-gray-200"/>
                ))}
              </Carousel></div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col gap-3">
              <h1 className="text-gray-900 text-3xl title-font font-medium">{product.displayName}</h1>
              <p className="leading-relaxed">Description: {product.description}</p>
              <p className="leading-relaxed">Stock: {product.stock}</p>

              <div className="flex items-center">
                <span className="mr-3">Amount</span>
                <div className="flex gap-4 rounded border appearance-none border-gray-400 p-2">
                  <button onClick={decreaseQuantity}>-</button>
                  <span className="lg:w-10 sm:w-5 text-center">{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </div>

              <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>

              <div className="flex gap-4">
                {user ?
                <button onClick={handleAddToCart}
                  className="flex items-center gap-2 text-teal-600 bg-white border border-teal-600 py-2 px-6 focus:outline-none hover:bg-teal-100 rounded">
                  <FiShoppingCart/> Add To Cart
                </button>:
                <Link href="/auth/signin">
                  <button
                    className="flex items-center gap-2 text-teal-600 bg-white border border-teal-600 py-2 px-6 focus:outline-none hover:bg-teal-100 rounded">
                    <FiShoppingCart/> Add To Cart
                  </button>
                </Link>
                }
              </div>
            </div>
          </div>

          <ShopInfo nameId={shop.nameId} displayName={shop.displayName} createdAt={shop.createdAt}
                    sold={shop.sold} phone={shop.phone} address={shop.address} description={""}
                    productCount={"0"}
                    logo={shop.logo}/>

          <div className="flex flex-col items-center pt-10 gap-10">
            <p className="text-2xl font-bold">Other from this shop</p>

            <div className="grid lg:grid-cols-4 gap-10 sm:grid-cols-2">
              {products?.map(product => (
                <Product id={product.id} imageSource={product.productImages[0].url} productName={product.displayName}
                         price={product.price}/>
              ))}
            </div>

            <Link href={`/shop/${shop.nameId}`}>
              <p className="text-black-500 hover:underline">See All</p>
            </Link>

          </div>

        </div>
      </section>
    </div>
  );
};


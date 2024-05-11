import Product from "@/components/ProductItem";
import Banner from "@/components/Banner";
import Link from 'next/link';


export default function Home() {
  const products = [
    { id: 1, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 1", price: "$100" },
    { id: 2, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 2", price: "$200" },
    { id: 3, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 3", price: "$300" },
    { id: 4, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 4", price: "$400" },
    { id: 5, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 5", price: "$500" },
  ];
  return (
    <div className={"flex flex-col gap-10 px-10 pb-32"}>
      <Banner />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Daily Discover</p>
        <Link href="/all-product">
          <p className="text-black-500 hover:underline">See All</p>
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 gap-10 sm:grid-cols-3">
      {products.map(product => (
          <Product imageSource={product.img} productName={product.name} price={product.price}/>
        ))}
      </div>
    </div>
  );
}

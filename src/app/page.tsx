import Product from "@/components/ProductItem";
import Banner from "@/components/Banner";
import Link from 'next/link';
import IProductInfo from "@/types/ProductInfo";


export default async function Home() {
  const response: Response = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/product?loadImg=true&limit=5`);

  const data = await response.json();

  const products: IProductInfo[] = data.products;

  return (
    <div className={"flex flex-col gap-10 px-10 pb-32"}>
      <Banner />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Daily Discover</p>
        <Link href="/product">
          <p className="text-black-500 hover:underline">See All</p>
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 gap-10 sm:grid-cols-3">
        {products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            imageSource={product.productImages[0].url}
            productName={product.displayName}
            price={product.price}/>
        ))}
      </div>
    </div>
  );
}

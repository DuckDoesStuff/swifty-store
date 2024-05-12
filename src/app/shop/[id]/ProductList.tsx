import Product from "@/components/ProductItem";
import {useEffect, useState} from "react";
import ProductCard from "@/types/productCard";
import {useParams} from "next/navigation";
import Loader from "@/components/Loader";


export default function ProductList() {
  const [products, setProducts] = useState<ProductCard[] | null>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/product?shop=${params.id}&loadImg=true`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  });

  if (loading) return (
    <div>
      <h1 className="text-3xl text-black-2 font-bold mb-5">Product list</h1>
      <Loader/>
    </div>
  )


  if (!products) return (
    <div>
      <h1 className="text-3xl text-black-2 font-bold mb-5">Shop doesn't have any products</h1>
    </div>
  )


  return (
    <div className={"flex flex-col gap-5"}>
      <h1 className="text-3xl text-black-2 font-bold mb-5">Product list</h1>
      <div className="grid lg:grid-cols-5 gap-10 sm:grid-cols-3">
        {products.map(product => (
          <Product id={product.id} imageSource={product.productImages[0].url} productName={product.displayName}
                   price={product.price}/>
        ))}
      </div>
    </div>
  )
}
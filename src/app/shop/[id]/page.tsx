"use client"
import ShopInfo from "@/components/shop/ShopInfo";
import {useEffect, useState} from "react";
import IShopInfo from "@/types/ShopInfo";
import {useParams} from "next/navigation";
import Loader from "@/components/Loader";
import ProductList from "@/app/shop/[id]/ProductList";

export default async function shop() {
  const [shop, setShop] = useState<IShopInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/shop/${params.id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setShop(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  if (loading) return <Loader/>

  if (!shop) return (
    <div>
      <h1 className="text-3xl text-black-2 font-bold mb-5">Shop not found</h1>
    </div>
  )

  return (
    <div className={"flex flex-col gap-10 px-10"}>
      <ShopInfo nameId={shop.nameId} displayName={shop.displayName} createdAt={shop.createdAt}
                productCount={shop.productCount}
                sold={shop.sold} logo={shop.logo} description={shop.description} address={shop.address}
                phone={shop.phone}/>
      <ProductList/>
    </div>
  )
}
import Image from "next/image";
import Link from "next/link";
import IShopInfo from "@/types/ShopInfo";

export default function ShopInfo({
                                   nameId,
                                   displayName,
                                   createdAt,
                                   productCount,
                                   sold,
                                   logo,
                                   phone,
                                   address,
                                   description
                                 }: IShopInfo) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString();
  return (
    <div className={"flex flex-col items-center gap-10"}>
      <div className="flex items-center gap-20 justify-center">
        <div className="flex justify-left items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <Image
              width={100}
              height={100}
              alt=""
              src={logo}
            />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col gap-1">
              <Link href={`/shop/${nameId}`}><p className="text-lg font-semibold"> {displayName} </p></Link>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-500"> Joined at {formattedDate} </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {(Number(productCount) > 0) &&
            (<div className="flex gap-2">
              <p className="font-semibold text-gray-800"> Items in shop:</p>
              <p className="text-gray-500"> {productCount} </p>
            </div>)}
          <div className="flex gap-2">
            <p className="font-semibold text-gray-800"> Sold:</p>
            <p className="text-gray-500"> {sold} </p>
          </div>
        </div>
      </div>
      {description != "" &&
          <p>Description: {description}</p>}
    </div>
  )
}
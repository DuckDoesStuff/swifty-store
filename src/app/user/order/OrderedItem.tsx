import Image from "next/image";
import Link from "next/link";

interface OrderProductPros {
  id: string;
  imageSource: string;
  productName: string;
  quantity: number;
  price: number;
}

export default function OrderedItem({id, imageSource, productName, quantity, price}: OrderProductPros) {
  return (
    <div className="flex flex-grow justify-left items-center gap-4 bg-gray-100 rounded-md p-2">
      <div className="h-20 w-20 overflow-hidden rounded-md">
        <Image
          alt=""
          width={80}
          height={80}
          src={imageSource}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between w-full">
        <div>
          <Link href={`/product/${id}`} className="font-semibold">{productName}</Link>
          <p> Quantity: {quantity}x</p>
        </div>

        <p className={"mr-5"}> ${price * quantity}</p>
      </div>
    </div>
  )
}
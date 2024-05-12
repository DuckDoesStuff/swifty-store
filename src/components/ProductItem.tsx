import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  imageSource:string;
  productName:string;
  price:string;
}


export default function Product({id, imageSource, productName, price}: ProductProps) {
  // className -> className
  return (
    <Link key={id}
          href={`/product/${id}`}
          className="block rounded-lg p-4 shadow-md shadow-neutral-300 hover:border-black transform transition-transform hover:scale-105">
    <Image
      alt=""
      width={300}
      height={400}
      src={imageSource}
      className="h-56 w-full rounded-md object-cover"
    />

    <div className="mt-2">
      <dl>
        <div>
          <dt className="sr-only">Price</dt>

          <dd className="text-sm text-gray-500">${price}</dd>
        </div>

        <div>
          <dt className="sr-only">Address</dt>

          <dd className="font-medium">{productName}</dd>
        </div>
      </dl>
    </div>
    </Link>
  )
}
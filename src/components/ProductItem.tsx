
interface ProductPros {
  imageSource:string;
  productName:string;
  price:string;
}



export default function Product({ imageSource, productName, price }:ProductPros) {
  // className -> className
  return (
    <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:border-black transform transition-transform hover:scale-105">
    <img
      alt=""
      src={imageSource}
      className="h-56 w-full rounded-md object-cover"
    />

    <div className="mt-2">
      <dl>
        <div>
          <dt className="sr-only">Price</dt>

          <dd className="text-sm text-gray-500">{price}</dd>
        </div>

        <div>
          <dt className="sr-only">Address</dt>

          <dd className="font-medium">{productName}</dd>
        </div>
      </dl>
    </div>
  </a>
  )
}
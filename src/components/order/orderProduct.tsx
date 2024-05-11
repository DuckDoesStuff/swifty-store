interface OrderProductPros {
    imageSource:string;
    productName:string;
    validation: string;
    number: string;
    price:string;
  }

export default function OrderProduct({ imageSource, productName, validation, number, price }:OrderProductPros) {
    return(
        <div className="flex justify-left items-center gap-4 bg-gray-100 rounded-md p-2" >
            <div className="h-20 w-20 overflow-hidden rounded-md">
                <img
                    alt=""
                    src={imageSource}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex items-center justify-between w-full">
                <div>
                    <p className="font-semibold">{productName}</p>
                    <p className="text-gray-600">Validation: {validation}</p>
                    <p> x{number}</p>
                </div>
                <div>
                    <p> ${price}</p>
                </div>
            </div>
        </div>
    )
}
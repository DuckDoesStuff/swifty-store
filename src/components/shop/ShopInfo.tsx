interface ShopProps {
    displayName:string;
    createdAt:string;
    products:string;
    solds:string;
    logo:string;
  }
export default function ShopInfo({ displayName, createdAt, products, solds, logo }: ShopProps) {
    return(
        <div className="flex items-center gap-20 justify-center">
            <div className="flex justify-left items-center gap-4" >
                <div className="h-20 w-20 overflow-hidden rounded-full">
                    <img
                        alt=""
                        src={logo}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold"> {displayName} </p>
                        <p className="flex items-center gap-1 text-sm font-medium text-gray-500"> Joined at {createdAt} </p>
                    </div>
                </div>
            </div>
            <div className="flex gap-20">
                <div className="flex gap-2">
                    <p className="font-semibold text-gray-800"> Product:</p>
                    <p className="text-gray-500"> {products} </p>
                </div>
                <div className="flex gap-2">
                    <p className="font-semibold text-gray-800"> Sold:</p>
                    <p className="text-gray-500"> {solds} </p>
                </div>
            </div>
        </div>
    )
}
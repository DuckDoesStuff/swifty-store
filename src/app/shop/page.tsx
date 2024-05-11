import ShopInfo from "@/components/shop/ShopInfo";
import Product from "@/components/ProductItem";
export default function shop() {
    const shop = {
        id: 1,
        displayName: "DuckDoesStuff",
        createdAt: "11/05/2024",
        products: [
            { id: 1, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 1", price: "$100" },
            { id: 2, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 2", price: "$200" },
            { id: 3, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 3", price: "$300" }
        ],
        solds: "102",
        logo: "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/5/15/photo-1-16525767855142091331258.jpg"
    };
            
    return (
        <div className={"flex flex-col gap-10 px-10"}>
            <ShopInfo displayName={shop.displayName} createdAt={shop.createdAt} products={shop.products.length.toString()} solds={shop.solds} logo={shop.logo}/>
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">Shop Products</p>
            </div>
            <div className="grid lg:grid-cols-5 gap-10 sm:grid-cols-3">
                {shop.products.map(product => (
                    <Product imageSource={product.img} productName={product.name} price={product.price}/>
                    ))}
            </div>
        </div>
    )
}
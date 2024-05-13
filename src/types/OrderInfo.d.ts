import IProductInfo from "@/types/ProductInfo";
import IShopInfo from "@/types/ShopInfo";


export default interface IOrder {
  id:string;
  quantity:number;
  product: IProductInfo;
  total:number;
  shop: IShopInfo;
}
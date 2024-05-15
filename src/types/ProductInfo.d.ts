import IShopInfo from "@/types/ShopInfo";


export default interface IProductInfo {
  id: string;
  displayName: string;
  description: string;
  price: number;
  stock: number;
  sold: number;
  createdAt: string;
  productImages: ProductImage[];
  shop: IShopInfo;
}
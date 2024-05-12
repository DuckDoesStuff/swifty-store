import IShopInfo from "@/types/ShopInfo";


export default interface IProductInfo {
  id: string;
  displayName: string;
  description: string;
  price: string;
  stock: string;
  sold: string;
  createdAt: string;
  productImages: ProductImage[];
  shop: IShopInfo;
}
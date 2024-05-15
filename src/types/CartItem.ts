import IProductInfo from "@/types/ProductInfo";

export default interface ICartItem {
  id: string;
  quantity: number;
  createdAt: string;
  product: IProductInfo;
}
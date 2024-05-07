import Header from "@/components/Header";
import Product from "@/components/ProductItem";

export default function Home() {
  return (
    <div className={"flex flex-col gap-10 px-10"}>
      <Header />
      <div className={"grid grid-cols-5 gap-10"}>
        <Product />
        <Product />
        <Product />

      </div>
    </div>
  );
}

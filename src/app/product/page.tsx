"use client"
import React, {useEffect, useState} from 'react';
import Product from "@/components/ProductItem";
import IProductInfo from "@/types/ProductInfo";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProductInfo[] | null>([])
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/product?loadImg=true&limit=${productsPerPage}&offset=${(currentPage - 1) * productsPerPage}`, {
      method: "GET",
      headers: {"Content-Type": "application/json",},
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalProducts(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentPage]);

  if (!products) {
    return <div>Loading...</div>;
  }

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // Chuyển đến trang trước đó
  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };


  return (
    <div className={"flex flex-col gap-10 px-10"}>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">All Products</p>
      </div>

      <div className="grid grid-cols-5 gap-10">
        {products.map(product => (
          <Product id={product.id} imageSource={product.productImages[0].url} productName={product.displayName}
                   price={product.price}/>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button onClick={prevPage} disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
          Previous
        </button>

        {Array.from({length: totalPages}, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={nextPage} disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
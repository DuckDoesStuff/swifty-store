"use client"
import React, { useState } from 'react';
import Product from "@/components/ProductItem";
import Header from "@/components/Header";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Số lượng sản phẩm trên mỗi trang
   // Tổng số sản phẩm

  

  // Tính chỉ số sản phẩm đầu tiên của trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const products = [
    { id: 1, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 1", price: "$100" },
    { id: 2, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 2", price: "$200" },
    { id: 3, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 3", price: "$300" },
    { id: 4, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 4", price: "$400" },
    { id: 5, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 5", price: "$500" },
    { id: 6,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 6", price: "$600" },
    { id: 7,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 7", price: "$700" },
    { id: 8,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 8", price: "$800" },
    { id: 9,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 9", price: "$900" },
    { id: 10,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 10", price: "$1000" },
    { id: 11,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 11", price: "$1100" },
    { id: 12,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 12", price: "$1200" },
    { id: 13,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 13", price: "$1300" },
    { id: 14,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 14", price: "$1400" },
    { id: 15,img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 15", price: "$1500" }
  ];
  const totalProducts = products.length;
  // Tính tổng số trang
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Sản phẩm của trang hiện tại (trong thực tế, bạn có thể lấy dữ liệu từ API hoặc cơ sở dữ liệu)
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
      <Header />
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">All Products</p>
      </div>
        <div className="grid grid-cols-5 gap-10">
            {currentProducts.map(product => (
            <Product imageSource={product.img} productName={product.name} price={product.price}/>
            ))}
        </div>
        <div className="flex justify-center items-center space-x-4">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
                Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
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

            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none">
                Next
            </button>
        </div>
      </div>
  );
};

export default AllProducts;
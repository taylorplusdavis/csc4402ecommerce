import Axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./Mens.css";

function ProductsAll() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/mens").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  console.log(products);

  return (
    <div className="product__container">
      {products.map((product) => (
        <ProductItem data={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductsAll;

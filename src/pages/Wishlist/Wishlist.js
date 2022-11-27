import Axios from "axios";
import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./Wishlist.css";

function ProductsAll() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/mens").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="product__container">
      {products.map((product) => (
        <ProductItem data={product} />
      ))}
    </div>
  );
}

export default ProductsAll;
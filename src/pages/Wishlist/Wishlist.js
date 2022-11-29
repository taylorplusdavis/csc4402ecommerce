import Axios from "axios";
import React, { useEffect, useState } from "react";
import WishlistItems from "../../components/WishlistItem/WishlistItem";
import "./Wishlist.css";
import { useCookies } from 'react-cookie';

function Wishlist() {

  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(['id']);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get/wishlist").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="product__container">
      {products.map((product) => (
        <WishlistItems data={product} />
      ))}
    </div>
  );
}

export default Wishlist;
import Axios from "axios";
import React from "react";
import "./ProductItem.css";
import {useCookies} from 'react-cookie';
import {useState} from 'react';

function ProductItem({
  data: {
    id,
    name,
    price,
    description,
    image_url,
    sex,
    store_id,
    date_created,
    category,
  },
}) {
  const handleAddCart = (e) => {
    e.preventDefault();
    console.log("handling add cart");

    if (!localStorage.getItem("1")) {
      Axios.post("http://localhost:3002/api/send/customstatement", {
        CustomStatement: "INSERT INTO cart(id, user_id) VALUES (1, 1)"
      }).then((res) => {
        localStorage.setItem("1", "1");
      });
    }

    Axios.post("http://localhost:3002/api/send/customstatement", {
        CustomStatement: `INSERT INTO cart_item(id, cart_id, product_id) VALUES (${id}, 1, ${id})`
      }).then((res) => {
        localStorage.setItem("1", "1");
      });

    console.log("added to cart");
  };

  const [cookies] = useCookies(['id']);

  const handleLikes = event => {

    event.preventDefault();

    Axios.post("http://localhost:3002/api/send/wishlistadd", {
        id: cookies.id,
        product: id,
    }).then((response) => {
        console.log(response);
    });
};

  return (
    <div key={id} className="prodItem__container">
      {/* image */}
      <div className="prodItem__image_container">
        <img src={image_url} alt="" className="prodItem__image" />
      </div>
      {/* top */}

      <div className="prodItem__top_container">
        <h2 className="prodItem__name">{name}</h2>
        <h2 className="prodItem__price">${price}</h2>
      </div>
      {/* middle */}
      <div className="prodItem__middle_container">
        <p className="prodItem__description">{description}</p>
      </div>
      {/* bottom */}
      <div className="prodItem__bottom_container">
        <button className="prodItem__button" onClick={handleAddCart}>
          Add to Cart
        </button>
        <button className="prodItem__button_likes" onClick={handleLikes}>
          Add to Likes
        </button>
      </div>
    </div>
  );
}

export default ProductItem;

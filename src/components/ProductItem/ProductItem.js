import React from "react";
import "./ProductItem.css";

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
  const handleAddCart = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (!cart.includes(id)) {
        cart.push(id);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } else {
      let cart = [];
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
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
      </div>
    </div>
  );
}

export default ProductItem;

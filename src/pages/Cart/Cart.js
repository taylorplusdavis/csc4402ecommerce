import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "./Cart.css";

function Cart() {
  const [order, setOrder] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3002/api/send/customstatement", {
      CustomStatement: "SELECT * FROM cart_item WHERE cart_id = 1",
    }).then((res) => {
      console.log("order: ", res.data);
      setOrder(res.data);
    });
  }, []);

  useEffect(() => {
    if (!order)
      return;

    for (let item of order) {
      Axios.post("http://localhost:3002/api/send/customstatement", {
        CustomStatement: `SELECT * FROM product WHERE id = ${item.id}`,
      }).then((res) => {
        setItems(prevItems => [...prevItems, res.data]);
      });
    }
  }, [order]);

  function deleteItem(id) {
    console.log("remove clicked");
    Axios.post("http://localhost:3002/api/send/customstatement", {
        CustomStatement: `DELETE FROM cart_item WHERE product_id = ${id}`,
      }).then((res) => {
        console.log(res.data);
      });
    window.location.reload(false);
  }

  function getList() {
    let list = items.map((item) => {
      return(
        <div key={item[0].id} className="cart__item">
            <img className="cart__item__img" src={item[0].image_url}></img>
            <div className="cart__item__col">
               <p className="cart__item__name">{item[0].name}</p> 
               <p className="cart__item__price">{item[0].price}</p>
            </div>
            <p className="cart__item__remove" onClick={() => deleteItem(item[0].id)}>Remove</p>
        </div>
      );
    })
    return list;
  }
  
  function getTotal() {
    let total = 0;
    for (let item of items) {
      total += item[0].price;
    }
    return Math.round(total * 100) / 100 + 5;
  }

  return (
    <div className="cart__wrapper">
      <div className="cart__container">
        <div className="cart__container__inner">
          <h1>Shopping Cart</h1>
          <div className="cart__login">
            <div className="cart__step">a</div>
            <p className="cart__label">LOGIN</p>
            <span className="cart__check"><FontAwesomeIcon icon={faCheck} /></span>
            <p className="cart__info">Mike Tiger<span>+225-111-1111</span></p>
            <button className="cart__change">Change</button>
          </div>
          <div className="cart__shipping">
            <div className="cart__step">b</div>
            <p className="cart__label">SHIPPING ADDRESS</p>
            <span className="cart__check"><FontAwesomeIcon icon={faCheck} /></span>
            <p className="cart__info">Death Valley, Baton Rouge, Louisiana, United States<br/>
                                             1111 North Stadium Rd.</p>
            <button className="cart__change change__shipping">Change</button>
          </div>
          <div className="cart__payment__method__container">
            <div className="cart__payment__method__label">
              <div className="cart__step payment__step">c</div>
              <p className="cart__label payment__label">PAYMENT METHOD</p>
            </div>
          </div>
          <div className="cart__order">
            <div className="cart__order__inner">
              <h2 className="cart__order__label">Your Order</h2>
              <div className="items__container">
                {getList()}
              </div>
              <p><span>Delivery</span><span>$15 <span className="cart__delivery__express">(Express)</span></span></p>
              <p><span>Discount</span><span>-$10</span></p>
              <p><span>Total</span><span>${getTotal()}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

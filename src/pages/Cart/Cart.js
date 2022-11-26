import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import "./Cart.css";

function Cart() {
  const [order, setOrder] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:3002/api/send/customstatement", {
      CustomStatement: "SELECT * FROM cart_item WHERE cart_id = 1",
    }).then((res) => {
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
    Axios.post("http://localhost:3002/api/send/customstatement", {
        CustomStatement: `DELETE FROM cart_item WHERE product_id = ${id}`,
      });
    
    window.location.reload(false);
  }

  function getList() {
    let list = items.map((item) => {
      return(
        <div key={item[0].id}>
          <div className="cart__item">
            <div className="row">
              <div className="item__name__price">
                <img className="cart__item__img" src={item[0].image_url}></img>
                <div className="cart__item__col">
                  <p className="cart__item__name">{item[0].name}</p> 
                  <p className="cart__item__price">${item[0].price}</p>
                </div>
              </div>
              <p className="cart__item__remove" onClick={() => deleteItem(item[0].id)}>Remove</p>
            </div>
          </div>
          <hr className="item__break" />
        </div>
      );
    })
    return list;
  }
  
  function getTotal() {
    if (items.length == 0)
      return 0;
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
          <div className="row">
            <div className="col">
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
                                                16 N Stadium Dr, 70802</p>
                <button className="cart__change change__shipping">Change</button>
              </div>
              <div className="cart__payment__method__container">
                <div className="cart__payment__method__label">
                  <div className="cart__step payment__step">c</div>
                  <p className="cart__label payment__label">PAYMENT METHOD</p>
                </div>
                <div className="cart__payment__select">
                  <div className="cart__payment__selected"></div>
                  <div className="cart__payment__icon"><FontAwesomeIcon icon={faCreditCard} size="xl" /></div>
                  <p>Debit / Credit Card</p>
                </div>
                <div className="col">
                  <label className="card__label" for="card__number">Enter Card Number *</label>
                  <input className="card__input" type="number"></input>
                  <div className="row no-space">
                    <div className="col">
                      <label className="card__label" for="card__valid">Valid Date</label>
                      <input className="card__input" type="month"></input>
                    </div>
                    <div className="col">
                      <label className="card__label card__ccv" for="card__ccv">CCV *</label>
                      <input className="card__input card__ccv" type="number"></input>
                    </div>
                    <button className="pay__button">Pay ${getTotal()}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="cart__order">
                <div className="cart__order__inner">
                  <h2 className="cart__order__label">Your Order</h2>
                  <div className="items__container">
                    {getList()}
                  </div>
                  <p><span>Delivery</span><span>$15 <span className="cart__delivery__express">(Express)</span></span></p>
                  <p><span>Discount</span><span>-$10</span></p>
                  <p className="cart__total"><span>Total</span><span>${getTotal()}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

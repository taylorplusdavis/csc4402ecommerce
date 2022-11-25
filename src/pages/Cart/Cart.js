import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "./Cart.css";

function getOrder() {
  let cart = localStorage.getItem("cart");
}

function getTotal() {

}

function Cart() {
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
              <div>{getOrder()}</div>
              <p>Delivery $20</p>
              <p>Discount -$10</p>
              <p>Total {getTotal()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

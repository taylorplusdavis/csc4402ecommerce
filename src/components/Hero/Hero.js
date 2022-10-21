import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__img_container">
        <img
          src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="hero__img"
        />
      </div>
      <div className="hero__content">
        <div className="hero__content_wrapper"></div>
        <h1 className="hero__title">Shop Autumn Apparel</h1>
        <p className="hero__text">
          With new styles arriving everyday, you'll find the perfect look for
          any fall occasion.
        </p>
        <button className="hero__btn">Shop Now</button>
      </div>
    </div>
  );
}

export default Hero;

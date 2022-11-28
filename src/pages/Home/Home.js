import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import Hero from "../../components/Hero/Hero";
import ProductItem from "../../components/ProductItem/ProductItem";

function Home() {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3002/api/get/recent").then((res) => {
      console.log(res.data);
      setRecent(res.data.slice(0, 3));
    });
  }, []);

  return (
    <div className="home__container">
      <Hero />
      <h1 className="home__recent_title">Recent Items</h1>
      <div className="home__recent_container">
        {recent.map((item) => (
          <ProductItem data={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;

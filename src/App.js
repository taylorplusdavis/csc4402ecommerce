import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Sandbox from "./pages/Sandbox";
import Mens from "./pages/Mens/Mens";
import Womens from "./pages/Womens/Womens";
import { render } from "@testing-library/react";



function App() {


  return (
    <div className="App">
    <Routes>
        <Route path='/' element={<Login />} />
        <Route component={<Navbar />} />
        <Route path="/home" element={[<Navbar />, <Home />]} />
        <Route path="about" element={[<Navbar />, <About />]} />
        <Route path="/cart" element={[<Navbar />, <Cart />]} />
        <Route path="/mens" element={[<Navbar />, <Mens />]} />
        <Route path="/womens" element={[<Navbar />, <Womens />]} />
        <Route path="/sandbox" element={[<Navbar />, <Sandbox />]} />
    </Routes>
  </div>
    );
}


export default App;

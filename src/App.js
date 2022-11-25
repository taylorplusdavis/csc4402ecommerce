import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Sandbox from "./pages/Sandbox";
import Mens from "./pages/Mens/Mens";
import Womens from "./pages/Womens/Womens";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />
        <Route path="/sandbox" element={<Sandbox />} />
      </Routes>
    </div>
  );
}

export default App;

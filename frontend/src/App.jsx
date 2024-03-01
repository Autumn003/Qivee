import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Header,
  Footer,
  Home,
  ProductDetails,
  Products,
  LoginSignup,
} from "./components";
import webfont from "webfontloader";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />;
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

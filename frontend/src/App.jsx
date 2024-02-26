import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer, Home, ProductDetails } from "./components";
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

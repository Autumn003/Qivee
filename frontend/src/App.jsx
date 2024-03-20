import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Header,
  Footer,
  Home,
  ProductDetails,
  Products,
  LoginSignup,
  Profile,
  UpdateProfile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword,
  Cart,
  Shipping,
  ConfirmOrder,
} from "./components";
import WebFont from "webfontloader";
import { useEffect } from "react";
import store from "./store/store.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.data);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        {/* protected routes */}
        {isAuthenticated ? (
          <Route path="/account" element={<Profile user={user} />} />
        ) : (
          <Route path="/account" element={<Navigate to="/login" />} />
        )}
        {isAuthenticated ? (
          <Route path="/me/update" element={<UpdateProfile />} />
        ) : (
          <Route path="/me/update" element={<Navigate to="/login" />} />
        )}
        {isAuthenticated ? (
          <Route
            path="/password/update"
            element={<UpdatePassword user={user} />}
          />
        ) : (
          <Route path="/password/update" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route path="/login/shipping" element={<Shipping />} />
        ) : (
          <Route path="/login/shipping" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        ) : (
          <Route path="/order/confirm" element={<Navigate to="/login" />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

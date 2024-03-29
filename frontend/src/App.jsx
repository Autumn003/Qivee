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
  Payment,
  OrderSuccess,
  MyOrders,
  OrderDetails,
} from "./components";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import store from "./store/store.js";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const user = useSelector((state) => state.user.data);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
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
          <>
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
          </>
        ) : (
          <Route path="/process/payment" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route path="/success" element={<OrderSuccess />} />
        ) : (
          <Route path="/success" element={<Navigate to="/login" />} />
        )}
        {isAuthenticated ? (
          <Route path="/orders" element={<MyOrders />} />
        ) : (
          <Route path="/orders" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        ) : (
          <Route
            exact
            path="/order/confirm"
            element={<Navigate to="/login" />}
          />
        )}

        {isAuthenticated ? (
          <Route exact path="/orders/order/:id" element={<OrderDetails />} />
        ) : (
          <Route
            exact
            path="/orders/order/:id"
            element={<Navigate to="/login" />}
          />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

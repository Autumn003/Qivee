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
  Dashboard,
  ProductList,
  NewProduct,
  UpdateProduct,
  OrderList,
  ProcessOrder,
  UserList,
  UpdateUser,
  ProductReviews,
  NotFound,
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

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

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

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/admin/dashboard" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/products" element={<ProductList />} />
        ) : (
          <Route path="/admin/products" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/product" element={<NewProduct />} />
        ) : (
          <Route path="/admin/product" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        ) : (
          <Route path="/admin/product/:id" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/orders" element={<OrderList />} />
        ) : (
          <Route path="/admin/orders" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        ) : (
          <Route path="/admin/order/:id" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/users" element={<UserList />} />
        ) : (
          <Route path="/admin/users" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        ) : (
          <Route path="/admin/user/:id" element={<Navigate to="/login" />} />
        )}

        {isAuthenticated && user.role === "admin" ? (
          <Route path="/admin/reviews" element={<ProductReviews />} />
        ) : (
          <Route path="/admin/reviews" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

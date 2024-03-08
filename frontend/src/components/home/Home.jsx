import React, { useEffect, useState } from "react";
import { ProductCard, Loader } from "../index";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, productCount } = useSelector(
    (state) => state.products.data
  );
  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts("/api/v1/products"));
  }, [dispatch, error, alert]);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1707926015396-af7c943bbe7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8",
    },
    {
      url: "https://images.unsplash.com/photo-1705615791178-d32cc2cdcd9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1707988179922-bd01b4dcb826?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="QIVEE" />
          <div className=" carousel mb-6 mx-3 my-7 transition-transform ease-out ">
            <div
              style={{
                backgroundImage: `url(${slides[currentIndex].url})`,
              }}
              className="m-auto py-16 px-4  h-52
           bg-cover bg-center duration-500 rounded-xl w-ful"
            ></div>
          </div>

          {/* FEATURE PRODUCT */}

          <div className="h-auto w-full flex flex-wrap flex-col items-center p-10">
            <div className="w-full h-auto flex flex-wrap flex-col items-center">
              <p className="text-3xl text-slate-800">Feature Products</p>
              <div className="h-1 w-40 border-b-4 border-slate-500 rounded-md my-2"></div>
            </div>

            <div className="md:flex md:flex-wrap md:justify-evenly">
              {products &&
                products?.map((product, index) => (
                  <ProductCard key={product.id || index} product={product} />
                ))}
            </div>

            <Link to={`/Products`}>
              <button className="border-2 bg-slate-200 border-slate-400 text-slate-800 font-semibold p-4 my-8 mt-12 rounded-xl hover:scale-105 duration-150">
                Explore all products
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { ProductCard, Loader } from "../index";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook to access current location

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { products, productCount, resultPerPage } = useSelector(
    (state) => state.products.data
  );

  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // Parse search and page query parameters from the URL
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const keyword = searchParams.get("keyword");

    // Fetch products based on the search and pagination parameters
    dispatch(
      getProducts(`/api/v1/products?page=${page || 1}&keyword=${keyword || ""}`)
    );

    // Set current page and search keyword state based on the URL parameters
    setCurrentPage(Number(page) || 1);
    setSearchKeyword(keyword || "");
  }, [dispatch, location.search, error, alert]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Update the URL with the new page number
    navigate(
      `?page=${pageNumber}${searchKeyword ? `&keyword=${searchKeyword}` : ""}`
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update the URL with the search keyword and reset page to 1
    navigate(`?page=1&keyword=${searchKeyword}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <div className="h-auto w-full flex flex-wrap flex-col items-center ">
            <div className="flex justify-center items-center">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search products"
                  className="bg-slate-200 mx-2 px-4 py-2 rounded-xl md:w-96 max-w-72 my-5 outline-slate-500 focus:scale-105 duration-200"
                />
                <button
                  type="submit"
                  className="btn btn-primary mx-3 bg-slate-400 text-xl p-3 items-center rounded-full hover:scale-110 text-white font-bold duration-200"
                >
                  <AiOutlineSearch />
                </button>
              </form>
            </div>

            <div className="w-full h-auto flex flex-wrap flex-col items-center mt-4">
              <p className="text-3xl text-slate-800">Products</p>
              <div className="h-1 w-20 border-b-4 border-slate-500 rounded-md my-2"></div>
            </div>

            <div className="md:flex md:flex-wrap md:justify-evenly md:p-10">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Pagination
              innerClass="flex gap-10 m-10"
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={handlePageChange}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item bg-slate-300 md:p-4 md:w-15 p-2 -m-2 rounded-xl hover:scale-110 duration-200 cursor-pointer"
              linkClass="page-link"
              activeClass="pageitemActive bg-slate-400"
              activeLinkClass="PageLinkActive"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Products;

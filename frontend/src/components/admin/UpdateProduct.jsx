import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdAccountTree,
  MdDescription,
  MdStorage,
  MdSpellcheck,
  MdAttachMoney,
} from "react-icons/md";
import Sidebar from "./Sidebar";
import { updateReset } from "../../slices/productSlice";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, productDetail } = useSelector((state) => state.productDetails);
  //   const product = useSelector((state) => state.productDetails.productDetail);
  //   const { success } = useSelector((state) => state.createProduct.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (productDetail._id !== id) {
      dispatch(
        getProductDetails({
          apiUrl: `/api/v1/product/${id}`,
        })
      );
    } else {
      setName(productDetail.name);
      setDescription(productDetail.description);
      setPrice(productDetail.price);
      setCategory(productDetail.category);
      setStock(productDetail.stock);
      setOldImages(productDetail.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch(updateReset());
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, productDetail]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image, index) => {
      myForm.append(`image${index}`, image);
    });

    dispatch(updateProduct({ id: id, productData: myForm }));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="flex flex-col md:flex-row">
        <div>
          <Sidebar />
        </div>
        <div className="updatePasswordContainer flex justify-center w-full  items-center">
          <form
            className="newProductContainer py-4 bg-white w-80 md:w-96 my-10 sm:h-auto h-[65%] box-border border border-slate-400 rounded-2xl flex flex-col items-center space-y-6"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 className="text-center text-xl font-semibold text-slate-600">
              Update Product
            </h1>
            <div className="border-b-4 border-slate-400 w-36 mx-auto mb-10 rounded-full"></div>
            <div className="productName flex items-center w-[100%]">
              <MdSpellcheck className="absolute text-xl translate-x-12 md:translate-x-14" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-10 py-2 w-60 md:w-72 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>
            <div className="productName flex items-center w-[100%]">
              <MdAttachMoney className="absolute text-xl translate-x-12 md:translate-x-14" />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
                className="px-10 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>

            <div className="productName flex items-center w-[100%]">
              <MdDescription className="absolute text-xl translate-x-12 md:translate-x-14" />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
                className="px-10 py-2 pr-2 w-60 md:w-72 h-20  mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              ></textarea>
            </div>

            <div className="productName flex items-center w-[100%]">
              <MdAccountTree className="absolute text-xl translate-x-12 md:translate-x-14" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="px-10 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              >
                <option>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="productName flex items-center w-[100%]">
              <MdStorage className="absolute text-xl translate-x-12 md:translate-x-14" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="px-10 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="px-2 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>

            <div
              id="createProductFormImage"
              className="  flex gap-2 overflow-x-auto"
            >
              {oldImages &&
                oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                    className="w-16 h-20 object-cover mx-3"
                  />
                ))}
            </div>

            <div
              id="createProductFormImage"
              className="  flex gap-2 overflow-x-auto"
            >
              {imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Preview"
                  className="w-16 h-20 object-cover mx-3"
                />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className="createProductBtn bg-slate-400 w-64 h-12 mb-5 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

// create a product -- ADMIN
const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(200, product, "product created successfully"));
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  return res.status(201).json({
    success: true,
    products,
    productCount,
    message: "all products are fetched successfully",
  });
});

// update product -- ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(400, "product not found");
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "product updated successfuly"));
});

// get product details
const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(400, "product not found");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, product, "product fetched successfuly"));
});

// delete product -- ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(400, "product not found");
  }

  await product.deleteOne();

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Product deleted successfuly"));
});

// create new review or update review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    ratting: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numberOfReview = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "Your review has been updated successfully")
    );
});

// geta all reviews of a product
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product.reviews, "product reviews are fetched"));
});

// delete review
const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReview = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "review deleted successfully"));
});

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
};

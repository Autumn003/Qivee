import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

// create a product -- ADMIN
const createProduct = asyncHandler(async (req, res) => {
  let images = [];

  // Collect all images from the request
  for (const key of Object.keys(req.body)) {
    if (key.startsWith("image")) {
      images.push(req.body[key]);
    }
  }

  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({ public_id: result.public_id, url: result.secure_url });
  }

  req.body.user = req.user.id;
  req.body.images = imagesLink;

  const product = await Product.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(200, product, "product created successfully"));
});

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const resultPerPage = 8;
  let productCount;
  let products;

  // Check if a search query is provided
  if (req.query.keyword) {
    // Fetch products based on the search keyword
    const regex = new RegExp(req.query.keyword, "i"); // Case-insensitive search
    productCount = await Product.countDocuments({
      $or: [{ name: regex }, { description: regex }],
    });
    products = await Product.find({
      $or: [{ name: regex }, { description: regex }],
    })
      .limit(resultPerPage)
      .skip(resultPerPage * (req.query.page - 1));
  } else {
    // Fetch all products
    productCount = await Product.countDocuments();
    products = await Product.find()
      .limit(resultPerPage)
      .skip(resultPerPage * (req.query.page - 1));
  }

  return res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    message: "All products fetched successfully",
  });
});

// get all products -- (ADMIN)
const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res
    .status(201)
    .json(new ApiResponse(201, products, "all product fetched successfuly"));
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

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  return res
    .status(201)
    .json(
      new ApiResponse(201, { success: true }, "Product deleted successfuly")
    );
});

// create new review or update review
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  // Recalculate average ratings
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.ratings = totalRating / product.reviews.length;
  product.numberOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { success: true },
        "Your review has been updated successfully"
      )
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
  getAdminProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
};

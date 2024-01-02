const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary').v2;

//Create Product -- admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
  let images = [];
  let imagesLink = [];

  if (
    req.body.name &&
    req.body.description &&
    String(req.body.price).length <= 7 &&
    req.body.stock.length <= 4
  ) {
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: '/ElectroShop/products',
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  req.body.price = Number(req.body.price);

  await Product.create(req.body);

  res.status(201).json({
    success: true,
  });
});

//Get All Products
exports.getAllProduct = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product, req.query).search().filter();

  let products = await apiFeatures.query;
  let filteredProductCount = products.length;

  apiFeatures.pagination(resultPerPage);

  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductCount,
  });
});

//Update Product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  let imagesLink = [];

  if (!product) {
    return next(new ErrorHandler('Page not found', 404));
  }

  // cloudinary
  if (
    req.body.name &&
    req.body.description &&
    String(req.body.price).length <= 7 &&
    String(req.body.stock).length <= 4 &&
    req.body.stock >= 0
  ) {
    if (typeof req.body.images === 'string') {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images.length > 0 && !images[0].url) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: '/ElectroShop/products',
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    } else if (images.length > 0 && images[0].url) {
      imagesLink = images;
    }
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  req.body.price = Number(req.body.price);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

//Delete Product -- admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Page not found', 404));
  }

  // Delete product image from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully.',
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Page not found.'));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//create product review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  const isReviewed = product.reviews.find((rev) => {
    return rev.user._id.toString() === req.user.id;
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id.toString() === req.user.id) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews = product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    message: 'Product reviewed successfully.',
  });
});

//get product reviews  -- Admin
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete product review -- Admin
exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler('Product not found.', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId
  );

  if (reviews.length === product.reviews.length) {
    return next(new ErrorHandler('Review not found', 404));
  }

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length || 0;
  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, noOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review deleted successfully.',
  });
});

//Get All Products  --- admin
exports.getAdminAllProduct = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

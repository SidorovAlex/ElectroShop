import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import {
  clearNewReviewedStatusAction,
  getProductDetailsAction,
  newReviewAction,
} from '../../redux/actions/productAction';
import { useParams } from 'react-router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReviewCard from './ReviewCard';
import Loader from '../Loader/Loader';
import { clearErrorAction } from '../../redux/actions/appAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from '@mui/material';
import { addCartItemAction } from '../../redux/actions/cartAction';
import NotFound from '../layout/NotFound/NotFound';
import MetaData from '../layout/MetaData';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, newReviewed, isLoading } = useSelector(
    (state) => state.productState
  );
  const error = useSelector((state) => state.appState.error);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    if (rating < 1) return;

    dispatch(newReviewAction({ rating, comment, productId: id }));

    setOpen(false);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity >= product.stock) return;

    setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    if (quantity > product.stock) {
      toast.error('Product is out of stock!');
      return;
    }

    dispatch(addCartItemAction(quantity, id));
    toast.success('Product added to cart.');
  };

  useEffect(() => {
    dispatch(getProductDetailsAction(id));
  }, [dispatch, id, newReviewed]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message);
      dispatch(clearErrorAction());
    }

    if (newReviewed) {
      toast.success('Product review success');
      dispatch(clearNewReviewedStatusAction());
    }
  }, [error, newReviewed, dispatch]);

  const options = {
    size: 'large',
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!product ? (
            <NotFound />
          ) : (
            <Fragment>
              <MetaData title="Product Details" />
              <div className="product-details">
                <div className="images-block">
                  <Carousel autoPlay infiniteLoop className="image-carousel">
                    {product.images &&
                      product.images.length > 0 &&
                      product.images.map((item, i) => (
                        <img
                          src={item.url}
                          alt={i}
                          key={i}
                          className="product-image"
                        />
                      ))}
                  </Carousel>
                </div>
                <div>
                  <div className="details-block-1">
                    <h2>{product.name}</h2>
                    <p>Product #{product._id}</p>
                  </div>
                  <div className="details-block-2">
                    <Rating {...options} />
                    <span>({product.noOfReviews} Reviews)</span>
                  </div>
                  <div className="details-block-3">
                    <h1>{`${product.price} $`}</h1>
                    <div className="details-block-3-1">
                      <div className="details-block-3-1-1">
                        <button onClick={decreaseQuantity}>-</button>
                        <input type="number" readOnly value={quantity} />
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                      <button
                        disabled={product.stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>

                    <p
                      className={
                        product.stock < 1 ? 'red-color' : 'green-color'
                      }
                    >
                      {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                    </p>
                  </div>
                  <div className="details-block-4">
                    Description: <p>{product.description}</p>
                  </div>
                  <button
                    onClick={submitReviewToggle}
                    className="submit-review"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              <h3 className="reviews-heading"> Reviews </h3>

              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submit-dialog">
                  <Rating
                    onChange={(e) => setRating(Number(e.target.value))}
                    value={rating}
                    size="large"
                  />

                  <textarea
                    className="submit-dialog-textArea"
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={reviewSubmitHandler} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                  ))}
                </div>
              ) : (
                <p className="no-reviews">No Reviews Yet</p>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

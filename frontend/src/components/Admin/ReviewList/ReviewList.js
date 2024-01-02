import './ReviewList.css';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrorAction } from '../../../redux/actions/appAction';
import {
  getProductReviewsAction,
  deleteProductReviewAction,
  clearDeleteReviewStatusAction,
} from '../../../redux/actions/productAction';

const ReviewList = () => {
  const [productId, setProductId] = useState('');
  const { productReviews: reviews, isReviewDeleted } = useSelector(
    (state) => state.productState
  );
  const { error } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isReviewDeleted) {
      toast.success('Review Deleted Successfully.');
      dispatch(getProductReviewsAction(productId));
      dispatch(clearDeleteReviewStatusAction());
    }
  }, [dispatch, isReviewDeleted, productId, reviews]);

  if (error) {
    toast.error(error.response.data.message);
    dispatch(clearErrorAction());
  }

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    if (productId.length !== 24) {
      return toast.error('Product Id characters should be 24 in length.');
    }

    dispatch(getProductReviewsAction(productId));
  };

  const deleteReviewHandler = (reviewsId) => {
    dispatch(deleteProductReviewAction(productId, reviewsId));
  };

  const columns = [
    // ... existing columns ...

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = reviews
    ? reviews.map((item) => ({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      }))
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productreview-container">
          <form
            className="productreview-form"
            onSubmit={productReviewsSubmitHandler}
          >
            {/* ... existing form input fields ... */}
            <Button
              id="createProductBtn"
              className="productreview-btn"
              type="submit"
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="review-list-table"
              autoHeight
              rowsPerPageOptions={[10]}
            />
          ) : (
            <h1 className="review-list-form-heading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default ReviewList;

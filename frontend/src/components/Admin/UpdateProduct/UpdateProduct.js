import './UpdateProduct.css';
import { Fragment, useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import {
  AccountTree,
  AttachMoney,
  Description,
  Image,
  Spellcheck,
  Storage,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrorAction } from '../../../redux/actions/appAction';
import {
  clearUpdateProductStatusAction,
  getProductDetailsAction,
  updateProductAction,
} from '../../../redux/actions/productAction';
import Loader from '../../Loader/Loader';
import NotFound from '../../layout/NotFound/NotFound';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { updateProductStatus, product, isLoading } = useSelector(
    (state) => state.productState
  );
  const { error } = useSelector((state) => state.appState);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const categories = [
    'Laptop',
    'PC',
    'Mobile',
    'Accessories',
    'Games',
    'Others',
  ];

  if (error) {
    toast.error(error.response.data.message);
    dispatch(clearErrorAction());
  }

  useEffect(() => {
    if (updateProductStatus) {
      toast.success('Product Updated Successfully.');
      navigate('/admin/dashboard');
      dispatch(clearUpdateProductStatusAction());
    }

    if (!product) {
      dispatch(getProductDetailsAction(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [dispatch, updateProductStatus, product, id, navigate]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setImages((old) => [...old, reader.result]);
        setImagesPreview((old) => [...old, reader.result]);
      };
    });
  };

  const submitProductHandler = (e) => {
    e.preventDefault();

    let imagesCopy = [];

    if (images.length < 1) {
      imagesCopy = oldImages;
    } else {
      imagesCopy = images;
    }

    const formData = {
      name,
      price,
      description,
      stock,
      category,
      images: imagesCopy,
    };

    dispatch(updateProductAction(formData, id));
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!product ? (
            <NotFound />
          ) : (
            <Fragment>
              <MetaData title="Update Product" />
              <div className="dashboard">
                <SideBar />
                <div className="updateproduct-container">
                  <form
                    className="updateproduct-form"
                    onSubmit={submitProductHandler}
                  >
                    <h1> Update Product</h1>
                    <div>
                      <Spellcheck />
                      <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <AttachMoney />
                      <input
                        type="number"
                        placeholder="Product Price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div>
                      <Description />
                      <textarea
                        placeholder="Product Description"
                        required
                        rows={1}
                        cols={30}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <AccountTree />
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        required
                      >
                        <option value=""> Choose Category </option>
                        {categories.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Storage />
                      <input
                        type="number"
                        placeholder="Stock"
                        required
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                    <div className="updateproduct-form-file">
                      <Image />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        multiple
                        onChange={updateProductImagesChange}
                      />
                    </div>
                    <div className="updateproduct-form-image">
                      {oldImages &&
                        oldImages.map((item, index) => (
                          <img
                            src={item.url}
                            alt={`Img-${index + 1}`}
                            key={index}
                          />
                        ))}
                    </div>
                    <div className="updateproduct-form-image">
                      {imagesPreview &&
                        imagesPreview.map((item, index) => (
                          <img
                            src={item}
                            alt={`Img-${index + 1}`}
                            key={index}
                          />
                        ))}
                    </div>
                    <Button className="updateproduct-btn" type="submit">
                      {' '}
                      Update Product
                    </Button>
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default UpdateProduct;

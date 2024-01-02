import './Home.css';
import { CgMouse } from 'react-icons/cg';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../redux/actions/productAction';
import Loader from '../Loader/Loader';
import { clearErrorAction } from '../../redux/actions/appAction';
import ProductCard from '../Products/ProductCard';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const Home = () => {
  const products = useSelector((state) => state.productState.products);
  const isLoading = useSelector((state) => state.appState.isLoading);
  const error = useSelector((state) => state.appState.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  if (error) {
    toast.error(error.response.data.message); // Replace alert with toast.error
    dispatch(clearErrorAction());
  }

  return (
    <div>
      <Helmet title="ElectroShop" />
      <div className="banner">
        <p>Welcome to ElectroShop</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Feature Products</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container" id="container">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;

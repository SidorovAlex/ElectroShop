import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';

const ProductCard = ({ product }) => {
  const options = {
    size: 'large',
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={product && product.images.length > 0 ? product.images[0].url : ''}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{' '}
        <span>{`(${product.reviews.length} reviews)`}</span>
      </div>
      <span>{product.price}$</span>
    </Link>
  );
};

export default ProductCard;

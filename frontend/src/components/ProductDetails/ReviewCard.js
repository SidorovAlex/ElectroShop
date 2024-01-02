import { Rating } from "@mui/material";
import Profile from '../../images/Profile.png';

const ProductReview = ({ review }) => {

    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="review-card">
            <img src={Profile} alt={"profilePic"} />
            <p>{review.name}</p>
            <Rating {...options} />
            <span>{review.comment}</span>
        </div>
    );
}

export default ProductReview;
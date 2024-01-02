import './NotFound.css';
import { NotAccessible } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <NotAccessible />

            <Typography> Page Not Found</Typography>
            <Link to="/">Return Home</Link>
        </div>
    )
}
export default NotFound;
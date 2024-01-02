import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    const navigate = useNavigate();

    const searchHandlar = (e) => {
        e.preventDefault();
        if (e.target[0].value.trim().length > 0) {
            navigate(`/products/${e.target[0].value.trim()}`, { replace: true })
        }
    }

    return (
        <Fragment >
            <MetaData title="Search Product" />
            <form className="search" onSubmit={searchHandlar}>
                <div className="search-container">
                    <input type="text" placeholder="Find Amazing Products" />
                    <button>
                        <SearchIcon className="search-icon" />
                    </button>
                </div>
            </form>
        </Fragment>
    );
}

export default Search;
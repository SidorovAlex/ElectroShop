import './SideBar.css';
import { ExpandMore, PostAdd, Add, ImportExport, ListAlt, Dashboard, RateReview, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@mui/lab';


const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin/dashboard">
                <p><Dashboard /> Dashboard</p>
            </Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
                        </Link>

                        <Link to="/admin/product/new">
                            <TreeItem nodeId="3" label="Create" icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            <Link to="/admin/orders">
                <p><ListAlt /> Orders</p>
            </Link>
            <Link to="/admin/reviews">
                <p><RateReview /> Reviews</p>
            </Link>
            <Link to="/admin/users">
                <p><People /> Users</p>
            </Link>
        </div>
    )
}
export default SideBar;
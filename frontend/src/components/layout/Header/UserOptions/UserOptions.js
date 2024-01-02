import './UserOptions.css';
import { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logoutUserAction } from '../../../../redux/actions/userAction';

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account = () => {
        navigate('/account');
    }

    const orders = () => {
        navigate('/orders');
    }

    const logoutUser = () => {
        dispatch(logoutUserAction());
    }

    const dashboard = () => {
        navigate('/admin/dashboard');
    }

    const options = [
        { icon: <PersonIcon />, name: "Account", func: account },
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    // Add admin route for admin role
    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }



    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                FabProps={{ size: "small", style: { backgroundColor: "#ff0000" } }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
}

export default UserOptions;
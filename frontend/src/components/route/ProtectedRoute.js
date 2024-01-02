import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, children }) => {
    const isLoading = useSelector(state => state.appState.isLoading);
    const { isAuthenticated, user } = useSelector(state => state.userState);

    return (
        <Fragment>
            {!isAdmin && !isLoading && isAuthenticated && children}
            {isAdmin && !isLoading && isAuthenticated && user.role === "admin" && children}
            {!isLoading && !isAuthenticated && <Navigate to="/login" />}
            {isAdmin && !isLoading && isAuthenticated && user.role !== "admin" && <Navigate to="/login" />}
        </Fragment>
    )


}

export default ProtectedRoute;
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    return (
        <Fragment>
            {
                !loading && (
                    <Route 
                        {...rest}
                        render={(props) => {
                            if (!isAuthenticated === false)
                            {
                                //return <Redirect to='/login' />;
                                return navigate("/login");
                            }
                            return <Component {...props} />
                        }}
                    />
                )
            }
        </Fragment>
    );
};

export default ProtectedRoute
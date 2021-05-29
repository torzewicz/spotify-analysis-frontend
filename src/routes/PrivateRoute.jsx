import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({children, ...rest}) => {
    const {isAuthenticated} = useSelector(state => state.logIn);

    return (
        <Route
            {...rest}
            render={({location}) =>
                (isAuthenticated) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

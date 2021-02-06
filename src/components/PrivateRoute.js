import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest}
) {
    const { currentUser } = useAuth();
    return (
        currentUser ?
        <Route
            {...rest}

            render={props => {
                return (<Component {...props} />) 
            }}
        >
        </Route>
        : <Redirect to={{ pathname: '/'}} />
    )
}
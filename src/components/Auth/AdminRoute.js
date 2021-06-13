import React from 'react'
import { Route, Redirect } from 'react-router'
import { isAuth } from '../../actions/auth'

const AdminRoute = ({component:Component, ...rest}) => (
        <Route {...rest} render={props=>isAuth() && isAuth().role===1 ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/signin', state:{from: props.location}}} />
        )}>
        </Route>
    )


export default AdminRoute

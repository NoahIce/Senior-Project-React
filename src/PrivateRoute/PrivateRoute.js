import React from 'react'
import AuthenticationService from '../services/AuthenticationService'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = (props) => {

    const isLoggedIn = AuthenticationService.isLoggedIn();
    console.log(isLoggedIn)

    return (
        isLoggedIn ? props.component : <Navigate to='/' replace={true}></Navigate>
      )
}

export default PrivateRoute
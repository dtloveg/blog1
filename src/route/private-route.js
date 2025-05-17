import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element }) => {
  const isLogIn = useSelector((state) => state.user.isLogIn)

  return isLogIn ? element : <Navigate to="/sign-in" />
};

export default PrivateRoute

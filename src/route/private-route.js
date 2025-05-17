import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'

const PrivateRoute = ({ element }) => {
  const isLogIn = useSelector((state) => state.user.isLogIn)

  return isLogIn ? element : <Navigate to="/sign-in" />
}
PrivateRoute.propTypes = {
  element: propTypes.element.isRequired,
}

export default PrivateRoute

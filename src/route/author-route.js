import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import propTypes from 'prop-types'

import PrivateRoute from './private-route'

const AuthorRoute = ({ element }) => {
  const { slug } = useParams()
  const currentArticle = useSelector(
    (state) => state.article.articles.find((article) => article.slug === slug) || state.article.currentArticle
  )
  const currentUser = useSelector((state) => state.user.username)

  const privateElement = <PrivateRoute element={element} />

  if (!currentArticle) return privateElement

  if (currentArticle.author.username !== currentUser) {
    return <Navigate to="/" replace />
  }

  return privateElement
}
AuthorRoute.propTypes = {
  element: propTypes.element.isRequired,
}
export default AuthorRoute

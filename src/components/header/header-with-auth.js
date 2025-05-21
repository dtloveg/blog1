import React from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { logOut } from '../../store/slices/userSlice'

import classes from './header.module.scss'

const HeaderWithAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useSelector((state) => state.user.username)
  const image = useSelector((state) => state.user.image)

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/sign-in')
  }
  return (
    <header className={classes.header}>
      <Link to="/articles">
        <span>Realworld Blog</span>
      </Link>
      <Link className={classes.link_with_auth} to="/new-article">
        <span>Create article</span>
      </Link>
      <Link className={classes.personal_info} to="/profile">
        <span className={classes.person_username}>{username}</span>
        <img src={image} alt={`${username} avatar`} />
      </Link>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  )
}
HeaderWithAuth.propTypes = {
  article: propTypes.shape({
    author: propTypes.shape({
      username: propTypes.string.isRequired,
      image: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default HeaderWithAuth

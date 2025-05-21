import React from 'react'
import { Link } from 'react-router-dom'

import classes from './header.module.scss'

const HeaderWithoutAuth = () => {
  return (
    <header className={classes.header}>
      <Link to="/articles">
        <span>Realworld Blog</span>
      </Link>
      <Link to="/sign-in">
        <span>Sign in</span>
      </Link>
      <Link className={classes.link_without_auth} to="/sign-up">
        <span>Sign Up</span>
      </Link>
    </header>
  )
}

export default HeaderWithoutAuth

import React from 'react'

import classes from './header.module.scss'

const HeaderWithoutAuth = () => {
  return (
    <header className={classes.header}>
      <a href={'/articles'}>
        <span>Realworld Blog</span>
      </a>
      <a href={'/sign-in'}>
        <span>Sign in</span>
      </a>
      <a className={classes.link_without_auth} href={'/sign-up'}>
        <span>Sign Up</span>
      </a>
    </header>
  )
}

export default HeaderWithoutAuth

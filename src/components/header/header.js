import React from 'react'
import { useSelector } from 'react-redux'

import HeaderWithoutAuth from './header-without-auth'
import HeaderWithAuth from './header-with-auth'

const Header = () => {
  const isLogIn = useSelector((state) => state.user.isLogIn)
  return isLogIn ? <HeaderWithAuth /> : <HeaderWithoutAuth />
}

export default Header

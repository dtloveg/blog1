import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import FormSignIn from '../components/form/user/sign-in'

const SignInPage = () => {
  const status = useSelector((state) => state.article.status)
  if (status === 'loading') {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }
  return <FormSignIn />
}

export default SignInPage

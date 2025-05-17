import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import FormSignUp from '../components/form/user/sign-up'

const SignUpPage = () => {
  const status = useSelector((state) => state.user.status)
  if (status === 'loading') {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }
  return <FormSignUp />
}

export default SignUpPage

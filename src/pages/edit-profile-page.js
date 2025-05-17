import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import FormEditProfile from '../components/form/user/edit-profile'

const EditProfilePage = () => {
  const status = useSelector((state) => state.user.status)
  if (status === 'loading') {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }
  return <FormEditProfile />
}

export default EditProfilePage

import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import EditArticles from '../components/article/edit-article'

const EditArticlePage = () => {
  const status = useSelector((state) => state.article.status)
  if (status === 'loading') {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }
  return <EditArticles />
}

export default EditArticlePage

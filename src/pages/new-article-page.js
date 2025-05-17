import React from 'react'
import { useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import CreateArticles from '../components/article/create-article'

const NewArticlePage = () => {
  const status = useSelector((state) => state.article.status)
  if (status === 'loading') {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }
  return <CreateArticles />
}

export default NewArticlePage

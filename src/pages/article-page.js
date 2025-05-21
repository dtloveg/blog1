import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Flex } from 'antd'

import Article from '../components/article/article'
import { fetchArticleBySlug } from '../store/slices/articleSlice'

const ArticlePage = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.article.currentArticle)

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [dispatch, slug])

  if (!article) {
    return (
      <Flex width="100%" align="center" gap="middle">
        <Spin style={{ margin: 'auto' }} size="large" />
      </Flex>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '26px',
      }}
    >
      <Article article={article} showBody={true} />
    </div>
  )
}

export default ArticlePage

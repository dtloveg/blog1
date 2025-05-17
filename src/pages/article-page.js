import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

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
    return <div>Загрузка...</div>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Article article={article} showBody={true} />
    </div>
  )
}

export default ArticlePage

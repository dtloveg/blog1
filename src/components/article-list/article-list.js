import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles } from '../../store/slices/articleSlice'
import Article from '../article/article'

const ArticlesList = () => {
  const articles = useSelector((state) => state.article.articles)
  const status = useSelector((state) => state.article.status)
  const currentPage = useSelector((state) => state.article.currentPage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage, pageSize: 5 }))
  }, [dispatch, currentPage])
  if (status === 'loading') {
    return <span>Загрузка статей...</span>
  }

  if (status === 'error') {
    return <span>Ошибка при загрузке статей.</span>
  }

  return (
    <section>
      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <Article article={article} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default React.memo(ArticlesList)

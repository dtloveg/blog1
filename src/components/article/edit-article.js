import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { fetchArticleBySlug, EditArticle } from '../../store/slices/articleSlice'
import ArticleForm from '../form/article/article-form'

const EditArticles = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [dispatch, slug])
  const article = useSelector((state) => state.article.currentArticle)

  const onSubmit = async (data) => {
    const tagList = data.tags.filter((tag) => tag)
    const articleData = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagList,
    }
    const resultAction = await dispatch(EditArticle({ slug, articleData }))
    if (EditArticle.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  if (!article) {
    return <div>Loading...</div>
  }

  const defaultValues = {
    title: article.title,
    description: article.description,
    body: article.body,
    tags: article.tagList,
  }

  return (
    <main style={{margin: '60px 0'}}>
      <ArticleForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </main>
  )
}

export default EditArticles

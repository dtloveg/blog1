import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CreateArticle } from '../../store/slices/articleSlice'

import ArticleForm from '../form/article/article-form'

const CreateArticles = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const tagList = Array.isArray(data.tags) ? data.tags.filter((tag) => tag) : []
    const article = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: tagList,
    }
    const resultAction = await dispatch(CreateArticle(article))
    if (CreateArticle.fulfilled.match(resultAction)) {
      navigate('/')
    }
  }

  return (
    <main style={{margin: '60px 0'}}>
      <ArticleForm onSubmit={onSubmit} />
    </main>
  )
}

export default CreateArticles

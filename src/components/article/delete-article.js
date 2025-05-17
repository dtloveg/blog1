import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'
import { Popconfirm, Button } from 'antd'

import { DeleteArticle as deleteArticleThunk } from '../../store/slices/articleSlice'

import classes from './article.module.scss'

const DeleteArticle = ({ slug }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteArticleThunk(slug))
    if (deleteArticleThunk.fulfilled.match(resultAction)) {
      navigate('/')
    } else {
      console.error('Failed to delete the article:', resultAction.payload)
    }
  }

  return (
    <Popconfirm title="Are you sure to delete this article?!" onConfirm={handleDelete} okText="Yes" cancelText="No">
      <Button type="primary" className={`${classes['person_button']} ${classes['person_button--delete']}`}>
        Delete
      </Button>
    </Popconfirm>
  )
}
DeleteArticle.propTypes = {
  slug: propTypes.string.isRequired,
}
export default DeleteArticle

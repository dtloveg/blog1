import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import propTypes from 'prop-types'

import classes from './article-form.module.scss'

const ArticleForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: defaultValues || {
      title: '',
      description: '',
      body: '',
    },
  })
  const [tags, setTags] = useState(defaultValues?.tags || [])

  useEffect(() => {
    setValue('tags', tags)
  }, [tags, setValue])

  const handleAddTag = () => {
    setTags([...tags, ''])
  }

  const handleTagChange = (index, value) => {
    const newTags = [...tags]
    newTags[index] = value
    setTags(newTags)
  }

  const handleDeleteTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={classes.form_fieldset}>
        <legend>{defaultValues ? 'Edit Article' : 'Create New Article'}</legend>
        <div className={classes.form_field}>
          <label className={classes.form_label}>Title</label>
          <input
            className={classes.form_input}
            type="text"
            {...register('title', { required: 'This field is required' })}
            placeholder="Title"
          />
        </div>
        <div className={classes.form_field}>
          <label className={classes.form_label}>Short description</label>
          <input
            className={classes.form_input}
            type="text"
            {...register('description', { required: 'This field is required' })}
            placeholder="Short description"
          />
        </div>
        <div className={classes.form_field}>
          <label className={classes.form_label}>Text</label>
          <textarea
            className={classes.form_textarea}
            {...register('body', { required: 'This field is required' })}
            placeholder="Text"
            rows={6}
          />
        </div>

        <div className={classes.form_tags}>
          <div>Tags</div>
          {tags.map((tag, index) => (
            <div key={index} className={classes['form_tags_row']}>
              <input
                className={classes.form_input}
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                placeholder="Tag"
              />
              <button
                type="button"
                className={`${classes['form_button']} ${classes['form_button--delete']}`}
                onClick={() => handleDeleteTag(index)}
              >
                Delete tag
              </button>
              {index === tags.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddTag}
                  className={`${classes['form_button']} ${classes['form_button--add']}`}
                >
                  Add tag
                </button>
              )}
            </div>
          ))}
          {tags.length === 0 && (
            <button
              type="button"
              onClick={handleAddTag}
              className={`${classes['form_button']} ${classes['form_button--add']}`}
            >
              Add tag
            </button>
          )}
        </div>
      </fieldset>
      <button type="submit" className={`${classes['form_button']} ${classes['form_button--send']}`}>
        Send
      </button>
    </form>
  )
}
ArticleForm.propTypes = {
  onSubmit: propTypes.function,
  defaultValues: propTypes.shape({
    title: propTypes.string.isRequired,
    tags: propTypes.array.isRequired,
    description: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
  }),
}

export default ArticleForm

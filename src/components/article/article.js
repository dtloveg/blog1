import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Popconfirm, Button } from 'antd'
import DeleteArticle from './delete-article'
import classes from './article.module.scss'

const Article = ({ article, showBody }) => {
  const { title, author, tagList, createdAt, description, favoritesCount, slug, body } = article
  const isLogIn = useSelector((state) => state.user.isLogIn)
  const currentUser = useSelector((state) => state.user.username)
  const navigate = useNavigate()

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const handleEditClick = () => {
    navigate(`/articles/${slug}/edit`)
  }
  return (
    <article className={classes.card}>
      <div className={classes.card_main}>
        <div className={classes.card_info}>
          <div className={classes.card_title}>
            <a href={`/articles/${slug}`}>
              <h3>{title}</h3>
            </a>
            <button className={classes['card_fav-button']}>
              <svg viewBox="0 -1 16 16" className={classes.card_like} xmlns="http://www.w3.org/2000/svg">
                <path d="M4.46 0.93C3.49 0.93 2.6 1.32 1.95 2.02C1.29 2.74 0.93 3.72 0.93 4.8C0.93 5.94 1.36 6.96 2.3 8.1C3.22 9.21 4.58 10.37 6.16 11.72L6.17 11.72C6.72 12.19 7.34 12.72 7.99 13.29C8.65 12.72 9.28 12.19 9.83 11.72C11.41 10.37 12.77 9.21 13.69 8.1C14.63 6.96 15.06 5.94 15.06 4.8C15.06 3.72 14.7 2.74 14.04 2.02C13.39 1.32 12.5 0.93 11.53 0.93C10.81 0.93 10.16 1.16 9.58 1.6C9.07 2 8.71 2.5 8.5 2.86C8.4 3.04 8.21 3.14 8 3.14C7.78 3.14 7.59 3.04 7.49 2.86C7.28 2.5 6.92 2 6.41 1.6C5.83 1.16 5.18 0.93 4.46 0.93Z" />
              </svg>
              <span>{favoritesCount}</span>
            </button>
          </div>
          <ul className={classes.card_tags}>
            {tagList.length > 0 ? (
              tagList.map((tag, index) => (
                <li className={showBody ? classes.card_tag_gray : classes.card_tag} key={index}>
                  {tag}
                </li>
              ))
            ) : (
              <div className={classes.empty_tags}></div>
            )}
          </ul>
          <span className={showBody ? classes.card_description_gray : classes.card_description}>{description}</span>
        </div>
        <div className={classes.person}>
          <span className={classes.person_username}>{author.username}</span>
          <span className={classes.person_date}>{formattedDate}</span>
          <img src={author.image} alt={author.username} />
          {isLogIn && author.username === currentUser && showBody && (
            <div className={classes.person_buttons}>
        <DeleteArticle slug={slug} />
              <button
                className={`${classes['person_button']} ${classes['person_button--edit']}`}
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.card_full}>
        {showBody && (
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {body}
          </Markdown>
        )}
      </div>
    </article>
  )
}

Article.propTypes = {
  article: propTypes.shape({
    body: propTypes.string.isRequired,
    tagList: propTypes.array.isRequired,
    title: propTypes.string.isRequired,
    favoritesCount: propTypes.number.isRequired,
    slug: propTypes.string.isRequired,
    author: propTypes.shape({
      username: propTypes.string.isRequired,
      image: propTypes.string.isRequired,
    }).isRequired,
    createdAt: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
  }).isRequired,
  showBody: propTypes.bool,
}

Article.defaultProps = {
  showBody: false,
}

export default Article

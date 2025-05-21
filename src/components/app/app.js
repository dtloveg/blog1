import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SignInPage from '../../pages/sign-in-page'
import SignUpPage from '../../pages/sign-up-page'
import ArticlePage from '../../pages/article-page'
import { fetchArticles } from '../../store/slices/articleSlice'
import ArticlesList from '../article-list'
import Paginations from '../pagination/pagination'
import Header from '../header'
import EditProfilePage from '../../pages/edit-profile-page'
import NewArticlePage from '../../pages/new-article-page'
import EditArticlePage from '../../pages/edit-article-page'
import PrivateRoute from '../../route/private-route'
import AuthorRoute from '../../route/author-route'

import classes from './app.module.scss'

function App() {
  const articlesCount = useSelector((state) => state.article.articlesCount)
  const currentPage = useSelector((state) => state.article.currentPage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles({ page: currentPage }))
  }, [dispatch, currentPage])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className={classes.main}>
              <ArticlesList />
              <Paginations articlesCount={articlesCount} />
            </main>
          }
        />
        <Route
          path="/articles"
          element={
            <main>
              <ArticlesList />
              <Paginations articlesCount={articlesCount} />
            </main>
          }
        />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<PrivateRoute element={<EditProfilePage />} />} />
        <Route path="/new-article" element={<PrivateRoute element={<NewArticlePage />} />} />
        <Route path="/articles/:slug/edit" element={<AuthorRoute element={<EditArticlePage />} />} />
      </Routes>
    </>
  )
}

export default App

import React from 'react'
import propTypes from 'prop-types'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles, setCurrentPage } from '../../store/slices/articleSlice'

const Paginations = ({ articlesCount }) => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.article.currentPage)

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
    dispatch(fetchArticles({ page, pageSize: 5 }))
  }

  return (
    <Pagination
      align="center"
      showSizeChanger={false}
      total={articlesCount}
      current={currentPage}
      pageSize={5}
      onChange={handlePageChange}
      style={{ paddingTop: 16, margin: 0, maxWidth: 1010 }}
    />
  )
}

export default Paginations

Paginations.propTypes = {
  articlesCount: propTypes.number,
}

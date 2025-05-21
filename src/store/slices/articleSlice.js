import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseUrl = 'https://blog-platform.kata.academy/api'
const getToken = (getState) => {
  const state = getState()
  return state.user.token
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = 1, pageSize = 5 }, { getState }) => {
    const token = getToken(getState)
    const offset = (page - 1) * pageSize
    const headers = {}
    if (token) {
      headers['Authorization'] = `Token ${token}`
    }
    const response = await fetch(`${baseUrl}/articles?limit=${pageSize}&offset=${offset}`, {
      method: 'GET',
      headers: headers,
    })
    if (!response.ok) {
      throw new Error('Ошибка при получении статей: ' + response.statusText)
    }
    const articlesData = await response.json()
    return {
      articles: articlesData.articles,
      articlesCount: articlesData.articlesCount,
    }
  }
)

export const fetchArticleBySlug = createAsyncThunk('articles/fetchArticleBySlug', async (slug, { getState }) => {
  const token = getToken(getState)
  const headers = {}
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }
  const response = await fetch(`${baseUrl}/articles/${slug}`, {
    method: 'GET',
    headers: headers,
  })
  if (!response.ok) {
    throw new Error('Ошибка при получении статьи: ' + response.statusText)
  }
  const articleData = await response.json()
  return articleData.article
})

export const CreateArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { getState, rejectWithValue }) => {
    const token = getToken(getState)
    try {
      const response = await fetch(`${baseUrl}/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: articleData }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.errors)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const EditArticle = createAsyncThunk(
  'articles/editArticle',
  async ({ slug, articleData }, { getState, rejectWithValue }) => {
    const token = getToken(getState)
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: articleData }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.errors)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const DeleteArticle = createAsyncThunk('articles/deleteArticle', async (slug, { getState, rejectWithValue }) => {
  const token = getToken(getState)
  try {
    const response = await fetch(`${baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.errors)
    }
    return slug
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const FavoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug, { getState, rejectWithValue }) => {
    const token = getToken(getState)
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.errors)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const UnfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async (slug, { getState, rejectWithValue }) => {
    const token = getToken(getState)
    try {
      const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        return rejectWithValue(errorData.errors)
      }
      return await response.json()
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  articles: [],
  articlesCount: 0,
  currentPage: 1,
  currentArticle: null,
  status: null,
  error: null,
  isLoading: true,
}

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.articles = action.payload.articles
        state.articlesCount = action.payload.articlesCount
        state.favorited = action.payload.articles.favorited
        state.isLoading = false
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
        state.isLoading = false
      })
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.currentArticle = null
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.currentArticle = action.payload
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
      .addCase(CreateArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(CreateArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.isLoading = false
        state.isLogIn = true
        state.title = action.payload.article.title
        state.description = action.payload.article.description
        state.text = action.payload.article.text
        state.tags = action.payload.article.tags
      })
      .addCase(CreateArticle.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(EditArticle.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(EditArticle.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.isLoading = false
        state.isLogIn = true
        state.currentArticle = action.payload.article
      })
      .addCase(EditArticle.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(FavoriteArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload.article
        const index = state.articles.findIndex((article) => article.slug === updatedArticle.slug)
        if (
          index !== -1 &&
          (state.articles[index].favorited !== updatedArticle.favorited ||
            state.articles[index].favoritesCount !== updatedArticle.favoritesCount)
        ) {
          state.articles[index] = {
            ...state.articles[index],
            favorited: true,
            favoritesCount: updatedArticle.favoritesCount,
          }
        }
      })
      .addCase(UnfavoriteArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload.article
        const index = state.articles.findIndex((article) => article.slug === updatedArticle.slug)
        if (index !== -1) {
          state.articles[index] = {
            ...state.articles[index],
            favorited: false,
            favoritesCount: updatedArticle.favoritesCount,
          }
        }
      })
  },
})
export const { setCurrentPage } = articleSlice.actions
export default articleSlice.reducer

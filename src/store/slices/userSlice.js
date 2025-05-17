import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const baseUrl = 'https://blog-platform.kata.academy/api'

export const RegisterUser = createAsyncThunk('user/RegisterUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.errors)
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const LoginUser = createAsyncThunk('user/LoginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.errors)
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const EditUser = createAsyncThunk('user/EditUser ', async (userData, { getState, rejectWithValue }) => {
  const state = getState()
  const token = state.user.token
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userData }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.errors)
    }
    return await response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})
const initialState = {
  status: null,
  error: null,
  isLoading: true,
  isLogIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  username: localStorage.getItem('username') || null,
  image: localStorage.getItem('image') || 'https://static.productionready.io/images/smiley-cyrus.jpg',
  password: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogIn = false
      state.token = null
      state.username = null
      state.email = null
      state.image = 'https://static.productionready.io/images/smiley-cyrus.jpg'
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('image')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(RegisterUser.fulfilled, (state) => {
        state.status = 'resolved'
        state.isLoading = false
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(LoginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.isLoading = false
        state.isLogIn = true
        state.token = action.payload.user.token
        state.username = action.payload.user.username
        state.email = action.payload.user.email
        state.image = action.payload.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
        localStorage.setItem('token', action.payload.user.token)
        localStorage.setItem('username', action.payload.user.username)
        localStorage.setItem('email', action.payload.user.email)
        localStorage.setItem(
          'image',
          action.payload.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
        )
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.isLoading = false
      })
      .addCase(EditUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(EditUser.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.isLoading = false
        state.isLogIn = true
        state.username = action.payload.user.username
        state.email = action.payload.user.email
        state.image = action.payload.user.image
        localStorage.setItem('username', action.payload.user.username)
        localStorage.setItem('email', action.payload.user.email)
        localStorage.setItem('image', action.payload.user.image)
      })
      .addCase(EditUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
        state.isLoading = false
      })
  },
})
export const { logOut } = userSlice.actions
export default userSlice.reducer

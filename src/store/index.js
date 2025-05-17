import { configureStore } from '@reduxjs/toolkit'

import userReduser from './slices/userSlice'
import articleReduser from './slices/articleSlice'

export default configureStore({
  reducer: {
    user: userReduser,
    article: articleReduser,
  },
  devTools: true,
})

import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './User/UserSlicer'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
})
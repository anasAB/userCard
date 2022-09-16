import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './User/UserSlicer'

export const store = configureStore({
  reducer: {
    users: userSlice.reducer
  },
})
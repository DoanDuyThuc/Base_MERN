import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slider/counterSlice'
import userSlice from './slider/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice
  },
})
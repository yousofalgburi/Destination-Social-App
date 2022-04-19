import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import postsReducer from './posts'

const store = configureStore({ reducer: authReducer, postsReducer })

export default store

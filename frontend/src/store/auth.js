import { createSlice } from '@reduxjs/toolkit'
import { signIn, signUp } from '../api/api'
const initialState = { authData: null }

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    async singin(state, action) {
      try {
        const { data } = await signIn(action.data)
        localStorage.setItem('profile', JSON.stringify({ data }))
        state.authData = data
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export const authActions = authReducer.actions
export default authReducer.reducer

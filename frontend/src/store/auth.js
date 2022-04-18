import { createSlice } from '@reduxjs/toolkit'
const initialState = { authData: null, isAuthenticated: false }

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, action) {
      try {
        localStorage.setItem(
          'profile',
          JSON.stringify({ ...action.payload.data })
        )
        state.authData = action.payload.data
        state.isAuthenticated = true
      } catch (error) {
        console.log(error)
      }
    },
    signup(state, action) {
      try {
        localStorage.setItem(
          'profile',
          JSON.stringify({ ...action.payload.data })
        )
        state.authData = action.payload.data
        state.isAuthenticated = true
      } catch (error) {
        console.log(error)
      }
    },
    logout(state) {
      localStorage.clear()
      state.isAuthenticated = false
    },
  },
})

export const authActions = authReducer.actions
export default authReducer.reducer

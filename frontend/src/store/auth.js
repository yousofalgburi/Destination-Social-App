import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  currentUser: null,
}

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
        state.currentUser = action.payload.data
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
        state.currentUser = action.payload.data
      } catch (error) {
        console.log(error)
      }
    },
    logout(state) {
      localStorage.clear()
      state.currentUser = null
    },
    setUser(state, action) {
      state.currentUser = action.payload.data
    },
  },
})

export const authActions = authReducer.actions
export default authReducer.reducer

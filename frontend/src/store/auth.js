import { createSlice } from '@reduxjs/toolkit'
const initialState = { authData: null }

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
      } catch (error) {
        console.log(error)
      }
    },
  },
})

export const authActions = authReducer.actions
export default authReducer.reducer

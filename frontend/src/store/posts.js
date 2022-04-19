import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  posts: [],
}

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
  },
})

export const postsActions = postsReducer.actions
export default postsReducer.reducer

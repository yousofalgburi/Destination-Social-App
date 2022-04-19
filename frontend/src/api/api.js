import axios from 'axios'
const API = axios.create({
  baseURL: 'http://localhost:5000/',
})

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const createPost = newPost => API.post('/create', newPost)
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)

export const signIn = data => API.post('/user/signin', data)
export const signUp = data => API.post('/user/signup', data)

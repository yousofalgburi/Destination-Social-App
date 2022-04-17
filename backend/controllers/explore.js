import express from "express"
import mongoose from "mongoose"
import Post from "../models/post.js"
const router = express.Router()

export const getPosts = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 9
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await Post.countDocuments({})
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex)
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id)
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query

  try {
    const title = new RegExp(searchQuery, "i")
    const posts = await Post.find({ title })
    res.json({ data: posts })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" })
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const post = await Post.findById(id)

  const index = post.likes.findIndex((id) => id === String(req.userId))

  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
  res.status(200).json(updatedPost)
}

export default router

import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  image: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

let Post = mongoose.model("Post", postSchema)

export default Post

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { postsActions } from '../../store/posts'
import { createPost, updatePost } from '../../api/api'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'

const CreatePost = () => {
  const [currentId, setCurrentId] = useState(0)
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    selectedFile: '',
  })
  const post = useSelector(state =>
    currentId
      ? state.posts.posts.find(message => message._id === currentId)
      : null
  )
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const clear = () => {
    setCurrentId(0)
    setPostData({ title: '', message: '', selectedFile: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (currentId === 0) {
      try {
        const { data } = await createPost(postData)
        dispatch(postsActions.createPost({ ...data, name: currentUser?.name }))
        navigate('/')
      } catch (e) {
        console.log(e)
      }

      clear()
    } else {
      try {
        const { data } = await updatePost(postData)
        dispatch(postsActions.updatePost({ ...data, name: currentUser?.name }))
        navigate('/')
      } catch (e) {
        console.log(e)
      }
      clear()
    }
  }

  if (!currentUser) {
    return (
      <Text>Please Sign In to create a post or like/comment on a post.</Text>
    )
  }

  return (
    <Container p={0}>
      <Box mt={[0, 10, 20]}>
        <form onSubmit={handleSubmit}>
          <Heading size="md">
            {currentId ? `Editing "${post.title}"` : 'Create a Post'}
          </Heading>

          <FormLabel mt={3} htmlFor="title">
            Title
          </FormLabel>
          <Input
            maxLength={20}
            required
            type="text"
            name="title"
            id="title"
            value={postData.title}
            onChange={e => setPostData({ ...postData, title: e.target.value })}
          />

          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            mb={2}
            maxLength={150}
            required
            type="text"
            name="message"
            id="message"
            value={postData.message}
            onChange={e =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />

          <Button mt={2} colorScheme="green" w="full" type="submit">
            Submit
          </Button>
        </form>

        <Button mt={2} colorScheme="red" w="full" onClick={clear}>
          Clear
        </Button>
      </Box>
    </Container>
  )
}

export default CreatePost

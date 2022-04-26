import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  GridItem,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

// TODO: ADD ACTIONS FOR DELETE AND LIKE A POST

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const navigate = useNavigate()

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  return (
    <Box
      w="sm"
      h="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={openPost}
    >
      <Image
        h="250"
        w="100%"
        src={
          post.selectedFile ||
          'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
        }
        alt={post.name}
      />

      <Box p={3}>
        <SimpleGrid columns={5}>
          <GridItem colSpan={4}>
            <Text>Created by: {post.name}</Text>
            <Text>Date: {moment(post.createdAt).fromNow()}</Text>
            <Text>Title: {post.title}</Text>
            <Text>Description: {post.message}</Text>
          </GridItem>

          <GridItem colSpan={1}>
            <VStack>
              <Button
                size="sm"
                // onClick={e => {
                //   e.stopPropagation()
                //   dispatch(likePost(post._id))
                // }}
              >
                {post.likes.length} Likes
              </Button>
              {user?.result?._id === post?.creator && (
                <Button
                  size="sm"
                  //   onClick={e => {
                  //     e.stopPropagation()
                  //     dispatch(deletePost(post._id))
                  //   }}
                >
                  Delete
                </Button>
              )}
              {user?.result?._id === post?.creator && (
                <Button
                  size="sm"
                  onClick={e => {
                    e.stopPropagation()
                    setCurrentId(post._id)
                  }}
                >
                  Edit
                </Button>
              )}
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Post

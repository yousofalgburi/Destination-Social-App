import { Container, GridItem, SimpleGrid } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Post from './Post'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector(state => state.posts)

  // TODO: NEED TO MAKE IT SO WE CALL GET POSTS SO THE POSTS ARRAY IS NOT EQUAL TO 0
  if (!posts.length) return <h1>no posts to load</h1>

  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={3} mt={10} spacing={5}>
        {posts.map(post => (
          <GridItem key={post._id} colSpan={[3, 2, 1]}>
            <Post post={post} setCurrentId={setCurrentId} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Posts

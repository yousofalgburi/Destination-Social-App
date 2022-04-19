import { Link, useNavigate, Link as ReachLink } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'

import {
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  Text,
  HStack,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'

const Navbar = () => {
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(authActions.logout())
    navigate('/auth')
  }

  return (
    <Flex bg="gray.600" p={3}>
      <Box p="2">
        <HStack spacing={5}>
          <Heading color="white" size="md">
            <Link to="/">Destination</Link>
          </Heading>
          <Link as={ReachLink} to="/home">
            Home
          </Link>
          <Link as={ReachLink} to="/explore">
            Explore
          </Link>
        </HStack>
      </Box>

      <Spacer />

      <Box>
        <HStack>
          <ColorModeSwitcher />
          {currentUser ? (
            <>
              <Text color="whiteAlpha.900">Welcome! {currentUser.name}</Text>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button colorScheme="teal" mr="4">
                <Link to="/auth">Sign Up / Log in</Link>
              </Button>
            </>
          )}
        </HStack>
      </Box>
    </Flex>
  )
}

export default Navbar

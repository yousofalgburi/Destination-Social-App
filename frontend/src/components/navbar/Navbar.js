import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

import { useDispatch } from 'react-redux'
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    dispatch(authActions.logout())
    setUser(null)
    navigate('/auth')
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, logout])

  return (
    <Flex bg="gray.600" p={3}>
      <Box p="2">
        <Heading color="white" size="md">
          <Link to="/">Destination</Link>
        </Heading>
      </Box>

      <Spacer />

      <Box>
        <HStack>
          <ColorModeSwitcher />
          {user?.result ? (
            <>
              <Text color="whiteAlpha.900">Welcome! {user?.result.name}</Text>
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

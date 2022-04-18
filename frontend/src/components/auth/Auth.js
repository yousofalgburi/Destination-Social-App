import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { signIn } from '../../api/api'
import { useNavigate } from 'react-router-dom'

import {
  FormLabel,
  Input,
  Button,
  Container,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  InputGroup,
  InputRightElement,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react'

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSignup, setIsSignup] = useState(false)
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)

  const switchMode = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    setIsSignup(prevIsSignup => !prevIsSignup)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (isSignup && form.password !== form.confirmPassword) {
      return setPasswordMatch(true)
    }

    if (isSignup) {
      dispatch(authActions.signup())
      navigate('/')
    } else {
      try {
        const { data } = await signIn({
          email: form.email,
          password: form.password,
        })

        dispatch(authActions.signin({ data }))
        navigate('/')
      } catch (error) {
        console.log('wrong credentials')
      }
    }
  }

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleShowClick = () => setShow(show => !show)
  const handleShowClick2 = () => setShow2(show2 => !show2)
  const handleAlertClose = () => setPasswordMatch(false)

  return (
    <Container p={0}>
      <form onSubmit={handleSubmit}>
        <Box mt={[0, 10, 20]}>
          <VStack
            w="full"
            h="full"
            p={10}
            spacing={10}
            alignItems="flex-start"
            border="1px"
            borderColor="gray.200"
            boxShadow="lg"
            rounded="md"
          >
            <Heading>{!isSignup ? 'Sign in' : 'Sign up'}</Heading>

            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
              {passwordMatch && isSignup && (
                <GridItem colSpan={2}>
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Passwords Do Not Match</AlertTitle>
                    <CloseButton
                      onClick={handleAlertClose}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                </GridItem>
              )}

              {wrongLoginCredentials && !isSignup && (
                <GridItem colSpan={2}>
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Wrong Login credentials</AlertTitle>
                    <CloseButton
                      onClick={handleAlertClose}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                </GridItem>
              )}

              {isSignup && (
                <>
                  <GridItem colSpan={1}>
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <Input
                      min="5"
                      id="firstname"
                      placeholder="First name"
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={form.firstName}
                      required
                    />
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <Input
                      id="lastname"
                      placeholder="Last name"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={form.lastName}
                      required
                    />
                  </GridItem>
                </>
              )}

              <GridItem colSpan={2}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Example@gmail.com"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  required
                />
              </GridItem>

              <GridItem colSpan={isSignup ? 1 : 2}>
                <FormLabel htmlFor="password">Password</FormLabel>

                <InputGroup>
                  <Input
                    id="password"
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    required
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </GridItem>

              {isSignup && (
                <GridItem colSpan={1}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id="confirmPassword"
                      placeholder="Password Again"
                      type={show2 ? 'text' : 'password'}
                      name="confirmPassword"
                      onChange={handleChange}
                      value={form.confirmPassword}
                      required
                    />

                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick2}>
                        {show2 ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </GridItem>
              )}

              <GridItem colSpan={2}>
                <Button colorScheme="blue" w="full" size="lg" type="submit">
                  {isSignup ? 'Signup' : 'Signin'}
                </Button>
              </GridItem>

              <GridItem colSpan={2}>
                <Button
                  colorScheme="red"
                  w="full"
                  size="lg"
                  onClick={switchMode}
                >
                  {isSignup ? 'Sign In Instead' : 'Signup Instead'}
                </Button>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </Box>
      </form>
    </Container>
  )
}

export default Auth

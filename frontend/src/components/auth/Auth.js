import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { signIn, signUp } from '../../api/api'

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
} from '@chakra-ui/react'
import AuthFormAlert from './AuthFormAlert'

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // SIGN UP SETTERS
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [userAlreadyExists, setAlreadyExists] = useState(false)

  // LOGIN SETTERS
  const [wrongLoginCredentials, setWrongLoginCredentials] = useState(false)

  // SWITCH BETWEEN SIGN UP AND LOG IN
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

  // HANDLE FORM SUBMISSION
  const handleSubmit = async e => {
    e.preventDefault()

    if (isSignup && form.password !== form.confirmPassword) {
      return setPasswordMatch(true)
    }

    if (isSignup) {
      try {
        const { data } = await signUp(form)
        dispatch(authActions.signup({ data }))
        navigate('/')
      } catch (e) {
        setAlreadyExists(true)
      }
    } else {
      try {
        const { data } = await signIn({
          email: form.email,
          password: form.password,
        })

        dispatch(authActions.signin({ data }))
        navigate('/')
      } catch (e) {
        setWrongLoginCredentials(true)
      }
    }
  }

  // HANDLE FORM CHANGE
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  // HANDLE PASSWORD SHOWERS
  const handleShowPassword1 = () =>
    setShowPassword1(showPassword1 => !showPassword1)
  const handleShowPassword2 = () =>
    setShowPassword2(showPassword2 => !showPassword2)

  // HANDLE ALERT CLOSERS
  const handleAlertClose = () => setPasswordMatch(false)
  const handleWrongCredentialsAlertClose = () => setWrongLoginCredentials(false)
  const handleUserAlreadyExistsClose = () => setAlreadyExists(false)

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
              {userAlreadyExists && isSignup && (
                <AuthFormAlert
                  message="A user with that email already exists"
                  handleClose={handleUserAlreadyExistsClose}
                />
              )}

              {passwordMatch && isSignup && (
                <AuthFormAlert
                  message="Passwords do not match"
                  handleClose={handleAlertClose}
                />
              )}

              {wrongLoginCredentials && !isSignup && (
                <AuthFormAlert
                  message="Wrong Login credentials"
                  handleClose={handleWrongCredentialsAlertClose}
                />
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
                    type={showPassword1 ? 'text' : 'password'}
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    required
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPassword1}>
                      {showPassword1 ? 'Hide' : 'Show'}
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
                      type={showPassword2 ? 'text' : 'password'}
                      name="confirmPassword"
                      onChange={handleChange}
                      value={form.confirmPassword}
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowPassword2}
                      >
                        {showPassword2 ? 'Hide' : 'Show'}
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

import { useEffect } from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Route, Routes, Navigate } from 'react-router-dom'
import decode from 'jwt-decode'
import { authActions } from './store/auth'
import { useDispatch } from 'react-redux'

// RENDER COMPONENTS
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import Navbar from './components/navbar/Navbar'
import Explore from './components/explore/Explore'
import Footer from './components/footer/Footer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(authActions.logout())
      }
    }

    dispatch(
      authActions.setUser({ data: JSON.parse(localStorage.getItem('profile')) })
    )
  }, [dispatch])

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  )
}

export default App

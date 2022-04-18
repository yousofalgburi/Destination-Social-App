import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App

import React from 'react'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Route, Routes, Redirect } from 'react-router-dom'
import Home from './components/home/Home'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/home" />
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App

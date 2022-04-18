import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  GridItem,
} from '@chakra-ui/react'

const AuthFormAlert = ({ message, handleClose }) => {
  return (
    <GridItem colSpan={2}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{message}</AlertTitle>
        <CloseButton
          onClick={handleClose}
          position="absolute"
          right="8px"
          top="8px"
        />
      </Alert>
    </GridItem>
  )
}

export default AuthFormAlert

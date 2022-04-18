import {
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
  return (
    <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
      <HStack spacing={{ base: '4', md: '5' }}>
        <Text fontSize="sm" color="subtle">
          &copy; 2022 Yousof Algburi. All rights reserved.
        </Text>
        <ButtonGroup variant="ghost">
          <IconButton
            target="_blank"
            as="a"
            href="https://www.linkedin.com/in/yousof-algburi-410b84209/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            target="_blank"
            as="a"
            href="https://github.com/yousofalgburi"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </HStack>
    </Container>
  )
}

export default Footer

import { Link as ReachLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

const NavBarLink = ({ whereTo, whereToText }) => {
  return (
    <Link as={ReachLink} to={whereTo}>
      {whereToText}
    </Link>
  )
}

export default NavBarLink

import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button, Avatar, AvatarBadge, IconButton, Icon } from "@chakra-ui/react";
import ColorModeSwitch from './ColorModeSwitch'
import AuthContext from '../context/auth/AuthContext'
import { MdPowerSettingsNew } from "react-icons/md";
import {useHistory} from 'react-router-dom'



const MenuItem = ({ children, isLast, to = "/", ...rest }) => {

  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  const history = useHistory()

  const authContext = useContext(AuthContext)
  const {profile,isAuthenticated, logout} = authContext 

  const onLogout = () => {
    logout()
     history.push('/login')
  }
  const goToProfile = (id) => {
    history.push(`/profile/${id}`)
  }

  const authLinks = (
    <>
    { profile !== null && <>
    <Flex cursor="pointer" onClick={() => goToProfile(profile.user)} marginRight='7px'>
  <Avatar src={profile.profilePicture} />
  <Box ml="3">
    <Text color="white" fontWeight="bold">
      {profile.fullName}
    </Text>
    <Text fontSize="sm" color="white">{profile.city}</Text>
  </Box>
</Flex>
<Button marginRight='6px' onClick={onLogout}>
  <Icon color="#C62828" w={8} h={8} as={MdPowerSettingsNew} />
</Button>
</>
}
    </>
  )
  const guestLinks = (
    <>
    <MenuItem to="/login" isLast={false}>
            <Button
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem to="/signup" isLast={false}>
            <Button
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
            >
              Create Account
            </Button>
          </MenuItem>
    </>
  )


  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.800", "primary.800", "primary.800", "primary.800"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >

    <Flex align="center">
    <Box w="200px"
          color={["white", "white", "primary.500", "primary.500"]}>
      <Text fontSize="lg" fontWeight="bold">
        World Traveler
      </Text>
    </Box>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >

        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/community">Community </MenuItem>
          <MenuItem to="/messages">Messages </MenuItem>
          <MenuItem to="/recommandations">Recommandations </MenuItem>
          <MenuItem to="/questions">Q&A </MenuItem>
          { isAuthenticated == "true" && profile !== null ?  authLinks : guestLinks}
          <ColorModeSwitch />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;

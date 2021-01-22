import {useState} from 'react'
import {Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button  } from "@chakra-ui/react"

const Login = () => {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(username !== '' && password !== ''){

            //login()
        }
    }

    return (
        <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={username} placeholder="test" onChange={onChangeUsername} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} placeholder="*******" onChange={onChangePassword} />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    )
}

export default Login

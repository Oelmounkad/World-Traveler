import {useState,useContext,useEffect} from 'react'
import AuthContext from '../context/auth/AuthContext'

import {Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast } from "@chakra-ui/react"

const Login = props => {

    const authContext = useContext(AuthContext)
    const {login,isAuthenticated,error,user} = authContext

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [invalidity, setInvalidity] = useState(false);

    const errorToast = useToast()
    const successToast = useToast()

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    useEffect(() => {

                if(error !== null){
                    setUsername('')
                    setPassword('')
                    setInvalidity(true)
                    errorToast({
                    title: error,
                    description: "Unable to Authenticate.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
                }

                if(isAuthenticated == true){
                    setInvalidity(false)
                    successToast({
                        position: "bottom-left",
                        title: "Authenticated.",
                        description: `Welcome ${user.username}`,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })
                }
               

        
    }, [error,isAuthenticated]);
    const onSubmit = e => {
        e.preventDefault()
        if(username !== '' && password !== ''){
            const data = {
                username,
                password
            }
            login(data)
        }else{
          errorToast({
            title: 'Empty Fields',
            description: "Fill all the fields.",
            status: "error",
            duration: 4000,
            isClosable: true,
        })
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
                <Input isInvalid={invalidity} type="text" value={username} placeholder="test" onChange={onChangeUsername} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input isInvalid={invalidity} type="password" value={password} placeholder="*******" onChange={onChangePassword} />
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

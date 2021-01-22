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

const Signup = props => {

    const authContext = useContext(AuthContext)
    const {signup,isRegistered,error} = authContext

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [invalidity, setInvalidity] = useState(false);

    const errorToast = useToast()
    const successToast = useToast()

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangeEmail = e => {
        setEmail(e.target.value)
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
                    description: "Unable to Sign up.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                })
                }

                if(isRegistered == true){
                    setInvalidity(false)
                    successToast({
                        position: "top-right",
                        title: "User Registered.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      })
                      props.history.push('/login')
                }
               

        
    }, [error,isRegistered,props.history]);
    const onSubmit = e => {
        e.preventDefault()
        if(username !== '' && password !== '' && email !== ''){
            const data = {
                username,
                email,
                password,
                roles: ["user"]
            }
            signup(data)
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
        <Box bg="brand.100" p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input isInvalid={invalidity} type="text" value={username} placeholder="test" onChange={onChangeUsername} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input isInvalid={invalidity} type="text" value={email} placeholder="test@mail.com" onChange={onChangeEmail} />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input isInvalid={invalidity} type="password" value={password} placeholder="*******" onChange={onChangePassword} />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    )
}

export default Signup

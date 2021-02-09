import { Box, Button, Center, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import React,{useEffect,useContext} from 'react'
import AppContext from '../context/app/AppContext'

const HomePage = props => {

const appContext = useContext(AppContext)
const {getAllCities,cities} = appContext

    useEffect(() => {
        getAllCities()
    }, []);


    return (
<>
        <Center mb='5'>
        <Heading>Welcome to World Traveler!</Heading>

        </Center>
        
        <Flex w="100%" p="auto" direction="row">
        <Flex
          marginLeft="auto"
          marginRight="auto"
          w="70vw"
          justify="space-evenly"
          flexWrap="wrap"
          alignContent="space-evenly"
        >

            {cities.length !== 0 && cities.map(city => (

            <Box
            m='5'
            border="1px solid grey"
            borderRadius="10px"
            overflow="hidden"
            >
                <Center>
                     <Image
            src={city.picture}
            boxSize="200px"
            
            objectFit="cover"
            display="block"
            />
                </Center>
           
            <Box
            as="h4"
            mb="auto"
            display="flex"
            justifyContent="center"
            color="grey"
            isTruncated
            >
                <Flex direction="column" alignItems="center">
            <Text fontSize="3xl">{city.title}</Text>
            <Button onClick={() => {
                props.history.push(`/community/${city.title}`)
            }} m='2'>Show Locals</Button>
            <Button onClick={() => {
                props.history.push(`/recommandations/${city.title}`)
            }} m='2'>See Recommandations</Button>
                </Flex>
                
            </Box>
            </Box>
            ))}
            

    
        </Flex>
      </Flex>
      </>
        
       
    )
}

export default HomePage

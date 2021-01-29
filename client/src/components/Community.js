import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { Box,Avatar,Spacer,Button,IconButton,Text,Badge,Icon,RadioGroup,Stack,Radio,Select,Input,Heading,InputLeftElement,InputGroup, Flex, Center } from "@chakra-ui/react"
import { MdMyLocation, MdPermContactCalendar,MdSearch} from 'react-icons/md'
import moment from 'moment'
import AppContext from '../context/app/AppContext'

const Community = () => {

    const history = useHistory()
    
    const appContext = useContext(AppContext)
    const {communityProfiles,getProfiles} = appContext

    const goToProfile = (id) => {
      history.push(`/profile/${id}`)
    }

    const [gender, setGender] = useState('Male')

    const [language, setLanguage] = useState('')

    const [location, setLocation] = useState('')

    const [age, setAge] = useState('')

    const onChangeLanguage = e => {
        setLanguage(e.target.value)
    }
    const onChangeLocation = e => {
        setLocation(e.target.value)
    }
    const onChangeAge = e => {
        setAge(e.target.value)
    }
    useEffect(() => {
        getProfiles()
    }, []);
    
    return (
        <>
      
        <Box textAlign="center">
            <Heading>Search For Locals</Heading>
          </Box>
          <br />
         <Center>
          <Flex gridColumnGap={4} gridRowGap={4}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]} spacing={3}>
                <InputGroup>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<Icon color="gray.300" as={MdMyLocation} />}
                    />
                    <Input type="text" placeholder="Location" value={location} onChange={onChangeLocation} />
                </InputGroup>
               
                <Flex align="center">
                <RadioGroup onChange={setGender} value={gender}>
                <Stack direction="row">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                </Stack>
                </RadioGroup>
                </Flex>
                

                <Select placeholder="Language" value={language} onChange={onChangeLanguage}>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                </Select>
                

                <InputGroup>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<Icon color="gray.300" as={MdPermContactCalendar} />}
                    />
                    <Input type="number" placeholder="Age" value={age} onChange={onChangeAge} />
                </InputGroup>

                <IconButton aria-label="Search database" icon={<MdSearch />} />

            </Flex>
            </Center>

<br />
{communityProfiles.length !== 0 && 
communityProfiles.map(profile => <>

<Flex marginLeft="80" marginBottom='5' alignItems="center" maxW="4xl" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">

            <Box paddingLeft="4">
            <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={profile.profilePicture}
    />  
            </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme={profile.sexe === 'Male' ? 'teal' : 'red'}>
            {profile.sexe}
          </Badge>
        </Box>
        <Box
         
        >
          Fullname : {profile.fullName}
        </Box>

        <Box
        >
          Age : {moment.duration(moment().diff(moment(profile.birthDate,'DD-MM-YYYY'))).years()  }
        </Box>

        <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
          <Text> Languages: {profile.languages.length !== 0 ? 
          profile.languages.map((language,i) => profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text>
          </Box>
      
      </Box>
      <Flex direction="column"
      >
          <Box mt="1"
      fontWeight="semibold"
      as="h4"
      lineHeight="tight"
      isTruncated>
        Bio: 
          </Box>
          <Box overflow="hidden">
              {profile.description}
          </Box>
      </Flex>
      <Spacer />
      <Flex direction="column" alignItems="center" paddingRight="2">
      <Button onClick={() => goToProfile(profile.user)} colorScheme="blue">See profile</Button>
      <br />
      <Button colorScheme="blue">Contact</Button>
      </Flex>
    </Flex>

</>)



}

          </>  
        
    )
}

export default Community

import { Avatar, Badge, Box, Button, Center, Flex, Heading, Spacer, Text } from '@chakra-ui/react'
import React,{useContext,useEffect} from 'react'
import { MdClose, MdDone } from 'react-icons/md'
import AppContext from '../context/app/AppContext'
import AuthContext from '../context/auth/AuthContext'
const Meetings = () => {

    const appContext = useContext(AppContext)
    const {getUserMeetings,userMeetings,acceptMeeting,finishMeeting} = appContext

    const authContext = useContext(AuthContext)
    const {user} = authContext

    useEffect(() => {
        getUserMeetings()
    }, [])

    

    return (
        <>

            {/** Pending Meetings */}


            {userMeetings.length !== 0 &&
            <>
            <Box mb='4' textAlign="center">
               <Heading>Pending Meetings</Heading>
            </Box>
            
            {userMeetings.map(meeting => 
                meeting.statut == "pending" &&
                <Flex marginLeft="80" marginBottom='5' alignItems="center" maxW="4xl" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">

            <Box p="4">
            {meeting.hoster._id === user.id && 
         <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.requester.profile.profilePicture}
    />  }  

    {meeting.requester._id === user.id && 
    
    <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.hoster.profile.profilePicture}
    />}
            </Box>
      <Box p="6">
        
        <Box
         
        >
          Fullname : {meeting.requester._id === user.id ? meeting.hoster.profile.fullName : meeting.requester.profile.fullName}
        </Box>
        <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
              {meeting.requester._id === user.id ? 
             <Text> Languages: {meeting.hoster.profile.languages.length !== 0 ? 
                meeting.hoster.profile.languages.map((language,i) => meeting.hoster.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text> : 
                <Text> Languages: {meeting.requester.profile.languages.length !== 0 ? 
                    meeting.requester.profile.languages.map((language,i) => meeting.requester.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text>
            }
         
          </Box>

      </Box>
      <Flex direction="column"
      >
          <Box>
              Location :  {meeting.location}
          </Box>
          <Box>
              Time :  {meeting.time}
          </Box>
       

      </Flex>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
         {meeting.requester._id == user.id ? 
         
         <Badge colorScheme="green" borderRadius="full" px="2" >
            You are hosted
          </Badge>
         :  <Badge colorScheme="purple" borderRadius="full" px="2" >
            You Host
        </Badge>} 
         
        </Box>
        </Box>

        <Box>
              Message :  {meeting.message}
          </Box>


      <Spacer />
      {user.id == meeting.hoster._id ? 
      <Flex direction="column" alignItems="center" paddingRight="2">
      <Button onClick={() => acceptMeeting(meeting._id).then(_ => getUserMeetings()) } leftIcon={<MdDone/>} colorScheme="green">Accept</Button>
      </Flex> : 
      <Text pr='4'>Pending...</Text>
    }
      
    </Flex>

            )} 
            </>
            }

                  {userMeetings.filter(el => el.statut == "pending").length == 0 &&
                    <Center><Text>No Pending meetings...</Text></Center>
                  }


            {/** Confirmed Meetings */}

            {userMeetings.length !== 0 && 
            <>
            <Box mb='4' textAlign="center">
            <Heading>Confirmed Meetings</Heading>
          </Box>
            {userMeetings.map(meeting => 
                meeting.statut == "confirmed" &&
                <Flex marginLeft="80" marginBottom='5' alignItems="center" maxW="4xl" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">

            <Box p="4">
            {meeting.hoster._id === user.id && 
         <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.requester.profile.profilePicture}
    />  }  

    {meeting.requester._id === user.id && 
    
    <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.hoster.profile.profilePicture}
    />}
    

  
            </Box>
      <Box p="6">
        
        <Box
         
        >
          Fullname : {meeting.requester._id === user.id ? meeting.hoster.profile.fullName : meeting.requester.profile.fullName}
        </Box>
        <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
         {meeting.requester._id === user.id ? 
             <Text> Languages: {meeting.hoster.profile.languages.length !== 0 ? 
                meeting.hoster.profile.languages.map((language,i) => meeting.hoster.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text> : 
                <Text> Languages: {meeting.requester.profile.languages.length !== 0 ? 
                    meeting.requester.profile.languages.map((language,i) => meeting.requester.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text>
            }
          </Box>

      </Box>
      <Flex direction="column"
      >
          <Box>
              Location :  {meeting.location}
          </Box>
          <Box>
              Time :  {meeting.time}
          </Box>
       

      </Flex>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
         {meeting.requester._id == user.id ? 
         
         <Badge colorScheme="green" borderRadius="full" px="2" >
            You are hosted
          </Badge>
         :  <Badge colorScheme="purple" borderRadius="full" px="2" >
            You Host
        </Badge>} 
         
        </Box>
        </Box>
      <Spacer />
      
      <Flex direction="row" alignItems="center" paddingRight="2">
      <Badge mr='2'>Meeting accepted</Badge>
      <Button onClick={() => finishMeeting(meeting._id).then(_ => getUserMeetings()) } colorScheme="green">Finish Meeting!</Button>
      </Flex>
    
      
    </Flex>

            )} 
            </>
            } 

          {userMeetings.filter(el => el.statut == "confirmed").length == 0 &&
                              <Center><Text>No Confirmed meetings...</Text></Center>
                            }


            {/** Finished Meetings */}

            {userMeetings.length !== 0 && 
            <>
            <Box mb='4' textAlign="center">
            <Heading>Finished Meetings</Heading>
          </Box>
            {userMeetings.map(meeting => 
                meeting.statut == "finished" &&
                <Flex marginLeft="80" marginBottom='5' alignItems="center" maxW="4xl" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">

            <Box p="4">
            {meeting.hoster._id === user.id && 
         <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.requester.profile.profilePicture}
    />  }  

    {meeting.requester._id === user.id && 
    
    <Avatar
      size="xl"
      name="Kola Tioluwani"
      src={meeting.hoster.profile.profilePicture}
    />}
            </Box>
      <Box p="6">
        
        <Box
         
        >
          Fullname : {meeting.requester._id === user.id ? meeting.hoster.profile.fullName : meeting.requester.profile.fullName}
        </Box>
        <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
         {meeting.requester._id === user.id ? 
             <Text> Languages: {meeting.hoster.profile.languages.length !== 0 ? 
                meeting.hoster.profile.languages.map((language,i) => meeting.hoster.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text> : 
                <Text> Languages: {meeting.requester.profile.languages.length !== 0 ? 
                    meeting.requester.profile.languages.map((language,i) => meeting.requester.profile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }</Text>
            }
          </Box>

      </Box>
      <Flex direction="column"
      >
          <Box>
              Location :  {meeting.location}
          </Box>
          <Box>
              Time :  {meeting.time}
          </Box>
       

      </Flex>
      <Box p="6">
        <Box d="flex" alignItems="baseline">
         {meeting.requester._id == user.id ? 
         
         <Badge colorScheme="green" borderRadius="full" px="2" >
            You are hosted
          </Badge>
         :  <Badge colorScheme="purple" borderRadius="full" px="2" >
            You Host
        </Badge>} 
         
        </Box>
        </Box>
      
      <Flex direction="column" alignItems="center" paddingRight="2">
      <Badge colorScheme="red">Meeting Finished</Badge>
      </Flex>
    
      
    </Flex>

            )} 
            </>
            } 

             {userMeetings.filter(el => el.statut == "finished").length == 0 &&
                    <Center><Text>No Finished meetings...</Text></Center>
                  }     
        </>
    )
}

export default Meetings

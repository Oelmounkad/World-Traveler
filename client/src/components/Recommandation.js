import { Avatar, Badge, Box, Divider, Flex, Heading, Image, Input, Text } from '@chakra-ui/react'
import React,{useState,useContext} from 'react'
import moment from 'moment'
import AppContext from '../context/app/AppContext'


const Recommandation = ({rec}) => {

  const appContext = useContext(AppContext)
  const {commentRecommandation} = appContext


  const [recComment, setRecComment] = useState('')
  
  const onSubmitComment = e => {
    e.preventDefault()
    if(recComment !== ''){
      commentRecommandation(rec._id,recComment)
    }
  }
    return (
      <>
        <Flex
        marginBottom='5'
        py={2}
        px={3}
        // mx={[4, 4, 0, 0]}
        key={rec._id}
        shadow="md"
        borderWidth="2px"
        flexDir="column"
        w="100%"
        justify="space-between"
      >
         
           
        <Flex
          p={1}
          alignItems="flex-start"
          w={["60%", "75%", "80%"]}
          flexDir="column"
          justify="space-between"
        >
        {rec.user.profile && <Flex cursor="pointer" marginRight='7px'>
            <Avatar src={rec.user.profile.profilePicture} />
            <Box ml="3">
                <Text color="white" fontWeight="bold">
                {rec.user.profile.fullName}
                </Text>
                <Text fontSize="sm" color="white">{rec.user.profile.city}</Text>
            </Box>
            </Flex>
            }
            <br />
            <Divider />
            <br />

          <Heading size={["md", null, "lg"]}>{rec.description}</Heading>
          <Flex flexDir="row" flexWrap="wrap" mt={2} maxW="100%">
                <Badge
                  mr={1}
                  mb={1}
                  variant="solid"
                 
                >
                  {rec.theme}
                </Badge>
                
                <Badge
                  mr={1}
                  mb={1}
                  variant="solid"
                 
                >
                  {rec.city}
                </Badge>
              
          </Flex>

          <Image boxSize="200px" src={rec.picture} alt="" />

          <Text mt={3} fontSize={["sm", null, "md"]}>
            {moment(rec.date)
              .fromNow()}
          </Text>
        </Flex>
        <Flex
          p={1}
          alignItems="flex-end"
          justify="space-between"
          flexDir="row"
        >
          <Text isTruncated={true} w="100%" fontSize={["md", null, "lg"]}>
            {rec.comments.length} comment
          </Text>
        </Flex>
        <br />
            <Divider />
            <br />
            {rec.comments.length !== 0 && rec.comments.map(comment => 
              
              <Flex alignItems="center">
                <Avatar src="d" />
                <Box ml="3" mr='3'>
                    <Text color="white" fontWeight="bold">
                    Commenter
                    </Text>
                </Box>
                <Text>Comment</Text>
              </Flex>
              
              
              ) }
          <form onSubmit={onSubmitComment}>
            <Input type="text" value={recComment} onChange={e => setRecComment(e.target.value)} />
            </form>
      </Flex>
      </>
    )
}

export default Recommandation

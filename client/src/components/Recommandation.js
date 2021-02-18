import { Avatar, Badge, Box, Button, Divider, Flex, Heading, Image, Input, Link, Text } from '@chakra-ui/react'
import React,{useState,useContext} from 'react'
import moment from 'moment'
import AppContext from '../context/app/AppContext'
import {useHistory} from 'react-router-dom'

const Recommandation = ({rec}) => {

  const history = useHistory()
  const appContext = useContext(AppContext)
  const {commentRecommandation,getAllRecommandations} = appContext

  const [toggleComments, setToggleComments] = useState(false)

  const [recComment, setRecComment] = useState('')
  
  const onSubmitComment = e => {
    e.preventDefault()
    if(recComment !== ''){
      let data = {
        description : recComment
      }
      commentRecommandation(rec._id,data).then(_ => {
        getAllRecommandations()
        setRecComment('')
      
      })
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
        {rec.user.profile && <Flex onClick={() => {
          history.push(`/profile/${rec.user._id}`)
        } } cursor="pointer" marginRight='7px'>
            <Avatar src={rec.user.profile.profilePicture} />
            <Box ml="3">
                <Text fontWeight="bold">
                {rec.user.profile.fullName}
                </Text>
                <Text fontSize="sm">{rec.user.profile.city}</Text>
            </Box>
            </Flex>
            }
            <br />
            <Divider />
            <br />

          <Heading size={["md", null, "lg"]}>{rec.description}</Heading>
          <Text as="i">{rec.location}</Text>
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
          <Link onClick={() => setToggleComments(!toggleComments)} isTruncated={true} w="100%" fontSize={["md", null, "lg"]}>
            {rec.comments.length} comment{rec.comments.length !== 1 ? 's':''}
          </Link>
        </Flex>
        <br />
            <Divider />
            <br />
            {rec.comments.length !== 0 && rec.comments.map(comment => 
              
              <Flex hidden={toggleComments} alignItems="center" mb='2'>
                <Avatar src={comment.user && comment.user.profile && comment.user.profile.profilePicture} />
                <Box ml="3" mr='3'>
                    <Text fontWeight="bold">
                    {comment.user && comment.user.profile && comment.user.profile.fullName}
                    </Text>
                </Box>
                <Text>{comment.description}</Text>
              </Flex>
              
              
              ) }
              
          <form onSubmit={onSubmitComment}>
            <Flex direction="row">
                <Input type="text" value={recComment} placeholder="Enter your comment..." onChange={e => setRecComment(e.target.value)} mr='2' />
                <Button type="submit">Comment</Button>
             </Flex>
          </form>
      </Flex>
      </>
    )
}

export default Recommandation

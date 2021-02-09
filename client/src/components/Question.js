import { Avatar, Badge, Box, Button, Divider, Flex, Heading, Image, Input, Text } from '@chakra-ui/react'
import React,{useState,useContext} from 'react'
import moment from 'moment'
import AppContext from '../context/app/AppContext'
import {useHistory} from 'react-router-dom'

const Question = ({que}) => {

    const history = useHistory()

    const appContext = useContext(AppContext)
    const {commentQuestion,getAllQuestions} = appContext
  
  
    const [queComment, setQueComment] = useState('')
    
    const onSubmitComment = e => {
      e.preventDefault()
      if(queComment !== ''){
        let data = {
          description : queComment
        }
        commentQuestion(que._id,data).then(_ => {
            getAllQuestions()
            setQueComment('')
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
        key={que._id}
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
        {que.user.profile && <Flex onClick={() => {
          history.push(`/profile/${que.user._id}`)
        } } cursor="pointer" marginRight='7px'>
            <Avatar src={que.user.profile.profilePicture} />
            <Box ml="3">
                <Text color="white" fontWeight="bold">
                {que.user.profile.fullName}
                </Text>
                <Text fontSize="sm" color="white">{que.user.profile.city}</Text>
            </Box>
            </Flex>
            }
            <br />
            <Divider />
            <br />

          <Heading size={["md", null, "lg"]}>{que.description}</Heading>
          <Flex flexDir="row" flexWrap="wrap" mt={2} maxW="100%">
                <Badge
                  mr={1}
                  mb={1}
                  variant="solid"
                 
                >
                  {que.theme}
                </Badge>
                
                <Badge
                  mr={1}
                  mb={1}
                  variant="solid"
                 
                >
                  {que.city}
                </Badge>
              
          </Flex>

          <Image boxSize="200px" src={que.picture} alt="" />

          <Text mt={3} fontSize={["sm", null, "md"]}>
            {moment(que.date)
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
            {que.comments.length} comment
          </Text>
        </Flex>
        <br />
            <Divider />
            <br />
            {que.comments.length !== 0 && que.comments.map(comment => 
              
              <Flex alignItems="center" mb='2'>
                <Avatar src={comment.user.profile && comment.user.profile.profilePicture} />
                <Box ml="3" mr='3'>
                    <Text color="white" fontWeight="bold">
                    {comment.user.profile && comment.user.profile.fullName}
                    </Text>
                </Box>
                <Text>{comment.description}</Text>
              </Flex>
              
              
              ) }
              
          <form onSubmit={onSubmitComment}>
            <Flex direction="row">
                <Input type="text" value={queComment} placeholder="Enter your comment..." onChange={e => setQueComment(e.target.value)} mr='2' />
                <Button type="submit">Comment</Button>
             </Flex>
          </form>
      </Flex>
      </>
    )
}

export default Question

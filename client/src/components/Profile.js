import React,{useEffect,useContext,useState} from 'react'
import {Box, Flex,Modal,ModalOverlay,ModalContent,Spinner,ModalCloseButton,ModalBody,ModalFooter, useDisclosure ,Text,Image, Icon, Spacer, Button, Heading} from "@chakra-ui/react"
import {MdEdit,MdPermContactCalendar,MdPersonAdd,MdChat, MdFavorite, MdGroupWork, MdLanguage, MdFitnessCenter} from 'react-icons/md'
import AppContext from '../context/app/AppContext'
import AuthContext from '../context/auth/AuthContext'
import moment from 'moment'

const Profile = props => {

    const { match: { params } } = props 

    const appContext = useContext(AppContext)
    const {getChosenProfile,chosenProfile} = appContext

    const authContext = useContext(AuthContext)
    const {user} = authContext

    const [modalImage, setModalImage] = useState('')

    useEffect(() => {
        getChosenProfile(params.id)
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOpen = image => {
        setModalImage(image)
        onOpen()
    }
    return (
        <>
        {chosenProfile !== null ? 
        
        <Flex direction="row">

            {/** Profile pic + infos */}
                <Flex direction="column" marginLeft='12'>
                    <Box border="2px" borderColor="gray.500">
                    
                        <Image border="2px" borderColor="black.100" m='1.5' marginBottom='2' boxSize="300px" src={chosenProfile.profilePicture} alt="naruto" objectFit="cover" />
                   
                            {/** Followers */}
                        <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base" >
                                <Icon color="#BDBDBD" w={8} h={8} as={MdFavorite} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Friends</Text> 
                                <Spacer />
                                <Box bg="#1976D2" borderColor="blue.500" borderRadius="full" > 
                                    <Text px='1' color="white" fontFamily="sans-serif" fontSize="sm" >70</Text>
                                </Box>
                           </Flex>
                            
                           {/** Meetings */}
                           <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdGroupWork} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Meetings</Text> 
                                <Spacer />
                                <Box bg="#1976D2" borderColor="blue.500" borderRadius="full" > 
                                    <Text px='1' color="white" fontFamily="sans-serif" fontSize="sm" >120</Text>
                                </Box>
                           </Flex>

                           {/** Languages */}
                           <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdLanguage} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Languages</Text> 
                                <Spacer />
                                 
                                    <Text px='1' color="#9E9E9E" fontFamily="sans-serif" fontSize="sm" >
                                    {chosenProfile.languages && chosenProfile.languages.length !== 0 ? 
                                    chosenProfile.languages.map((language,i) => chosenProfile.languages.length == i + 1 ? language : language + '\u2022') : 'Not Specified' }

                                    </Text>
                               
                           </Flex>

                           {/** Age */}
                           <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdPermContactCalendar} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Age</Text> 
                                <Spacer />
                                <Box bg="#1976D2" borderColor="blue.500" borderRadius="full" > 
                                    <Text px='1' color="white" fontFamily="sans-serif" fontSize="sm" >
                                        
                                        {moment.duration(moment().diff(moment(chosenProfile.birthDate,'DD-MM-YYYY'))).years()}
                                        
                                    </Text>
                                </Box>
                           </Flex>

                            {/** Hobbies */}
                            <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdFitnessCenter} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Hobbies</Text> 
                                <Spacer />
                                
                                    <Text px='1' color="#9E9E9E" fontFamily="sans-serif" fontSize="sm" >
                                    {chosenProfile.hobbies && chosenProfile.hobbies.length !== 0 ? 
                                    chosenProfile.hobbies.map((hobby,i) => chosenProfile.hobbies.length == i + 1 ? hobby : hobby + '\u2022') : 'Not Specified' }
                                    </Text>
                               
                           </Flex>
                                {/** Buttons */}
                        { chosenProfile.user !== user.id ?  
                        
                        <Flex direction="row">
                           <Button marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdPersonAdd} />
                                <Text>Add Friend</Text>
                            </Button>
                            <Button marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdChat} />
                                <Text>Contact</Text>
                            </Button>
                           </Flex> 
                           :
                           
                           <Flex direction="row">
                           <Button marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdEdit} />
                                <Text>Edit Profile</Text>
                            </Button>
                            <Button marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdPermContactCalendar} />
                                <Text>Meetings</Text>
                            </Button>
                           </Flex> 
                        }
                           

                    </Box>

                </Flex>



             {/** portfolio + desc */}

                <Flex direction="column">
                    <Flex overflowX="scroll" direction="row" marginLeft="200">
                    {chosenProfile.portfolio.length !== 0 && 
                     chosenProfile.portfolio.map(image => 
                     
                        <Image cursor="pointer" onClick={() => handleOpen(image)}  m='1.5' marginBottom='2' boxSize="250px" src={image} alt="naruto" objectFit="cover" />
                    
                     )
                    }
                       </Flex>

                       <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                           
                            <ModalCloseButton />
                            <ModalBody>
                            <Image   boxSize="500px" src={modalImage} alt="naruto" objectFit="cover" />
                            </ModalBody>
                            </ModalContent>
                        </Modal>

                     <Box marginLeft="200">
                        <Heading>{chosenProfile.fullName}</Heading>
                       
                        <Text  fontSize="xl">
                        {chosenProfile.description}
                        </Text>
                     </Box>
                      

                </Flex>



            </Flex> : 

            <Box>
                <Spinner size="xl" />
            </Box>
            
        }
            



        </>
    )
}

export default Profile

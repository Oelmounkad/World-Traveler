import React from 'react'
import {Box, Flex,Text,Image, Icon, Spacer, Button, Heading} from "@chakra-ui/react"
import {MdBuild, MdFavorite, MdFitnessCenter, MdGroupWork,MdLanguage,MdPermContactCalendar} from 'react-icons/md'
const Profile = () => {
    return (
        <>
            <Flex direction="row">

            {/** Profile pic + infos */}
                <Flex direction="column" marginLeft='12'>
                    <Box border="2px" borderColor="gray.500">
                    
                        <Image border="2px" borderColor="black.100" m='1.5' marginBottom='2' boxSize="300px" src="https://bit.ly/dan-abramov" alt="naruto" objectFit="cover" />
                   
                            {/** Followers */}
                        <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base" >
                                <Icon color="#BDBDBD" w={8} h={8} as={MdFavorite} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Followers</Text> 
                                <Spacer />
                                <Box bg="#1976D2" borderColor="blue.500" borderRadius="full" > 
                                    <Text px='1' color="white" fontFamily="sans-serif" fontSize="sm" >1200</Text>
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
                                 
                                    <Text px='1' color="#9E9E9E" fontFamily="sans-serif" fontSize="sm" >French,English</Text>
                               
                           </Flex>

                           {/** Age */}
                           <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdPermContactCalendar} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Age</Text> 
                                <Spacer />
                                <Box bg="#1976D2" borderColor="blue.500" borderRadius="full" > 
                                    <Text px='1' color="white" fontFamily="sans-serif" fontSize="sm" >23</Text>
                                </Box>
                           </Flex>

                            {/** Hobbies */}
                            <Flex my='2' alignItems="center" direction="row" bg="#EEEEEE" px="1" mx="1" borderRadius="3px" boxShadow="base">
                                    <Icon color="#BDBDBD" w={8} h={8} as={MdFitnessCenter} />
                                &nbsp;  <Text color="#9E9E9E" fontSize="md" fontWeight="bold" fontFamily="sans-serif">Hobbies</Text> 
                                <Spacer />
                                
                                    <Text px='1' color="#9E9E9E" fontFamily="sans-serif" fontSize="sm" >Football,Swimming</Text>
                               
                           </Flex>
                                {/** Buttons */}
                           <Flex direction="row">
                           <Button leftIcon={<MdBuild />} colorScheme="green" variant="solid">
                                Edit Profile
                            </Button>

                           </Flex>

                    </Box>

                </Flex>



             {/** portfolio + desc */}

                <Flex direction="column">

                     <Flex direction="row" marginLeft="200">
                        <Image  m='1.5' marginBottom='2' boxSize="250px" src="https://bit.ly/dan-abramov" alt="naruto" objectFit="cover" />
                        <Image  m='1.5' marginBottom='2' boxSize="250px" src="https://bit.ly/dan-abramov" alt="naruto" objectFit="cover" />
                        <Image  m='1.5' marginBottom='2' boxSize="250px" src="https://bit.ly/dan-abramov" alt="naruto" objectFit="cover" />
                     </Flex>

                     <Box marginLeft="200">
                        <Heading>Abramov</Heading>
                       
                        <Text  fontSize="xl">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </Text>
                     </Box>
                      

                </Flex>



            </Flex>



        </>
    )
}

export default Profile

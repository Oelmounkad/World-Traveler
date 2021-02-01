import React,{useEffect,useContext,useState} from 'react'
import {AddIcon} from "@chakra-ui/icons"
import {Box ,Input,Flex,Modal,ModalOverlay,ModalContent,Spinner,ModalCloseButton,ModalBody,ModalFooter, useDisclosure ,Text,Image, Icon, Spacer, Button, Heading, Textarea, Select, IconButton, Center} from "@chakra-ui/react"
import {MdEdit,MdPermContactCalendar,MdPersonAdd,MdChat, MdFavorite, MdGroupWork, MdLanguage, MdFitnessCenter, MdSave, MdKeyboardReturn} from 'react-icons/md'
import AppContext from '../context/app/AppContext'
import AuthContext from '../context/auth/AuthContext'
import moment from 'moment'

const Profile = props => {

    
    let hiddenInput = null;
    const { match: { params } } = props 

    const appContext = useContext(AppContext)
    const {getChosenProfile,chosenProfile,updateProfile,addPhotoToPortfolio} = appContext

    const authContext = useContext(AuthContext)
    const {user} = authContext

    const [modalImage, setModalImage] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editedProfile,setEditedProfile] = useState({})
    const [editedBirthday, setEditedBirthday] = useState({
        day:'',month:'',year:''
    })

    useEffect(() => {
        getChosenProfile(params.id)
    }, [])

    

    useEffect(() => {
        if(chosenProfile !== null){
            setEditedProfile({...editedProfile,
                ...chosenProfile
        })
        let day = moment(chosenProfile.birthDate,'DD-MM-YYYY').date()
        let month = moment(chosenProfile.birthDate,'DD-MM-YYYY').month()+1
        let year = moment(chosenProfile.birthDate,'DD-MM-YYYY').year()
        setEditedBirthday({...editedBirthday, day,month,year })

        }
    }, [chosenProfile])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOpen = image => {
        setModalImage(image)
        onOpen()
    }

    const onChangeEdited = e => {
        setEditedProfile({...editedProfile,
                    [e.target.name]:e.target.value
            })
    }

    const onChangeSelectLanguage = e => {
        if(!editedProfile.languages.includes(e.target.value)){
            setEditedProfile({...editedProfile,
                    [e.target.name]:[...editedProfile.languages,e.target.value]
            })
        }else{
            setEditedProfile({...editedProfile,
                [e.target.name]:editedProfile.languages.filter(lang => lang !== e.target.value)
        })
        }
        
    }

    const onChangeSelectHobby = e => {
        if(!editedProfile.hobbies.includes(e.target.value)){
            setEditedProfile({...editedProfile,
                    [e.target.name]:[...editedProfile.hobbies,e.target.value]
            })
        }else{
            setEditedProfile({...editedProfile,
                [e.target.name]:editedProfile.hobbies.filter(hob => hob !== e.target.value)
        })
        }
        
    }

    const onChangeEditedBirthday = e => {
        setEditedBirthday({...editedBirthday,
                [e.target.name]:e.target.value
        })
    }
    
    const [fileInputState, setFileInputState] = useState('')
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if(file instanceof Blob){
            previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        }else{
            setPreviewSource('');
            setFileInputState('');
        }
        
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const addPhotoToPortfolioLocal = () => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            let data = {portfolio:reader.result}
            addPhotoToPortfolio(data,chosenProfile._id)
            setFileInputState('')
            setPreviewSource('')
        }
        
        

    }

    const onSubmit = e => {
        e.preventDefault()
        let birthDate = editedBirthday.day+"-"+editedBirthday.month+"-"+editedBirthday.year
        editedProfile.birthDate = birthDate
        updateProfile(editedProfile)
        setEditMode(false)
    }

    const [showAddingButton, setShowAddingButton] = useState(true)

    useEffect(() => {
        if(previewSource !== ''){
            setShowAddingButton(false)
        }else{
            setShowAddingButton(true)
        }
    }, [previewSource]);

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
                           <Button onClick={() => setEditMode(true)} marginRight='6px'>
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
                                        

                                  {/** Preview of photo */}
                                    {previewSource && (
                                        <Center>
                                        <Flex direction="column">
                                        
                                             <Image
                                        src={previewSource}
                                        alt="chosen"
                                        boxSize="300px"
                                    />
                                     <Button width="200px" onClick={addPhotoToPortfolioLocal}  hidden={showAddingButton}>Add To portfolio</Button>
                                        
                                   </Flex></Center>
                                )}
                               
                                


                                        {/** Portfolio hidden add button */}
                                                                        
                                        <Input  
                                        type="file" 
                                        hidden
                                        ref={el => hiddenInput = el}
                                        id="fileInput"
                                        class="form-control-file" 
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                        />
                                        {/** Portfolio image load button */}
                                        {chosenProfile.user == user.id && 
                                        <IconButton
                                            marginLeft="200"
                                            variant="outline"
                                            colorScheme="teal"
                                            aria-label="Send email"
                                            width="40px"
                                            onClick={() => hiddenInput.click()}
                                            icon={<AddIcon />}
                                            />}
                                            

                    <Flex overflowX="scroll" direction="row" marginLeft="200">
                    {chosenProfile.portfolio.length !== 0 && 
                     chosenProfile.portfolio.slice(0).reverse().map(image => 
                     
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

                { editMode ? 
                
                <Flex mx='200' direction="column">
                        {/** Here gooes editing form */}
                        <form onSubmit={onSubmit}>
                        <Flex direction="column">
                             <Heading>Full Name</Heading>
                             <Input type="text" name="fullName" placeholder="Full Name" value={editedProfile.fullName} onChange={onChangeEdited} />
                        </Flex>
                        <Flex direction="column">
                             <Heading>Bio</Heading>
                             <Textarea type="text" name="description" placeholder="Bio" value={editedProfile.description} onChange={onChangeEdited} />
                        </Flex>
                    
                    <Flex direction="row">
                               <Box>
                                <Heading>Languages</Heading>
                                <Select name="languages" placeholder="Select option" multiple height='100px' width="300px" value={editedProfile.languages} onChange={onChangeSelectLanguage}>
                                    <option value="German">German</option>
                                    <option value="English">English</option>
                                    <option value="French">French</option>
                                    <option value="Dutch">Dutch</option>
                                    <option value="Italian">Italian</option>
                                </Select>  
                                </Box>

                                <Spacer />

                                <Box>
                                <Heading>Hobbies</Heading>
                                <Select name="hobbies" placeholder="Select option" multiple height='100px' width="300px" value={editedProfile.hobbies} onChange={onChangeSelectHobby}>
                                    <option value="Football">Football</option>
                                    <option value="Skydiving">Skydiving</option>
                                    <option value="Swimming">Swimming</option>
                                    <option value="Tennis">Tennis</option>
                                    <option value="Art">Art</option>
                                </Select>  
                                </Box>

                    </Flex>
                        
                        <Flex direction="column">
                             <Heading>Address</Heading>
                             <Textarea type="text" name="address" placeholder="Address" value={editedProfile.address} onChange={onChangeEdited} />
                        </Flex>
                        <Box>
                        <Heading>Birthday</Heading>
                        <Flex direction="row">
                        <Input type="number" name="day" placeholder="Day" value={editedBirthday.day} onChange={onChangeEditedBirthday} />
                        <Input type="number" name="month" placeholder="Month" value={editedBirthday.month} onChange={onChangeEditedBirthday} />
                        <Input type="number" name="year" placeholder="Year" value={editedBirthday.year} onChange={onChangeEditedBirthday} />
                        </Flex>
                        </Box>
                        <br />
                        <Button type="submit" marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdSave} />
                                <Text>Save Changes</Text>
                        </Button>
                        <Button onClick={() => setEditMode(false)} marginRight='6px'>
                                <Icon color="#C62828" w={8} h={8} as={MdKeyboardReturn} />
                                <Text>Return</Text>
                        </Button>
                        </form>
                </Flex> 
                
                    :   
                
                            <Box marginLeft="200">
                                <Heading>{chosenProfile.fullName}</Heading>
                                <Text  fontSize="xl">
                                {chosenProfile.description}
                                </Text>
                            </Box> 
                     }
                     
                      

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

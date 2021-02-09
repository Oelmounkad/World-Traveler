import { Box, Button, Spacer,Text, Flex, Heading, Icon, Input, Select, Textarea } from '@chakra-ui/react'
import React,{useEffect,useContext,useState} from 'react'
import { MdSave } from 'react-icons/md'
import AuthContext from '../context/auth/AuthContext'

import AppContext from '../context/app/AppContext'

const AddProfile = props => {
    

    const authContext = useContext(AuthContext)
    const {user,addProfile,profile} = authContext

    const appContext = useContext(AppContext)
    const {getChosenProfile} = appContext

    const [editedProfile,setEditedProfile] = useState({hobbies:[],
    languages:[]})
    const [editedBirthday, setEditedBirthday] = useState({
        day:'',month:'',year:''
    })

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


    const onSubmit = e => {
        e.preventDefault()
        let birthDate = editedBirthday.day+"-"+editedBirthday.month+"-"+editedBirthday.year
        editedProfile.birthDate = birthDate
        addProfile(editedProfile)
        
    }

    useEffect(() => {
        if(profile !== null){
            getChosenProfile(profile.user)
            props.history.push(`/profile/${profile._id}`)
        }
    }, [props.history,profile]);


    return (
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
                                <Heading>Gender</Heading>
                                <Select name="sexe" placeholder="Select option" height='100px' width="300px" value={editedProfile.sexe} onChange={onChangeEdited}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Select>  
                                </Box>
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

                        <Flex direction="column">
                             <Heading>City</Heading>
                             <Input type="text" name="city" placeholder="City" value={editedProfile.city} onChange={onChangeEdited} />
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
                        </form>
                </Flex> 
    )
}

export default AddProfile

import React,{useState} from 'react'
import { Box,IconButton,Icon,RadioGroup,Stack,Radio,Select,Input,Heading,InputLeftElement,InputGroup, Flex, Center, useMenuState } from "@chakra-ui/react"
import {MdMyLocation, MdPermContactCalendar,MdSearch} from 'react-icons/md'
const Community = () => {

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

    return (
        <>
      
        <Box textAlign="center">
            <Heading>Search For Locals</Heading>
          </Box>
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
          </>  
        
    )
}

export default Community

import React,{useContext,useRef,useEffect,useState} from 'react'
import AppContext from '../context/app/AppContext'
import {useDisclosure,Image,Select,Center,Box,Flex,Heading,Input,InputGroup,InputLeftElement,Icon, Button, Collapse, Text} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import { MdMyLocation } from 'react-icons/md'
import Question from './Question'

const Questions = () => {

    const appContext = useContext(AppContext)
    const {getAllQuestions,addQuestion,
        questions,filteredQuestions,clearFilterQue,
            filterQueByTheme,
            filterQueByLocation} = appContext
            useEffect(() => {
               getAllQuestions()
            }, []);
            
    let hiddenInput = null
    const [fileInputState, setFileInputState] = useState('')

    const [previewSource, setPreviewSource] = useState('')

    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        if(previewSource != ''){
            setRec({...rec,picture:previewSource})
        }
    }, [previewSource]);
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
    }
    const [rec, setRec] = useState('')

    const onChangeRec = e => {
        setRec({...rec,[e.target.name]:e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            addQuestion(rec).then(() => getAllQuestions())
            setFileInputState('')
            setPreviewSource('')
            setRec({})
            onToggle()
        }
        
       
    }


    

    const textLoc = useRef('')
    const textTheme = useRef('')

    const { isOpen, onToggle } = useDisclosure()


    const onChangeLoc = e => {
        if(textLoc.current.value !== ''){
            filterQueByLocation(e.target.value)
        }
        else{
            clearFilterQue()
        }
    }

    const onChangeTheme = e => {
        if(textTheme.current.value !== ''){
            filterQueByTheme(e.target.value)
        }
        else{
            clearFilterQue()
        }
    }

    return (
        <>
        {/*/Filters */}

        <Box textAlign="center">
            <Heading>Search For Questions</Heading>
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
                    <Input type="text" placeholder="Location/City" ref={textLoc} onChange={onChangeLoc} />
                </InputGroup>

                <InputGroup>
                    <InputLeftElement
                    pointerEvents="none"
                    children={<Icon color="gray.300" />}
                    />
                    <Input type="text" placeholder="Theme" ref={textTheme} onChange={onChangeTheme} />
                </InputGroup>

            </Flex>
            </Center>
        <br />
       <Center><Button onClick={onToggle}>Add Question</Button></Center> 
        <br />

        {/* Add Question */}
        <form onSubmit={onSubmit}>
            <Center>
                <Collapse in={isOpen} animateOpacity>
                    <Box
                    p="40px"
                    color="white"
                    mt="4"
                    bg="#263238"
                    rounded="md"
                    shadow="md"
                    >
                         <Input type="text" placeholder="Description" name="description" value={rec.description} onChange={onChangeRec} />
                 <br />  <Input type="text" placeholder="City" name="city" value={rec.city} onChange={onChangeRec} />
                 <br />  <Input type="text" placeholder="Address" name="location" value={rec.location} onChange={onChangeRec} />
                 <br />  <Select placeholder="Select a theme" name="theme" value={rec.theme} onChange={onChangeRec}>
                            <option value="Food">Food</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Monuments">Monuments</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Museums">Museums</option>
                            <option value="Parks">Parks</option>
                            <option value="Beaches">Beaches</option>
                            <option value="Nature">Nature</option>
                            <option value="Amusement Parks">Amusement Parks</option>
                            <option value="Zoo">Zoo</option>
                            <option value="Lake">Lake</option>
                            <option value="Casino">Casino</option>
                            <option value="Mountain">Mountain</option>
                         </Select>

                           {/** Recommandation image add button */}
                                                                        
                                        <Input  
                                        type="file" 
                                        hidden
                                        ref={el => hiddenInput = el}
                                        id="fileInput"
                                        class="form-control-file" 
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                        />
                                        {/** Recommandation image load button */}
                                        
                                         <Center>
                                             <Button leftIcon={<AddIcon />} onClick={() => hiddenInput.click()} colorScheme="blue" variant="outline">
                                                Add Image
                                            </Button>
                                         </Center>
                                          {/** Preview of photo */}
                                    {previewSource && (
                                        <Center>
                                        <Flex direction="column">
                                        
                                             <Image
                                        src={previewSource}
                                        alt="chosen"
                                        boxSize="300px"
                                    />    
                                   </Flex></Center>
                                )}
<br />
                   <Center><Button type="submit">Ask !</Button></Center>     
                    
                    </Box>
                </Collapse>
            </Center></form>

             {/* Question list */}
        
        {questions !== null ? (
            <Center>

            
        <Box minH="60vh" mb="5" w="800px">
          {filteredQuestions !== null
            ? filteredQuestions.map(fque => (

                  <Question que={fque} />
                
              ))
            : questions.map(que => (
                
                  <Question que={que} />
                
              ))}
        </Box>
        </Center>
      ):<p>loading...</p>}

        </>
    )
}

export default Questions

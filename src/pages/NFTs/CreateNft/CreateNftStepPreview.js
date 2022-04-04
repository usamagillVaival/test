import React from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    Badge,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Image,
    Select,
    Divider,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Link,
    Stack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormLabel,
    Textarea,
    RadioGroup, Radio, Container,
} from "@chakra-ui/react";
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react"

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import Preview from "../../../assets/images/image1.png";
import PreviewImg from "../../../assets/images/image2.png";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"


function CreateNftStepPreview(props) {
    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
   console.log(mintsteps)
   function handleExit()
   {
    dispatch(setMintSteps(0))
   }
   function handleNext()
   {
    dispatch(setMintSteps(mintsteps+1))
   }
    return (

        <>
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'} display={'flex'} flexDirection={'column'}>
                <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" textAlign={'center'} my={'auto'}  mb={4} colorScheme="green">
                    Step 2
                </Badge>
                <BioRymHeading textAlign={'center'} >Upload media</BioRymHeading>
                <Text fontSize={'19px'} textAlign={'center'} mt={2} mb={10} fontWeight={'400'} color={'#1a1a1a'}>Add your media file. You can add more files later.</Text>

                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'}>
                    <Box border={'2px dashed #ADADAD'} width={'100%'} minH={'300px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Box width={'70%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Image src={PreviewImg} mb={'1rem'} mt={'1rem'} />
                            <Divider/>
                            <Flex mt={'1rem'}  w={'100%'}>

                                <Box mr={'auto'}>
                                    <Heading fontSize={'16px'} color={'#1a1a1a'} fontWeight={'600'} mb={'0.25rem'}> EmptyDiamonds.jpg</Heading>
                                    <Text fontSize={'16px'} color={'#4D4D4D'} fontWeight={'400'} mb={'1rem'}>31 MB</Text>
                                </Box>

                                <Box >
                                    <svg width="000" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V26C32 29.3137 29.3137 32 26 32H6C2.68629 32 0 29.3137 0 26V6Z" fill="#DBDBDB"/>
                                        <path d="M19.333 11.9997H22.6663V13.333H21.333V21.9997C21.333 22.1765 21.2628 22.3461 21.1377 22.4711C21.0127 22.5961 20.8432 22.6663 20.6663 22.6663H11.333C11.1562 22.6663 10.9866 22.5961 10.8616 22.4711C10.7366 22.3461 10.6663 22.1765 10.6663 21.9997V13.333H9.33301V11.9997H12.6663V9.99967C12.6663 9.82286 12.7366 9.65329 12.8616 9.52827C12.9866 9.40325 13.1562 9.33301 13.333 9.33301H18.6663C18.8432 9.33301 19.0127 9.40325 19.1377 9.52827C19.2628 9.65329 19.333 9.82286 19.333 9.99967V11.9997ZM13.9997 15.333V19.333H15.333V15.333H13.9997ZM16.6663 15.333V19.333H17.9997V15.333H16.6663ZM13.9997 10.6663V11.9997H17.9997V10.6663H13.9997Z" fill="#4D4D4D"/>
                                    </svg>
                                </Box>

                            </Flex>
                        </Box>
                    </Box>

                </Grid>

            </Box>
            <Divider/>
                                    <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                        <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                            <Button mb={3}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' onClick={handleExit} >Save & exit</Button>
                                            <Button mb={3} bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  rightIcon={<ArrowForwardIcon />} marginLeft={{base:'0rem', sm:"1rem" ,md:'1rem'}} onClick={handleNext} >Continue</Button>
                                        </Box>
                                    </Grid>
        </>

    );
}

export default CreateNftStepPreview;

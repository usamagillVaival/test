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
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../../redux/action/tradingBot"
import CryptoJS from "crypto-js";
import { useToast } from '@chakra-ui/react'
import server from "../../../../apis/server";


function NFTReview(props) {
    const toast=useToast()

    const state = useSelector(state => state);
    const {mintsteps,accountInfo, nftupload,nftdetails}  =   state?.TradingBot
    const {title,year,description,edition,price,tags}=nftdetails
    const {id,file}=nftupload

    const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject"):"";
  const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
  const userID=userType?._id

    const dispatch = useDispatch();
    console.log(mintsteps)
    const handleNext =async() => {
        dispatch(setMintSteps(mintsteps+1))
        let dataa ={
            title: title,
            year: year,
          description:description,
            edition: edition,
            price: edition,
            tags: tags,
            file: file
  
        } 
        // console.log(dataa)
  
  
        console.log(userID)
        console.log(id)
        // http://localhost:8001/api/users/artist_profile/${USERID}/${ARTID}
           const {data} = await server.put(
               `/users/artist_profile/${userID}/${id}`,
                          dataa
              ,
               { 
                 headers: {
                   "Content-Type": "application/json",
                 },
               } 
             )
          if (data)
          {
            dispatch(setMintSteps(0))
            toast({
              title: 'Success',
              description: `${data.message}`,
              status: 'success',
              duration: 4000,
              isClosable: true,
                position:'top-right', variant:'top-accent',
            })
          }
    };
    const handleBack =async() => {
        dispatch(setMintSteps(mintsteps-1))
    };

    return (
        <>
            <Box width={'100%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'} display={'flex'} flexDirection={'column'}>
                <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" textAlign={'center'} my={'auto'}  mb={4} colorScheme="green">
                    Step 2
                </Badge>
    

                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'1rem'}>
                    <Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Flex    pt={'3rem'} m={'auto'} width={{base:'85%',md:'75%',lg:'60%'}}>
                                    <Box width={{base:'80%',md:'70%'}} pr={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Box p={10} bg={'#C4C4C422'} minH={'600px'}>
                                            <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${file}`} width={'100%'}  />
                                            <Grid templateColumns={{base: "repeat(1, 1fr)",md: "repeat(2, 1fr)"}} gap={6}  pt={'3rem'}>
                                                <Box>
                                                    <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                                    <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >{description},    {year}, Ed. 1/1</Heading>
                                                </Box>
                                                <Box>
                                                    <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ {price}</Text>
                                                </Box>

                                            </Grid>



                                        </Box>

                                    </Box>
                                    <Box width={{base:'20%',md:'30%'}} pl={2} d={'flex'}>
                                        <Button mx={'auto'} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} >Edit</Button>

                                    </Box>
                                </Flex>

                            </Box>


                        </Box>

                    </Box>

                </Grid>

            </Box>
            <Divider/>
                                    <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                        <Box display='flex' mb={'3'}>
                                            <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}  marginLeft='auto'  leftIcon={<ArrowBackIcon />} onClick={handleBack} >Back</Button>
                                            <Button bg='#0048FF' color='#fff' _focus={{ bg: "#0048FF", }}  _hover={{ bg: "#0048FF", }} _active={{ bg: "#0048FF", }} rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={handleNext}  >Continue</Button>
                                        </Box>
                                    </Grid>



        </>

    );
}

export default NFTReview;

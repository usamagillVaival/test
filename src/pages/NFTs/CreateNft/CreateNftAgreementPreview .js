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
import {   useDispatch, useSelector} from 'react-redux'

import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import {setMintSteps, artistagreement} from "../../../redux/action/tradingBot"
import { setArtistAggrement } from "../../../redux/action/tradingBot";


function CreateNftAgreementPreview(props) {
    const state = useSelector(state => state);
    const {mintsteps,artistagreement,nftdetails,nftupload}  =   state?.TradingBot
    const {scope,time,rights,compensation,termination,aggreement}=artistagreement
    const {title,year,description,edition,price,tags}=nftdetails
    const {id,file}=nftupload

    const dispatch = useDispatch();




    return (
        <>
            <Box display='flex' flexDirection='column' mb={6} >
                <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em"  mb={4} colorScheme="green">
                    Step 3
                </Badge>
                <BioRymHeading   textAlign={'center'} >Artist agreement</BioRymHeading>
                <Text mt={4} textAlign='center' fontSize='1rem' mb='1rem' fontWeight={'400'}  color='#1A1A1A'>
                    Prepare details for artist’s approval.
                </Text>
            </Box>

            <Flex   pt={'3rem'}  pb={'3rem'} m={'auto'} width={'100%'} flexWrap={'wrap'}>
                <Box width={{base:'100%' ,md:'30%',lg:'25%'}} pr={4}  display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box p={{base:10,md:6,lg:5,xl:10}} bg={'#C4C4C422'} mr={1} >
                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${file}`} width={'100%'}  />
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}  pt={'3rem'}>
                            <Box>
                                <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >{title},    {year}, Ed. 1/1</Heading>
                            </Box>
                            <Box>
                                <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ {price}</Text>
                            </Box>

                        </Grid>



                    </Box>

                </Box>
               <Box  width={{base:'100%' ,md:'69%',lg:'73%'}} ml={'auto'}>
                   <Box ml={1}>
                       <Text mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>This agreement, entered mm/dd/yyyy between Artist and Gallery.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Scope of work</FormLabel>

                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                           <Text mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>{scope} </Text>
                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Time schedule</FormLabel>

                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                           <Text mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>{time} </Text>

                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Rights</FormLabel>

                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                           <Text  mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>{rights} </Text>
                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Compensation</FormLabel>
                       </Box>
                       <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                           <Text  mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>{compensation}</Text>
                       </Box>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Termination</FormLabel>
                       </Box>
                       <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'}>
                           <Text  mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>{termination} </Text>
                       </Box>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Agreement</FormLabel>
                       </Box>
                       <Box display='flex'  alignItems='center' justifyContent='center' mb={6}>
                         <Text mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}    >{aggreement}</Text>
                       </Box>

                   </Box>


               </Box>
            </Flex>







        </>

    );
}

export default CreateNftAgreementPreview;

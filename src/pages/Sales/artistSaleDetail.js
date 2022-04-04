import React,{useEffect, useState} from "react";
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
    Link,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    
    Stack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Spinner,
    Avatar,
    Container,
    FormControl,
    Checkbox, Square,
    HStack, VStack, useColorModeValue,StackProps,useId,
    useRadio,
    UseRadioProps,
} from "@chakra-ui/react";


import { navigate, Redirect, redirectTo} from '@reach/router';
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard
} from '../../assets/StyledComponent/styeledComponent';
import cardImge from "../../assets/images/cardimg.png";
import Dummy2 from "../../assets/images/dummy2.png";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../redux/action/tradingBot"
import { setNFTMedium } from "../../redux/action/tradingBot";
import {ArtistInvite} from "../index";
import PreviewImg from "../../assets/images/image2.png";
import CryptoJS from 'crypto-js';
import server from "../../apis/server"
import { NFTCARD } from "../../components/index";
import { FaChevronRight } from "react-icons/fa";
import { IoMdNavigate } from "react-icons/io";
import moment from 'moment'
import Web3 from 'web3';
import Web3Modal from "web3modal";
import DV from "../../abis/DadaVault.json";
import { useToast } from '@chakra-ui/react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Pdf from "react-to-pdf";
import Doc from './DocService';
import GALLERY from "../../abis/Gallery.json";
import WETH from "../../abis/weth.json";

const scanLink = process.env.REACT_APP_SCAN_LINK;
const chain = process.env.REACT_APP_CHAIN_ID
const network = process.env.REACT_APP_NETWORK
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;
const InfuraId = process.env.REACT_APP_INFURA_ID;
const WETHaddress = process.env.REACT_APP_WETH_ADDRESS;
const dadaVaultFee = process.env.REACT_APP_DV_FEE;

function SalesDetail(props) {

    const options = { 
        orientation: 'landscape',
        unit: 'in',
        format: [4,2]
    };
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
    const userId=userType?._id
    const gallery_owner = userType?.gallery_matamask_puplic_key

    const [offer,setOffer]=useState();
    const [loader,setLoader]=useState(true);

    const bodyRef = React.createRef();
    const createPdf = () =>  createPdff(bodyRef.current);
   const createPdff = (html) => Doc.createPdf(html,);
    const ref = React.createRef();
    const toast=useToast()
    const infuraId=InfuraId
     const providerOptions = { 
         walletconnect: {
           package: WalletConnectProvider, // required
           options: {
             infuraId: infuraId, // required
           },
         },
       }
       const offerId = props?.location?.state?.offerId;
    console.log(offerId);

    useEffect(async () => {
        setLoader(true);
        await loadOfferDetails();
        setLoader(false);
    },[]);

    const loadOfferDetails= async() => {
        let data = {
            userId:offerId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/sale/getSaleById",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
               console.log(r.data.data)
            setOffer(r.data.data);
            // setSpinner(false)
           }).catch(e=>console.log(e))
    } 

    if(loader)
    {
      return (
        <Box height='100vh' display='flex'>
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#0C0B86'
        size='xl'
        margin='auto'
    
        /></Box>
      )
    }

    return (
        <>
            <Box  
            ref={bodyRef}
            height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} py={15} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'34px'}>
                        <Box mr={'auto'} my={'auto'} flex="1" display={'flex'} alignItems={'center'}>
                        <Heading color={'#8F8F8F'} fontWeight="400" fontSize="14px" cursor={'pointer'} onClick={()=>navigate("/ArtistSales")}>
                            Sales </Heading> 
                            <Text px={2} >  <FaChevronRight color={'#8F8F8F'}  fontSize={'14px'} /></Text>
                             <Text color={'#4D4C4C'} pl={2} fontWeight="400" fontSize="14px">{offer?.artist_artwork?.title} </Text>
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} flexWrap={'wrap'}>
                        {/*<Box maxW={'128px'} maxH={'128px'}>*/}
                        {/*    <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'} src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.artist_artwork?.file}`} pr={5}/>*/}
                        {/*</Box>*/}
                        <Box maxW={'128px'} maxH={'128px'} height={'128px'} width={'128px'} mr={5} mb={2}>
                            <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'} src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.artist_artwork?.file}`} />
                        </Box>

                        <Box pl={{base:0,sm:5}} mb={2}>
                            <Heading color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} mb={6} >{offer?.artist_artwork.title}</Heading>
                            <Flex flexWrap={'wrap'}>
                                <Box pr={3} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >GALLERY</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.gallery?.name}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >SALE PRICE</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>  {offer?.purchase_option=="buy" ? offer?.sale_price : offer?.offered_price} ETH</Text>
                                </Box>
                                
                                {offer?.sale_status=="completed"||offer?.offered_status==1?
                                <Box px={{base:0,sm:4}} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >ARTIST REVENUE</Text>
                                    {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((offer?.artist_artwork?.revenueSplit*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(((offer?.artist_artwork?.revenueSplit)*offer?.offered_price)/100).toFixed(6)} ETH</Text>
                                    }
                                </Box>:null
                                }
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box  px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
              
                    {offer?.sale_status=="completed"||offer?.offered_status==1?
                    <>
                    <Flex ref={ref}  flexWrap={'wrap'} mb={{base:4,sm:4 ,md:0}}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Sale information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               This NFT was sold on {moment(offer?.artist_artwork?.sold_date).format('MMMM D, YYYY')}
                           </Text>
                       </Box>
                       <Box  width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns="repeat(3, 1fr)" mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Sale price
                                   </Text>
                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'} mb={2}>
                                       {offer?.sale_price} ETH
                                   </Text>
                               </Box>
                              
                               <Box>

                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                   Collector
                                   </Text>

                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'}  lineHeight={'20px'} mb={2}>
                                       {offer?.collector?.name}
                                   </Text>
                               </Box>

                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Sale transaction
                                   </Text>
                                   <Link  isExternal href={`${scanLink}tx/${offer?.artist_artwork?.buying_hash}`}   color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       View on Etherscan
                                   </Link>
                               </Box>

                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/>
                   
                    <Flex  flexWrap={'wrap'} mb={{base:4,sm:4 ,md:0}}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Revenue split information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               you received {offer?.artist_artwork?.revenueSplit}% of the sale price
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:'repeat(1, 1fr)' , sm:'repeat(2, 1fr)', md:'repeat(3, 1fr)'}} mx={'auto'} gap={6}  >
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       You received
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((offer?.artist_artwork?.revenueSplit*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((offer?.artist_artwork?.revenueSplit)*offer?.offered_price)/100}</Text>
                                    }
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Gallery received 
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.offered_price)/100}</Text>
                                    }
                                   </Text>
                               </Box>
                               
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Your transaction
                                   </Text>
                                   <Link  isExternal href={`${scanLink}tx/${offer?.artist_artwork?.buying_hash}`}   color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       View on Etherscan
                                   </Link>
                               </Box>

                           </Grid>
                      
                       </Box>
                   </Flex>
                    <Divider/></>:null}
                 
                </Box>
            </Box>
        </>
    );
}

export default SalesDetail;

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
    Avatar,
    Container,
    FormControl,
    Checkbox, Square,
    HStack, VStack, useColorModeValue,StackProps,useId,
    useRadio,
    Spinner,
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
import { LoadingScreen } from "../../components/index";



function ArtistDetailNew(props) {



    

    const [saleCount,setSaleCount]=useState(0)







    const artistDetail=props?.location?.state?.artist
    
    



    useEffect(() => {
        getTotalSale()
          },[]);

          async function getTotalSale()
          {
          try{   
             const {data} = await server.post(
                 "/nft/TotalSalesByArtist",
               
                  {userId:props?.location?.state?.artist},
                 { 
                   headers: {
                     "Content-Type": "application/json",
                   },
                 } 
               )
               
              
               if(data)
               {

             setSaleCount(data?.saleCount)
               }
             }
         
          
             catch(e)
             {
                
                 setLoader(false)
             }
          }
    const state = useSelector(state => state);
    const options = ['1', '2', '3', '4', '5', '6', '7']
    const { getInputProps, getCheckboxProps, getLabelProps } = useRadio()
    const id = useId()
    
    const [nftDraftList, setNftDraftList] = useState([]);
    const dispatch = useDispatch();
    let {mintsteps,accountInfo,nftmedium}  =   state?.TradingBot
    // let draftState = props.location.state.draftState
    // if(draftState)
    // {
    //     dispatch(setMintSteps(3))
    // }


    
    useEffect(() => {
        dispatch(setMintSteps(0))
         },[]);

    useEffect(() => {
         
        loadDraftList();
        
      }, [mintsteps]);
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
    const exit =async() => {
        dispatch(setMintSteps(0))
    };
    const back =async() => {
        dispatch(setMintSteps(mintsteps-1))
    };
    const xyz =async() => {
        dispatch(setMintSteps(1))
    };

    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose: onInviteArtistClose } = useDisclosure();
    const { isOpen: isPreviewArtistOpen , onOpen: onPreviewArtistOpen, onClose: onPreviewArtistClose } = useDisclosure();
    const finalRef = React.useRef();
    const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
  const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
  const [loader,setLoader]=useState(false);
  const userID=userType?._id
    const loadDraftList = async () => {
        setLoader(true)
        const { data } = await server.get(`/users/artist_profile/draft/${userID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
         setNftDraftList(data?.data?.artist_artwork)
         setLoader(false)

      };
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
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} py={15} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'34px'}>
                        <Box mr={'auto'} my={'auto'} flex="1" display={'flex'} mb={{base:2,md:0}} alignItems={'center'}>
                        <Heading color={'#8F8F8F'} fontWeight="400" fontSize="14px" cursor={'pointer'} lineHeight={'20px'} onClick={() => {navigate("/Artists")}}>
                            Artists </Heading>
                            <Text mx={'13px'} >
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.78132 4.99999L0.481323 1.69999L1.42399 0.757324L5.66666 4.99999L1.42399 9.24266L0.481323 8.29999L3.78132 4.99999Z" fill="#8F8F8F"/>
                                </svg>
                            </Text>
                             <Text color={'#4D4C4C'}  fontWeight="400" fontSize="14px" lineHeight={'20px'}>{artistDetail?.name?artistDetail?.name:"Unspecified name"}</Text>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center" mb={{base:2,md:0}}>
                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                 onClick={()=>{
                                        navigate(`/Artists`, { state: {  invitee:true,  } })
                                       }}
                                >
                                   + Invite artist
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} flexWrap={'wrap'}>
                        <Box maxW={'128px'} maxH={'128px'} height={'128px'} width={'128px'} mr={5} mb={{base:2,md:0}}>
                            <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'} src={`http://51.222.241.160:8001/api/users/artist_profile/${artistDetail?.artist_head_shot}`} />
                        </Box>

                        <Box pl={5}>
                            <Heading color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} mb={6} > {artistDetail?.name?artistDetail?.name:"Unspecified name"}</Heading>
                            <Flex flexWrap={'wrap'} juju8>
                                <Box pr={3} minW={'134px'} mb={{base:2,md:0}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >DEMOGRAPHICS</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{artistDetail?.artist_nationality}, {artistDetail?.artist_year_of_birth}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}}  minW={'134px'} mb={{base:2,md:0}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >TOTAL SALES</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{artistDetail?.artist_artwork?.filter((status=>status.status==4 || status.status==5 || status.status==6)).length}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}}  minW={'134px'} mb={{base:2,md:0}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >TOTAL REVENUE</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{saleCount} ETH</Text>
                                </Box>

                            </Flex>
                        </Box>

                    </Flex>
                </Box>
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                   <Flex flexWrap={'wrap'}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                               Biography
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               Updated by the artist
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
                           <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                               {artistDetail?.artist_biography}
                           </Text>
                       </Box>


                   </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Links
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               Updated by the artist
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
                           <Grid marginTop='1rem' templateColumns="repeat(2, 1fr)" mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Personal website
                                   </Text>
                                   <Link  color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       
                                       {artistDetail?.artist_website?
                                     <>
                                      {artistDetail?.artist_website}  <ExternalLinkIcon mx='2px' />
                                      </>
                                      :
                                      "Unspecified"
                                     }
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Artsy profile
                                   </Text>
                                   <Link   color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                     
                                       {artistDetail?.artist_artsy_profile?
                                     <>
                                      {artistDetail?.artist_artsy_profile}  <ExternalLinkIcon mx='2px' />
                                      </>
                                      :
                                      "Unspecified"
                                     }
                                   </Link>
                               </Box>
                               <Box>
                               
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Twitter
                                   </Text>
                                   
                                   <Link  href={'https://www.twitter.com/' + artistDetail?.artist_twitter} isExternal color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                    
                                   {artistDetail?.artist_twitter?
                                     <>
                                      {artistDetail?.artist_twitter}  <ExternalLinkIcon mx='2px' />
                                      </>
                                      :
                                      "Unspecified"
                                     }
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Instagram
                                   </Text>
                                   <Link href={'https://www.instagram.com/' + artistDetail?.artist_instagram} color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                     {artistDetail?.artist_instagram?
                                     <>
                                     
                                      {artistDetail?.artist_instagram}  <ExternalLinkIcon mx='2px' />
                                      </>
                                      :
                                      "Unspecified"
                                     }
                                   </Link>
                               </Box>
                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               NFTs
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               All NFTs that your gallery has minted with this artist. You will not see any NFTs the artist has minted with other galleries.
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
                           <Box>
                           {!artistDetail?.artist_artwork?.filter(status=>(status.status==4 || status.status==5 || status.status==6)).length?
                               <Text>No artworks between gallery and artist  minted yet</Text>
                               :
                               <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>

                               {artistDetail?.artist_artwork?.filter((status=>status.status==4 || status.status==5 || status.status==6)).map((artist) =>
                               {
                                return(
                                    <>
                                   <Card   cursor={'pointer'} border={'none'} boxShadow={'none'} p={'0px'} alignItems={'flex-start'}  onClick={() => (navigate(`/NFTsDetailNew/${artist._id}`))}>
                                       <Box height={'266px'} maxH={'266px'} display={'flex'} alignItems={'center'} justifyContent={'center'} mb={'1.5rem'} bg={'#E6E6E6'} width={'100%'} border={'1px solid #E6E6E6'}>
                                           <Image  src={`http://51.222.241.160:8001/api/users/artist_profile/${artist?.file}`} maxW={'100%'} maxH={'266px'} objectFit={'cover'} height={'100%'}  w={'100%'}/>
                                       </Box>
                                       {/*<Image src={`http://51.222.241.160:8001/api/users/artist_profile/${artist?.file}`}  maxW={'100%'} maxH={'100%'} objectFit={'contain'}  w={'100%'}/>*/}
                                       <Text color={'#636262'} fontSize={'12px'} fontWeight={'400'} textAlign={'left'}  lineHeight={'28px'}>
                                          { artist?.title}
                                       </Text>
                                       <Text  color={'#363535'} fontSize={'14px'} fontWeight={'500'} textAlign={'left'}  lineHeight={'28px'}>
                                           {artist?.price} ETH
                                       </Text>
                                       <Text  color={'#797979'} fontSize={'14px'} fontWeight={'400'} textAlign={'left'}   lineHeight={'28px'}>
                                           <Icon width="12px" height="13px" mr={1} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M6 1.5C5.0111 1.5 4.0444 1.79324 3.22215 2.34265C2.3999 2.89206 1.75904 3.67295 1.3806 4.58658C1.00217 5.50021 0.90315 6.50555 1.09608 7.47545C1.289 8.44536 1.76521 9.33627 2.46447 10.0355C3.16373 10.7348 4.05465 11.211 5.02455 11.4039C5.99446 11.5969 6.99979 11.4978 7.91342 11.1194C8.82705 10.741 9.60794 10.1001 10.1573 9.27785C10.7068 8.45561 11 7.48891 11 6.5C10.9985 5.17439 10.4712 3.90352 9.53383 2.96617C8.59648 2.02882 7.32561 1.50154 6 1.5V1.5ZM8.88625 4.91667L6.03417 8.78708C6.0005 8.83176 5.95826 8.86928 5.90993 8.89745C5.8616 8.92563 5.80814 8.9439 5.75268 8.95119C5.69721 8.95848 5.64085 8.95465 5.58688 8.93993C5.53291 8.9252 5.48241 8.89987 5.43833 8.86542L3.40167 7.23708C3.35893 7.20288 3.32335 7.1606 3.29696 7.11266C3.27057 7.06471 3.25387 7.01203 3.24784 6.95763C3.23565 6.84776 3.2676 6.73756 3.33667 6.65125C3.40574 6.56494 3.50626 6.50961 3.61612 6.49742C3.72599 6.48523 3.8362 6.51718 3.9225 6.58625L5.62083 7.945L8.21542 4.42375C8.24665 4.37688 8.28707 4.33683 8.33422 4.30601C8.38137 4.2752 8.43428 4.25427 8.48975 4.24448C8.54522 4.2347 8.6021 4.23626 8.65694 4.24907C8.71179 4.26189 8.76348 4.28569 8.80887 4.31904C8.85426 4.35239 8.89241 4.3946 8.92103 4.44312C8.94965 4.49163 8.96813 4.54544 8.97536 4.6013C8.9826 4.65716 8.97843 4.71391 8.96311 4.76811C8.9478 4.82232 8.92165 4.87285 8.88625 4.91667Z" fill="#CA9C00"/>
                                           </Icon>
                                           Certified authentic
                                       </Text>
                                   </Card>
                                   </>
                                )  }
                               )}
                               </Grid>
}
                           </Box>
                       </Box>
                   </Flex>
                </Box>
            </Box>
         

        </>

    );
}

export default ArtistDetailNew;

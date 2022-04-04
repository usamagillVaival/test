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
    HStack, VStack, useColorModeValue, StackProps, useId,
    useRadio,
    UseRadioProps, Alert, AlertIcon, Textarea, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, SelectField,
} from "@chakra-ui/react";
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import CreateNFTStep1 from "./CreateNft/CreateNftStep1";
import CreateNFTStep2 from "./CreateNft/CreateNftStep2";
import CreateNFTStep3 from "./CreateNft/CreateNftStep3";
import CreateNFTStep4 from "./CreateNft/CreateNftStep4";
import CreateNftAgreementPreview from "./CreateNft/CreateNftAgreementPreview ";
import CreateNftAgreement from './CreateNft/CreateNftAgreement';
import CreateNftSendAgreement from "./CreateNft/CreateNftSendAgreement";
import ReviewNft from "./CreateNft/ReviewNft";
import FinalReviewNft from "./CreateNft/FinalReviewNft";
import {BioRymHeading} from '../../assets/StyledComponent/styeledComponent';
import cardImge from "../../assets/images/cardimg.png";
import Dummy from "../../assets/images/dummy.png";
import {Link as ReachLink, navigate} from "@reach/router";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../redux/action/tradingBot"
import CryptoJS from 'crypto-js';
import server from "../../apis/server"
import {LoadingScreen, NFTCARD} from "../../components/index";
import { Spinner } from '@chakra-ui/react'
function NFTs(props) {
    
    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const [allArtworksFlag,setAllArtworksFlag]=React.useState(true)
    const [loader,setLoader]=React.useState(true)
    const [draftArtworksFlag,setDraftArtWorkFlag]=React.useState(false)
    const [approvalArtworksFlag,setApprovalArtWorkFlag]=React.useState(false)
    const [nftDraftList, setNftDraftList] = useState([]);
    const [allNftList, setAllNftList] = useState([]);
    const [allCompletedNftFlag,setAllCompletedNftFlag]=useState(true)
    const [allCompletedNft,setAllCompletedNft]=useState([])
    const [mintedNftFlag,setMintedNftFlag]=useState(false)
    const [mintedNft,setMintedNft]=useState([])
    const [listedNftFlag,setListedNftFlag]=useState(false)
    const [listedNft,setListedNft]=useState([])
    const [soldNftFlag,setsoldNftFlag]=useState(false)
    const [soldNft,setSoldNft]=useState([])
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes =User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
    const userID=userType?._id
    const account_type=userType?.account_type
    const [nftApprovalList, setNftApprovalList] = useState([]);
    const [readyToMint,setReadyToMint]=useState([])
    const [readyToMintFlag,setReadyToMintFlag]=useState(false)
    const [galleryName,setGalleryName]=useState('')
    const [artistName,setArtistName]=useState('')
    const [selectedSorting,setSelectedSorting]=useState(null)
    const [assendingtitle,setAssendingTitle]=useState([])
    const [desendingtitle,setDesendingTitle]=useState([])
    const [dateCreatedAssending,setDateCreatedAssending]=useState([])
   
    const [dateModAss,setDateModAss]=useState([])
    const [priceLH,setPriceLH]=useState([])
    const [priceHL,setPriceHL]=useState([])

    
    useEffect(() => {
        dispatch(setMintSteps(0)) 
         },[]);

    useEffect(() => {
       
    loadGalleryArtworks();
    
      }, [mintsteps]);

    
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
    const exit =async() => {
        dispatch(setMintSteps(0))
    };
    
    const xyz =async() => {
        dispatch(setMintSteps(1))
    };
    const handleGrid=async() =>
    {
        alert("hello")
    }
    const handleAllArtworks=async() =>
    {
        setAllArtworksFlag(true)
        setDraftArtWorkFlag(false)
        setApprovalArtWorkFlag(false)
        setReadyToMintFlag(false)
    }
    const handleDraftArtworks=async() =>
    {
        setAllArtworksFlag(false)
        setDraftArtWorkFlag(true)
        setApprovalArtWorkFlag(false)
        setReadyToMintFlag(false)
    }
    const handleApprovalArtworks=async() =>
    {
        setAllArtworksFlag(false)
        setDraftArtWorkFlag(false)
        setApprovalArtWorkFlag(true)
        setReadyToMintFlag(false)
    }
    const handleReadyToMint=async() =>
    {
        setAllArtworksFlag(false)
        setDraftArtWorkFlag(false)
        setApprovalArtWorkFlag(false)
        setReadyToMintFlag(true)
    }
    const handleAllCompletedNfts=async() =>
    {
        
        setAllCompletedNftFlag(true)
        setMintedNftFlag(false)
        setListedNftFlag(false)
        setsoldNftFlag(false)
    }
    const handleMintedNfts=async() =>
    {
        setAllCompletedNftFlag(false)
        setMintedNftFlag(true)
        setListedNftFlag(false)
        setsoldNftFlag(false)
    }
    const handleListedNfts=async() =>
    {
        setAllCompletedNftFlag(false)
        setMintedNftFlag(false)
        setListedNftFlag(true)
        setsoldNftFlag(false)
    }
    const handleSoldNfts=async() =>
    {
        setAllCompletedNftFlag(false)
        setMintedNftFlag(false)
        setListedNftFlag(false)
        setsoldNftFlag(true)
    }




    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose:onInviteArtistClose
     } = useDisclosure();
    
    
   
    const finalRef = React.useRef();
    const loadGalleryArtworks = async () => {
      
        try
        {
        const { data } = await server.get(`/users/artist_profile/draft/${userID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data)
        {
        setGalleryName(data?.data?.name)
       setNftDraftList(data?.data?.artist_artwork.filter(status=>status.status==1))
       setNftApprovalList(data?.data?.artist_artwork.filter(status=>status.status==2))
       setReadyToMint(data?.data?.artist_artwork.filter(status=>status.status==3))
       setAllNftList(data?.data?.artist_artwork.filter(status => (status.status==1 ||status.status==2 || status.status==3)))

       setMintedNft(data?.data?.artist_artwork.filter(status=>status.status==4))
       setListedNft(data?.data?.artist_artwork.filter(status=>status.status==5))
       setSoldNft(data?.data?.artist_artwork.filter(status=>status.status==6))
       setAllCompletedNft(data?.data?.artist_artwork.filter(status => (status.status==4 ||status.status==5 || status.status==6)))
       
       

       setArtistName(data?.data?.name)
       setLoader(false)
       
           setAssendingTitle(data?.data?.artist_artwork.filter(status => (status.status==1 || status.status ==2 || status.status==3)).sort(function(f,l){
            var fname=f?.title
        var lname=l?.title
            
        if(fname?.localeCompare(lname) < 0)
        return -1;
    else if(fname?.localeCompare(lname) > 0)
        return 1;
    else if(fname?.localeCompare(lname) == 0)
        return 0;
            
           
           }))
           setDesendingTitle(data?.data?.artist_artwork.filter(status => (status.status==1 || status.status ==2 || status.status==3)).sort(function(f,l){
            var fname=f?.title
        var lname=l?.title
            
        if(fname?.localeCompare(lname) > 0)
        return -1;
    else if(fname?.localeCompare(lname) < 0)
        return 1;
    else if(fname?.localeCompare(lname) == 0)
        return 0;
            
           
           }))
           setDateCreatedAssending(data?.data?.artist_artwork.filter(status => (status.status==1 || status.status ==2 || status.status==3)).sort(function(f,l){
            var fname=new Date(f?.createdAt)
        var lname=new Date(l?.createdAt)
            
        if(fname >lname)
        return -1;
    else if(fname < lname)
        return 1;
        return 0;
            
           
           }))
          
           setDateModAss(data?.data?.artist_artwork.filter(status => (status.status==1 || status.status ==2 || status.status==3)).sort(function(f,l){
            var fname=new Date(f?.updatedAt)
        var lname=new Date(l?.updatedAt)
            
        if(fname >lname)
        return -1;
    else if(fname < lname)
        return 1;
        return 0;
            
           
           }))
           setPriceLH(data?.data?.artist_artwork.filter(status => (status.status==4 || status.status ==5 || status.status==6)).sort(function(f,l){
            var fname=f?.price
        var lname=l?.price
            
        if(fname >lname)
        return 1;
    else if(fname < lname)
        return -1;
        return 0;
            
           
           }))
           setPriceHL(data?.data?.artist_artwork.filter(status => (status.status==4 || status.status ==5 || status.status==6)).sort(function(f,l){
            var fname=f?.price
        var lname=l?.price
            
        if(fname <lname)
        return 1;
    else if(fname > lname)
        return -1;
        return 0;
            
           
           }))
           
         }
        }
        catch(e)
        {
            setLoader(false)
            
            console.log(e)
        }
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
    
        /></Box>)
      }


    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'1.5rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136px'}  >
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'}  flex="1" mb={{base:4 ,md:0}} display={'flex'} alignItems={'center'}>
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px">
                                {account_type=="gallery"?
                                <Text>{galleryName}'s NFTs</Text>
                                :
                                <Text mb={'6px'}>{artistName}'s NFTs</Text> }
                                </Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"} mb={{base:4,md:0}}>
                            <Stack spacing={3} direction="row" align="center">
                               {account_type=="gallery"?
                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  onClick={()=>{ onInviteArtistOpen();xyz();}}>
                                   + Create NFT
                                </Button>
                                :null}
                            </Stack>
                        </Box>
                    </Flex>
                  
                    <Heading mt={'48px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>
                    {account_type=="gallery"?
                      <Text>  {galleryName}'s NFTs </Text>
                      :
                      <Text>  {artistName}'s NFTs </Text>
                    }
                    </Heading>
                        
                </Box>
               
                {mintsteps===0 &&(
                            (!allNftList?.length && !allCompletedNft.length)?
                            <Box as='section'  className='Login' borderTop={'1px solid #BCBCBC'}>
                            <Flex>
                                <Container display={'flex'} flexDirection={'column'}  align='center' direction="column"  >
                                    <Box mb={'2.5rem'}  mt={'5rem'}  className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                            <FormControl>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                    <path d="M24 14C29.522 14 34 17.978 34 22.889C33.9992 24.3622 33.4136 25.7748 32.3717 26.8165C31.3299 27.8581 29.9172 28.4435 28.444 28.444H26.478C25.556 28.444 24.811 29.189 24.811 30.111C24.811 30.533 24.978 30.922 25.233 31.211C25.5 31.511 25.667 31.9 25.667 32.333C25.667 33.256 24.9 34 24 34C18.478 34 14 29.522 14 24C14 18.478 18.478 14 24 14ZM22.811 30.111C22.8106 29.6293 22.9052 29.1523 23.0893 28.7072C23.2735 28.2622 23.5436 27.8578 23.8842 27.5172C24.2248 27.1766 24.6292 26.9065 25.0742 26.7223C25.5193 26.5382 25.9963 26.4436 26.478 26.444H28.444C29.3866 26.4435 30.2905 26.0689 30.9572 25.4026C31.6239 24.7363 31.9989 23.8326 32 22.89C32 19.139 28.468 16 24 16C21.9356 15.9981 19.9503 16.7944 18.4594 18.2223C16.9684 19.6501 16.0872 21.5991 15.9999 23.6617C15.9126 25.7243 16.626 27.7408 17.991 29.2895C19.3559 30.8383 21.2668 31.7994 23.324 31.972C22.9892 31.4093 22.812 30.7668 22.811 30.112V30.111ZM19.5 24C19.1022 24 18.7206 23.842 18.4393 23.5607C18.158 23.2794 18 22.8978 18 22.5C18 22.1022 18.158 21.7206 18.4393 21.4393C18.7206 21.158 19.1022 21 19.5 21C19.8978 21 20.2794 21.158 20.5607 21.4393C20.842 21.7206 21 22.1022 21 22.5C21 22.8978 20.842 23.2794 20.5607 23.5607C20.2794 23.842 19.8978 24 19.5 24ZM28.5 24C28.1022 24 27.7206 23.842 27.4393 23.5607C27.158 23.2794 27 22.8978 27 22.5C27 22.1022 27.158 21.7206 27.4393 21.4393C27.7206 21.158 28.1022 21 28.5 21C28.8978 21 29.2794 21.158 29.5607 21.4393C29.842 21.7206 30 22.1022 30 22.5C30 22.8978 29.842 23.2794 29.5607 23.5607C29.2794 23.842 28.8978 24 28.5 24ZM24 21C23.6022 21 23.2206 20.842 22.9393 20.5607C22.658 20.2794 22.5 19.8978 22.5 19.5C22.5 19.1022 22.658 18.7206 22.9393 18.4393C23.2206 18.158 23.6022 18 24 18C24.3978 18 24.7794 18.158 25.0607 18.4393C25.342 18.7206 25.5 19.1022 25.5 19.5C25.5 19.8978 25.342 20.2794 25.0607 20.5607C24.7794 20.842 24.3978 21 24 21Z" fill="#795E00"/>
                                                </svg>
                                                <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >{account_type=="gallery"? <Text>Create your first NFT </Text>: <Text>No NFTs</Text>}</Text>
                                                <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >{account_type=="gallery"? <Text>It only takes a few minutes to draft, mint, and list NFTs with DadaVault. </Text>: <Text>Your gallery has not created any NFTs with you yet</Text>}</Text>
                                                {account_type=="gallery"?
                                                <>
                                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  onClick={xyz}>
                                                    + Create NFT
                                                </Button>
                                                 </>
                                                :null
                                                }
                                            </FormControl>
                                        </Box>
                                </Container>
                            </Flex>
                        </Box>
                        :
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }}>
                    <Tabs>
                        <TabList   >
                            <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>In Progress</Tab>
                            <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Minted</Tab>
                        </TabList>
                        <TabPanels px={{base: '2', sm:'4', md: '6', lg: '0' }}  h={'100%'} mb={10}>
                            <TabPanel p={0} color={'#000'} h={'100%'} py={8}>
                                <Box mb={'1.5rem'}>
                                    <Flex width={'100%'} display={{base:'block',lg:'flex', xl:'flex'}}>
                                       <Box display={'flex'} justifyContent={{base:'start',lg:'center', xl:'center'}} alignItems={'center'} mb={2} flexWrap={'wrap'}>
                                           <Text my={'auto'} mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}>Status</Text>
                                           <Box className="column BadgesImgBox "  mr={2} onClick={handleAllArtworks} mb={{base:2,lg:0}}>
                                                   <input type="checkbox" />
                                                    <Box className="BorderBox inner-boxd-flex p-2" bg={allArtworksFlag ? '#fff!important':'#E6E6E6'} border={allArtworksFlag ? "none!important" : '1px solid f6f6f6s!important'} boxShadow={allArtworksFlag ? '0px 5px 5px #e5e5e5':'none'}>
                                                       <Text color={allArtworksFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>All</Text>
                                                 </Box>
                                           </Box>
                                           <Box className="column BadgesImgBox"  onClick={handleDraftArtworks} mb={{base:2,lg:0}}>
                                               
                                                   <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"  />
                                                   <Box className="BorderBox inner-boxd-flex p-2" bg={draftArtworksFlag ? '#fff!important':'#4D4C4C'} border={draftArtworksFlag ? "none!important" : '1px solid f6f6f6s!important'}  boxShadow={draftArtworksFlag ? '0px 5px 5px #e5e5e5':'none'}>
                                                       {account_type=="gallery"?
                                                   <Text color={draftArtworksFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Draft</Text>
                                                   :
                                                   <Text color={draftArtworksFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Needs approval</Text>
                }
                                                   </Box>
                                           </Box>
                                           <Box className="column BadgesImgBox" onClick={handleApprovalArtworks} mb={{base:2,lg:0}}>
                                               
                                                   <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"/>
                                                   <Box className="BorderBox inner-boxd-flex p-2"  boxShadow={approvalArtworksFlag ? '0px 5px 5px #e5e5e5':'none'} bg={approvalArtworksFlag ? '#fff!important':'#E6E6E6'} border={approvalArtworksFlag ? "none!important" : '1px solid f6f6f6s!important'}>
                                                       {account_type=="gallery"?
                                                   <Text color={approvalArtworksFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Approval</Text>
                                                   :
                                                   <Text color={approvalArtworksFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Approved</Text>
            }
                                                   </Box>
                                           </Box>
                                           {account_type=="gallery"?
                                           <Box className="column BadgesImgBox" onClick={handleReadyToMint} mb={{base:2,lg:0}}>
                                               
                                                   <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"/>
                                                   <Box className="BorderBox inner-boxd-flex p-2"  boxShadow={readyToMintFlag ? '0px 5px 5px #e5e5e5':'none'} bg={readyToMintFlag ? '#fff!important':'#E6E6E6'} border={readyToMintFlag ? "none!important" : '1px solid f6f6f6s!important'}>
                                                   <Text color={readyToMintFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Ready to mint</Text>
                                                   </Box>
                                           </Box>
                                           :null}
                                       </Box>
                                        <Box ml={'auto'} display={'flex'} alignItems={'center'} mb={2}>
                                            <Text color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} pr={4}>Sort</Text>
                                             
                                            <Select placeholder="Z-A" width={'fit-content'} borderRadius={'0px'} borderColor={'#D2D2D2'} color={'#636262'} fontWeight={'500'} fontSize={'15px'}
                                            value={selectedSorting}
                                            onChange={(e)=>{
                                                 
                                                setSelectedSorting(e.target.value)
                                            }}
                                                    _focus={{border:'1px solid #0F0EA7'}}
                                           >  <option value="assendingtitle"> Title (A-Z)</option>
                                                <option value="decendingtitle"> Title (Z-A)</option>
                                                <option value="datacreatedassending"> date created(newest to oldest)</option>
                                                <option value="datacreateddescending"> date created(oldest to newest)</option>
                                                <option value="datamodass"> date modified(newest to oldest)</option>
                                                <option value="datamoddes"> date modified(oldest to newest)</option>
                                            </Select>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Grid  p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(4, 1fr)" }} gap={6}  position={'relative'}>

                                {
                           draftArtworksFlag?
                           <>
                           {account_type=="gallery"?
                           !nftDraftList?.length?
                               <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                   <Flex width={'100%'}>

                                       <Container display={'flex'} flexDirection={'column'}
                                                  align='center' justifyContent='center'
                                                  direction="column" >
                                           <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                bg='#E5E5E5' borderRadius='0px'
                                                boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                               <FormControl>
                                                   <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                       <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                       <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                       <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                   </svg>

                                                   <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                         textAlign={'center'} color={'#363535'}>No NFTs in drafts</Text>
                                                   <Text fontWeight={'400'} mb={'1.5rem'}
                                                         fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                         color={'#8F8F8F'}>You have no NFTs in drafts.</Text>
                                               </FormControl>


                                           </Box>

                                       </Container>


                                   </Flex>
                               </Box>
                               :selectedSorting=="assendingtitle"?
                           assendingtitle?.filter(status => status.status==1).map((val)=>{
                            return (
                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           :selectedSorting=="decendingtitle"?
                           desendingtitle?.filter(status => status.status==1).map((val)=>{
                            return (
                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           :selectedSorting=="datacreatedassending"?
                           dateCreatedAssending?.filter(status => status.status==1).map((val)=>{
                            return (
                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           :selectedSorting=="datamodass"?
                           dateModAss?.filter(status => status.status==1).map((val)=>{
                            return (

                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           
                           :
                           nftDraftList?.map((val)=>{
                             return (
                                 <NFTCARD nftDraftList={val} onClick={handleGrid}/>

                               )
                            })
                           :
                           !nftApprovalList?.length?
                               <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                   <Flex width={'100%'}>

                                       <Container display={'flex'} flexDirection={'column'}
                                                  align='center' justifyContent='center'
                                                  direction="column" >
                                           <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                bg='#E5E5E5' borderRadius='0px'
                                                boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                               <FormControl>
                                                   <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                       <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                       <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                       <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                   </svg>

                                                   <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                         textAlign={'center'} color={'#363535'}>No NFTs waiting for approval</Text>
                                                   <Text fontWeight={'400'} mb={'1.5rem'}
                                                         fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                         color={'#8F8F8F'}>You have no NFTs waiting for artist approval.</Text>
                                               </FormControl>


                                           </Box>

                                       </Container>


                                   </Flex>
                               </Box>


                               :selectedSorting=="assendingtitle"?
                           assendingtitle?.filter(status => status.status==2).map((val)=>{
                            return (

                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>

                              )
                           }) 
                           :selectedSorting=="decendingtitle"?
                           desendingtitle?.filter(status => status.status==2).map((val)=>{
                            return (

                                <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           }) 
                           :selectedSorting=="datacreatedassending"?
                           dateCreatedAssending?.filter(status => status.status==2).map((val)=>{
                            return (

                          <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           :selectedSorting=="datamodass"?
                           dateModAss?.filter(status => status.status==2).map((val)=>{
                            return (
                          <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                              )
                           })
                           : 
                           nftApprovalList?.map((val)=>{

                             return (

                           <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                               )
                            })
                           
                            }
                            </>
                            : 



                            allArtworksFlag?
                            <>
                            {
                            !allNftList?.length?
                                <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                    <Flex width={'100%'}>

                                        <Container display={'flex'} flexDirection={'column'}
                                                   align='center' justifyContent='center'
                                                   direction="column" >
                                            <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                 bg='#E5E5E5' borderRadius='0px'
                                                 boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                <FormControl>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                        <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                    </svg>

                                                    <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                          textAlign={'center'} color={'#363535'}>No NFTs in progress</Text>
                                                    <Text fontWeight={'400'} mb={'1.5rem'}
                                                          fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                          color={'#8F8F8F'}>You have no NFTs in progress.</Text>
                                                </FormControl>


                                            </Box>

                                        </Container>


                                    </Flex>
                                </Box>
                                :
                            selectedSorting==="assendingtitle"?    
                            assendingtitle?.filter(status => (status.status==1 || status.status==2 || status.status==3)).map((val)=>{
                                return (
                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :selectedSorting==="decendingtitle"?    
                               desendingtitle?.filter(status => (status.status==1 || status.status==2 || status.status==3)).map((val)=>{
                                   return (
                                 <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                     )
                                  })
                               :selectedSorting==="datacreatedassending"?
                               dateCreatedAssending.filter(status => (status.status==1 || status.status==2 || status.status==3)).map((val)=>{
                                return (
                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :selectedSorting==="datamodass"?
                               dateModAss.filter(status => (status.status==1 || status.status==2 || status.status==3)).map((val)=>{
                                return (
                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :
                               allNftList?.map((val)=>{
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                            }
                             </>
                             :approvalArtworksFlag?
                             <>
                             { account_type=="gallery"?

                                 !nftApprovalList?.length?
                                     <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                         <Flex width={'100%'}>

                                             <Container display={'flex'} flexDirection={'column'}
                                                        align='center' justifyContent='center'
                                                        direction="column" >
                                                 <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                      bg='#E5E5E5' borderRadius='0px'
                                                      boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                     <FormControl>
                                                         <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                             <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                             <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                             <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                             <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                         </svg>

                                                         <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                               textAlign={'center'} color={'#363535'}>No NFTs waiting for approval</Text>
                                                         <Text fontWeight={'400'} mb={'1.5rem'}
                                                               fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                               color={'#8F8F8F'}>You have no NFTs waiting for approval</Text>
                                                     </FormControl>


                                                 </Box>

                                             </Container>


                                         </Flex>
                                     </Box>

                                 : 
                                 selectedSorting=="assendingtitle"?    
                            assendingtitle?.filter(status => (status.status==2)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               : 
                                 selectedSorting=="decendingtitle"?    
                            desendingtitle?.filter(status => (status.status==2)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :selectedSorting=="datacreatedassending"?    
                               dateCreatedAssending?.filter(status => (status.status==2)).map((val)=>{
    
                                   return (

                                 <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                     )
                                  })
                                  :selectedSorting=="datamodass"?    
                               dateModAss?.filter(status => (status.status==2)).map((val)=>{
    
                                   return (

                                 <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                     )
                                  })
                                 

                                 :
                              nftApprovalList?.map((val)=>{
  
                               return (

                             <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                 )
                              })
                              :
                              !readyToMint?.length?
                                  <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                      <Flex width={'100%'}>

                                          <Container display={'flex'} flexDirection={'column'}
                                                     align='center' justifyContent='center'
                                                     direction="column" >
                                              <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                   bg='#E5E5E5' borderRadius='0px'
                                                   boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                  <FormControl>
                                                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                          <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                          <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                          <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                      </svg>

                                                      <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                            textAlign={'center'} color={'#363535'}>No NFTs for ready to mint</Text>
                                                      <Text fontWeight={'400'} mb={'1.5rem'}
                                                            fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                            color={'#8F8F8F'}>You have no NFTs for ready to mint .</Text>
                                                  </FormControl>


                                              </Box>

                                          </Container>


                                      </Flex>
                                  </Box>

                                  :
                              selectedSorting=="assendingtitle"?    
                            assendingtitle?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :
                              selectedSorting=="decendingtitle"?    
                            desendingtitle?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :
                              selectedSorting=="datecreatedassending"?    
                            dateCreatedAssending?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :selectedSorting=="datemodass"?    
                            dateModAss?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                              
                              :
                              readyToMint?.map((val)=>{
   
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })  
                            }
                              </>
                              :
                              <>
                             {
                              
                             !readyToMint?.length?
                                 <Box as='section'  position={'absolute'} className='Login' width={'100%'}>
                                     <Flex width={'100%'}>

                                         <Container display={'flex'} flexDirection={'column'}
                                                    align='center' justifyContent='center'
                                                    direction="column" >
                                             <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                  bg='#E5E5E5' borderRadius='0px'
                                                  boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                 <FormControl>
                                                     <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                         <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                         <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                         <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                     </svg>

                                                     <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                           textAlign={'center'} color={'#363535'}>No NFTs in ready to mint </Text>
                                                     <Text fontWeight={'400'} mb={'1.5rem'}
                                                           fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                           color={'#8F8F8F'}>You have no NFTs in ready to mint.</Text>
                                                 </FormControl>


                                             </Box>

                                         </Container>


                                     </Flex>
                                 </Box>

                                 :
                             selectedSorting=="assendingtitle"?    
                            assendingtitle?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :
                             selectedSorting=="decendingtitle"?    
                            desendingtitle?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :
                              selectedSorting=="datecreatedassending"?    
                            dateCreatedAssending?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               :
                              selectedSorting=="datemodass"?    
                            dateModAss?.filter(status => ( status.status==3)).map((val)=>{
 
                                return (

                              <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               }) 
                               
                             :
                             readyToMint?.map((val)=>{
  
                               return (

                             <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                 )
                              })}
                              </>
}
                            </Grid>
                        </TabPanel>
                        <TabPanel  p={0} color={'#000'} h={'100%'} py={8}>
                            <Box mb={'1.5rem'}>
                                    <Flex  width={'100%'} display={{base:'block',lg:'flex', xl:'flex'}} >
                                       <Box display={'flex'} justifyContent={{base:'start',lg:'center', xl:'center'}} alignItems={'center'} flexWrap={'wrap'} mb={2}>
                                          
                                           <Text my={'auto'} mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}>Status</Text>
                                           <Box className="column BadgesImgBox " mr={2} onClick={handleAllCompletedNfts}  mb={{base:2,lg:0}}>
                                                   <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"/>
                                                   <Box className="BorderBox inner-boxd-flex p-2" bg={allCompletedNftFlag ? '#fff!important':'#4D4C4C'} border={allCompletedNftFlag ? "none!important" : '1px solid f6f6f6s!important'}  boxShadow={allCompletedNftFlag ? '0px 5px 5px #e5e5e5':'none'}>
                                                   <Text color={allCompletedNftFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>All</Text>
                                                   </Box>
                                           </Box>
                                           <Box className="column BadgesImgBox" onClick={handleMintedNfts} mb={{base:2,lg:0}}>
                                               <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"  />
                                               <Box className="BorderBox inner-boxd-flex p-2" bg={mintedNftFlag ? '#fff!important':'#4D4C4C'} border={mintedNftFlag ? "none!important" : '1px solid f6f6f6s!important'}  boxShadow={mintedNftFlag ? '0px 5px 5px #e5e5e5':'none'} >
                                               <Text color={mintedNftFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Minted</Text>
                                               </Box>
                                           </Box>
                                           <Box className="column BadgesImgBox" onClick={handleListedNfts}  mb={{base:2,lg:0}}>
                                               <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"/>
                                               <Box className="BorderBox inner-boxd-flex p-2" bg={listedNftFlag ? '#fff!important':'#4D4C4C'} border={listedNftFlag ? "none!important" : '1px solid f6f6f6s!important'}  boxShadow={listedNftFlag ? '0px 5px 5px #e5e5e5':'none'}>
                                               <Text color={listedNftFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Listed</Text>
                                               </Box>
                                           </Box>
                                           <Box className="column BadgesImgBox" onClick={handleSoldNfts}  mb={{base:2,lg:0}}>
                                               <input type="checkbox" name="Badge-1" className="AvGamesCheckBox"/>
                                               <Box className="BorderBox inner-boxd-flex p-2" bg={soldNftFlag ? '#fff!important':'#4D4C4C'} border={soldNftFlag ? "none!important" : '1px solid f6f6f6s!important'}  boxShadow={soldNftFlag ? '0px 5px 5px #e5e5e5':'none'}>
                                               <Text color={soldNftFlag?'#0f0ea7':'#4D4C4C'} fontSize={'16px'} fontWeight={'600'}>Sold</Text>
                                           </Box>
                                           </Box>
                                       </Box>
                                        <Box ml={'auto'} display={'flex'} alignItems={'center'}  mb={2}>
                                            
                                            <Text color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} pr={4}>Sort</Text>
                                            <Select 
                                             value={selectedSorting}
                                             onChange={(e)=>{
                                                  
                                                 setSelectedSorting(e.target.value)
                                             }}
                                            placeholder="Select option"
                                            borderRadius='0px'
                                             color='#636262'
                                             width={'fit-content'}
                                             _focus={{border:'1px solid #0F0EA7'}}

                                            >
                                                {listedNftFlag || soldNftFlag || allCompletedNftFlag?
                                                <>
                                                <option value="pricelh">Price Low - High </option>
                                                <option value="pricehl">Price High - Low </option>
                                                </>
                                                :null}

                                                
                                            </Select>
                                        </Box>

                                    </Flex>
                                    </Box>
                            <Box mt={5}>
                                <Grid  p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(4, 1fr)" }} gap={6}  position={'relative'}>


                                {
                               allCompletedNftFlag?
                               !allCompletedNft.length?
                                   <Box as='section' className='Login' position={'absolute'}   width={'100%'}>
                                       <Flex width={'100%'}>
                                           <Container display={'flex'} flexDirection={'column'}
                                                      align='center' justifyContent='center'
                                                      direction="column" >
                                               <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                    bg='#E5E5E5' borderRadius='0px'
                                                    boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                   <FormControl>
                                                       <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                           <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                           <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                           <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                           <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                       </svg>
                                                       <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                             textAlign={'center'} color={'#363535'}>No NFTs in progress</Text>
                                                       <Text fontWeight={'400'} mb={'1.5rem'}
                                                             fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                             color={'#8F8F8F'}>You have no NFTs in progress.</Text>
                                                   </FormControl>
                                               </Box>
                                           </Container>
                                       </Flex>
                                   </Box>
                               :selectedSorting=="pricelh"?
                               priceLH?.filter(status => (status.status==5 || status.status==4 || status.status==6)).map((val)=>{
                                   return (
                                       <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                     )
                                  })
                                  :selectedSorting=="pricehl"?
                               priceHL?.filter(status => (status.status==5 || status.status==4 || status.status==6)).map((val)=>{
    
                                   return (
                                       <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                     )
                                  })
          :
                               <>
                               {
                               allCompletedNft?.map((val)=>{
                                 return (
                                     <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                   )
                                })}
                                </>
                            :
                            mintedNftFlag?
                            !mintedNft.length?
                                <Box as='section' position={'absolute'} className='Login' width={'100%'}>
                                    <Flex width={'100%'}>
                                        <Container display={'flex'} flexDirection={'column'}
                                                   align='center' justifyContent='center'
                                                   direction="column" >
                                            <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                 bg='#E5E5E5' borderRadius='0px'
                                                 boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                <FormControl>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                        <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                    </svg>

                                                    <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                          textAlign={'center'} color={'#363535'}>No NFTs in Minting</Text>
                                                    <Text fontWeight={'400'} mb={'1.5rem'}
                                                          fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                          color={'#8F8F8F'}>You have no NFTs in Minting.</Text>
                                                </FormControl>
                                            </Box>

                                        </Container>


                                    </Flex>
                                </Box>
                            :
                            <>
                            {

                            mintedNft?.map((val)=>{
 
                              return (

                                  <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                )
                             })}
                             </>
                            
                            :
                            listedNftFlag?
                            !listedNft.length?
                                <Box as='section' position={'absolute'} className='Login' width={'100%'}>
                                    <Flex width={'100%'}>

                                        <Container display={'flex'} flexDirection={'column'}
                                                   align='center' justifyContent='center'
                                                   direction="column" >
                                            <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                 bg='#E5E5E5' borderRadius='0px'
                                                 boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                <FormControl>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                        <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                    </svg>

                                                    <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                          textAlign={'center'} color={'#363535'}>No NFTs is listed yet</Text>
                                                    <Text fontWeight={'400'} mb={'1.5rem'}
                                                          fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                          color={'#8F8F8F'}>You have no NFTs is in listing yes.</Text>
                                                </FormControl>


                                            </Box>

                                        </Container>


                                    </Flex>
                                </Box>
                            :selectedSorting=="pricelh"?
                            priceLH?.filter(status => status.status==5).map((val)=>{
                                return (

                                    <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :selectedSorting=="pricehl"?
                            priceHL?.filter(status => status.status==5).map((val)=>{
 
                                return (


                                    <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                            :
                            <>
                            {
                            listedNft?.map((val)=>{
                              return (
                                  <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                )
                             })}
                             </>
                            :

                            !soldNft.length?
                                <Box as='section' position={'absolute'} className='Login' width={'100%'}>
                                    <Flex width={'100%'}>
                                        <Container display={'flex'} flexDirection={'column'}
                                                   align='center' justifyContent='center'
                                                   direction="column" >
                                            <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                 bg='#E5E5E5' borderRadius='0px'
                                                 boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                                                <FormControl>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                        <path d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9629 23.0909V28.5455" stroke="#636262" stroke-width="2" stroke-linecap="square"/>
                                                        <path d="M23.9628 20.3636C24.4649 20.3636 24.8719 19.9566 24.8719 19.4545C24.8719 18.9524 24.4649 18.5454 23.9628 18.5454C23.4607 18.5454 23.0537 18.9524 23.0537 19.4545C23.0537 19.9566 23.4607 20.3636 23.9628 20.3636Z" fill="#636262"/>
                                                    </svg>
                                                    <Text fontWeight={'500'} fontSize={'18px'} lineHeight={'28px'}
                                                          textAlign={'center'} color={'#363535'}>No sold NFTs</Text>
                                                    <Text fontWeight={'400'} mb={'1.5rem'}
                                                          fontSize={'14px'} textAlign={'center'} lineHeight={'20px'}
                                                          color={'#8F8F8F'}>You have not sold any NFTs.</Text>
                                                </FormControl>
                                            </Box>
                                        </Container>


                                    </Flex>
                                </Box>
                            
                            :selectedSorting=="pricelh"?
                            priceLH?.filter(status => status.status==6).map((val)=>{
                                return (

                                    <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :selectedSorting=="pricehl"?
                            priceHL?.filter(status => status.status==6).map((val)=>{
 
                                return (


                                    <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                  )
                               })
                               :
                            <>
                            {

                            soldNft?.map((val)=>{
 
                              return (


                                  <NFTCARD nftDraftList={val} onClick={handleGrid}/>
                                )
                             })}
                             </>
}
                                </Grid>

                            </Box>
                        </TabPanel>

                        </TabPanels>
                    </Tabs>
                   

                </Box>
                
                )}
                {mintsteps===1&&(
                                <Box>
                                    <CreateNFTStep1/>
                                </Box>
                                )}
                                {mintsteps===2&&(
                                <Box>
                                    <CreateNFTStep2/>


                                </Box> 
                                )} 

                                {mintsteps===3&&(
                                <Box>
                                    <CreateNFTStep3/>

                                </Box>
                                )}
                                {mintsteps===4&&(
                                <Box>
                                    <CreateNFTStep4/>

                                </Box>
                                )}
                                {mintsteps===5&&(
                                <Box>
                                    <CreateNftAgreement/>

                                </Box>
                                )}
                                {mintsteps===6&&(
                                <Box>
                                    <CreateNftAgreementPreview/>
                                    <Divider/>
                                    <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                        <Box display='flex' mb={'3'}>
                                            <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} onClick={exit}>Save & exit</Button>
                                            <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  rightIcon={<ExternalLinkIcon />}  > Preview</Button>
                                            <Button bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                    rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={handleClick}>Continue</Button>
                                        </Box>
                                    </Grid>
                                </Box>
                                )}
                                {mintsteps===7&&(
                                <Box>
                                    <CreateNftSendAgreement/>
                                </Box>)}
                                {mintsteps===8&&(
                                <Box>
                                    <ReviewNft />
                                </Box>
                                )}
                                {mintsteps===9&&(
                                <Box>
                                    <FinalReviewNft />
                                </Box>
                                )}

            </Box>


           
            <Modal onClose={onInviteArtistClose} isOpen={isInviteArtistOpen} size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick={exit} />
                    <ModalBody>
                        {mintsteps===1&&(
                            <Box>
                                <CreateNFTStep1 onClick={onInviteArtistClose}/>
                            </Box>
                        )}
                        {mintsteps===2&&(
                            <Box>
                                <CreateNFTStep2   data={onInviteArtistClose}/>
                            </Box>
                        )}
                        {mintsteps===3&&(
                            <Box>
                                <CreateNFTStep3 dataaa={onInviteArtistClose}/>

                            </Box>
                        )}
                        {mintsteps===4&&(
                            <Box>
                                <CreateNFTStep4  dataaaa={onInviteArtistClose} />

                            </Box>
                        )}
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
  

        </>

    );
}

export default NFTs;

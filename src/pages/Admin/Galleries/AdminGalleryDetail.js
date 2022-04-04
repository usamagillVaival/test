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
    HStack, VStack, useColorModeValue,StackProps,useId,
    useRadio,
    UseRadioProps,
} from "@chakra-ui/react";
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard
} from '../../../assets/StyledComponent/styeledComponent';
import cardImge from "../../../assets/images/cardimg.png";
import Dummy from "../../../assets/images/dummy.png";
import {Link as ReachLink} from "@reach/router";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"
import { setNFTMedium } from "../../../redux/action/tradingBot";
import {ArtistInvite} from "../../index";
import PreviewImg from "../../../assets/images/image2.png";
import CryptoJS from 'crypto-js';
import server from "../../../apis/server"
import { NFTCARD } from "../../../components/index";
import { FaSlash } from "react-icons/fa";
import moment from "moment";
import { Formik } from "formik"; 
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InvitationList from "./InvitationList";
import ActiveGalleries from "./ActiveGalleriesList"
import { MdNavigateBefore } from "react-icons/md";
import { navigate, Redirect, redirectTo } from "@reach/router";
import GALLERY from "../../../abis/Gallery.json";
import DV from "../../../abis/DadaVault.json";

import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from "web3";
import { useToast } from '@chakra-ui/react'

const InfuraId = process.env.REACT_APP_INFURA_ID;
const chain = process.env.REACT_APP_CHAIN_ID
const network = process.env.REACT_APP_NETWORK
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;



function AdminGalleryDetail(props) {
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

    const galleryDetail=props?.location?.state?.gallery;
    const galleryId=galleryDetail._id
    console.log(galleryDetail)
    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const [allArtworksFlag,setAllArtworksFlag]=React.useState(true)
    const [loader,setLoader]=React.useState(true)
    const [draftArtworksFlag,setDraftArtWorkFlag]=React.useState(false)
    const [approvalArtworksFlag,setApprovalArtWorkFlag]=React.useState(false)
    const [nftDraftList, setNftDraftList] = useState([]);
    const [allNftList, setAllNftList] = useState([]);
    const [nftApprovalList, setNftApprovalList] = useState([]);
    const [invited, setInvited] = useState(false);
    const [invitationName, setInvitationName] = useState('');
    const [dashboardStats,setDashboardStats]=useState([])
    const [saleCount,setSaleCount]=useState(0)
    useEffect(() => {
        loadGalleryStats();
        getTotalSale();
         },[]);
         async function loadGalleryStats()
         {
            const {data} = await server.post(
                "/gallery/dashboard ",
              
                
                 {userId:galleryId},
                { 
                  headers: {
                    "Content-Type": "application/json",
                  },
                } 
              )
              if(data)
      {
          console.log(data)
      //   setArtistCount(1)
      //   setNftCount(0)
         
          setDashboardStats(data)
      }
         }
         async function getTotalSale()
         {
         try{   
            const {data} = await server.post(
                "/nft/TotalSalesByGallery",
              
                 {userId:galleryId},
                { 
                  headers: {
                    "Content-Type": "application/json",
                  },
                } 
              )
              console.log(data.error)
             
              if(data)
              {
             console.log(data)
            setSaleCount(data?.saleCount)
              }
            }
        
         
            catch(e)
            {
               
                setLoader(false)
            }
         }
    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose:onInviteArtistClose
    } = useDisclosure();
    let validationSchema = yup.object({ 
        email: yup.string().email('Invalid email').required('Required'),
        name: yup.string().required('Required'),
       });  
       const emailSender =async(values, resetForm) => {
        let dataa ={
            email: values?.email,
            name: values?.name,
            accountType:"gallery",
        }
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
       
          const {data} = await server.post(
              "users/InviteGallery",
              {
                payload: ciphertext
              } ,
              { 
                headers: {
                  "Content-Type": "application/json",
                },
              } 
            )
            if(data){
                console.log(data)
              if(data?.message){
                setInvited(true)
                setInvitationName(values?.name)
                toast({
                  title: 'Success',
                  description: `${data.message}`,
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                    position:'top-right',
                    variant:'top-accent',
                })
              }
              else{
                toast({
                  title: 'Failed',
                  description: `${data.error}`,
                  status: 'error',
                  duration: 4000,
                  isClosable: true,
                    position:'top-right',
                    variant:'top-accent',
                })
              }
          }
  };

  const pauseContract = async ()=>{

    const web3Modal = new Web3Modal(
        {providerOptions}
       
    );
    await web3Modal.connect().then(async(r)=>{
        const web3 = new Web3(r);
        const chainId = await web3.eth.getChainId()
        if(chainId!=chain){
            web3Modal.clearCachedProvider();
            window.localStorage.removeItem('walletconnect');
            toast({
                title: 'Fail',
                description: `Please Switch to ${network} Network`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right', variant:'top-accent',
              })
        }else{
            const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);        const owner = await dv.methods.owner().call()
        const accounts = await web3.eth.getAccounts();
        console.log(owner);
        console.log(accounts[0])
        if(owner.toLowerCase()==accounts[0].toLowerCase()){
            const dv = new web3.eth.Contract(GALLERY.abi, galleryDetail?.gallery_contract_address);
            dv.methods
            .pause(true)
            .send({ from: accounts[0] },async function(result)
            {
               
                if(result)
                {
                // setLoader(false)
                toast({
                    title: 'Failed',
                    description: `${result?.message}`,
                    status: 'error',
                    duration: 4000, variant:'top-accent',
                    isClosable: true,
                    position:'top-right',
                  })
                }
            }) 
            .on("transactionHash", async function (hash) {   
                toast({
                    title: 'Success',
                    description: `Transaction submitted please wait for confirmation`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true, variant:'top-accent',
                    position:'top-right',
                  })
               
                let data = {
                  userId:galleryDetail?._id,
                  hash,
                  status:"paused"
                };
                let ciphertext = CryptoJS.AES.encrypt(
                  JSON.stringify(data),
                  "dvault@123"
                ).toString();
                await server
                  .post(
                    "/users/InsertPauseHash",
                    {
                      payload: ciphertext,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((result) => 
                  {
                      console.log(result)
                //   setLoader(false)
                  })
                  .catch((e) => {
                    localStorage.removeItem("walletconnect")
                      console.log(e)});
                      
              })
            .then(result=>{
               console.log(result)
               navigate("/admin/Galleries")
                // setMintStep(2);
                toast({
                    title: 'Success',
                    description: `Gallery deactivated successfully`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true, variant:'top-accent',
                    position:'top-right',
                  })
            })
            
            .catch((e) =>{
                web3Modal.clearCachedProvider();
                window.localStorage.removeItem('walletconnect');
                if (!e?.code)
                {
                    // toast({
                    //     title: 'Failed',
                    //     description: `Transaction Rejected by network . Please Switch to your onboarding wallet account  `,
                    //     status: 'error',
                    //     duration: 4000,
                    //     isClosable: true, variant:'top-accent',
                    //     position:'top-right',
                    //   })
                }
            //     setLoader(false)
            //    setDisabled(false)
            //     setMintStep(0);  
                
            }
    );
        }else{
            web3Modal.clearCachedProvider();
                window.localStorage.removeItem('walletconnect');
                toast({
                    title: 'Failed',
                    description: `Please connect with admin wallet`,
                    status: 'error', variant:'top-accent',
                    duration: 4000,
                    isClosable: true,
                    position:'top-right',
                })
        }
        
        }
    }).catch(e=>console.log(e))
}

const activateGallery =async () =>{
    console.log("hello");
    const web3Modal = new Web3Modal(
        {providerOptions}
    );
    await web3Modal.connect().then(async(r)=>{
        const web3 = new Web3(r);
        const chainId = await web3.eth.getChainId()
        if(chainId!=chain){
            web3Modal.clearCachedProvider();
            window.localStorage.removeItem('walletconnect');
            toast({
                title: 'Fail',
                description: `Please Switch to ${network} Network`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right', variant:'top-accent',
              })
        }else{
            const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
        const owner = await dv.methods.owner().call()
        const accounts = await web3.eth.getAccounts();
        console.log(owner)
        console.log(accounts[0])
            if(owner.toLowerCase()==accounts[0].toLowerCase()){
                const dv = new web3.eth.Contract(GALLERY.abi, galleryDetail?.gallery_contract_address);
            dv.methods
            .pause(false)
            .send({ from: accounts[0] },async function(result)
            {  
                if(result)
                {
                // setLoader(false)
                toast({
                    title: 'Failed',
                    description: `${result?.message}`,
                    status: 'error',
                    duration: 4000, variant:'top-accent',
                    isClosable: true,
                    position:'top-right',
                  })
                }
            }) 
            .on("transactionHash", async function (hash) {  
                toast({
                    title: 'Success',
                    description: `Transaction submitted please wait for confirmation`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true, variant:'top-accent',
                    position:'top-right',
                  }) 
                let data = {
                  userId:galleryDetail?._id,
                  hash,
                  status:"unpaused"
                };
                let ciphertext = CryptoJS.AES.encrypt(
                  JSON.stringify(data),
                  "dvault@123"
                ).toString();
                await server
                  .post(
                    "/users/InsertPauseHash",
                    {
                      payload: ciphertext,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then((result) => 
                  {
                    
                  })
                  .catch((e) => {
                    localStorage.removeItem("walletconnect")
                      console.log(e)});
                     
              })
            .then(result=>{
                navigate("/admin/Galleries")
                    // setMintStep(2);
                    toast({
                        title: 'Success',
                        description: `Gallery activated successfully`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true, variant:'top-accent',
                        position:'top-right',
                      })
                
            })
            
            .catch((e) =>{
                web3Modal.clearCachedProvider();
                window.localStorage.removeItem('walletconnect');
                if (!e?.code)
                {
                    // toast({
                    //     title: 'Failed',
                    //     description: `Transaction Rejected by network . Please Switch to your onboarding wallet account  `,
                    //     status: 'error',
                    //     duration: 4000,
                    //     isClosable: true, variant:'top-accent',
                    //     position:'top-right',
                    //   })
                } 
                
            }
    );
            }else{
              
                web3Modal.clearCachedProvider();
                window.localStorage.removeItem('walletconnect');
                toast({
                    title: 'Failed',
                    description: `Please connect with admin wallet`,
                    status: 'error', variant:'top-accent',
                    duration: 4000,
                    isClosable: true,
                    position:'top-right',
                })
            }
        }     
    })
}

    return (
        <Formik
        initialValues={{  email: "",name:"" }}
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          emailSender(values, resetForm);
        }} 
        >   
           {(formikProps) => (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  bg={'#fff'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                    <Box mr={'auto'}  flex="1" mb={{base:2,md:0}}>
                          <Box display={'flex'} alignItems={'center'}>
                              <Link textDecoration={"none!important"}><Heading color={'#8F8F8F'} fontWeight="400" fontSize="14px" onClick={()=>navigate("/admin/SmartContract")}>Galleries  </Heading></Link>
                              <Icon width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8.78132 7.99999L5.48132 4.69999L6.42399 3.75732L10.6667 7.99999L6.42399 12.2427L5.48132 11.3L8.78132 7.99999Z" fill="#8F8F8F"/>
                              </Icon>
                              <Text  color={'#4D4C4C'} fontWeight="400" fontSize="14px" lineHeight={'20px'}> {`${galleryDetail?.name}`}</Text>
                          </Box>
                      </Box>
                        <Box d="flex" alignItems={"center"} mb={{base:2,md:0}}>
                            <Stack spacing={3} direction="row" align="center">

                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={()=>{ onInviteArtistOpen()}} >
                                   + Send invite
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Heading mt={'40px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>{galleryDetail?.name?galleryDetail?.name:"undefined"}</Heading>
                </Box>
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }}>
                    <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                        <Flex flexWrap={'wrap'}>
                            <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                                <Text color={'#363535'} fontWeight="700" mb={2} fontSize="24px" lineHeight={'32px'}>Gallery information</Text>
                                <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.name?galleryDetail?.name:"undefined"}'s  DadaVault profile and account</Text>
                            </Box>
                            <Box width={{base:'100%',md:'100%' ,lg:'65%'}} pl={{base:'0px', md:'0px',lg:'32px'}}>
                                <Text color={'#4D4C4C'} fontWeight="600" fontSize="16px" mb={'3'} lineHeight={'24px'}>Gallery Logo</Text>
                               <Box mb={8}>
                                   <Image src={galleryDetail?.gallery_logo?`http://51.222.241.160:8001/api/users/artist_profile/${galleryDetail?.gallery_logo}`:Dummy} height={'64px'} width={'64px'} borderRadius={'50px'} objectFit={'cover'} />
                               </Box>
                                 <Box display={"flex"} w={'100%'} flexWrap={'wrap'}>
                                    <Box width={{base:'100%',md:'50%', xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Gallery Name</Text>
                                        <Text color={'#636262'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.name?galleryDetail?.name:"undefined"}</Text>
                                    </Box>
                                    <Box width={{base:'100%', md:'50%', xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Member Since</Text>
                                        <Text color={'#636262'}  fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.createdAt?moment(galleryDetail?.createdAt).format('MMMM D, YYYY'):""}</Text>
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>DadaVault Profile</Text>
                                        <Text color={'#636262'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.gallery_profile!="undefined"?<Link isExternal href={`https://www.dadavault.com/${galleryDetail?.gallery_profile}`} color={'#0F0EA7'} fontWeight="500" fontSize="16px" lineHeight={'24px'}>{`https://www.dadavault.com/${galleryDetail?.gallery_profile}`}</Link>:""}</Text>
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Gallery Email</Text>
                                        <Text color={'#636262'}  fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.email!="undefined"?<Link color={'#0F0EA7'} fontWeight="500" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.email}</Link>:""}</Text>
                                    </Box>
                                     <Box width={{base:'100%',md:'50%',xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Gallery Website</Text>
                                        <Text color={'#636262'}  fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.gallery_website!="undefined"?<Link isExternal href={`https://www.${galleryDetail?.gallery_website}`} color={'#0F0EA7'} fontWeight="500" fontSize="16px" lineHeight={'24px'}>{`www.${galleryDetail?.gallery_website}`}</Link>:""}</Text>
                                    </Box>
                                     <Box width={'100%'} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Gallery Bio</Text>
                                        <Text color={'#636262'}  fontWeight="400" fontSize="16px" lineHeight={'24px'}>
                                            {galleryDetail?.gallery_bio!="undefined"?galleryDetail?.gallery_bio:""}
                                        </Text>
                                    </Box>
                                     <Box width={{base:'50%',md:'33.33%',xl:'33.33%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Sales</Text>
                                        <Text color={'#636262'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{saleCount} ETH</Text>
                                    </Box>
                                     <Box width={{base:'50%',md:'33.33%',xl:'33.33%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>NFTs</Text>
                                        <Text color={'#636262'}  fontWeight="400" fontSize="16px" lineHeight={'24px'}>{dashboardStats?.nftCount}</Text>
                                    </Box>
                                     <Box width={{base:'50%',md:'33.33%',xl:'33.33%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Artists</Text>
                                        <Text color={'#636262'} mb={8} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{dashboardStats?.artistCount}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Box>

                    <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                        <Flex flexWrap={'wrap'}>
                            <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                                <Text color={'#363535'} fontWeight="700" mb={2} fontSize="24px" lineHeight={'32px'}>Smart contract information</Text>
                                <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.name} Gallery’s DadaVault smart contract</Text>
                            </Box>
                            <Box width={{base:'100%',md:'100%' ,lg:'65%'}} pl={{base:'0px', md:'0px',lg:'32px'}}>
                                <Text color={'#4D4C4C'} fontWeight="600" fontSize="16px" mb={'3'} lineHeight={'24px'}>Status</Text>

                                {
                                    galleryDetail?.gallery_deploy_status=="deployed"||galleryDetail?.gallery_deploy_status=="paused"?
                                    <>
                                    {galleryDetail?.gallery_deploy_status=="deployed"&&(
                                        <>
                                        {galleryDetail?.pause_status=="paused"?
                                            <>
                                        <Box bg={'#DD2922'} mb={2} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                        Paused
                                       </Box>
                                       
                                       <Button mb={6}  color={'#fff'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='#0F0EA7' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                               marginLeft='auto' marginRight={'1rem'} width={'50%'}
                                   onClick={activateGallery}
                                   >Activate gallery
                                   </Button>
                                   </>:
                                   <>
                                   <Box  bg={'#008A27'} mb={4} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                   Deployed
                                  </Box>
                                  <Button mb={6}   textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'50%'}
                                   onClick={pauseContract}
                                   >
                                       Pause gallery
                                   
                                   </Button>
                              </>
                                   }
                                   </>
                                    )}
                                    {galleryDetail?.gallery_deploy_status=="paused"&&(
                                        <Box bg={'#DD2922'} mb={8} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                            Paused
                                        </Box>
                                    )}
                                
                                
                                <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Smart contract address</Text>
                                <Text color={'#636262'} mb={8} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.gallery_contract_address}</Text>
                                <Box display={"flex"} w={'100%'} flexWrap={'wrap'}>
                                    <Box width={{base:'100%',md:'50%',lg:'50%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Symbol</Text>
                                        <Text color={'#636262'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.gallery_symbol}</Text>
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',lg:'50%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Standard</Text>
                                        <Text color={'#636262'} mb={8} fontWeight="400" fontSize="16px" lineHeight={'24px'}>ERC-721</Text>
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',lg:'50%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Deployed on</Text>
                                        <Text color={'#636262'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.createdAt?moment(galleryDetail?.gallery_deploy_date).format('MMMM D, YYYY'):""}</Text>
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',lg:'50%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Deployed by</Text>
                                        <Text color={'#636262'} mb={8} fontWeight="400" fontSize="16px" lineHeight={'24px'}>DadaVault</Text>
                                    </Box>
                                </Box>
                                    </>
                                    :
                                    <Box bg={'#24A6DB'} mb={8} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                    Not deployed
                                </Box>
                                }

                                
                            </Box>
                        </Flex>
                    </Box>
                    <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                        <Flex flexWrap={'wrap'}>
                            <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}  >
                                <Text color={'#363535'} fontWeight="700" mb={2} fontSize="24px" lineHeight={'32px'}>Subscription information</Text>
                                <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'24px'}>{galleryDetail?.name} Gallery’s DadaVault Subscription</Text>
                            </Box>
                            <Box width={{base:'100%',md:'100%' ,lg:'65%'}} pl={{base:'0px', md:'0px',lg:'32px'}}>
                               <Box display={"flex"} w={'100%'} flexWrap={'wrap'}>
                                    <Box width={{base:'100%',md:'50%',xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Symbol</Text>
                                        <Box bg={'#008A27'} mb={8} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                            Subscribed
                                        </Box>
                                        {/* <Box bg={'#DD2922'} mb={8} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                            UnSubscribed
                                        </Box> */}
                                    </Box>
                                    <Box width={{base:'100%',md:'50%',xl:'100%'}} mb={8}>
                                        <Text color={'#636262'} fontWeight="500" mb={2} fontSize="16px" lineHeight={'24px'}>Subscription details</Text>
                                        <Button fontSize={'14px'}  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} maxW={'145px'} >
                                        
                                        <Link  isExternal href='https://www.stripe.com'    fontSize={'14px'} fontWeight={'500'} mb={0} w={'100%'} display={'block'}>

                                            View on Stripe
                                            <Icon ml={3} mr={3} width="14px" height="14px" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.33557 5.4915L4.31482 10.5122L3.48999 9.68742L8.51016 4.66667H4.08557V3.5H10.5022V9.91667H9.33557V5.4915Z" fill="#201F1F"/>
                                            </Icon>
                                            </Link>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>
            <Modal
                onClose={
                    onInviteArtistClose}
                isOpen={isInviteArtistOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton  />
                    <ModalBody>

                    {!invited &&(
                        <Box width={'90%'} m={'auto'} pt={'2rem'} mb={'auto'} display={'flex'} alignItems={'center'} flexDirection={'column'}>

                            <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Invite a gallery to DadaVault</Heading>
                            <Text fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>The gallery can subscribe to DadaVault and start minting and selling NFTs.</Text>

                            <Box px={6} py={6}  bg={'#F7F7F7'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  >
    <Box maxW={'400px'} mx={'auto'}>
        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
            
            
            <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}
            
            >Name</FormLabel>
        </Box>
        <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
            <Input type="text" mb={1} color={'#4D4D4D'} placeholder={'Enter Name'}
                   name="name"
                   border={'1px solid #D2D2D2'}
                   borderRadius={'0px'}
                   id ="name"
                   bg={'#FFFFFF'}
                   value={formikProps.values.name}
                   onChange={formikProps.handleChange("name")}
                   onBlur={formikProps.handleBlur("name")}
                   error={
                     formikProps.errors.name && formikProps.touched.name
                       ? true
                       : false
                   }

            />
        </Box>
        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
            <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}>Email Address</FormLabel>
        </Box>
        <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
            <Input type="email" mb={1} color={'#4D4D4D'} placeholder={'Enter Email'}
                   border={'1px solid #D2D2D2'}
                   name="email"
                   id ="email"
                   borderRadius={'0px'}
                   bg={'#FFFFFF'}
                   value={formikProps.values.email}
                   onChange={formikProps.handleChange("email")}
                   onBlur={formikProps.handleBlur("email")}
                   error={
                     formikProps.errors.email && formikProps.touched.email
                       ? true
                       : false
                   }
            />
        </Box>


    </Box>
</Box>

                            <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" mx={'auto'} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}} gap={6}   mb='auto'   name="form-name">
                                <Divider/>
                                <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                    <Button
                                            onClick={formikProps.handleSubmit}

                                        mb={3} bg='#0C0B86' color='#fff'  ml={'auto'} borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                            rightIcon={<ArrowForwardIcon />}  >Send invite</Button>
                                </Box>
                            </Grid>
                        </Box>

                    )}




                        {invited && (
                            <>

<Box px={6} py={6}  bg={'#fff'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  >
<Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
 <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'} >You’ve invited {invitationName}</BioRymHeading>
 <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>You’ll be notified when {invitationName} accepts their invite.</Text>
 <Box display='flex' mb={'3'} flexWrap={'wrap'}>
     <Button mb={3} bg='#0C0B86' color='#fff' mx={'auto'} borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
     >Close window</Button>
 </Box>
</Box>
                            </>
      )}
    </ModalBody>
</ModalContent>
</Modal>
            </>
			   )}
			   </Formik>

    );
}

export default AdminGalleryDetail;

import React,{useEffect, useState} from "react";

import { FaEthereum } from "react-icons/fa";
import {
    CheckboxGroup,
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    Grid,
    Heading,
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
    UseRadioProps,
    InputGroup,
    InputLeftAddon,
    Input,
    useCheckbox,
    UseCheckboxProps,
    useColorModeValue as mode, useCheckboxGroup,Spinner
} from "@chakra-ui/react";

import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FaApple, FaPlaneDeparture, FaPlaystation } from 'react-icons/fa';
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
import CreateNFTStep1 from "./CreateNft/CreateNftStep1";
import CreateNFTStep2 from "./CreateNft/CreateNftStep2";
import CreateNFTStepPreview from "./CreateNft/CreateNftStepPreview";
import CreateNFTStep3 from "./CreateNft/CreateNftStep3";
import CreateNFTStep4 from "./CreateNft/CreateNftStep4";
import CreateNftAgreementPreview from "./CreateNft/CreateNftAgreementPreview ";
import CreateNftAgreement from './CreateNft/CreateNftAgreement';
import CreateNftSendAgreement from "./CreateNft/CreateNftSendAgreement";
import ReviewNft from "./CreateNft/ReviewNft";
import FinalReviewNft from "./CreateNft/FinalReviewNft";
import cardImge from "../../assets/images/cardimg.png";
import Dummy from "../../assets/images/dummy.png";
import {Link as ReachLink} from "@reach/router";
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
import { navigate, Redirect, redirectTo} from '@reach/router';
import { useToast } from '@chakra-ui/react'
import { useLocation } from "@reach/router"
import { ARTWORKDETAILS } from "../../components/index";
import { REVENUESPLIT } from "../../components/index";
import { TRANSACTIONHISTORY } from "../../components/index";
import { SALEINFORMATION } from "../../components/index";
import {CheckboxBox} from "../../components/checkbox/CheckboxBox";
import {ButtonCheckbox} from "../../components/checkbox/Checkbox";
import {BioRymHeadingNew} from "../../assets/StyledComponent/styeledComponent";
import { Formik } from "formik"; 
import * as yup from "yup";

import GALLERY from "../../abis/Gallery.json";
import DV from "../../abis/DadaVault.json";
import Web3 from "web3";
import { LoadingScreen } from "../../components";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import axios from "axios";

const InfuraId = process.env.REACT_APP_INFURA_ID;
const network = process.env.REACT_APP_NETWORK
const chain = process.env.REACT_APP_CHAIN_ID
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;
// const dadaVaultFee = process.env.REACT_APP_DV_FEE;
const dadaVaultFee = 10;


function NFTsDetailNew(props) {
    const location = useLocation()
    const toast=useToast()
    const {value, getCheckboxProps } = useCheckboxGroup({ defaultValue: ['buy'] })
    const state = useSelector(state => state);    
    const artworkId=props.id
    const [nftDetail, setNftDetail] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [listStep, setListStep] = useState(0);
    const [loader,setLoader]=useState(false);
    const [spin,setSpinner]=useState(false);
    const [disabled, setDisabled] = useState(false); 
    const [provider,setProvider]=useState(null);
    const [reload,setReload]=useState(0);


    let validationSchema = yup.object({ 
        price: yup.number().typeError('Price must be a number').required('Required').positive().min(0.00001)
    });
   
    const dispatch = useDispatch();
    let {mintsteps}  =   state?.TradingBot
    const [approveStatus,setApproveStatus]=useState(false)
    useEffect(() => {

        
        dispatch(setMintSteps(0))
        
         },[]);

    useEffect(() => {
        loadDraftList();
    }, [mintsteps,listStep,approveStatus]);





    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
    const exit =async() => {
        // dispatch(setMintSteps(0))
    };
    
    const xyz =async() => {
    
        dispatch(setMintSteps(1))
    };
    const handleEditArtwork=async() =>
    {
        if (nftDetail.status==1)
        {
        dispatch(setMintSteps(3))
        }
        else if (nftDetail.status==2)
        {
            dispatch(setMintSteps(4))
        }

    };
    const handleMintArtwork=async() =>
    {
        dispatch(setMintSteps(4))
    }
    const { isOpen:isArtworkDeleteOpen, onOpen:onArtworkDeleteOpen, onClose:onArtworkDeleteClose } = useDisclosure()
    const { isOpen:isArtworkEditOpen, onOpen:onArtworkEditOpen, onClose:onArtworkEditClose } = useDisclosure()
    const {
        isOpen: isArtistApproveModal,
        onOpen: onOpenArtistApproveModal,
        onClose: onCloseArtistApproveModal,
    } = useDisclosure();

        const {
        isOpen: isListNftModal,
        onOpen: onOpenListNftModal,
        onClose: onCloseListNftModal,
    } = useDisclosure();

    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose: onInviteArtistClose } = useDisclosure();
    
    const finalRef = React.useRef();
    const User1 = JSON.parse(localStorage.getItem("User"))
   
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
  const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
  console.log(userType)
  const galleryProfile=userType?.gallery_profile
  const loginUser= userType?.account_type
  const userID=userType?._id
  const contractAddress = userType?.gallery_contract_address;
  const ownerAddress = userType?.gallery_matamask_puplic_key;
  const galleryPublishedStatus=userType?.gallery_published;
  const artistWalletAddress=userType?.artist_wallet_account
  const [priceUsd,setUsdPrice]=useState("")
  const [saleId,setSaleId]=useState("")
  const infuraId=InfuraId
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: infuraId, // required
          },
        },
    }

  const web3Modal = new Web3Modal(       
    {   providerOptions,
        cacheProvider: true,
    }
    
);
  
    const loadDraftList = async () => {
        
        setLoader(true)
        const {data} = await server.post(
            "users/artDetail",  
           {
            artId:artworkId
           } ,
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
        
          if (data)
          {
           console.log(data)
          setNftDetail(data?.art[0])
          if(data?.art[0]?.status==6){
              getSaleId(data?.art[0]?._id)
          }
          setLoader(false)

          }
      };

      const getSaleId=async(id)=>{
   
        const dataa1 ={
            artId:id
        }
        const {data}=await server.post(
            '/nft/getSaleByArt',dataa1
            ,
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
        
          if(data)
          {
                 setSaleId(data?.data)
                    console.log(data)
              //setApproveStatus(true)
              //setLoader(false)
          }
      }
 function handleNavigateBack()
 {
     navigate("/NFTs")
 }
 async function customhandle(e)
 {
    const {data}=await axios.get("https://api.coinbase.com/v2/exchange-rates?currency=ETH")
    console.log(data?.data?.rates['USD'])

     setUsdPrice(data?.data?.rates['USD'] * e.target.value)

 }
 
 async function handleDeleteArtwork()
 {
    const {data} = await server.delete(
        `/users/deleteArtWork/${nftDetail?._id}`,
       {

       } ,
        { 
          headers: {
            "Content-Type": "application/json",
          },
        } 
      )
      if (data)
      {
       navigate("/NFTs")
        toast({
        title: 'Successfull',
        description: `Artwork has been deleted successfully.`,
        status: 'success',
        duration: 4000,
        isClosable: true, variant:'top-accent',
            position:'top-right',
      })
      }
 }
 async function handleApproveArtwork()
 {
     setLoader(true)
    let dataa1 ={
        userId: userID,
         artId:nftDetail?._id,
         artist_wallet_account:artistWalletAddress,
    } 
    
      const {data}=await server.post(
        '/users/artist_profile/approve ',dataa1
        ,
        { 
          headers: {
            "Content-Type": "application/json",
          },
        } 
      )
    
      if(data)
      {
          setApproveStatus(true)
          setLoader(false)
      }
 }

 const listModal = async() => {
    
    const web3Modal = new Web3Modal(
        {
            providerOptions,
        })
    await web3Modal.connect().then(async(r)=>{
    
        const web3 = new Web3(r);
        const chainId = await web3.eth.getChainId()
        if(chainId!=chain){
            web3Modal.clearCachedProvider();
                    window.localStorage.removeItem('walletconnect');
                    setSpinner(false);
                    toast({
                        title: 'Fail',
                        description: `Please Switch to ${network} Network`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position:'top-right', variant:'top-accent',
                      })
        }else{
            const accounts = await web3.eth.getAccounts();
        const collectorWalletAddress=userType?.gallery_matamask_puplic_key
        if(collectorWalletAddress==accounts[0]){
            setProvider(r);
            onOpenListNftModal();
    }
    else{
              toast({
                  title: 'Failed',
                  description: 'Please Select Your Onboarding Wallet to continue',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:'top-right',
                  variant:'top-accent',
                  color:'red'
              })
            }
        }
        
        
    }).catch((e)=>{
        web3Modal.clearCachedProvider();
        window.localStorage.removeItem('walletconnect');
        toast({
            title: 'Failed',
            description: `${e.message}`,
            status: 'error',
            duration: 4000,
            variant: 'top-accent',
            isClosable: true,
            position: 'top-right',
        })
    });
    
  }


 const list = async (values) => {
     console.log(values)
     setSpinner(true);
    if (!value.length) {
        setSpinner(false);
        toast({
            title: 'Failed',
            description: "Please select payment methaod",
            status: 'error',
            duration: 4000,
            isClosable: true,
            variant: 'top-accent',
            position: 'top-right',
        })
    } else {
        const {
            data
        } = await server.post(
            "users/artDetail", {
                artId: artworkId
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        setNftDetail(data?.art[0]);
        if (data?.art[0]?.listing_hash_status == "listed") {
            setSpinner(false);
            exit();
            toast({
                title: 'Failed',
                description: "NFT already listed",
                status: 'error',
                duration: 4000,
                variant: 'top-accent',
                isClosable: true,
                position: 'top-right',
            })
        } else {
            console.log("fee: ",dadaVaultFee);
            const price = Number(values.price);
            const artist_rev = nftDetail?.revenueSplit;
            const dv_rev = dadaVaultFee;
            const gallery_rev = 100-dv_rev-artist_rev;
            const artist_wallet = nftDetail?.artist_wallet_account;
                const web3 = new Web3(provider);
                const weiPrice = web3.utils.toWei(price.toString(), "ether");
                const accounts = await web3.eth.getAccounts();
                const chainId = await web3.eth.getChainId()
               
                if(chainId!=chain){
                    web3Modal.clearCachedProvider();
                    window.localStorage.removeItem('walletconnect');
                    setSpinner(false);
                    toast({
                        title: 'Fail',
                        description: `Please Switch to ${network} Network`,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position:'top-right', variant:'top-accent',
                      })
                }
                else{
                    if (ownerAddress != accounts[0]) {
                        setDisabled(false);
                        setSpinner(false);
                        web3Modal.clearCachedProvider();
                        window.localStorage.removeItem('walletconnect');
                        toast({
    
                            title: 'Failed',
                            description: "Connect wallet with owner account",
                            status: 'error',
                            duration: 4000,
                            variant: 'top-accent',
                            isClosable: true,
                            position: 'top-right',
                        })
                    } else {
                        const glry = new web3.eth.Contract(GALLERY.abi, contractAddress);
                        const approval = await glry.methods
                            .isApprovedForAll(ownerAddress, dadaVaultAddress).call();
    
                        if (!approval) {
                            await glry.methods
                                .setApprovalForAll(dadaVaultAddress, true)
                                .send({
                                    from: accounts[0]
                                }, () => {
                                    setDisabled(true)
    
                                })
                                .then(() => {
                                    const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
                                    console.log("weiwwww: ",weiPrice)
                                    dv.methods
                                        .list(contractAddress, nftDetail?.token_id, artist_wallet, weiPrice, gallery_rev, artist_rev, dv_rev)
                    
                                        .send({
                                            from: accounts[0]
                                        }).on("transactionHash", async function(hash) {
                                            setDisabled(true)
    
                                            toast({
                                                title: 'Successful',
                                                description: `Transaction is submitted. Please wait a  few seconds for your NFT listing to confirm`,
                                                status: 'success',
                                                duration: 5000,
                                                variant: 'top-accent',
                                                isClosable: true,
                                                position: 'top-right',
                                            })
                                            let data = {
                                                "userId": userID,
                                                "artId": nftDetail?._id,
                                                price,
                                                "nft_payment_method": value,
                                                listing_hash: hash
                                            };
                                            await server
                                                .post(
                                                    "/users/artist_profile/listForSale",
                                                    data, {
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                    }
                                                )
                                                .then()
                                                .catch((e) => console.log(e));
                                        })
                                        .then(result => {
                                            console.log("nft minted...");
                                            setListStep(1);
                                        })
                                        .catch((e) => {
    
                                            setDisabled(false)
                                            console.log(e)
                                            toast({
                                                title: 'Failed',
                                                description: `${e.message}`,
                                                status: 'error',
                                                duration: 4000,
                                                variant: 'top-accent',
                                                isClosable: true,
                                                position: 'top-right',
                                            })
    
                                        });
                                    console.log("nft approved");
                                }).then(() => {
    
                                }).catch(e => {
                                    console.log("length error: ",e);
                                    setDisabled(false)
                                    setSpinner(false);
                                    toast({
                                        title: 'Failed',
                                        description: `${e.message}`,
                                        status: 'error',
                                        duration: 4000,
                                        variant: 'top-accent',
                                        isClosable: true,
                                        position: 'top-right',
                                    })
                                })
                        } 
                        else {
                            const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
                            dv.methods
                                .list(contractAddress, nftDetail?.token_id, artist_wallet, weiPrice, gallery_rev, artist_rev, dv_rev)
                                .send({
                                    from: accounts[0]
                                }).on("transactionHash", async function(hash) {
                                    setDisabled(true)
                                    toast({
                                        title: 'Successfull',
                                        description: `Transaction is submitted. Please wait few seconds for confirmation`,
                                        status: 'success',
                                        duration: 5000,
                                        variant: 'top-accent',
                                        isClosable: true,
                                        position: 'top-right',
                                    })
                                    let data = {
                                        "userId": userID,
                                        "artId": nftDetail?._id,
                                        price,
                                        "nft_payment_method": value,
                                        listing_hash: hash
                                    };
                                    await server
                                        .post(
                                            "/users/artist_profile/listForSale",
                                            data, {
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                            }
                                        )
                                        .then()
                                        .catch((e) => console.log(e));
                                })
                                .then(result => {
                                    toast({
                                        title: 'Success',
                                        description: `NFT successfully listed `,
                                        status: 'success',
                                        duration: 5000,
                                        variant: 'top-accent',
                                        isClosable: true,
                                        position: 'top-right',
                                    })
                                    setListStep(1);
                                    exit();
                                })
                                .catch((e) => {
                                    web3Modal.clearCachedProvider();
                        window.localStorage.removeItem('walletconnect');
                                    setSpinner(false);
                                    setDisabled(false)
                                    console.log(e)
                                    toast({
                                        title: 'Failed',
                                        description: `${e.message}`,
                                        status: 'error',
                                        duration: 4000,
                                        variant: 'top-accent',
                                        isClosable: true,
                                        position: 'top-right',
                                    })
    
                                });
                        }
                    }
                }
               
        }

    }
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

        />
        </Box>
      )
    }
    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} py={15} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'34px'}>
                        <Box mr={'auto'} my={'auto'} flex="1" display={'flex'}  alignItems={'center'} mb={{base:2 , md:0}}>
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" lineHeight={'20px'} cursor={'pointer'} onClick={handleNavigateBack}>
                            
                            NFTS </Heading>
                            <Text mx={'13px'} >
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.78132 4.99999L0.481323 1.69999L1.42399 0.757324L5.66666 4.99999L1.42399 9.24266L0.481323 8.29999L3.78132 4.99999Z" fill="#8F8F8F"/>
                                </svg>
                            </Text>
                            <Text color={'#4D4D4D'} fontWeight="400" fontSize="14px"  lineHeight={'20px'} > {nftDetail?.title?nftDetail?.title:"Unspecified title"}</Text>

                            
                        </Box>
                        {loginUser=="gallery"?
                        <Box d="flex" alignItems={"center"} mb={{base:2 , md:0}}>
                            <Stack spacing={3} direction="row" align="center">
                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={()=>{ onInviteArtistOpen();xyz();}}>
                                   + Create NFT
                                </Button>
                            </Stack>
                        </Box>
                        :null}
                    </Flex>
                    <Flex alignItems={'center'} flexWrap={'wrap'}>
                    <Box maxW={'128px'} maxH={'128px'} height={'128px'} width={'128px'} mr={5} mb={2}>
                        <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'}  src={`http://51.222.241.160:8001/api/users/artist_profile/${nftDetail?.file}`} />
                    </Box>
                        <Box pl={{base:0,sm:5}} mb={2}>
                            <Heading color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} mb={6} >
                                {
                                  nftDetail?.title?nftDetail?.title:"Unspecified title"  
                                }
                               
                              
                            </Heading>  
                            <Flex flexWrap={'wrap'}>
                                <Box pr={3} minW={'134px'}>
                                    {loginUser=="gallery"?
                                    <>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'}  lineHeight={'16px'}>ARTIST</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>
                                        {nftDetail?.artistName?nftDetail?.artistName:"Unspecified artist"}
                                        </Text>
                                        </>
                                        :
                                        <>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'}  lineHeight={'16px'}>Gallery</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>
                                        {nftDetail?.galleryName?nftDetail?.galleryName:"Unspecified gallery"}
                                        </Text>
                                        </>}
                                </Box>
                                { nftDetail?.status==4 || nftDetail?.status==5 || nftDetail?.status==6?
                                <>
                                <Box px={{base:0,sm:4}} mb={{base:2,sm:0}} minW={'134px'}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >CONTRACT ADDRESS</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{nftDetail?.galleryContractAddress? nftDetail?.galleryContractAddress?.slice(0, 6) + "..." + nftDetail?.galleryContractAddress?.slice(36, 42) :"Not specified"}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}} mb={{base:2,sm:0}} minW={'134px'}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >TOKEN ID</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{nftDetail?.token_id}</Text>
                                </Box>
                                </>
                                :null
}

                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                {!(loginUser=="artist" && nftDetail?.status==3)?
                   <Flex flexWrap={'wrap'}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                               Actions
                           </Text>
                           
                           
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>

                           <Grid p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>
                              {(nftDetail?.status==1 || nftDetail?.status==2 || nftDetail?.status==3&&reload==0) && loginUser==="gallery"?
                               <>
                               
                               
                               <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={(nftDetail?.status==1 || nftDetail?.status==2)?()=>{  onArtworkEditOpen();handleEditArtwork()} :
                               ()=>{ onArtworkEditOpen();handleMintArtwork()}
                             }>
                                   <Icon width="17px" mr={2} height="16px" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <g clip-path="url(#clip0_2803_16241)">
                                       <path d="M7.79732 2.73926H3.15879C2.8073 2.73926 2.47021 2.87889 2.22167 3.12743C1.97312 3.37597 1.8335 3.71306 1.8335 4.06455V13.3416C1.8335 13.6931 1.97312 14.0302 2.22167 14.2787C2.47021 14.5273 2.8073 14.6669 3.15879 14.6669H12.4358C12.7873 14.6669 13.1244 14.5273 13.373 14.2787C13.6215 14.0302 13.7611 13.6931 13.7611 13.3416V8.70308" stroke="#201F1F" stroke-width="2" stroke-linecap="round"/>
                                       <path d="M12.7669 1.74521C13.0305 1.48159 13.388 1.3335 13.7608 1.3335C14.1337 1.3335 14.4912 1.48159 14.7548 1.74521C15.0184 2.00883 15.1665 2.36637 15.1665 2.73918C15.1665 3.11199 15.0184 3.46954 14.7548 3.73315L8.45967 10.0283L5.80908 10.6909L6.47173 8.04036L12.7669 1.74521Z" stroke="#201F1F" stroke-width="2" stroke-linecap="round"/>
                                   </g>
                                   <defs>
                                       <clipPath id="clip0_2803_16241">
                                           <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                                       </clipPath>
                                   </defs>
                                   
                               </Icon>
                               {(nftDetail?.status==1 || nftDetail?.status==2)?
                                <Text>Edit </Text>
                                :<Text>Mint NFT</Text>
                               }
                               </Button>

                               <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={onArtworkDeleteOpen}>
                                   <Icon width="16px" mr={2} height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12.2511 5.50016H3.97056C3.93187 5.50001 3.89359 5.50793 3.85815 5.52343C3.8227 5.53892 3.79089 5.56165 3.76474 5.59015C3.73859 5.61866 3.71868 5.65231 3.70629 5.68895C3.6939 5.72559 3.6893 5.76442 3.69278 5.80294L4.40778 13.6563C4.43287 13.9324 4.56032 14.1892 4.76509 14.3762C4.96986 14.5632 5.23715 14.6669 5.51444 14.6668H10.7072C10.9845 14.6669 11.2518 14.5632 11.4566 14.3762C11.6613 14.1892 11.7888 13.9324 11.8139 13.6563L12.5278 5.80294C12.5312 5.76453 12.5266 5.72582 12.5143 5.68929C12.5019 5.65275 12.4821 5.61918 12.4561 5.59072C12.4301 5.56221 12.3984 5.53944 12.3631 5.52385C12.3279 5.50826 12.2897 5.50019 12.2511 5.50016ZM7.14 12.7224C7.14 12.8329 7.0961 12.9389 7.01796 13.017C6.93982 13.0952 6.83384 13.1391 6.72333 13.1391C6.61283 13.1391 6.50685 13.0952 6.42871 13.017C6.35057 12.9389 6.30667 12.8329 6.30667 12.7224V7.72239C6.30667 7.61188 6.35057 7.5059 6.42871 7.42776C6.50685 7.34962 6.61283 7.30572 6.72333 7.30572C6.83384 7.30572 6.93982 7.34962 7.01796 7.42776C7.0961 7.5059 7.14 7.61188 7.14 7.72239V12.7224ZM9.91778 12.7224C9.91778 12.8329 9.87388 12.9389 9.79574 13.017C9.7176 13.0952 9.61162 13.1391 9.50111 13.1391C9.3906 13.1391 9.28462 13.0952 9.20648 13.017C9.12834 12.9389 9.08444 12.8329 9.08444 12.7224V7.72239C9.08444 7.61188 9.12834 7.5059 9.20648 7.42776C9.28462 7.34962 9.3906 7.30572 9.50111 7.30572C9.61162 7.30572 9.7176 7.34962 9.79574 7.42776C9.87388 7.5059 9.91778 7.61188 9.91778 7.72239V12.7224ZM13.6667 3.55572H11.0278C10.9909 3.55572 10.9556 3.54109 10.9296 3.51504C10.9035 3.48899 10.8889 3.45367 10.8889 3.41683V2.72239C10.8889 2.35403 10.7426 2.00076 10.4821 1.74029C10.2216 1.47983 9.86836 1.3335 9.5 1.3335H6.72222C6.35387 1.3335 6.0006 1.47983 5.74013 1.74029C5.47966 2.00076 5.33333 2.35403 5.33333 2.72239V3.41683C5.33333 3.45367 5.3187 3.48899 5.29265 3.51504C5.26661 3.54109 5.23128 3.55572 5.19444 3.55572H2.55556C2.40821 3.55572 2.26691 3.61425 2.16272 3.71844C2.05853 3.82262 2 3.96393 2 4.11127C2 4.25862 2.05853 4.39992 2.16272 4.50411C2.26691 4.6083 2.40821 4.66683 2.55556 4.66683H13.6667C13.814 4.66683 13.9553 4.6083 14.0595 4.50411C14.1637 4.39992 14.2222 4.25862 14.2222 4.11127C14.2222 3.96393 14.1637 3.82262 14.0595 3.71844C13.9553 3.61425 13.814 3.55572 13.6667 3.55572ZM6.44444 3.41683V2.72239C6.44444 2.64871 6.47371 2.57806 6.5258 2.52597C6.5779 2.47387 6.64855 2.44461 6.72222 2.44461H9.5C9.57367 2.44461 9.64433 2.47387 9.69642 2.52597C9.74851 2.57806 9.77778 2.64871 9.77778 2.72239V3.41683C9.77778 3.45367 9.76315 3.48899 9.7371 3.51504C9.71105 3.54109 9.67572 3.55572 9.63889 3.55572H6.58333C6.5465 3.55572 6.51117 3.54109 6.48512 3.51504C6.45908 3.48899 6.44444 3.45367 6.44444 3.41683Z" fill="#201F1F"/>
                                   </Icon>
                                 Delete
                               </Button>
                               </>
                               :(nftDetail?.status==1 || nftDetail?.status==2 ) && loginUser==="artist"?
                               <>
                               <Button  color={'#fff'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='#0F0EA7'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        marginLeft='auto' marginRight={'1rem'} width={'100%'} rightIcon={<ArrowForwardIcon />} onClick={onOpenArtistApproveModal} >
                                 Approve
                               </Button>
                               </>
                               :((nftDetail?.status==4||reload==1)  && loginUser==="gallery")?
                               
                               <Button onClick={listModal}  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} >
                                   <Icon width="17px" mr={2} height="16px" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M7.76624 1.3999L14.3656 2.34324L15.3082 8.94324L9.18024 15.0712C9.05522 15.1962 8.88568 15.2664 8.70891 15.2664C8.53213 15.2664 8.36259 15.1962 8.23757 15.0712L1.63757 8.47124C1.51259 8.34622 1.44238 8.17668 1.44238 7.9999C1.44238 7.82313 1.51259 7.65359 1.63757 7.52857L7.76624 1.3999ZM9.65157 7.05724C9.77541 7.18103 9.92242 7.27922 10.0842 7.3462C10.246 7.41318 10.4194 7.44764 10.5945 7.4476C10.7696 7.44757 10.943 7.41305 11.1047 7.34602C11.2665 7.27898 11.4134 7.18074 11.5372 7.0569C11.661 6.93307 11.7592 6.78606 11.8262 6.62428C11.8932 6.46249 11.9276 6.2891 11.9276 6.114C11.9276 5.9389 11.8931 5.76552 11.826 5.60376C11.759 5.442 11.6607 5.29503 11.5369 5.17124C11.4131 5.04744 11.2661 4.94925 11.1043 4.88227C10.9425 4.81529 10.7691 4.78084 10.594 4.78087C10.2404 4.78093 9.90125 4.92147 9.65124 5.17157C9.40123 5.42167 9.26081 5.76084 9.26087 6.11447C9.26094 6.4681 9.40147 6.80723 9.65157 7.05724Z" fill="#201F1F"/>
                               </Icon>
                               List for sale
                               </Button>
                               
                              : (nftDetail?.status==5) && (loginUser==="gallery" || loginUser==="artist") ?
                               
                               <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}
                               onClick={()=>{
                                   if (galleryPublishedStatus==true)
                                   window.open(`/GalleryStoreFront/${galleryProfile}`)
                                   else
                                   toast({
                                    title: 'Publish your storefront',
                                    description: `Publish your storefront in order to see your NFTs listed for sale. `,
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                    position:'top-right', variant:'top-accent',
                                  })
                               }}>
                                   <Icon width="16px" height="16px" mr={2} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M14.3527 7.29281C12.8827 5.67557 10.4446 3.96607 7.99929 4.00053C5.55397 3.96552 3.11588 5.67613 1.64591 7.29281C1.44441 7.5181 1.33301 7.80975 1.33301 8.112C1.33301 8.41425 1.44441 8.70589 1.64591 8.93118C3.09865 10.5312 5.50228 12.2257 7.90981 12.2257H8.08098C10.4968 12.2257 12.8999 10.5312 14.3543 8.93062C14.5556 8.70522 14.6666 8.41356 14.6663 8.1114C14.666 7.80924 14.5544 7.5178 14.3527 7.29281ZM5.44282 8.11311C5.44282 7.60749 5.59275 7.11322 5.87366 6.69281C6.15457 6.2724 6.55384 5.94473 7.02097 5.75124C7.4881 5.55775 8.00212 5.50712 8.49803 5.60576C8.99394 5.7044 9.44945 5.94788 9.80698 6.30541C10.1645 6.66294 10.408 7.11846 10.5066 7.61437C10.6053 8.11027 10.5546 8.62429 10.3612 9.09143C10.1677 9.55856 9.83999 9.95782 9.41959 10.2387C8.99918 10.5196 8.50491 10.6696 7.99929 10.6696C7.32127 10.6696 6.67102 10.4002 6.19159 9.9208C5.71216 9.44137 5.44282 8.79112 5.44282 8.11311Z" fill="#201F1F"/>
                                       <path d="M7.9992 9.22448C8.61307 9.22448 9.11071 8.72684 9.11071 8.11297C9.11071 7.4991 8.61307 7.00146 7.9992 7.00146C7.38533 7.00146 6.8877 7.4991 6.8877 8.11297C6.8877 8.72684 7.38533 9.22448 7.9992 9.22448Z" fill="#201F1F"/>
                                   </Icon>
                                   View in storefront
                               </Button>
                                :(nftDetail?.status==6) && (loginUser==="gallery" || loginUser==="artist") ?
                               <Button
                               onClick={()=>{
                                if(loginUser=='gallery'){
                                    navigate("/salesDetail",{ state: {offerId:saleId }})
                                }
                                if(loginUser=='artist'){
                                    navigate("/ArtistSaleDetail",{ state: {offerId:saleId }})
                                }
                            }}
                             
                               color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                   <Icon width="17px" height="16px" mr={2} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M8.49967 14.1668C5.09382 14.1668 2.33301 11.406 2.33301 8.00016C2.33301 4.59431 5.09382 1.8335 8.49967 1.8335C11.9055 1.8335 14.6663 4.59431 14.6663 8.00016C14.6663 11.406 11.9055 14.1668 8.49967 14.1668ZM8.49967 13.8335C10.0468 13.8335 11.5305 13.2189 12.6245 12.125C13.7184 11.031 14.333 9.54726 14.333 8.00016C14.333 6.45307 13.7184 4.96934 12.6245 3.87537C11.5305 2.78141 10.0468 2.16683 8.49967 2.16683C6.95258 2.16683 5.46885 2.78141 4.37489 3.87537C3.28092 4.96934 2.66634 6.45307 2.66634 8.00016C2.66634 9.54726 3.28092 11.031 4.37489 12.125C5.46885 13.2189 6.95258 13.8335 8.49967 13.8335ZM8.66634 5.16683V5.50016H8.33301V5.16683H8.66634ZM8.66634 7.8335V10.8335H8.33301V7.8335H8.66634Z" fill="#201F1F" stroke="#201F1F"/>
                                   </Icon>
                                   View sale
                               </Button>
                               :null
                              }
                               
                           </Grid>
                       </Box>
                   </Flex>
                   :null}
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                      <ARTWORKDETAILS data={nftDetail} />
                       </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                      <REVENUESPLIT data={nftDetail} />
                      </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                        <TRANSACTIONHISTORY data={nftDetail} />
                    </Flex>
                    <Divider/>
                    {nftDetail?.status==5 || nftDetail?.status==6?
                    <Flex flexWrap={'wrap'}>
                      <SALEINFORMATION data={nftDetail}  />
                   </Flex>
                   :null}
                    <Divider/>
                </Box>
            </Box>

            <Modal
                onClose={onArtworkDeleteClose}
                isOpen={isArtworkDeleteOpen}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent borderRadius={'0px'}>
                    <ModalCloseButton />
                    <ModalBody py={'40px'} >
                     <Text py={'20px'} color={'#000'} fontWeight={'500'} fontSize={'24px'} lineHeight={'32px'} >
                         Are You Sure You Want To Delete This Artwork?
                     </Text>
                        <Box w={'100%'} py={'1.5rem'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
                            <Button borderRadius={'0px'} onClick={onArtworkDeleteClose} _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} >
                                Cancel
                            </Button>
                            <Button mx={'1rem'} onClick={handleDeleteArtwork} bg={'red'} color={'#fff'} _hover={{bg:'red',color:'#fff'}}>
                                <Icon width="16px" mr={2} height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2511 5.50016H3.97056C3.93187 5.50001 3.89359 5.50793 3.85815 5.52343C3.8227 5.53892 3.79089 5.56165 3.76474 5.59015C3.73859 5.61866 3.71868 5.65231 3.70629 5.68895C3.6939 5.72559 3.6893 5.76442 3.69278 5.80294L4.40778 13.6563C4.43287 13.9324 4.56032 14.1892 4.76509 14.3762C4.96986 14.5632 5.23715 14.6669 5.51444 14.6668H10.7072C10.9845 14.6669 11.2518 14.5632 11.4566 14.3762C11.6613 14.1892 11.7888 13.9324 11.8139 13.6563L12.5278 5.80294C12.5312 5.76453 12.5266 5.72582 12.5143 5.68929C12.5019 5.65275 12.4821 5.61918 12.4561 5.59072C12.4301 5.56221 12.3984 5.53944 12.3631 5.52385C12.3279 5.50826 12.2897 5.50019 12.2511 5.50016ZM7.14 12.7224C7.14 12.8329 7.0961 12.9389 7.01796 13.017C6.93982 13.0952 6.83384 13.1391 6.72333 13.1391C6.61283 13.1391 6.50685 13.0952 6.42871 13.017C6.35057 12.9389 6.30667 12.8329 6.30667 12.7224V7.72239C6.30667 7.61188 6.35057 7.5059 6.42871 7.42776C6.50685 7.34962 6.61283 7.30572 6.72333 7.30572C6.83384 7.30572 6.93982 7.34962 7.01796 7.42776C7.0961 7.5059 7.14 7.61188 7.14 7.72239V12.7224ZM9.91778 12.7224C9.91778 12.8329 9.87388 12.9389 9.79574 13.017C9.7176 13.0952 9.61162 13.1391 9.50111 13.1391C9.3906 13.1391 9.28462 13.0952 9.20648 13.017C9.12834 12.9389 9.08444 12.8329 9.08444 12.7224V7.72239C9.08444 7.61188 9.12834 7.5059 9.20648 7.42776C9.28462 7.34962 9.3906 7.30572 9.50111 7.30572C9.61162 7.30572 9.7176 7.34962 9.79574 7.42776C9.87388 7.5059 9.91778 7.61188 9.91778 7.72239V12.7224ZM13.6667 3.55572H11.0278C10.9909 3.55572 10.9556 3.54109 10.9296 3.51504C10.9035 3.48899 10.8889 3.45367 10.8889 3.41683V2.72239C10.8889 2.35403 10.7426 2.00076 10.4821 1.74029C10.2216 1.47983 9.86836 1.3335 9.5 1.3335H6.72222C6.35387 1.3335 6.0006 1.47983 5.74013 1.74029C5.47966 2.00076 5.33333 2.35403 5.33333 2.72239V3.41683C5.33333 3.45367 5.3187 3.48899 5.29265 3.51504C5.26661 3.54109 5.23128 3.55572 5.19444 3.55572H2.55556C2.40821 3.55572 2.26691 3.61425 2.16272 3.71844C2.05853 3.82262 2 3.96393 2 4.11127C2 4.25862 2.05853 4.39992 2.16272 4.50411C2.26691 4.6083 2.40821 4.66683 2.55556 4.66683H13.6667C13.814 4.66683 13.9553 4.6083 14.0595 4.50411C14.1637 4.39992 14.2222 4.25862 14.2222 4.11127C14.2222 3.96393 14.1637 3.82262 14.0595 3.71844C13.9553 3.61425 13.814 3.55572 13.6667 3.55572ZM6.44444 3.41683V2.72239C6.44444 2.64871 6.47371 2.57806 6.5258 2.52597C6.5779 2.47387 6.64855 2.44461 6.72222 2.44461H9.5C9.57367 2.44461 9.64433 2.47387 9.69642 2.52597C9.74851 2.57806 9.77778 2.64871 9.77778 2.72239V3.41683C9.77778 3.45367 9.76315 3.48899 9.7371 3.51504C9.71105 3.54109 9.67572 3.55572 9.63889 3.55572H6.58333C6.5465 3.55572 6.51117 3.54109 6.48512 3.51504C6.45908 3.48899 6.44444 3.45367 6.44444 3.41683Z" fill="#fff"/>
                                </Icon>
                                Delete
                            </Button>
                        </Box>                     
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                onClose={onArtworkEditClose}
                isOpen={isArtworkEditOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick={exit} />
                    <ModalBody>
                     {mintsteps===3&&(
                            <Box>
                                <CreateNFTStep3 artworkEditdetail={nftDetail} dataaa={onArtworkEditClose} />
                            </Box>
                        )} 
                        {mintsteps===4&&(
                            <Box>
                                <CreateNFTStep4 load={setReload} artworkEditdetail={nftDetail} dataaaa={onArtworkEditClose}/>

                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>



            <Modal
                onClose={onInviteArtistClose}
                isOpen={isInviteArtistOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        {mintsteps===1&&(
                            <Box>
                                <CreateNFTStep1 onClick={onInviteArtistClose}/>
                            </Box>
                        )}
                        {mintsteps===2&&(
                            <Box>
                                <CreateNFTStep2/>


                            </Box>
                        )}
                       
                        {mintsteps===3&&(
                            <Box>
                                <CreateNFTStep3  dataaa={onInviteArtistClose}/>

                            </Box>
                        )}
                        {mintsteps===4&&(
                            <Box>
                                <CreateNFTStep4 load={setReload} dataaaa={onInviteArtistClose}/>

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
                                        <Button bg='#0f0ea7' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
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
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal onClose={onCloseArtistApproveModal} isOpen={isArtistApproveModal}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick={exit} />
                    <ModalBody>
                    {!approveStatus?
                        <>
                            <Box width={'100%'} maxW={'1152px'} m={'auto'} pt={'2rem'} pb={'2.5rem'} mb={'auto'}>
                                <Box>
                                    <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Approve NFT</Heading>
                                    <Text  fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>Let your gallery know that you approve this NFT for minting.</Text>
                                </Box>
                                <Grid templateColumns= {{base:"repeat(1, 1fr)",md:"repeat(1, 1fr)"}} gap={6} >
                                    <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Flex     width={'100%'} flexWrap={'wrap'}>
                                            <Box  width={{base:"100%",sm:"100%" ,md:"40%" ,lg:"40%",xl:"33.33%"}}  mb={{base:"1rem",lg:"0rem"}} pr={{base:'0rem',sm:'0rem',md:'1rem',lg:'2rem'}} maxW={'100%'}>
                                                <Box bg={'#F7F7F7'} p={6} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
                                                    <Image mx={'auto'} maxW={'320px'} src={`http://51.222.241.160:8001/api/users/artist_profile/${nftDetail?.file}`} width={'100%'} maxH={'240px'} objectFit={'contain'} />
                                                    <Box pt={6} w={'100%'}>
                                                        <Text fontSize={'18px'}   fontWeight={'400'} color={'#636262'}  textAlign={'left'}>
                                                           {nftDetail?.artistName?nftDetail?.artistName:"Unspecified Artist"}
                                                        </Text>
                                                        <Text fontSize={'18px'} textAlign={'left'} fontWeight={'500'} color={'#363535'}>
                                                            {nftDetail?.title?nftDetail?.title:"Unspecified title"}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box  width={{base:"100%",sm:"100%" ,md:"60%" ,lg:"60%",xl:"66.66%"}} mb={{base:"1rem",lg:"0rem"}} pl={{base:'0rem',sm:'0rem',md:'1rem',lg:'2rem'}} maxW={'100%'}>
                                                <Box maxW={'100%'} >
                                                    <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Title</Text>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'400'} color={'#636262'} lineHeight={'24px'}>{nftDetail?.title}</Text>
                                                    </Box>
                                                    <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Artist</Text>
                                                        <Text fontSize={'16px'} textAlign={'left'}  fontWeight={'400'} color={'#636262'} lineHeight={'24px'}>{nftDetail?.artistName}</Text>
                                                    </Box>
                                                    <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Description</Text>
                                                        <Text fontSize={'16px'} textAlign={'left'}  fontWeight={'400'} color={'#636262'} lineHeight={'24px'}>{nftDetail?.description}</Text>
                                                    </Box>
                                                    <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Gallery</Text>
                                                        <Text fontSize={'16px'} textAlign={'left'}  fontWeight={'400'} color={'#636262'} lineHeight={'24px'}>{nftDetail?.galleryName}</Text>
                                                    </Box>
                                                    <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                        <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Revenue split</Text>
                                                        <Text fontSize={'16px'} textAlign={'left'}  fontWeight={'400'} color={'#636262'} lineHeight={'24px'}>
                                                            {nftDetail?.revenueSplit?
                                                            <>
                                                            {100 - nftDetail?.revenueSplit} % gallery / {nftDetail?.revenueSplit} % artist
                                                            </>
                                                            :
                                                            "Undefined Split %"}
                                                            </Text>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Grid>
                                <Grid  templateColumns="repeat(1, 1fr)" gap={6}  maxW={'1152px'}  m={'auto'}    mt='40px'   name="form-name">
                                    <Divider/>
                                    <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                        <Button mb={3}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} borderRadius={'0px'}  marginLeft='auto'  onClick={onCloseArtistApproveModal}>Cancel</Button>
                                        <Button mb={3} bg='#0C0B86' color='#fff' _focus={{ bg: "#0C0B86", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#0C0B86", }} rightIcon={<ArrowForwardIcon />} marginLeft='1rem' borderRadius={'0px'} onClick={handleApproveArtwork} >Approve</Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </>
                        :
                        <>
                            <Box px={6} py={6}  bg={'#fff'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  maxW={'790px'}>
                                <Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
                                <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'} >You approved {nftDetail?.title} for minting</BioRymHeading>
                                <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>You’ll be notified when {nftDetail?.galleryName} mints the NFT.</Text>
                                <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                    <Button mb={3} bg='#0C0B86' color='#fff' _focus={{ bg: "#0C0B86", }} mx={'auto'} borderRadius={'0px'}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#0C0B86", }} onClick={()=>{
                                     onCloseArtistApproveModal();exit()
                                  }} >Close window</Button>
                                </Box>
                            </Box>
                        </>
}
                    </ModalBody>
                </ModalContent>
            </Modal>
 <Modal onClose={onCloseListNftModal} isOpen={isListNftModal}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick={exit} />
                    <ModalBody>
                        <Formik
                        initialValues={{ price: ""}}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            list(values, resetForm);
                        }} 
                            > 
                            {(formikProps) => ( 
                        <>
                        {listStep==0&&(
                            <>
                            <Box width={'100%'} maxW={'1152px'} m={'auto'} pt={'2rem'} pb={'3.5rem'} mb={'auto'}>
                            <Grid templateColumns="repeat(1, 1fr)" pt={'3rem'}>
                                <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} lineHeight={'32px'}>List NFT</Heading>
                                <Text  fontSize={'16px'} textAlign={'center'} mt={2}   fontWeight={'300'} color={'#1a1a1a'}>List your NFT for sale on your storefront.</Text>
                                <Box width={'100%'} display={'flex'} alignItems={'center'}>
                                    <Flex    pt={'2rem'} width={'100%'} flexWrap={'wrap'}>
                                        <Box  width={{base:"100%",sm:"100%" ,md:"40%" ,lg:"40%",xl:"33.33%"}} maxW={'100%'} mb={{base:"1rem",lg:"0rem"}} pr={{base:'0rem',sm:'0rem',md:'1rem',lg:'2rem'}}>
                                            <Box bg={'#F7F7F7'} p={6} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
                                                <Image mx={'auto'} maxW={'320px'} src={`http://51.222.241.160:8001/api/users/artist_profile/${nftDetail?.file}`} width={'100%'} maxH={'240px'} objectFit={'contain'} />
                                                <Box pt={6} w={'100%'}>
                                                    <Text fontSize={'18px'}   fontWeight={'400'} color={'#636262'} lineHeight={'28px'} mb={1}  textAlign={'left'}>
                                                       {nftDetail?.artistName?nftDetail?.artistName:"Unspecified Artist"}
                                                    </Text>
                                                    <Text fontSize={'18px'} textAlign={'left'} fontWeight={'500'} lineHeight={'28px'} color={'#363535'} mb={1}>
                                                        {nftDetail?.title?nftDetail?.title:"Unspecified title"}
                                                    </Text>
                                                    <Text display={'flex'} alignItems='center' color={'#797979'} fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}><Icon mr={'5px'} width="12px" height="12px" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 1C5.0111 1 4.0444 1.29324 3.22215 1.84265C2.3999 2.39206 1.75904 3.17295 1.3806 4.08658C1.00217 5.00021 0.90315 6.00555 1.09608 6.97545C1.289 7.94536 1.76521 8.83627 2.46447 9.53553C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1573 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67439 10.4712 3.40352 9.53383 2.46617C8.59648 1.52882 7.32561 1.00154 6 1V1ZM8.88625 4.41667L6.03417 8.28708C6.0005 8.33176 5.95826 8.36928 5.90993 8.39745C5.8616 8.42563 5.80814 8.4439 5.75268 8.45119C5.69721 8.45848 5.64085 8.45465 5.58688 8.43993C5.53291 8.4252 5.48241 8.39987 5.43833 8.36542L3.40167 6.73708C3.35893 6.70288 3.32335 6.6606 3.29696 6.61266C3.27057 6.56471 3.25387 6.51203 3.24784 6.45763C3.23565 6.34776 3.2676 6.23756 3.33667 6.15125C3.40574 6.06494 3.50626 6.00961 3.61612 5.99742C3.72599 5.98523 3.8362 6.01718 3.9225 6.08625L5.62083 7.445L8.21542 3.92375C8.24665 3.87688 8.28707 3.83683 8.33422 3.80601C8.38137 3.7752 8.43428 3.75427 8.48975 3.74448C8.54522 3.7347 8.6021 3.73626 8.65694 3.74907C8.71179 3.76189 8.76348 3.78569 8.80887 3.81904C8.85426 3.85239 8.89241 3.8946 8.92103 3.94312C8.94965 3.99163 8.96813 4.04544 8.97536 4.1013C8.9826 4.15716 8.97843 4.21391 8.96311 4.26811C8.9478 4.32232 8.92165 4.37285 8.88625 4.41667Z" fill="#CA9C00"/>
                                                </Icon>
                                                    Certified authentic
                                                </Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                        {!spin?
                                        <Box  width={{base:"100%",sm:"100%" ,md:"60%" ,lg:"60%",xl:"66.66%"}} maxW={'100%'} mb={{base:"1rem",lg:"0rem"}} pl={{base:'0rem',sm:'0rem',md:'1rem',lg:'2rem'}}>
                                            <Box maxW={'100%'} >
                                                {/*<Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>*/}
                                                {/*    <Text fontSize={'16px'} textAlign={'left'} fontWeight={'700'} color={'#363535'} mb={1} lineHeight={'28px'}>Artwork details</Text>*/}
                                                {/*    <Text fontSize={'14px'} textAlign={'left'} fontWeight={'400'} color={'#797979'} lineHeight={'20px'}>Describe the artwork. This is what collectors will see about it.</Text>*/}
                                                {/*</Box>*/}
                                                <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
                                                    <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>List price</Text>
                                                    <Stack spacing={4} width={'100%'} borderColor={'#D2D2D2'} borderRadius={'0px'} mb={2}>
                                                        <InputGroup width={'100%'} borderColor={'#D2D2D2'} borderRadius={'0px'}>
                                                            <InputLeftAddon pl={'21px'} pr={'12px'} children= {<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.20776 0.666748V6.82775L10.4151 9.15463L5.20776 0.666748Z" fill="#636262" fill-opacity="0.602"/>
                                                            <path d="M5.20803 0.666748L0 9.15463L5.20803 6.82775V0.666748Z" fill="#636262"/>
                                                            <path d="M5.20776 13.1471V17.3334L10.4186 10.1243L5.20776 13.1471Z" fill="#636262" fill-opacity="0.602"/>
                                                            <path d="M5.20803 17.3334V13.1464L0 10.1243L5.20803 17.3334Z" fill="#636262"/>
                                                            <path d="M5.20776 12.1781L10.4151 9.15459L5.20776 6.8291V12.1781Z" fill="#636262" fill-opacity="0.2"/>
                                                            <path d="M0 9.15459L5.20803 12.1781V6.8291L0 9.15459Z" fill="#636262" fill-opacity="0.602"/>
                                                            </svg>
                                                                } borderColor={'#D2D2D2'} borderRadius={'0px'} color={'#636262'} bg={'transparent'}  />
                                                            <Input type='text' placeholder='price' borderColor={'#D2D2D2'} borderRadius={'0px'} color={'#636262'} borderLeftColor={'transparent'}
                                                             pl={'3px'}
                                                             _focus={{borderColor:'#D2D2D2!important'}}
                                                            name="price"
                                                            id ="price"
                                                            value={formikProps.values.price}
                                                             onChange={
                                                                 e=>{
                                                                    formikProps.handleChange("price")(e);
                                                                    customhandle(e)
                                                                 }
                                                             } 
                                                             _hover={{borderLeftColor:'transparent'}}
                                                             _active={{borderLeftColor:'transparent'}}
                                                             onBlur={e =>{formikProps.handleBlur("price");customhandle(e)} }
                                                             error={
                                                                 formikProps.errors.price && formikProps.touched.price
                                                                 ? true
                                                                 : false
                                                             }
                                                     />
                                                        </InputGroup>

                                                        {formikProps.errors.price && formikProps.touched.price && (
                                                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                                {formikProps.errors.price}
                                                            </Alert>
                                                        )}
                                                    </Stack >
                                                    <Text fontSize={'14px'} textAlign={'left'} fontWeight={'500'} color={' #8F8F8F'}> <Text as={'span'} fontWeight={'400'}  > Price in USD: </Text>${priceUsd}</Text>
                                                </Box>
                                                <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center'>
                                                    <Text fontSize={'16px'} textAlign={'left'} fontWeight={'500'} color={'#636262'} mb={2} lineHeight={'24px'}>Payment method</Text>
                                                </Box>
                                                <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}  >
                                                    <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6} width={'100%'} >                                                
                                                        
                                                        <ButtonCheckbox                                                               
                                                            {...getCheckboxProps({ value: 'buy' })}
                                                            title="Buy now"
                                                        >
                                                        </ButtonCheckbox>

                                                        <ButtonCheckbox
                                                            {...getCheckboxProps({ value: 'offer' })}
                                                            title="Make offer"
                                                        >
                                                        </ButtonCheckbox>

                                                    </Grid>
                                                </Box>
                                                
                                                

                                            </Box>
                                        </Box>:
                                        <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        margin='auto'
                                        />
                                        }
                                    </Flex>
                                </Box>
                            </Grid>
                                <Divider marginTop='2rem'/>
                                <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                    <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                        <Button mb={3}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  borderRadius={'0px'}  marginLeft='auto' marginRight={'1rem'} onClick={onCloseListNftModal}>Cancel</Button>
                                        <Button mb={3} bg='#0C0B86' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                rightIcon={<ArrowForwardIcon />} marginLeft='1rem' borderRadius={'0px'} onClick={()=>{formikProps.handleSubmit()}} isDisabled={disabled}>List NFT</Button>
                                    </Box>
                                </Grid>
                        </Box>
                        </>
                        )}
                            {listStep==1&&(
                                <>
                                <Box px={6} py={6}  bg={'#fff'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  maxW={'790px'}>
                                <Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
                                <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'}> You listed your NFT for sale on your storefront</BioRymHeading>
                                <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>{`${nftDetail?.title} is listed for ${nftDetail?.price}.`}</Text>
                                <Box display='flex' mb={'3'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}>
                                    <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginRight={'1rem'}
                                    onClick={()=>{
                                        if (galleryPublishedStatus==true)
                                        window.open(`/GalleryStoreFront/${galleryProfile}`)
                                        else
                                        toast({
                                            title: 'Publish your storefront',
                                            description: `Publish your storefront in order to see your NFTs listed for sale. `,
                                            status: 'error',
                                            duration: 5000,
                                            isClosable: true,
                                            position:'top-right', variant:'top-accent',
                                          })
                                    }}>
                                        View in storefront
                                    </Button>
                                    <Button  bg='#0C0B86' color='#fff'   borderRadius={'0px'}  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  onClick={onCloseListNftModal} >Close window</Button>
                                </Box>
                            </Box>
                                </>
                            )} 
                    </>
                )}
                </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
export default NFTsDetailNew;

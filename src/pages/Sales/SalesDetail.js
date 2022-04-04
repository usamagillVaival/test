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

    const acceptOffer = async () => {
        const web3Modal = new Web3Modal({
            providerOptions
        });
        await web3Modal.connect().then(async (r) => {
            if (r?.chainId != "0x4") {
    
                localStorage.removeItem("walletconnect")
                toast({
                    title: 'Error',
                    description: `Please Switch to ${network} Network`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    variant: 'top-accent',
                    position: 'top-right',
                })
            } else {
                const web3 = new Web3(r);
                const accounts = await web3.eth.getAccounts();
                
                if(accounts[0]!=gallery_owner){
                    toast({
                        title: 'Failed',
                        description: `Connect with gallery account`,
                        status: 'error',
                        variant: 'top-accent',
                        duration: 4000,
                        isClosable: true,
                        position: 'top-right',
                    })
                }else{
                    let data1 = {
                                        saleId:offer?._id
                                    };
                                    let ciphertext = CryptoJS.AES.encrypt(
                                        JSON.stringify(data1),
                                        "dvault@123"
                                    ).toString();
                   await server
                                .post(
                                    "/users/getSaleSignature", {
                                        payload: ciphertext,
                                    }, {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                ).then(async(result) => {                 
                                 
                                  const bytes = result?.data?.signature? CryptoJS.AES.decrypt(result?.data?.signature, 'dvault@123'):'';
                                const offerSignature = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
                                const buyer = offer?.collector_offer_account;
                const weiPrice = Number(web3.utils.toWei(offer?.offered_price.toString(), "ether"));
                const galleryAccount = offer?.gallery?.gallery_matamask_puplic_key
                    
                const glryContract = new web3.eth.Contract(GALLERY.abi, offer?.gallery?.gallery_contract_address);
                const owner = await glryContract.methods.ownerOf(offer?.artist_artwork?.token_id).call();
                const ownerAproval = await glryContract.methods.isApprovedForAll(galleryAccount, dadaVaultAddress).call();
                console.log("owner: ",owner);
                console.log("ownerApproval: ", ownerAproval);
                if(gallery_owner==owner&&ownerAproval==true){
                    const wrapeth = new web3.eth.Contract(WETH.abi, WETHaddress);
                const balance = Number(await wrapeth.methods.balanceOf(buyer).call());
                const WethAproval = Number(await wrapeth.methods.allowance(buyer, dadaVaultAddress).call());

                console.log("price: ",weiPrice);
                console.log("wethAproval: ", WethAproval);
                console.log("balance: ",balance)
        
                if (WethAproval>= weiPrice && balance >= weiPrice) {
                    const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
                     dv.methods
                        .acceptOffer(offer?.gallery?.gallery_contract_address, offer?.artist_artwork?.token_id, offer?.collector_offer_account, weiPrice.toString(), offerSignature)
                        .send({
                            from: accounts[0]
                        })
                        .on("transactionHash", async function(hash) {
                            let data = {
                                artId: offer?.artist_artwork?._id,
                                hash,
                                collector_Wallet_address: offer?.collector_offer_account,
                                offerId: offer?._id
                            };
                            let ciphertext = CryptoJS.AES.encrypt(
                                JSON.stringify(data),
                                "dvault@123"
                            ).toString();
                            await server
                                .post(
                                    "/users/InsertAcceptOfferHash", {
                                        payload: ciphertext,
                                    }, {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                ).then(() => {
                                    // api call then
                                }).catch(e => console.log(e))
    
                            toast({
                                title: 'Offer transaction accepted.',
                                description: "Your offer transaction is processing and will confirm in a few minutes",
                                status: 'success',
                                duration: 4000,
                                variant: 'top-accent',
                                isClosable: true,
                                position: 'top-right',
                            })
                        }).then(() => {
                            navigate("/Sales")
                            toast({
                                title: 'Offer transaction completed.',
                                description: `The NFT was transferred to ${offer?.collector?.name}`,
                                status: 'success',
                                duration: 4000,
                                variant: 'top-accent',
                                isClosable: true,
                                position: 'top-right',
                            })
                        }).catch((e) => {
                            toast({
                                title: 'Failed',
                                description: `${e.message}`,
                                status: 'error',
                                variant: 'top-accent',
                                duration: 4000,
                                isClosable: true,
                                position: 'top-right',
                            })
                        })
                } else {
                    console.log("cancel");
                    let data1 = {
                        offerId: offer?._id,
                        reason: "Collector cancelled",
                        galleryProfile: offer?.gallery?.email,
                        artworkId: offer?.artist_artwork?._id,
                        userId: offer?.collector?._id
                    };
                    console.log("cancel: ", data1);
                    let ciphertext1= CryptoJS.AES.encrypt(
                        JSON.stringify(data1),
                        "dvault@123"
                    ).toString();
                    await server
                        .post(
                            "offer/cancelOffer", {
                                payload: ciphertext1,
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        ).then((r) => {
                            navigate("/Sales")
                            toast({
                                title: 'Failed',
                                description: `Offer is not available`,
                                status: 'error',
                                variant: 'top-accent',
                                duration: 4000,
                                isClosable: true,
                                position: 'top-right',
                            })
                        }).catch(e => console.log(e))
    
                }
                }else{
                    toast({
                        title: 'Error',
                        description: `NFT already transfered or Approval removed`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        variant: 'top-accent',
                        position: 'top-right',
                    })
                }
                                
                                }).catch(e => console.log(e))
                }
            }
        })
    
    }

    const rejectOffer = async() =>{
        console.log(offer);
        

        let data = {
            offerId:offer?._id,
            reason:"Gallery rejected",
            galleryProfile: offer?.gallery?.email,
            artworkId:offer?.artist_artwork?._id,
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "offer/cancelOffer",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
            console.log(r.data)
            navigate("/Sales")
            toast({
                title: 'Success',
                description: `Offered Cancelled Successfully`,
                status: 'success',
                duration: 4000, variant:'top-accent',
                isClosable: true,
                position:'top-right',
              }) 

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
                        <Heading color={'#8F8F8F'} fontWeight="400" fontSize="14px" cursor={'pointer'} onClick={()=>navigate("/Sales")}>
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
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >ARTIST</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.artist_artwork.artistName}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >SALE PRICE</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.sale_price} ETH</Text>
                                </Box>
                                {offer?.offered_status==0?
                                <Box px={{base:0,sm:4}} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >OFFERED PRICE</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.offered_price} ETH</Text>
                                </Box>:null
                                }
                                {offer?.sale_status=="completed"||offer?.offered_status==1?
                                <Box px={{base:0,sm:4}} minW={'134px'} mb={{base:'1rem'}}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >GALLERY REVENUE</Text>
                                    {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.offered_price)/100}</Text>
                                    }
                                </Box>:null
                                }
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box  px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                    <Flex flexWrap={'wrap'} mb={{base:4,sm:4,md:0}}>
                        <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}} >
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                                Actions
                            </Text>
                        </Box>
                        <Box width={{base:'100%',sm:'100%',md:'65%'}}  py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}} >
                            <Grid p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>
                                {offer?.sale_status=="completed"||offer?.offered_status==1?
                                    <>
                                <Button
                                 onClick={createPdf}
                                color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} width={'100%'}
                                >
                                    <Icon width="15px" height="14px"  mr={2} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2618 5.9523L10.9285 4.61896L8.4523 7.16421V0.333252H6.54754V7.16421L4.07135 4.61896L2.73802 5.9523L7.49992 10.8094L12.2618 5.9523ZM0.833252 11.7618V13.6666H14.1666V11.7618H0.833252Z" fill="#201F1F"/>
                                    </Icon>
                                        <Text color={'#201F1F'}>Download invoice </Text>
                                </Button>
                                <Button 
                               onClick={createPdf}
                                color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                    <Icon width="15px" height="14px" mr={2} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2618 5.9523L10.9285 4.61896L8.4523 7.16421V0.333252H6.54754V7.16421L4.07135 4.61896L2.73802 5.9523L7.49992 10.8094L12.2618 5.9523ZM0.833252 11.7618V13.6666H14.1666V11.7618H0.833252Z" fill="#201F1F"/>
                                    </Icon>
                                        <Text color={'#201F1F'}>Download receipt </Text>
                                </Button>

                                </>:null
                                }
                                {offer?.offered_status==0?
                                    <>
                                <Button onClick={acceptOffer}  color={'#fff'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='#0F0EA7'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                    Accept offer
                                </Button>
                                 <Button onClick={rejectOffer}  color={'#fff'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='#DD2922'  _focus={{ bg: "#d30901", }}  _hover={{ bg: "#d30901", }} _active={{ bg: "#d30901", }}  marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                     Reject offer
                                         </Button>
                                         </>:null
                                }
                            </Grid>
                        </Box>
                    </Flex>
                    <Divider/>
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
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(2, 1fr)",md:"repeat(3, 1fr)"}} mx={'auto'} gap={6}   mb={8}>
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
                                    Sale type
                                   </Text>
                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'}  lineHeight={'20px'} mb={2}>
                                   {offer?.purchase_option=="buy"?"Buy now":"Make offer"}
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

                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'} mb={{base:4,sm:4 , md:0}}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Payment information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               {offer?.collector?.name} paid with Crypto (ETH)
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns="repeat(2, 1fr)" mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Currency
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   Crypto (ETH)
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Settled to
                                   </Text>
                                   <Link   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                    {offer?.gallery?.gallery_matamask_puplic_key.slice(0,6) +"..." + offer?.gallery?.gallery_matamask_puplic_key.slice(38,42) }
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
                               {offer?.artist_artwork?.artistName} received {offer?.artist_artwork?.revenueSplit}% of the sale price
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:'repeat(1, 1fr)' , sm:'repeat(2, 1fr)', md:'repeat(3, 1fr)'}} mx={'auto'} gap={6}  >
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Gallery received
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.offered_price)/100}</Text>
                                    }
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       DadaVault fee (10%)
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>-{((dadaVaultFee*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(dadaVaultFee*offer?.offered_price)/100}</Text>
                                    }
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Gallery total
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{(((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.artist_artwork?.price)/100).toFixed(6)} ETH</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((100-offer?.artist_artwork?.revenueSplit-dadaVaultFee)*offer?.offered_price)/100}</Text>
                                    }
                                   </Text>
                               </Box>

                           </Grid>
                           <Grid marginTop='1.5rem' templateColumns="repeat(2, 1fr)" mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Artist received
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
                                       Artist’s transaction
                                   </Text>
                                   <Link  isExternal href={`${scanLink}tx/${offer?.artist_artwork?.buying_hash}`}   color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       View on Etherscan
                                   </Link>
                               </Box>
                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/></>:null}
                    {offer?.offered_status==0?
                    <Flex  flexWrap={'wrap'} mb={{base:4,sm:4 ,md:0}}>
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Offer details
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               Learn more about the collector and the offer
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:'repeat(1, 1fr)' , sm:'repeat(2, 1fr)', md:'repeat(3, 1fr)'}} mx={'auto'} gap={6}  >
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       List price
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {offer?.sale_price} ETH
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Offered price
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                      {offer?.offered_price} ETH
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Difference
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {(offer?.sale_price-offer?.offered_price).toFixed(6)} ETH ({((offer?.sale_price-offer?.offered_price)/offer?.sale_price*100).toFixed(0)}%)
                                   </Text>
                               </Box>

                           </Grid>
                           <Grid marginTop='1.5rem' templateColumns="repeat(2, 1fr)" mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Collector name
                                   </Text>
                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {offer?.collector?.name}
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Collector email
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {offer?.collector?.email}
                                   </Text>
                               </Box>
                           </Grid>
                       </Box>
                   </Flex>:null
}
                    <Divider/>
                </Box>
            </Box>
        </>
    );
}

export default SalesDetail;

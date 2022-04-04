import React from "react";
import {Box,Button,Flex,Grid,Heading,Image,Divider,Link,Icon,Text,  Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Spinner,
    ModalBody,
    useDisclosure,} from "@chakra-ui/react";
import {ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"
import CryptoJS from "crypto-js";
import { useToast } from '@chakra-ui/react'
import {ProgressStepFinal} from "../../../components";
import server from "../../../apis/server";
import { useState,useEffect } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import GALLERY from "../../../abis/Gallery.json";
import Web3 from "web3";

import { LoadingScreen } from "../../../components";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { IoReload } from "react-icons/io5";
const InfuraId = process.env.REACT_APP_INFURA_ID;
const scanLink = process.env.REACT_APP_SCAN_LINK;
const network = process.env.REACT_APP_NETWORK
const chain = process.env.REACT_APP_CHAIN_ID
function CreateNftStep4(props) {
     const wallet = useWallet();
     const infuraId=InfuraId
     const providerOptions = {
         walletconnect: {
           package: WalletConnectProvider, // required
           options: {
             infuraId: infuraId, // required
           },
         },
       }
    const artworkEditDetail=props?.artworkEditdetail
    console.log(artworkEditDetail)
    const toast=useToast()
    const state = useSelector(state => state);
    const {mintsteps,accountInfo,nftdetails,nftupload}  =   state?.TradingBot
    const {title,artistName,status,description}=nftdetails
    const {id,file}=nftupload
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    const userID=userType?._id
    const pauseStatus= userType?.pause_status
    const [mintStep,setMintStep]=React.useState(0);
    const [hash,setHash]=React.useState("");
    const [loader,setLoader]=useState(false)
    const contractAdress = userType?.gallery_contract_address
    

    const dispatch = useDispatch();
   

    const { isOpen: isWalletConnectOpen , onOpen: onWalletConnectOpen, onClose:onWalletConnectClose, onClose
    } = useDisclosure();
    const  [disabled, setDisabled] = useState(true); 
    useEffect(() => {
        if (artworkEditDetail?.status==3)
    {
        setDisabled(false)
    }
      },[]);
    



    const handleSaveAndExit=async() =>
    {
        if(props?.dataaaa)
        {
        props?.dataaaa()
        }
        toast({
            title: 'Success',
            description: `Draft has been saved successfully`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:'top-right', variant:'top-accent',
          })
    dispatch(setMintSteps(0))
    }
    const handleMintNFT =async() =>
    { 
        if(pauseStatus=="paused"){
            toast({
                title: 'Error',
                description: `Gallery is deactivated.`,
                status: 'error',
                duration: 4000,
                isClosable: true, variant:'top-accent',
                position:'top-right',
              })
        }else{
        console.log("cahinn: ", chain)
       if(!contractAdress)
       {
        
        toast({
            title: 'Error',
            description: `Gallery assosiated with the artwork is  not deployed yet.`,
            status: 'error',  
            duration: 4000,
            isClosable: true, variant:'top-accent',
            position:'top-right',
          })
       }
       else
       {
        setLoader(true)
            const {data} = await server.post(
            "users/artDetail",  
           {
            artId:artworkEditDetail?._id
           } ,
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
          
          if (data?.art[0]?.mint_status=="minted")
           {
               setLoader(false)
               toast({
                title: 'Error',
                description: `Artwork already minted`,
                status: 'error',  
                duration: 4000, variant:'top-accent',
                isClosable: true,
                   position:'top-right',
              })
           }
           else 
          {
            const web3Modal = new Web3Modal(
                {providerOptions}
               
            );
        await web3Modal.connect().then(async(r)=>{
            const web3 = new Web3(r);
               const accounts = await web3.eth.getAccounts();
               const wallet = accounts[0]


           if(userType?.gallery_matamask_puplic_key.toLowerCase()==wallet.toLowerCase()){
            if ( r?.chainId!="0x4")
            {
                                
                setLoader(false)
                localStorage.removeItem("walletconnect")
               toast({
                   title: 'Error',
                   description: `Please Switch to ${network} Network`,
                   status: 'error',  
                   duration: 4000, variant:'top-accent',
                   isClosable: true,
                      position:'top-right',
                 })
            }
            else
            {
               
       const dataa={
           title:artworkEditDetail?.title?artworkEditDetail?.title:title?title:'' ,
           description:artworkEditDetail?.description?artworkEditDetail?.description:description?description:'',
           imageurl:`http://51.222.241.160:8001/api/users/artist_profile/${artworkEditDetail?.file?artworkEditDetail?.file:file?file:null}`,
       }
      
       let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
       const {data} = await server.post(
           "users/ipfs",
               {
                   payload: ciphertext
               }
           ,
           { 
           headers: {
               "Content-Type": "application/json",
           },
           } 
       )
         const dv = new web3.eth.Contract(GALLERY.abi, contractAdress);
   
               dv.methods
               .safeMint(accounts[0], data)
               .send({ from: accounts[0] },async function(result)
               {
                  
                   if(result)
                   {
                   setLoader(false)
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
                   setDisabled(true)
                   setMintStep(1);
                   setHash(hash); 
                  
                   let data = {
                      artId:artworkEditDetail?._id,
                       hash,
                   };
                   let ciphertext = CryptoJS.AES.encrypt(
                     JSON.stringify(data),
                     "dvault@123"
                   ).toString();
                   await server
                     .post(
                       "/users/InsertMintHash",
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
                     setLoader(false)
                     })
                     .catch((e) => {
                       localStorage.removeItem("walletconnect")
                         console.log(e)});
                 })
               .then(result=>{
                   localStorage.removeItem("walletconnect")
                  console.log(result)
                   setMintStep(2);
                   props.load(1);
                   toast({
                       title: 'Success',
                       description: `Artwork minted successfully`,
                       status: 'success',
                       duration: 4000,
                       isClosable: true, variant:'top-accent',
                       position:'top-right',
                     })
                   
               })
               
               .catch((e) =>{
                   localStorage.removeItem("walletconnect")
                   if (!e?.code)
                   {
                    //    toast({
                    //        title: 'Failed',
                    //        description: `Transaction Rejected by network . Please Switch to your onboarding wallet account  `,
                    //        status: 'error',
                    //        duration: 4000,
                    //        isClosable: true, variant:'top-accent',
                    //        position:'top-right',
                    //      })
                   }
                   setLoader(false)
                  setDisabled(false)
                   setMintStep(0);  
                   
               }
       );
               
            
            }

           }else{
            web3Modal.clearCachedProvider();
            window.localStorage.removeItem('walletconnect');
            toast({
                title: 'Error',
                description: `Please connect with gallery wallet`,
                status: 'error',  
                duration: 4000, variant:'top-accent',
                isClosable: true,
                   position:'top-right',
              })
              setLoader(false);
           }

        }).catch(
            
            (e)=>{
                localStorage.removeItem("walletconnect")
                setLoader(false)
                console.log(e)
                toast({
                    title: 'Failed',
                    description: `${e}  the transaction `,
                    status: 'error',
                    duration: 4000,
                    isClosable: true, variant:'top-accent',
                    position:'top-right',
                  })

            }
            
            )
            ;

    
         }
        }
    }
    }

    return (
        <>

            <Box width={'100%'} maxW={'1152px'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'} display={'flex'} flexDirection={'column'}>

                <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Mint NFT</Heading>
                <Text  fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>You and your artist will each approve the draft before it can be minted.</Text>
                <Grid templateColumns="repeat(1, 1fr)" gap={6} >
                    <Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Flex   m={'auto'} width={'100%'} flexWrap={'wrap'}>
                                    <Box width={{ base: "95%", sm: "85%", md: "50%", lg: "33.33%", xl: "33.33%" }} pr={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Box p={6} bg={'#C4C4C422'} w={'100%'} >
                                            <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${artworkEditDetail?.file?artworkEditDetail?.file:file?file:"Unspecified Image"}`} width={'100%'} maxW={'320'} maxH={'240px'} objectFit={'contain'} />
                                            <Grid templateColumns={{base: "repeat(1, 1fr)",md: "repeat(1, 1fr)"}} pt={6}  >
                                                <Text color={'#636262'} fontWeight={'400'} fontSize={'16px'} lineHeight={'28px'} pb={1}>{artworkEditDetail?.title?artworkEditDetail?.title:title?title:"Unspecified title"}</Text>
                                                <Text color={'#363535'} fontWeight={'500'} fontSize={'18px'} mb={'4px'} lineHeight={'28px'} >{artworkEditDetail?.artistName?artworkEditDetail?.artistName:artistName?artistName:"Unspecified artist"}</Text>
                                                {/* <Heading color={'#363535'} fontWeight={'500'} fontSize={'18px'} mb={'4px'} >{title},    {year}, Ed. 1/1</Heading> */}
                                                {artworkEditDetail?.status==3?
                                                <Text color={'#797979'} fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}><Icon mr={'5px'} width="12px" height="12px" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 1C5.0111 1 4.0444 1.29324 3.22215 1.84265C2.3999 2.39206 1.75904 3.17295 1.3806 4.08658C1.00217 5.00021 0.90315 6.00555 1.09608 6.97545C1.289 7.94536 1.76521 8.83627 2.46447 9.53553C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1573 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67439 10.4712 3.40352 9.53383 2.46617C8.59648 1.52882 7.32561 1.00154 6 1V1ZM8.88625 4.41667L6.03417 8.28708C6.0005 8.33176 5.95826 8.36928 5.90993 8.39745C5.8616 8.42563 5.80814 8.4439 5.75268 8.45119C5.69721 8.45848 5.64085 8.45465 5.58688 8.43993C5.53291 8.4252 5.48241 8.39987 5.43833 8.36542L3.40167 6.73708C3.35893 6.70288 3.32335 6.6606 3.29696 6.61266C3.27057 6.56471 3.25387 6.51203 3.24784 6.45763C3.23565 6.34776 3.2676 6.23756 3.33667 6.15125C3.40574 6.06494 3.50626 6.00961 3.61612 5.99742C3.72599 5.98523 3.8362 6.01718 3.9225 6.08625L5.62083 7.445L8.21542 3.92375C8.24665 3.87688 8.28707 3.83683 8.33422 3.80601C8.38137 3.7752 8.43428 3.75427 8.48975 3.74448C8.54522 3.7347 8.6021 3.73626 8.65694 3.74907C8.71179 3.76189 8.76348 3.78569 8.80887 3.81904C8.85426 3.85239 8.89241 3.8946 8.92103 3.94312C8.94965 3.99163 8.96813 4.04544 8.97536 4.1013C8.9826 4.15716 8.97843 4.21391 8.96311 4.26811C8.9478 4.32232 8.92165 4.37285 8.88625 4.41667Z" fill="#CA9C00"/>
                                                </Icon>
                                                    Certified authentic
                                                </Text>
                                                :null}
                                            </Grid>
                                        </Box>
                                    </Box>
                                    
                                        <Box  width={{base:"95%",sm:"85%" ,md:"50%" ,lg:"66.66%%",xl:"66.66%"}} maxW={'100%'} pl={2} d={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        {mintStep==0?

                                        loader==true?
                                        <Box width='100%' height='100%' display='flex'
                                        alignItems='center'
                                        justifyContent='center'>
                                             <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        
                                      />

                                        </Box>
                                       :<ProgressStepFinal status={artworkEditDetail?.status} artistDate={artworkEditDetail?.sendToArtistDate} artistApprovalDate={artworkEditDetail?.artistApprovalDate} />
                                        :null
                                        }
                                        {mintStep==1&&(
                                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                            <Text fontWeight={'500'} color={'#363535'} fontSize={'18px'} mb={'8px'} textAlign={'center'}>Minting in progress </Text>
                                            <Text fontWeight={'400'} color={'#8F8F8F'} fontSize={'14px'} mb={6} textAlign={'center'}>It can take a few minutes to mint the NFT. Click the link below to see the transaction progress.
                                            </Text>
                                            <Link href={`${scanLink}${hash}`} isExternal fontWeight={'500'} color={'#0C0B86'} fontSize={'14px'} textAlign={'center'}>View transaction on Etherscan</Link>
                                        </Box>
                                        )}
                                            {mintStep==2&&(
                                                <Box  width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"66.66%"}} maxW={'100%'} pl={2} d={'flex'} flexDirection={'column'} h={'100%'} alignItems={'center'} justifyContent={'center'}>
                                                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} h={'100%'} justifyContent={'center'}>
                                                        <Text fontWeight={'500'} color={'#363535'} fontSize={'18px'} mb={'8px'} textAlign={'center'}>Your NFT is minted</Text>
                                                        <Text fontWeight={'400'} color={'#8F8F8F'} fontSize={'14px'} mb={6} textAlign={'center'}>Congratulations! Your NFT is minted. You can now list it for sale on your complementary DadaVault storefront.

                                                        </Text>
                                                        <Link href={`${scanLink}${hash}`} isExternal fontWeight={'500'} color={'#0C0B86'} fontSize={'14px'} textAlign={'center'}>View transaction on Etherscan</Link>
                                                    </Box>
                                                </Box>
                                            )}
                                    </Box>
                                    

                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Box mt={'2.5rem'}>
                    <Divider/>
                    <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                        <Box display='flex' mb={'3'}>
                            <Button  textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto'   onClick={handleSaveAndExit} >Save & exit</Button>
                            <Button bg='#0C0B86' color='#fff' borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                    rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={handleMintNFT} isDisabled={disabled} >Mint NFT</Button>
                        </Box>
                    </Grid>

                </Box>

            </Box>
        </>
    );
}

export default CreateNftStep4;

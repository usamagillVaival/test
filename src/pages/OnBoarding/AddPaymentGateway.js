import React, {useEffect, useState} from "react";
import {   useDispatch, useSelector} from 'react-redux'
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
    Checkbox,
    Textarea,
    Container,
    FormControl,
    InputRightElement,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter, Modal, useDisclosure
} from "@chakra-ui/react";
import {ExternalLinkIcon, ChevronLeftIcon, SearchIcon} from '@chakra-ui/icons'
import { navigate } from "@reach/router";
import {BioRymHeading} from "../../assets/StyledComponent/styeledComponent";
import {IoMdArrowForward , IoIosLock } from "react-icons/io";
import { useWallet } from "use-wallet";
import server from '../../apis/server'
import CryptoJS from 'crypto-js'
import {setToken,setUser} from "../../redux/action/tradingBot"
import { Spinner } from '@chakra-ui/react'
import { LoadingScreen } from "../../components";
import { useToast } from '@chakra-ui/react'
import Web3Modal from "web3modal";
import Web3 from "web3";
import { CacheProvider } from "@emotion/react";
import WalletConnectProvider from '@walletconnect/web3-provider'
const InfuraId = process.env.REACT_APP_INFURA_ID;
const chain = process.env.REACT_APP_CHAIN_ID
const network = process.env.REACT_APP_NETWORK
const moonPayApiKey = process.env.REACT_APP_MOONPAY_APIKEY;
function AddPaymentGateway(props) {
    const toast=useToast()
    const [chainid,setChainId]=useState('')
    const [walletAccount,setWalletAccount]=useState('')
    const email=props?.location?.state?.value
    const state = useSelector((state) => state);
    const {galleryProfileDetails}  =   state?.TradingBot
    const {gallery_profile, gallery_email,website,bio,vat,file} = galleryProfileDetails
    const [loader,setLoader]=React.useState(false)
    const { isOpen: isMoonpayOpen , onOpen: onMoonpayOpen, onClose: onMoonpayClose } = useDisclosure();



    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const wallet=useWallet()
    
    const current=new Date()
    const infuraId=InfuraId
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: infuraId, // required
          },
        },
      }
    useEffect(() => {
        if(localStorage?.getItem("walletconnected"))
        {
            setWalletAccount(localStorage.getItem("walletconnected"))
        }
        // (async () => {
        //     if(localStorage.getItem("walletconnected")) await handleMetamaskConnect();
        //  })()
        
        //  window?.ethereum?.on('accountsChanged', (accounts) => {
        //      handleMetamaskConnect()
        //   });
        // window.ethereum.on('chainChanged', (chainId) => {
        //     console.log(chainid)
        //     toast({
        //         title: 'Failure',
        //         description:"please switch to Ropsten network ",
        //         status: 'error',
        //         duration: 4000,
        //         isClosable: true,
        //       })
        //     setChainId('')
        //     // Handle the new chain.
        //     // Correctly handling chain changes can be complicated.
        //     // We recommend reloading the page unless you have good reason not to.
            
        //   });
      },[]);

    const handleSignup =async(values, resetForm) => {
        console.log(wallet.account)
        let bodyFormData = new FormData();
        bodyFormData.append(`account_type`, "gallery");
        bodyFormData.append('email', email);
        bodyFormData.append('gallery_profile', gallery_profile);
        // bodyFormData.append('gallery_email', gallery_email);
        bodyFormData.append('gallery_website', website);
        bodyFormData.append('gallery_bio', bio);
        bodyFormData.append('gallery_vat_registration', vat);
        bodyFormData.append('gallery_signup_step',3 );
        bodyFormData.append('gallery_matamask_puplic_key',walletAccount );

        // gallery_contract_address
        if(file!==undefined){
            bodyFormData.append('file', file);
        }
      
        

        try  { 
            setLoader(true)
            const {data} = await server.post(
                
                `user/createGalleryAccount`,
                  bodyFormData 
                  ,
                { 
                  headers: {
                    "Content-Type": 'multipart/form-data',
                  },
                } 
              )
             
            //    alert(JSON.stringify(data))
              if(data){
                  
                  setLoader(false)
                  toast({
                    title: 'Gallery Account Created',
                    status: 'success',
                    duration: 4000, variant:'top-accent',
                    isClosable: true,
                      position:'top-right',
                  })
                console.log("data updated")
                console.log(data)
                // toast({
                //     title: 'Record Uptated',
                //     description: ``,
                //     status: 'success',
                //     duration: 4000,
                //     isClosable: true,
                //   })

                // localStorage.setItem('token', data.Token);
                // let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.User), 'userObject').toString();
                // localStorage.setItem('User', JSON.stringify(userObj));
                // dispatch(setToken(data.Token))
 
                // dispatch(setUser(data.User))
                localStorage.removeItem("walletconnected");
                navigate("/Login")
              }
             
          } catch (e) {
            setLoader(false)
          }


    }



    const  handleMetamaskConnect=async () =>
    {
        
        const web3Modal = new Web3Modal(
            {
    
                providerOptions,
                
            }
        );

        web3Modal.connect().then(async(r)=>{
            console.log("chainnn: ", chain)
            if(r?.networkVersion==chain || r?.chainId==chain)
            {
                
            console.log(r)
            const web3 = new Web3(r);
            const account=(await web3.eth.getAccounts())
            r.on("accountsChanged", (accounts) => {
                localStorage.setItem("walletconnected",account[0])
                setWalletAccount(accounts[0])
              });
              r.on("chainChanged", (chainId) => {
                 
                  if (chainId !='0x4')
                  {
                    console.log("chain",chainId)
                   setWalletAccount('')   
                    toast({
                        title: 'Failure',
                        description:`please switch to ${network} network`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true, variant:'top-accent',
                        position:'top-right',
                      })
                  }
               
              });
                 localStorage.setItem("walletconnected",account[0])
                 setWalletAccount(account[0])
            }
            else
            {
                localStorage.removeItem("walletconnect")
                console.log("hello")
                toast({
                    title: 'Failure',
                    description:`please switch to ${network} network`,
                    status: 'error',
                    duration: 4000,
                    isClosable: true, variant:'top-accent',
                    position:'top-right',
                  })
            }
        })
       

    }
    
    function handleWalletDisconnect()
    { 
        localStorage.removeItem("walletconnected");
        localStorage.removeItem("walletconnect")
       setWalletAccount('')

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
            <Box as='section' bg={'#F7F7F7'} className='Login'>
                <Flex overflowY={'scroll'} >
                    <Box as='section' mx={'auto'}  pb="12" px={{ md: '8' }} display={'flex'} flexDirection={'column'}  direction="column"  minHeight='100vh'>
                        <Flex mx='auto'mt={'4rem'} mb={'6rem'}>
                            <svg width="164" height="39" viewBox="0 0 164 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.3977 10.1291H51.642C55.4568 10.0533 56.9979 11.6196 56.9473 15.485V22.8115C57.0232 26.6768 55.4568 28.2432 51.642 28.1674H47.3977V10.1291ZM51.7178 25.9191C53.6378 25.9191 54.1431 25.1612 54.1684 22.3316V15.9651C54.1431 13.1355 53.6378 12.3777 51.7178 12.3777H50.1766V25.9191H51.7178Z" fill="#0F0EA7"/>
                                <path d="M64.0987 24.4284L63.2903 28.1674H60.2839L65.1851 10.129H67.5092L72.3851 28.1674H69.3788L68.5956 24.4284H64.0987ZM66.3472 13.9692L64.5786 22.1799H68.0904L66.3472 13.9692Z" fill="#0F0EA7"/>
                                <path d="M76.3235 10.1291H80.5677C84.3825 10.0533 85.9237 11.6196 85.8732 15.485V22.8115C85.9489 26.6768 84.3825 28.2432 80.5677 28.1674H76.3235V10.1291ZM80.6436 25.9191C82.5635 25.9191 83.0688 25.1612 83.094 22.3316V15.9651C83.0688 13.1355 82.5635 12.3777 80.6436 12.3777H79.1024V25.9191H80.6436Z" fill="#0F0EA7"/>
                                <path d="M93.0248 24.4284L92.2163 28.1674H89.21L94.1111 10.1291H96.4354L101.311 28.1674H98.305L97.5218 24.4284L93.0248 24.4284ZM95.2732 13.9692L93.5048 22.1799H97.0165L95.2732 13.9692Z" fill="#0F0EA7"/>
                                <path d="M102.276 10.1291H105.055L107.884 23.6451L110.689 10.1291H113.468L109.097 28.1674H106.646L102.276 10.1291Z" fill="#0F0EA7"/>
                                <path d="M118.307 24.4284L117.499 28.1674H114.493L119.394 10.129H121.718L126.594 28.1674H123.588L122.805 24.4284H118.307ZM120.556 13.9692L118.788 22.1799H122.299L120.556 13.9692Z" fill="#0F0EA7"/>
                                <path d="M132.831 10.1291V22.761C132.831 23.999 132.907 24.6305 133.109 25.0854C133.437 25.8431 133.918 26.1465 134.776 26.1465C135.838 26.1465 136.343 25.8179 136.671 24.9338C136.823 24.5042 136.873 23.8726 136.873 22.7611V10.1291H139.652V22.7611C139.652 24.9338 139.476 25.8432 138.844 26.7275C137.985 27.9149 136.823 28.4202 134.852 28.4202C132.755 28.4202 131.492 27.8139 130.684 26.4497C130.204 25.6413 130.052 24.7569 130.052 22.7612V10.1292L132.831 10.1291Z" fill="#0F0EA7"/>
                                <path d="M144.571 10.1291H147.35V25.8683H152.908V28.1675H144.571V10.1291Z" fill="#0F0EA7"/>
                                <path d="M157.914 12.4281H154.756V10.1291H163.851V12.4281H160.693V28.1674H157.914V12.4281Z" fill="#0F0EA7"/>
                                <path d="M19.2301 10.0797L16.4219 7.27145H22.0383L19.2301 10.0797Z" fill="#0F0EA7"/>
                                <path d="M19.2303 11.3205C17.324 11.3205 15.4606 11.8858 13.8757 12.9448C12.2907 14.0039 11.0554 15.5091 10.3259 17.2702C9.59646 19.0314 9.4056 20.9692 9.77748 22.8388C10.1494 24.7084 11.0673 26.4257 12.4152 27.7736C13.7631 29.1215 15.4804 30.0395 17.35 30.4113C19.2196 30.7832 21.1575 30.5924 22.9186 29.8629C24.6797 29.1334 26.1849 27.8981 27.244 26.3131C28.303 24.7282 28.8683 22.8647 28.8683 20.9585C28.8683 18.4024 27.8528 15.9509 26.0454 14.1434C24.2379 12.336 21.7864 11.3205 19.2303 11.3205ZM26.8969 24.1341C26.8583 24.2273 25.3526 23.7434 24.4753 23.4524C24.2342 23.9582 23.9213 24.4264 23.5463 24.8427C24.1585 25.5342 25.1925 26.7318 25.0981 26.8263C25.0509 26.8735 23.8346 25.8599 23.1274 25.2633C22.7101 25.6415 22.24 25.957 21.7319 26.2001C22.0328 27.0733 22.5293 28.5741 22.4059 28.6251C22.3757 28.6377 21.6275 27.2426 21.1921 26.4249C20.6592 26.6162 20.1011 26.7283 19.5357 26.7574C19.4795 27.6792 19.3639 29.2568 19.2303 29.2568C19.0967 29.2568 18.9812 27.6792 18.925 26.7574C18.3595 26.7283 17.8014 26.6162 17.2685 26.4249C16.8331 27.2426 16.0849 28.6377 16.0547 28.6251C15.9313 28.574 16.4278 27.0733 16.7288 26.2001C16.2207 25.957 15.7505 25.6415 15.3331 25.2633C14.6261 25.8599 13.4098 26.8735 13.3625 26.8263C13.268 26.7318 14.3022 25.5341 14.9143 24.8427C14.5393 24.4264 14.2264 23.9582 13.9853 23.4524C13.1078 23.7434 11.6022 24.2273 11.5637 24.1341C11.5126 24.0108 12.9254 23.3004 13.7556 22.8957C13.5694 22.3703 13.4602 21.8206 13.4314 21.2639C12.5095 21.2077 10.932 21.0921 10.932 20.9585C10.932 20.8249 12.5095 20.7093 13.4314 20.6532C13.4602 20.0964 13.5694 19.5468 13.7556 19.0213C12.9254 18.6167 11.5126 17.9063 11.5637 17.7829C11.6148 17.6595 13.1155 18.1561 13.9887 18.457C14.2294 17.9541 14.5411 17.4885 14.9142 17.0744C14.302 16.3829 13.2681 15.1853 13.3625 15.0908C13.4568 14.9963 14.6546 16.0305 15.3461 16.6425C15.7603 16.2693 16.2259 15.9577 16.7287 15.717C16.4278 14.8437 15.9313 13.343 16.0547 13.2919C16.1781 13.2409 16.8884 14.6537 17.2931 15.4839C17.8186 15.2977 18.3682 15.1885 18.9249 15.1596C18.9811 14.2378 19.0967 12.6602 19.2303 12.6602C19.3639 12.6602 19.4794 14.2378 19.5356 15.1596C20.0924 15.1885 20.642 15.2977 21.1675 15.4839C21.5721 14.6536 22.2825 13.2408 22.4059 13.2919C22.5293 13.3431 22.0328 14.8437 21.7318 15.717C22.2346 15.9577 22.7002 16.2694 23.1143 16.6425C23.8059 16.0305 25.0035 14.9964 25.098 15.0908C25.1925 15.1852 24.1583 16.3829 23.5462 17.0744C23.9194 17.4885 24.2311 17.9541 24.4718 18.457C25.345 18.1561 26.8458 17.6596 26.8969 17.7829C26.9479 17.9063 25.5351 18.6167 24.7049 19.0213C24.8911 19.5468 25.0003 20.0964 25.0292 20.6532C25.951 20.7094 27.5286 20.825 27.5286 20.9586C27.5286 21.0922 25.951 21.2077 25.0292 21.2639C25.0003 21.8207 24.8911 22.3703 24.7049 22.8958C25.5351 23.3004 26.948 24.0108 26.8969 24.1341H26.8969Z" fill="#0F0EA7"/>
                                <path d="M37.1697 32.0454C36.1766 30.6553 35.5344 28.6628 36.1766 27.4915C36.8985 26.1752 37.7652 24.8108 37.354 22.7752C37.245 22.2589 37.1668 21.7366 37.1198 21.211C37.1198 21.211 38.4602 20.2886 38.4602 19.2733C38.4602 18.2579 37.1198 17.3356 37.1198 17.3356C37.1668 16.8099 37.245 16.2874 37.354 15.771C37.7652 13.7357 36.8985 12.3713 36.1766 11.055C35.5343 9.88345 36.1766 7.89118 37.1697 6.50108C38.1628 5.11098 37.8467 4.39293 37.8467 3.35902C37.8467 2.32511 38.5596 1.77161 37.8149 0.688338C36.7316 -0.0563582 36.1781 0.656593 35.1442 0.656593C34.1103 0.656593 33.3923 0.340966 32.0024 1.33381C30.6126 2.32665 24.7675 -0.368426 22.7322 0.0430238C21.7824 0.23494 21.1677 1.38349 21.1677 1.38349C21.1677 1.38349 20.2456 0.0430238 19.2303 0.0430238C18.215 0.0430238 17.2925 1.38349 17.2925 1.38349C17.2925 1.38349 16.6779 0.234963 15.7281 0.0430238C13.6928 -0.368449 7.84805 2.3267 6.45817 1.33388C5.0683 0.341056 4.34979 0.656684 3.31611 0.656684C2.28243 0.656684 1.72872 -0.0562221 0.645427 0.688428C-0.0992686 1.7717 0.613683 2.32552 0.613683 3.35911C0.613683 4.3927 0.297828 5.11105 1.29065 6.50117C2.28347 7.8913 2.92597 9.88354 2.28379 11.0551C1.56175 12.3714 0.695062 13.7359 1.10626 15.7712C1.21522 16.2876 1.29343 16.81 1.34049 17.3357C1.34049 17.3357 0 18.258 0 19.2733C0 20.2886 1.34049 21.2111 1.34049 21.2111C1.29343 21.7366 1.21522 22.2589 1.10626 22.7752C0.695062 24.8108 1.56175 26.1752 2.28368 27.4915C2.92593 28.6628 2.28368 30.6553 1.29054 32.0454C0.297398 33.4356 0.61357 34.1536 0.61357 35.1873C0.61357 36.2209 -0.0993366 36.7746 0.645314 37.8582C1.72861 38.6026 2.28241 37.8899 3.316 37.8899C4.34959 37.8899 5.06796 38.2055 6.45806 37.2127C7.84816 36.2199 13.6927 38.9148 15.728 38.5033C16.6778 38.3112 17.2925 37.1631 17.2925 37.1631C17.2925 37.1631 18.2147 38.5033 19.2303 38.5033C20.2459 38.5033 21.1678 37.1631 21.1678 37.1631C21.1678 37.1631 21.7824 38.3112 22.7323 38.5033C24.7676 38.9148 30.6124 36.2199 32.0025 37.2127C33.3926 38.2055 34.1106 37.8899 35.1443 37.8899C36.1779 37.8899 36.7317 38.6026 37.815 37.8582C38.5597 36.7746 37.8467 36.2211 37.8467 35.1873C37.8467 34.1534 38.1625 33.4353 37.1697 32.0454ZM19.2302 32.8677H6.92291C6.58156 32.8677 6.25419 32.7321 6.01282 32.4908C5.77145 32.2494 5.63585 31.922 5.63584 31.5807V6.96595C5.63584 6.6246 5.77144 6.29723 6.01281 6.05586C6.25419 5.81449 6.58156 5.67889 6.92291 5.67889H31.5374C31.8788 5.67889 32.2061 5.8145 32.4475 6.05587C32.6889 6.29724 32.8245 6.62461 32.8245 6.96595V31.5807C32.8245 31.922 32.6889 32.2494 32.4475 32.4908C32.2061 32.7321 31.8788 32.8677 31.5374 32.8677H19.2302Z" fill="#0F0EA7"/>
                            </svg>
                        </Flex>
                        <Box mb={'2rem'} pb={0} >
                            <BioRymHeading color="#363535" fontSize='1.5rem'  mb='0.5rem'  fontWeight='700' lineHeight={'32px'}  textAlign={'center'}>Add payment gateways</BioRymHeading>
                            <Text display={'flex'} alignItmes={'center'} justifyContent={'center'}  fontSize='16px' fontWeight={'400'} color={'#797979'} lineHeight={'24px'} >Connect a crypto wallet and a MoonPay account to accept payments in both crypto and fiat.</Text>
                        </Box>
                        <Box className="Box-card" p='2rem' maxW="3xl" mx="auto" bg='#fff' borderRadius='0.5rem' width={'100%'} minW={{base: "98%", sm:"98%", md: "98%", lg: "784px" ,xl:'784px'}}>

                            <FormControl >
                            
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                   
                                    
                                    <FormLabel color='#363535' fontSize={'18px'} fontWeight='500' >Crypto wallet</FormLabel>
                                    {!walletAccount?
                                    <Button onClick={handleMetamaskConnect}  display={'flex'} leftIcon={
                                            <Icon width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.3779 1.6875L10.1094 6.32578L11.2751 3.59229L16.3779 1.6875Z" fill="#201F1F" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M1.91943 1.6875L8.13217 6.36907L7.02232 3.59229L1.91943 1.6875Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M14.121 12.4421L12.4531 14.99L16.0245 15.9734L17.0476 12.4978L14.121 12.4421Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                  <path d="M1.25586 12.4978L2.27271 15.9734L5.83791 14.99L4.17621 12.4421L1.25586 12.4978Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.64584 8.13778L4.65381 9.63441L8.18799 9.79521L8.0702 5.99182L5.64584 8.13778Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.6515 8.13781L10.19 5.94855L10.1094 9.79523L13.6435 9.63444L12.6515 8.13781Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83789 14.99L7.97698 13.9572L6.13552 12.5225L5.83789 14.99Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.3203 13.9572L12.4532 14.99L12.1618 12.5225L10.3203 13.9572Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.4532 14.9902L10.3203 13.9574L10.4939 15.3427L10.4753 15.9302L12.4532 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83789 14.9902L7.82201 15.9302L7.8096 15.3427L7.97698 13.9574L5.83789 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M7.85876 11.6073L6.08545 11.0878L7.33791 10.5126L7.85876 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.438 11.6073L10.9588 10.5126L12.2175 11.0878L10.438 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83745 14.99L6.14749 12.4421L4.17578 12.4978L5.83745 14.99Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.1499 12.4421L12.4537 14.99L14.1216 12.4978L12.1499 12.4421Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M13.6435 9.6344L10.1094 9.79519L10.438 11.6073L10.9588 10.5126L12.2175 11.0877L13.6435 9.6344Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.08608 11.0877L7.33854 10.5126L7.85939 11.6073L8.18799 9.79519L4.65381 9.6344L6.08608 11.0877Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4.65381 9.6344L6.1357 12.5225L6.08606 11.0877L4.65381 9.6344Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.2179 11.0877L12.1621 12.5225L13.644 9.6344L12.2179 11.0877Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M8.18803 9.79517L7.85938 11.6072L8.27479 13.747L8.36782 10.9269L8.18803 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.1097 9.79517L9.93604 10.9208L10.0229 13.747L10.4383 11.6072L10.1097 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.4384 11.6073L10.0229 13.747L10.3206 13.9573L12.1621 12.5225L12.2179 11.0878L10.4384 11.6073Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.08545 11.0878L6.13509 12.5225L7.97655 13.9573L8.27417 13.747L7.85876 11.6073L6.08545 11.0878Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.4757 15.9301L10.4943 15.3426L10.3331 15.2066H7.96462L7.8096 15.3426L7.82201 15.9301L5.83789 14.9901L6.53232 15.5591L7.9398 16.53H10.3517L11.7654 15.5591L12.4536 14.9901L10.4757 15.9301Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.3202 13.9572L10.0226 13.747H8.27409L7.97651 13.9572L7.80908 15.3426L7.9641 15.2065H10.3326L10.4938 15.3426L10.3202 13.9572Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.6446 6.6288L17.1717 4.06848L16.378 1.6875L10.3203 6.17119L12.6516 8.13779L15.944 9.0964L16.6694 8.24914L16.3532 8.02029L16.8554 7.56268L16.471 7.26582L16.9733 6.88238L16.6446 6.6288Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M1.125 4.06848L1.65823 6.6288L1.31721 6.88238L1.82564 7.26582L1.44122 7.56268L1.94344 8.02029L1.62722 8.24914L2.35266 9.0964L5.64506 8.13779L7.97635 6.17119L1.91864 1.6875L1.125 4.06848Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.9443 9.09631L12.6519 8.13776L13.644 9.63439L12.1621 12.5225L14.1214 12.4977H17.048L15.9443 9.09631Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.64567 8.13776L2.35331 9.09631L1.25586 12.4977H4.17621L6.13549 12.5225L4.65364 9.63439L5.64567 8.13776Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.1102 9.79522L10.321 6.17115L11.2759 3.59229H7.02246L7.97729 6.17115L8.1881 9.79522L8.26872 10.9331L8.27492 13.747H10.0234L10.0296 10.9331L10.1102 9.79522Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                            </Icon>
                                    }  maxW={'194px'}  minW={'194px'} py='1.5rem' border={'1px solid #D2D2D2'} w='100%' mt='1rem' borderRadius={'0px'} bg='#fff' color='#201F1F' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}
                                     
                                    > Connect Wallet  </Button>
                                
                                :
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                <Box mb={'2.25rem'}  display='flex' width={'100%'}>
                                    <Box display='flex' flexDirection={'column'}>
                                        <FormLabel>Wallet Name 1</FormLabel>
                                        <Text color={'#8F8F8F'} fontSize={'14px'} fontWeight={'500'} ><Text as='span' >
                                            <Icon mr={2} width="18"  height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.3779 1.6875L10.1094 6.32578L11.2751 3.59229L16.3779 1.6875Z" fill="#201F1F" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M1.91943 1.6875L8.13217 6.36907L7.02232 3.59229L1.91943 1.6875Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M14.121 12.4421L12.4531 14.99L16.0245 15.9734L17.0476 12.4978L14.121 12.4421Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M1.25586 12.4978L2.27271 15.9734L5.83791 14.99L4.17621 12.4421L1.25586 12.4978Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.64584 8.13778L4.65381 9.63441L8.18799 9.79521L8.0702 5.99182L5.64584 8.13778Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.6515 8.13781L10.19 5.94855L10.1094 9.79523L13.6435 9.63444L12.6515 8.13781Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83789 14.99L7.97698 13.9572L6.13552 12.5225L5.83789 14.99Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.3203 13.9572L12.4532 14.99L12.1618 12.5225L10.3203 13.9572Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.4532 14.9902L10.3203 13.9574L10.4939 15.3427L10.4753 15.9302L12.4532 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83789 14.9902L7.82201 15.9302L7.8096 15.3427L7.97698 13.9574L5.83789 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M7.85876 11.6073L6.08545 11.0878L7.33791 10.5126L7.85876 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.438 11.6073L10.9588 10.5126L12.2175 11.0878L10.438 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.83745 14.99L6.14749 12.4421L4.17578 12.4978L5.83745 14.99Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.1499 12.4421L12.4537 14.99L14.1216 12.4978L12.1499 12.4421Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M13.6435 9.6344L10.1094 9.79519L10.438 11.6073L10.9588 10.5126L12.2175 11.0877L13.6435 9.6344Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.08608 11.0877L7.33854 10.5126L7.85939 11.6073L8.18799 9.79519L4.65381 9.6344L6.08608 11.0877Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M4.65381 9.6344L6.1357 12.5225L6.08606 11.0877L4.65381 9.6344Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.2179 11.0877L12.1621 12.5225L13.644 9.6344L12.2179 11.0877Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M8.18803 9.79517L7.85938 11.6072L8.27479 13.747L8.36782 10.9269L8.18803 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.1097 9.79517L9.93604 10.9208L10.0229 13.747L10.4383 11.6072L10.1097 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.4384 11.6073L10.0229 13.747L10.3206 13.9573L12.1621 12.5225L12.2179 11.0878L10.4384 11.6073Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M6.08545 11.0878L6.13509 12.5225L7.97655 13.9573L8.27417 13.747L7.85876 11.6073L6.08545 11.0878Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.4757 15.9301L10.4943 15.3426L10.3331 15.2066H7.96462L7.8096 15.3426L7.82201 15.9301L5.83789 14.9901L6.53232 15.5591L7.9398 16.53H10.3517L11.7654 15.5591L12.4536 14.9901L10.4757 15.9301Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.3202 13.9572L10.0226 13.747H8.27409L7.97651 13.9572L7.80908 15.3426L7.9641 15.2065H10.3326L10.4938 15.3426L10.3202 13.9572Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16.6446 6.6288L17.1717 4.06848L16.378 1.6875L10.3203 6.17119L12.6516 8.13779L15.944 9.0964L16.6694 8.24914L16.3532 8.02029L16.8554 7.56268L16.471 7.26582L16.9733 6.88238L16.6446 6.6288Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M1.125 4.06848L1.65823 6.6288L1.31721 6.88238L1.82564 7.26582L1.44122 7.56268L1.94344 8.02029L1.62722 8.24914L2.35266 9.0964L5.64506 8.13779L7.97635 6.17119L1.91864 1.6875L1.125 4.06848Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M15.9443 9.09631L12.6519 8.13776L13.644 9.63439L12.1621 12.5225L14.1214 12.4977H17.048L15.9443 9.09631Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5.64567 8.13776L2.35331 9.09631L1.25586 12.4977H4.17621L6.13549 12.5225L4.65364 9.63439L5.64567 8.13776Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M10.1102 9.79522L10.321 6.17115L11.2759 3.59229H7.02246L7.97729 6.17115L8.1881 9.79522L8.26872 10.9331L8.27492 13.747H10.0234L10.0296 10.9331L10.1102 9.79522Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                            </Icon>
                                        </Text>
                                            {walletAccount}

                                        </Text>
                                        <Text textAlign={'left'} color='#636262' fontSize={'16px'} fontWeight={'400'} mt={'1.5rem'}>Connected on {new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Text>
                                    </Box>
                                    <Box ml={'auto'}>
                                        <Icon cursor={'pointer'} mr={2} width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleMetamaskConnect} >
                                            <rect width="32" height="32" fill="#E6E6E6"/>
                                            <path d="M12.8287 20H10V17.1713L17.6233 9.54797C17.7484 9.42299 17.9179 9.35278 18.0947 9.35278C18.2714 9.35278 18.441 9.42299 18.566 9.54797L20.452 11.434C20.577 11.559 20.6472 11.7285 20.6472 11.9053C20.6472 12.0821 20.577 12.2516 20.452 12.3766L12.8287 20ZM10 21.3333H22V22.6666H10V21.3333Z" fill="#636262"/>
                                        </Icon>
                                        <Icon cursor={'pointer'} width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleWalletDisconnect}>
                                            <rect width="32" height="32" fill="#E6E6E6"/>
                                            <path d="M19.3335 12H22.6668V13.3333H21.3335V22C21.3335 22.1768 21.2633 22.3464 21.1382 22.4714C21.0132 22.5964 20.8436 22.6666 20.6668 22.6666H11.3335C11.1567 22.6666 10.9871 22.5964 10.8621 22.4714C10.7371 22.3464 10.6668 22.1768 10.6668 22V13.3333H9.3335V12H12.6668V9.99998C12.6668 9.82317 12.7371 9.6536 12.8621 9.52858C12.9871 9.40355 13.1567 9.33331 13.3335 9.33331H18.6668C18.8436 9.33331 19.0132 9.40355 19.1382 9.52858C19.2633 9.6536 19.3335 9.82317 19.3335 9.99998V12ZM14.0002 15.3333V19.3333H15.3335V15.3333H14.0002ZM16.6668 15.3333V19.3333H18.0002V15.3333H16.6668ZM14.0002 10.6666V12H18.0002V10.6666H14.0002Z" fill="#636262"/>
                                        </Icon>

                                    </Box>

                                </Box>
                                <Divider borderColor='#BCBCBC' opacity={'1'}/>
                            </Box>
                                   
                               

                                }
                                </Box>
                                

                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <FormLabel color='#363535' fontSize={'18px'} fontWeight='500' >Payment gateways</FormLabel>
                                    <Button display={'flex'} leftIcon={
                                        <Icon width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.4533 5.96836C15.7909 5.96836 16.875 4.88425 16.875 3.54668C16.875 2.2091 15.7909 1.125 14.4533 1.125C13.1158 1.125 12.0316 2.20911 12.0316 3.54668C12.0316 4.88425 13.1158 5.96836 14.4533 5.96836ZM7.02784 16.875C3.76766 16.875 1.125 14.2323 1.125 10.9722C1.125 7.71217 3.76766 5.06931 7.02784 5.06931C10.288 5.06931 12.9307 7.71217 12.9307 10.9722C12.9307 14.2323 10.288 16.875 7.02784 16.875Z" fill="#7D00FF"/>
                                        </Icon>
                                    }  maxW={'222px'}  minW={'222px'} py='1.5rem' border={'1px solid #D2D2D2'} w='100%' mt='1rem' borderRadius={'0px'} bg='#fff' color='#201F1F' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}

                                   onClick={onMoonpayOpen} > Connect MoonPay </Button>
                                    


                                </Box>
                                

                            </FormControl>
                            <Divider borderColor='#BCBCBC' opacity={'1'}/>

                            <Box display={'flex'} >
                                {!loader ?
                                 <Button
                                onClick={handleSignup}
                                ml={'auto'} rightIcon={<IoMdArrowForward />}  maxW={'212px'}  minW={'212px'} py='1.5rem' w='100%' mt='1rem' borderRadius={'0px'} bg='#0F0EA7' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                                disabled={!walletAccount}
                                > Proceed to DadaVault  </Button>
                                :
                                     <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='blue.500'
                                            size='xl'
                                          />  
                                }
                            </Box>
                        </Box>

                    </Box>
                </Flex>
            </Box>

            <Modal
                onClose={onMoonpayClose}
                isOpen={isMoonpayOpen}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody py={'40px'} bg={'#f9f9f9'}>
         
                    
                    <Box>
                <iframe
                  allow="accelerometer; autoplay; camera; gyroscope; payment"
                  frameborder="0"
                  height="100%"
                  src={moonPayApiKey}
                  width="100%"
                  className="IframeStyling"
                ></iframe>
              </Box>
   
                                         
                    </ModalBody>
                </ModalContent>
            </Modal>
            

        </>

    );
}

export default AddPaymentGateway;

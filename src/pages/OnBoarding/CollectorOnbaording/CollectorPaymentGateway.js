import React, {useEffect} from "react";
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
import {IoMdArrowForward , IoIosLock } from "react-icons/io";
import { useWallet } from "use-wallet";
import server from '../../../apis/server'
import CryptoJS from 'crypto-js'
import {setToken,setUser} from "../../../redux/action/tradingBot"
import { Spinner } from '@chakra-ui/react'
import Web3Modal from "web3modal";
import Web3 from "web3";
import { useToast } from '@chakra-ui/react'
import { useState } from "react";

import WalletConnectProvider from '@walletconnect/web3-provider'
import {RobotoMono} from "../../../assets/StyledComponent/styeledComponent";
const chain = process.env.REACT_APP_CHAIN_ID
const network = process.env.REACT_APP_NETWORK
const InfuraId = process.env.REACT_APP_INFURA_ID;

function CollectorPaymentGateway(props) {
    const toast=useToast()
    const [chainid,setChainId]=useState('')
    const [walletAccount,setWalletAccount]=useState('')
    const email=props?.location?.state?.value
    const file=props?.location?.state?.file
    const infuraId=InfuraId
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: infuraId, // required
          },
        },
      }
    const state = useSelector((state) => state);
    const {galleryProfileDetails}  =   state?.TradingBot
    // const {profile, gallery_email,website,bio,vat,file} = galleryProfileDetails
    const [loader,setLoader]=React.useState(false)


    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const wallet=useWallet()
    const current=new Date()
    useEffect(() => {
        if(localStorage?.getItem("walletconnected"))
        {
            setWalletAccount(localStorage.getItem("walletconnected"))
        }
      },[]);

    const handleSignup =async(values, resetForm) => {
        console.log(wallet.account)
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('collector_wallet_public_key',walletAccount );
        bodyFormData.append('collector_signUp_step', 2);
        bodyFormData.append('file', file);

        try  { 
            setLoader(true)
            const {data} = await server.post(
                
                `/users/createCollectorAccount`,
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
                console.log("data updated")
                console.log(data)
                toast({
                    title: 'Account Created',
                    description: `Please log in with your new account credential.`,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position:'top-right',
                    variant:'top-accent',
                  })
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
                navigate("/Login")
              }
             
          } catch (e) {
            
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
            console.log(r)
            if(r?.networkVersion== "0x4"|| r?.chainId=="0x4")
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
                   setWalletAccount('')   
                    toast({
                        title: 'Failure',
                        description:`please switch to ${network} network `,
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


    
    function handlewalletconnect()
    {
        if (wallet.status == 'error') {
			window.localStorage.removeItem('walletconnect');
			wallet.reset();
		}
        wallet.connect('walletconnect')
        onClose()
    }
    function handleWalletDisconnect()
    { 
        localStorage.clear();
        wallet.reset();
        // wallet.status="error"
		// window.localStorage.setItem('LAST_WALLET_CONNECTOR',"walletconnect");
        // window.localStorage.setItem('LAST_ACTIVE_ACCOUNT',"undefined");
       

    }
    function handleEditWalletConnect()
    {
        localStorage.clear();
        wallet.reset();
        wallet.connect("walletconnect")
    }
   
    return (
        <>
            <Box as='section' bg={'#F7F7F7'} className='Login'>
                <Flex overflowY={'scroll'} >
                    <Box as='section' mx={'auto'}   px={{ md: '8' }} display={'flex'} flexDirection={'column'}   minHeight='100vh'>
                        <Flex mx='auto' my={'64px'} mb={'2rem'}>
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
                        <Box mt={'32px'} pb={0} mb={0}>
                            <Heading color="#363535" textAlign={'center'} fontSize='1.5rem' pt='1.5rem' mb='0.5rem'  fontWeight='700' lineHeight={'32px'} >Confirm crypto wallet</Heading>
                            <Text display={'flex'} alignItmes={'center'} justifyContent={'center'} pb={'2rem'} fontSize='16px' fontWeight={'400'} color={'#797979'} >You can set either your DadaVault wallet or another wallet as the destination to receive your NFT purchases.</Text>
                        </Box>
                        <Box className="Box-card" p='2rem' maxW="3xl" mx="auto" bg='#fff' borderRadius='0.5rem' width={'100%'} minW={{base: "98%", sm:"98%", md: "98%", lg: "784px" ,xl:'784px'}}>
                            <FormControl >
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                    {/* <FormLabel color='#363535' fontSize={'18px'} fontWeight='600' lineHeight={'24px'} mb={1}>
                                        DadaVault wallet
                                        <Badge ml={4} px={2} py={'2px'} bg={'#CFCFED'} color={'#636262'} fontWeight={'700'} fontsize={'12px'} lineHeight={'16px'}>
                                            Default
                                        </Badge>
                                    </FormLabel>
                                     */}
                                    {/* <Text textAlign={'left'} color='#8F8F8F' fontSize={'14px'} fontWeight={'500'} mb={'0.75rem'} lineHeight={'20px'}>
                                        <Icon mr={2} width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.98422 3.2505H12.9842C13.101 3.25044 13.2177 3.25785 13.3336 3.27268C13.2943 2.99699 13.1996 2.7321 13.0552 2.49399C12.9108 2.25588 12.7197 2.04949 12.4933 1.88725C12.267 1.72501 12.0101 1.61028 11.7383 1.54999C11.4664 1.4897 11.1851 1.48508 10.9114 1.53643L2.68734 2.9405H2.67797C2.16174 3.03921 1.70268 3.33129 1.39453 3.75706C1.85878 3.42685 2.41451 3.24976 2.98422 3.2505Z" fill="#8F8F8F"/>
                                            <path d="M12.9844 4H2.98438C2.45412 4.00058 1.94575 4.21148 1.5708 4.58643C1.19585 4.96137 0.984954 5.46974 0.984375 6V12C0.984954 12.5303 1.19585 13.0386 1.5708 13.4136C1.94575 13.7885 2.45412 13.9994 2.98438 14H12.9844C13.5146 13.9994 14.023 13.7885 14.3979 13.4136C14.7729 13.0386 14.9838 12.5303 14.9844 12V6C14.9838 5.46974 14.7729 4.96137 14.3979 4.58643C14.023 4.21148 13.5146 4.00058 12.9844 4ZM11.5 10C11.3022 10 11.1089 9.94135 10.9444 9.83147C10.78 9.72159 10.6518 9.56541 10.5761 9.38268C10.5004 9.19996 10.4806 8.99889 10.5192 8.80491C10.5578 8.61093 10.653 8.43275 10.7929 8.29289C10.9327 8.15304 11.1109 8.0578 11.3049 8.01921C11.4989 7.98063 11.7 8.00043 11.8827 8.07612C12.0654 8.15181 12.2216 8.27998 12.3315 8.44443C12.4414 8.60888 12.5 8.80222 12.5 9C12.5 9.26522 12.3946 9.51957 12.2071 9.70711C12.0196 9.89464 11.7652 10 11.5 10Z" fill="#8F8F8F"/>
                                            <path d="M1 8.10938V5C1 4.32281 1.375 3.1875 2.67656 2.94156C3.78125 2.73437 4.875 2.73438 4.875 2.73438C4.875 2.73438 5.59375 3.23438 5 3.23438C4.40625 3.23438 4.42188 4 5 4C5.57812 4 5 4.73438 5 4.73438L2.67188 7.375L1 8.10938Z" fill="#8F8F8F"/>
                                        </Icon>
                                        0x1d46F67B79E020d398DAd4DD056b59DdE1FA2381</Text>
                                    <Text textAlign={'left'} color='#636262' fontSize={'16px'} fontWeight={'400'} mb={6} >This wallet comes with your DadaVault account and is accessed by logging into your DadaVault account.</Text> */}

                                    {/* <Divider borderColor='#BCBCBC' opacity={'1'} mb={6}/>
                                   
                                    <Divider borderColor='#BCBCBC' opacity={'1'}  mt={5}/> */}


                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                <Box mb={'1.5rem'}  display='flex' width={'100%'}>
                                    <Box display='flex' flexDirection={'column'} width={'100%'}>
                                        <Box display={'flex'} alignItems={'center'} mt={6}>
                                            <FormLabel m={0}>MetaMask wallet</FormLabel>
                                            <Box display={'flex'} ml={'auto'}>
                                                <Button
                                                    display={'flex'}
                                                    maxW={'222px'}
                                                    minW={'107px'}
                                                    py='0.25rem'
                                                    border={'1px solid #D2D2D2'}
                                                    borderRadius={'0px'}
                                                    bg='#fff'
                                                    h={'32px'}
                                                    color='#201F1F'
                                                    _focus={{ bg: "#fff", }}
                                                    _hover={{ bg: "#fff", }}
                                                    _active={{ bg: "#fff", }}
                                                    isDisabled
                                                > Make default </Button>
                                                {walletAccount?
                                                <Button
                                                    p={'0px'}
                                                    ml={'0.5rem'}
                                                    display={'flex'}
                                                    // py='0.25rem'
                                                    h={'32px'}
                                                    width={'32px'}
                                                    border={'1px solid #D2D2D2'}
                                                    borderRadius={'0px'}
                                                    bg='#fff'
                                                    color='#201F1F'
                                                    _focus={{ bg: "#fff", }}
                                                    _hover={{ bg: "#fff", }}
                                                    _active={{ bg: "#fff", }}
                                                    onClick={() =>{
                                                        localStorage.removeItem("walletconnected")
                                                        setWalletAccount('')
                                                        localStorage.removeItem("walletconnect")
                                                    }}
                                                > <Icon width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.3335 3.99998H14.6668V5.33331H13.3335V14C13.3335 14.1768 13.2633 14.3464 13.1382 14.4714C13.0132 14.5964 12.8436 14.6666 12.6668 14.6666H3.3335C3.15669 14.6666 2.98712 14.5964 2.86209 14.4714C2.73707 14.3464 2.66683 14.1768 2.66683 14V5.33331H1.3335V3.99998H4.66683V1.99998C4.66683 1.82317 4.73707 1.6536 4.86209 1.52858C4.98712 1.40355 5.15669 1.33331 5.3335 1.33331H10.6668C10.8436 1.33331 11.0132 1.40355 11.1382 1.52858C11.2633 1.6536 11.3335 1.82317 11.3335 1.99998V3.99998ZM6.00016 7.33331V11.3333H7.3335V7.33331H6.00016ZM8.66683 7.33331V11.3333H10.0002V7.33331H8.66683ZM6.00016 2.66665V3.99998H10.0002V2.66665H6.00016Z" fill="#636262"/>
                                                </Icon>
                                                
                                                </Button>
                                                :null}
                                                
                                            </Box>
                                            
                                        </Box>
                                        <Box>
                                            {!walletAccount?
                                            
                                        <Button onClick={handleMetamaskConnect}  display={'flex'} leftIcon={
                                        <Icon width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.33325 7.99998C1.33325 8.22099 1.42105 8.43296 1.57733 8.58924C1.73361 8.74552 1.94557 8.83331 2.16659 8.83331H7.0277C7.06453 8.83331 7.09986 8.84795 7.12591 8.87399C7.15195 8.90004 7.16659 8.93537 7.16659 8.9722V13.8333C7.16659 14.0543 7.25438 14.2663 7.41066 14.4226C7.56694 14.5788 7.77891 14.6666 7.99992 14.6666C8.22093 14.6666 8.43289 14.5788 8.58917 14.4226C8.74546 14.2663 8.83325 14.0543 8.83325 13.8333V8.9722C8.83325 8.93537 8.84789 8.90004 8.87393 8.87399C8.89998 8.84795 8.93531 8.83331 8.97214 8.83331H13.8333C14.0543 8.83331 14.2662 8.74552 14.4225 8.58924C14.5788 8.43296 14.6666 8.22099 14.6666 7.99998C14.6666 7.77897 14.5788 7.567 14.4225 7.41072C14.2662 7.25444 14.0543 7.16665 13.8333 7.16665H8.97214C8.93531 7.16665 8.89998 7.15201 8.87393 7.12597C8.84789 7.09992 8.83325 7.06459 8.83325 7.02776V2.16665C8.83325 1.94563 8.74546 1.73367 8.58917 1.57739C8.43289 1.42111 8.22093 1.33331 7.99992 1.33331C7.77891 1.33331 7.56694 1.42111 7.41066 1.57739C7.25438 1.73367 7.16659 1.94563 7.16659 2.16665V7.02776C7.16659 7.06459 7.15195 7.09992 7.12591 7.12597C7.09986 7.15201 7.06453 7.16665 7.0277 7.16665H2.16659C1.94557 7.16665 1.73361 7.25444 1.57733 7.41072C1.42105 7.567 1.33325 7.77897 1.33325 7.99998V7.99998Z" fill="#201F1F"/>
                                        </Icon>
                                    }  maxW={'194px'}  minW={'194px'} py='1.5rem' border={'1px solid #D2D2D2'} w='100%' mt='1rem' borderRadius={'0px'} bg='#fff' color='#201F1F' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}
                                    
                                    > Connect Wallet  </Button>
                                    :

<>                                    
                                            <RobotoMono textAlign={'left'} color='#8F8F8F' fontSize={'14px'} fontWeight={'500'} mb={'0.75rem'} lineHeight={'20px'}>
                                                <Icon mr={2} width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.98422 3.2505H12.9842C13.101 3.25044 13.2177 3.25785 13.3336 3.27268C13.2943 2.99699 13.1996 2.7321 13.0552 2.49399C12.9108 2.25588 12.7197 2.04949 12.4933 1.88725C12.267 1.72501 12.0101 1.61028 11.7383 1.54999C11.4664 1.4897 11.1851 1.48508 10.9114 1.53643L2.68734 2.9405H2.67797C2.16174 3.03921 1.70268 3.33129 1.39453 3.75706C1.85878 3.42685 2.41451 3.24976 2.98422 3.2505Z" fill="#8F8F8F"/>
                                                    <path d="M12.9844 4H2.98438C2.45412 4.00058 1.94575 4.21148 1.5708 4.58643C1.19585 4.96137 0.984954 5.46974 0.984375 6V12C0.984954 12.5303 1.19585 13.0386 1.5708 13.4136C1.94575 13.7885 2.45412 13.9994 2.98438 14H12.9844C13.5146 13.9994 14.023 13.7885 14.3979 13.4136C14.7729 13.0386 14.9838 12.5303 14.9844 12V6C14.9838 5.46974 14.7729 4.96137 14.3979 4.58643C14.023 4.21148 13.5146 4.00058 12.9844 4ZM11.5 10C11.3022 10 11.1089 9.94135 10.9444 9.83147C10.78 9.72159 10.6518 9.56541 10.5761 9.38268C10.5004 9.19996 10.4806 8.99889 10.5192 8.80491C10.5578 8.61093 10.653 8.43275 10.7929 8.29289C10.9327 8.15304 11.1109 8.0578 11.3049 8.01921C11.4989 7.98063 11.7 8.00043 11.8827 8.07612C12.0654 8.15181 12.2216 8.27998 12.3315 8.44443C12.4414 8.60888 12.5 8.80222 12.5 9C12.5 9.26522 12.3946 9.51957 12.2071 9.70711C12.0196 9.89464 11.7652 10 11.5 10Z" fill="#8F8F8F"/>
                                                    <path d="M1 8.10938V5C1 4.32281 1.375 3.1875 2.67656 2.94156C3.78125 2.73437 4.875 2.73438 4.875 2.73438C4.875 2.73438 5.59375 3.23438 5 3.23438C4.40625 3.23438 4.42188 4 5 4C5.57812 4 5 4.73438 5 4.73438L2.67188 7.375L1 8.10938Z" fill="#8F8F8F"/>
                                                </Icon>
                                                {walletAccount}</RobotoMono>
                                            <Text textAlign={'left'} color='#636262' fontSize={'16px'} fontWeight={'400'}>You connected this wallet on {new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}.</Text>
                                </>
                                }  
                                        </Box>
                                        </Box>
                                </Box>
                                <Divider borderColor='#BCBCBC' opacity={'1'}/>
                            </Box>
                        </Box>
                            </FormControl>
                            <Box display={'flex'} >
                                 <Button
                                onClick={handleSignup}
                                ml={'auto'} rightIcon={<IoMdArrowForward />}  maxW={'212px'}  minW={'212px'} py='1.5rem' w='100%'  borderRadius={'0px'} bg='#0F0EA7' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                                disabled={!walletAccount}> Proceed to DadaVault  </Button>

                            </Box>
                        </Box>

                    </Box>
                </Flex>
            </Box>

        </>

    );
}

export default CollectorPaymentGateway;

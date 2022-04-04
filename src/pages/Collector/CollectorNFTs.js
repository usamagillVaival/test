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
    ModalHeader,
    useDisclosure,
    Avatar,
    Container,
    Spinner,
    FormControl,
    Checkbox, Square,
    HStack, VStack, useColorModeValue, StackProps, useId,
    useRadio,
    UseRadioProps, Alert, AlertIcon, Textarea, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, SelectField,
} from "@chakra-ui/react";
import {NFTCARD} from "../../components";
import Dummy from '../../assets/images/image1.png';
import Select from 'react-select'
import {ExternalLinkIcon} from "@chakra-ui/icons";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import {recentlyadded,priceLowToHigh,priceHighToLow,assendingSorting,descendingSorting } from "../StoreFront/GalleryStoreFront/FilterFunctions";

import { setAccount } from "../../redux/action/tradingBot";
import CryptoJS from 'crypto-js';
import server from "../../apis/server";
import {InfuraId} from "../../config"

function CollectorNft(props) {
    const infuraId=InfuraId
    const [walletAccount,setWalletAccount]=useState('')
    const User1 = JSON.parse(localStorage.getItem("User"))
    const [selectedArtist,setSelectedArtist]=useState(null)
    const [selectedArtistName,setSelectedArtistName]=useState(null)
    const [artistList,setArtistList]=useState([])
    const [galleryList,setGalleryList]=useState([])
    const [selectedGallery,setSelectedGallery]=useState(null)
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    console.log(userType)
    const userId=userType?._id
    const userName=userType?.name
    const collectorWalletAddress=userType?.collector_wallet_public_key
    const [check,setCheck]=useState(false)
    const [collectorData,setCollectorData]=useState([])
    const [selectedSorting,setSelectedSorting]=useState(null)
    const [loader,setLoader]=useState(true)
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: infuraId, // required
          },
        },
      }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #0C0B86!important' : '1px solid #D2D2D2',
            marginBottom:'0.5rem'
        })
    }
    const customStylesNew = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #0C0B86!important' : '1px solid #D2D2D2',
            marginBottom:'0.5rem',
            maxWidth:'200px'
        })
    }
      const options1 = [

        { value: null, label: 'Recently added' }, 
        { value: 'nfttitleaz', label: 'NFT Title A–Z' },
        { value: 'nfttitleza', label: 'NFT Title Z–A' },
        { value: 'artisttitleaz', label: 'Artist Title A–Z' },
        { value: 'artisttitleza', label: 'Artist Title Z–A' },
        { value: 'pricelh', label: ' Price Low – High' },
        { value: 'pricehl', label: 'Price High – Low' },


      ];
      const mediumOptions=[
        { value: 'both', label: 'Image' },
        { value: 'usd', label: 'Video' },
        { value: 'eth', label: 'Augmented Reality' },
       

      ]

   
     useEffect(() => {
        loadCollectorData()
    },[,check]);
// async function handleWalletConnection()
// {
//     const web3Modal = new Web3Modal(
//         {

//             providerOptions,
            
//         }
//     );
//      web3Modal.connect().then(async(r)=>{
//         console.log(r)
//         const web3 = new Web3(r);
//         const account=(await web3.eth.getAccounts())
//         r.on("accountsChanged", (accounts) => {
//             check?setCheck(false):setCheck(true)
//             setWalletAccount(accounts[0])
//           });
           
//              setWalletAccount(account[0])
//     })
// }
async function loadCollectorData()
{
    //nft/collectorNfts
    const {data} = await server.post(
        "/nft/collectorNfts",
       {
        userId:userId
       } ,
        { 
          headers: {
            "Content-Type": "application/json",
       },
        } 
      )
      if(data)
      {
          setLoader(false)
         
          console.log(walletAccount)
          const filteredData=data?.userNfts?.filter(current_owner_wallet_address => current_owner_wallet_address.current_owner_wallet_address?.toLowerCase()===collectorWalletAddress.toLowerCase())
          console.log(filteredData)
          const unique = [...new Set(filteredData.map(item => ({value:item.artistId,label:item.artistName})))]
    
           function getUniqueArtistList(unique, key) {
            return [...new Map(unique.map(item => [item[key], item])).values()]
           
        }
        
        const artistList = getUniqueArtistList(unique, 'value')
        artistList.unshift({value:null,label:"All"})
        setArtistList(artistList)
        const uniqueGalleryNames= [...new Set(filteredData.map(item => ({value:item.galleryName,label:item.galleryName})))]
        function getUniqueGalleryList(uniqueGalleryNames, key) {
            return [...new Map(uniqueGalleryNames.map(item => [item[key], item])).values()]
           
        }
        const galleryList=getUniqueGalleryList(uniqueGalleryNames,'value')
        galleryList.unshift({value:null,label:"All"})
        console.log(galleryList)
        setGalleryList(galleryList)
         setCollectorData(filteredData) 
         console.log(filteredData)
        }

}
const handleArtistChange=async (e) =>
{
    setSelectedArtistName(e.label)
    setSelectedArtist(e.value)
}
const handleWalletDisconnect=async (e) =>{
    setWalletAccount('')
    localStorage.removeItem("walletconnect")
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
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}   alignItems={'start'} p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  >
                    <Box borderBottom={'1px solid#BCBCBC'}  w={'100%'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} >
                        <Box mr={'auto'} my={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" mt={'6px'} LineHeight={'20px'}>
                                NFTs
                            </Heading>
                        </Box>
                    </Flex>
                    <Heading mt={'54px'} mb={'48px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" lineHeight={'28px'} textAlign={'left'}>
                        {userName}'s NFTs
                    </Heading>
                    </Box>
                </Box>
                {!collectorData.length?
                <Box as='section'  className='Login' borderTop={'1px solid #BCBCBC'}>
                            <Flex>
                                <Container display={'flex'} flexDirection={'column'}  align='center' direction="column"  >
                                    <Box mb={'2.5rem'}  mt={'5rem'}  className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                            <FormControl>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                    <path d="M24 14C29.522 14 34 17.978 34 22.889C33.9992 24.3622 33.4136 25.7748 32.3717 26.8165C31.3299 27.8581 29.9172 28.4435 28.444 28.444H26.478C25.556 28.444 24.811 29.189 24.811 30.111C24.811 30.533 24.978 30.922 25.233 31.211C25.5 31.511 25.667 31.9 25.667 32.333C25.667 33.256 24.9 34 24 34C18.478 34 14 29.522 14 24C14 18.478 18.478 14 24 14ZM22.811 30.111C22.8106 29.6293 22.9052 29.1523 23.0893 28.7072C23.2735 28.2622 23.5436 27.8578 23.8842 27.5172C24.2248 27.1766 24.6292 26.9065 25.0742 26.7223C25.5193 26.5382 25.9963 26.4436 26.478 26.444H28.444C29.3866 26.4435 30.2905 26.0689 30.9572 25.4026C31.6239 24.7363 31.9989 23.8326 32 22.89C32 19.139 28.468 16 24 16C21.9356 15.9981 19.9503 16.7944 18.4594 18.2223C16.9684 19.6501 16.0872 21.5991 15.9999 23.6617C15.9126 25.7243 16.626 27.7408 17.991 29.2895C19.3559 30.8383 21.2668 31.7994 23.324 31.972C22.9892 31.4093 22.812 30.7668 22.811 30.112V30.111ZM19.5 24C19.1022 24 18.7206 23.842 18.4393 23.5607C18.158 23.2794 18 22.8978 18 22.5C18 22.1022 18.158 21.7206 18.4393 21.4393C18.7206 21.158 19.1022 21 19.5 21C19.8978 21 20.2794 21.158 20.5607 21.4393C20.842 21.7206 21 22.1022 21 22.5C21 22.8978 20.842 23.2794 20.5607 23.5607C20.2794 23.842 19.8978 24 19.5 24ZM28.5 24C28.1022 24 27.7206 23.842 27.4393 23.5607C27.158 23.2794 27 22.8978 27 22.5C27 22.1022 27.158 21.7206 27.4393 21.4393C27.7206 21.158 28.1022 21 28.5 21C28.8978 21 29.2794 21.158 29.5607 21.4393C29.842 21.7206 30 22.1022 30 22.5C30 22.8978 29.842 23.2794 29.5607 23.5607C29.2794 23.842 28.8978 24 28.5 24ZM24 21C23.6022 21 23.2206 20.842 22.9393 20.5607C22.658 20.2794 22.5 19.8978 22.5 19.5C22.5 19.1022 22.658 18.7206 22.9393 18.4393C23.2206 18.158 23.6022 18 24 18C24.3978 18 24.7794 18.158 25.0607 18.4393C25.342 18.7206 25.5 19.1022 25.5 19.5C25.5 19.8978 25.342 20.2794 25.0607 20.5607C24.7794 20.842 24.3978 21 24 21Z" fill="#795E00"/>
                                                </svg>
                                                <Text mt={5} fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} > <Text>No NFTs</Text></Text>
                                                <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  > <Text>You have not purchased any NFTs yet</Text></Text>
                                            </FormControl>
                                        </Box>
                                </Container>
                            </Flex>
                        </Box>
                        :
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }}>
                    <Box mb={'1.5rem'} pt={0} pb={4}>
                        <Flex width={'100%'} display={{base:'block',lg:'flex', xl:'flex'}}>
                                       <Box display={'flex'} justifyContent={{base:'start',lg:'center', xl:'center'}} alignItems={'center'} mb={2} flexWrap={'wrap'} >
                                           <Text d={'flex'} alignItems={'center'}  mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}  mb={2}>Filter by</Text>
                                           <Box display={'flex'} justifyContent={{base:'start',lg:'center', xl:'center'}} alignItems={'center'}  flexWrap={'wrap'}>
                                           <Select maxWidth={'200px'}  className={'customSelect customSelectFilter'} placeholder="Medium" width={'fit-content'} mx={'6px'} borderRadius={'0px'} borderColor={'#D2D2D2'} color={'#636262'} fontWeight={'500'} fontSize={'15px'}
                                           options={mediumOptions} styles={customStyles}
                                           />
                                           <Select
                                               styles={customStyles}
                                               className={'customSelectFilter customSelect'}
                                           placeholder={
                                            selectedArtist?
                                            selectedArtistName
                                            :"Artist"
                                        }
                                            mx={'6px'} width={'fit-content'} borderRadius={'0px'} borderColor={'#D2D2D2'} color={'#636262'} fontWeight={'500'} fontSize={'15px'}
                                         value={selectedArtist}
                                         onChange={(e) =>
                                           {  
                                             handleArtistChange(e)
                                             setSelectedGallery(null)
                                             setSelectedSorting(null)
                                           }
                                         }
                                         options={artistList}
                                           />  
                                        
                                           <Select
                                               styles={customStyles}
                                               className={'customSelectFilter customSelect'}
                                           placeholder={
                                            selectedGallery?
                                            selectedGallery
                                            :"Gallery"

                                        }
                                            mx={'6px'} width={'fit-content'} borderRadius={'0px'} borderColor={'#D2D2D2'} color={'#636262'} fontWeight={'500'} fontSize={'15px'}
                                            value={selectedGallery}
                                            onChange={
                                                (e) =>{
                                                    setSelectedGallery(e.value)
                                                    setSelectedArtist(null)
                                                    setSelectedSorting(null)
                                                }
                                            }
                                            options={galleryList}
                                            
                                           />
                                           </Box>
                                       </Box>
                                        <Box ml={'auto'} display={'flex'} alignItems={'center'} mb={2}>
                                            <Text minW={'70px'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} mb={2} pr={4}>Sort by</Text>
                                            <Select className={'customSelectSort customSelect'}
                                                    styles={customStylesNew}
                                                placeholder="Z-A" width={'fit-content'} borderRadius={'0px'} borderColor={'#D2D2D2'} color={'#636262'} fontWeight={'500'} fontSize={'15px'}
                                        defaultValue={selectedSorting}
                                        onChange={(e) =>
                                            {
                                            setSelectedSorting(e.value)
                                            setSelectedArtist(null)
                                            setSelectedGallery(null)
                                            }
                                           }
                                        options={options1}
                                           />
                                        </Box>
                                    </Flex>
                        <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(4, 1fr)" }} gap={6}>
                                {
                                selectedSorting=="nfttitleaz"?
                                collectorData?.filter(status =>status.status==6).sort(assendingSorting).map((val) =>{
                                    return(
                                        <NFTCARD  collectorsData={val}  />
                                    )
                                })
                                :selectedSorting=="nfttitleza"?
                                collectorData?.filter(status =>status.status==6).sort(descendingSorting).map((val) =>{
                                    return(
                                        <NFTCARD  collectorsData={val}  />
                                    )
                                })
                                :    
                                selectedArtist?
                                collectorData?.filter((artistId) =>(selectedArtist==artistId.artistId)).map((val) =>{
                                    return(
                                        <NFTCARD  collectorsData={val}  />
                                    )
                                })
                                :
                                selectedGallery?
                                collectorData?.filter((galleryName) =>(selectedGallery==galleryName.galleryName)).map((val)=>{
                                    return(
                                        <NFTCARD  collectorsData={val}  />
                                    )
                                })  
                                :
                            collectorData?.map((val)=>{
                                return(
                                <NFTCARD  collectorsData={val}  />
                                )
                            })
                            }
                        </Grid>
                    </Box>

                </Box>
}
            </Box>

           


        </>

    );
}

export default CollectorNft;

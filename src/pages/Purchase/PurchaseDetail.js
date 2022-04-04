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
    UseRadioProps,
    ModalHeader
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
import moment from "moment";
import { useToast } from '@chakra-ui/react'
const scanLink = process.env.REACT_APP_SCAN_LINK;

function PurchaseDetail(props) {
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
    const userName=userType?.name
    const userId=userType?._id
    const toast=useToast()
    const offer=props?.location?.state?.offer;
    const artworkData=offer?.artist_artwork
    console.log(artworkData)
    const mintDate=new Date(artworkData?.mint_date)
    const listDate=new Date(artworkData?.listed_Date)
    const soldDate=new Date(artworkData?.sold_date)
    console.log(offer)
    const { isOpen: isCollectorNftOpen , onOpen: onCollectorNftOpen, onClose:onCollectorNftClose
    } = useDisclosure();

   const { isOpen: isProvenanceOpen , onOpen: onProvenancepen, onClose:onProvenanceClose
    } = useDisclosure();

    const rejectOffer = async() =>{
        console.log(offer);
        
        
        let data = {
            offerId:offer?._id,
            reason:"Collector cancelled",
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
            navigate("/purchase")
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
    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'34px'}>
                        <Box mr={'auto'} my={'auto'} flex="1" display={'flex'} alignItems={'center'}>
                            <Heading color={'#8F8F8F'} fontWeight="400" fontSize="14px" cursor={'pointer'}nClick={()=>navigate("/purchase")} >
                                Sales </Heading>
                            <Text px={2} >  <FaChevronRight color={'#8F8F8F'}  fontSize={'14px'} /></Text>
                            <Text color={'#4D4C4C'} pl={2} fontWeight="400" fontSize="14px">{offer?.artist_artwork?.title} </Text>
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} flexWrap={'wrap'}>
                        <Box maxW={'128px'} maxH={'128px'} height={'128px'} width={'128px'} mr={5} mb={2}>
                            <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'}src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.artist_artwork?.file}`} />
                        </Box>
                        <Box pl={{base:0,sm:5}} mb={2}>
                            <Heading color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} mb={6} >{offer?.artist_artwork?.title}</Heading>
                            <Flex flexWrap={'wrap'}>
                                <Box pr={3} minW={'134px'}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} lineHeight={'16px'}>Gallery</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.gallery?.name}</Text>
                                </Box>
                                <Box px={{base:0,sm:4}} minW={'134px'}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} lineHeight={'16px'}>LIST PRICE</Text>
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{offer?.sale_price} ETH</Text>
                                </Box>
                                {offer?.sale_status=="completed"||offer?.offered_status==1?
                                <Box  px={{base:0,sm:4}} minW={'134px'}>
                                    <Text color={'#8F8F8F'} fontSize={'12px'} fontWeight={'600'} >PURCHASE DATE</Text>
                                    {
                                    offer?.purchase_option=="buy"?<Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{moment(offer?.artist_artwork?.sold_date).format('MMMM D, YYYY')}</Text>:
                                    <Text color={'#4D4C4C'} fontSize={'14px'} fontWeight={'500'}>{((100-offer?.artist_artwork?.revenueSplit)*offer?.offered_price)/100}</Text>
                                    }
                                    
                                </Box>:null
                                }

                            </Flex>
                        </Box>

                    </Flex>
                </Box>
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                {offer?.sale_status=="completed"||offer?.offered_status==1?
                <>
                    <Flex flexWrap={'wrap'}>
                        <Box width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                                Actions
                            </Text>
                        </Box>
                        <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                            <Grid p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>
                                <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}
                                >
                                    <Icon width="15px" height="14px"  mr={2} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2618 5.9523L10.9285 4.61896L8.4523 7.16421V0.333252H6.54754V7.16421L4.07135 4.61896L2.73802 5.9523L7.49992 10.8094L12.2618 5.9523ZM0.833252 11.7618V13.6666H14.1666V11.7618H0.833252Z" fill="#201F1F"/>
                                    </Icon>
                                        <Text color={'#201F1F'}>Download invoice </Text>
                                </Button>
                                <Button 
                                 color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                    <Icon width="15px" height="14px" mr={2} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2618 5.9523L10.9285 4.61896L8.4523 7.16421V0.333252H6.54754V7.16421L4.07135 4.61896L2.73802 5.9523L7.49992 10.8094L12.2618 5.9523ZM0.833252 11.7618V13.6666H14.1666V11.7618H0.833252Z" fill="#201F1F"/>
                                    </Icon>
                                        <Text color={'#201F1F'}>Download receipt </Text>
                                </Button>


                            </Grid>
                        </Box>
                    </Flex>
                    <Divider/>
                    </>
                    :<>
                    <Flex flexWrap={'wrap'}>
                       <Box  width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                           Offer information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                           You made an offer to {offer?.gallery?.name} Galleries for this NFT
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}} mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                   Offered price
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {offer?.offered_price} ETH
                                   </Link>
                               </Box>
                               <Box>
                               <Button onClick={rejectOffer} color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' __focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}>
                                    <Icon width="15px" height="14px" mr={2} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2618 5.9523L10.9285 4.61896L8.4523 7.16421V0.333252H6.54754V7.16421L4.07135 4.61896L2.73802 5.9523L7.49992 10.8094L12.2618 5.9523ZM0.833252 11.7618V13.6666H14.1666V11.7618H0.833252Z" fill="#201F1F"/>
                                    </Icon>
                                        <Text color={'#201F1F'}>Cancel offer </Text>
                                </Button>
                               </Box>

                           </Grid>
                       </Box>
                   </Flex>
                   <Divider/>
                   </>}
                   {offer?.offered_status==1||offer?.sale_status=="completed"?
                    <>
                     <Flex flexWrap={'wrap'}>
                       <Box  width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Purchase information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               You purchased this NFT on {moment(offer?.artist_artwork?.sold_date).format('MMMM Do YYYY')}
                           </Text>
                       </Box>
                       <Box  width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(2, 1fr)",md:"repeat(3, 1fr)"}} mx={'auto'} gap={6}  mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Purchase price
                                   </Text>
                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'} mb={2}>
                                       {offer?.purchase_option=="buy"?offer?.sale_price:offer?.offered_price} ETH
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Purchase type
                                   </Text>
                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'}  lineHeight={'20px'} mb={2}>
                                       {offer?.purchase_option=="buy"?"Buy now":"Make offer"}
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Gallery
                                   </Text>

                                   <Text  color={'#636262'} fontSize={'14px'} fontWeight={'500'}  lineHeight={'20px'} mb={2}>
                                       {offer?.gallery?.name}
                                   </Text>
                               </Box>

                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/></>:null}
                    <Flex flexWrap={'wrap'}>
                       <Box  width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Payment information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               {offer?.sale_status=="completed"?
                               <Text>
                               You paid with Crypto(ETH)
                               </Text>
                               :
                               <Text>
                                   If {offer?.gallery?.name} accepts your offer,your transaction will automatically settle.
                                   </Text>
                            }

                           </Text>
                       </Box>
                       <Box  width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}}  mx={'auto'} gap={6}   mb={8}>
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
                                       Wallet
                                   </Text>
                                   <Link   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {artworkData?.collector_Wallet_address?.slice(0,6) + "..."+artworkData?.collector_Wallet_address?.slice(37,42)}
                                   </Link>
                               </Box>

                           </Grid>
                       </Box>
                   </Flex>
                    <Divider/>
                    <Flex flexWrap={'wrap'}>
                       <Box  width={{base:'100%',sm:'100%',md:'35%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               NFT information
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               This NFT is in your DadaVault wallet
                           </Text>
                       </Box>
                       <Box  width={{base:'100%',sm:'100%',md:'65%'}} py={{base:2,sm:2,md:8}} px={{base:2,sm:2,md:8}}>
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(2, 1fr)",md:"repeat(3, 1fr)"}}  mx={'auto'} gap={6}  >
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Smart contract
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {offer?.artist_artwork?.galleryContractAddress.slice(0, 6) + "..." + offer?.artist_artwork?.galleryContractAddress.slice(38, 43)}
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Token ID
                                   </Text>
                                   <Text   color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {offer?.artist_artwork?.token_id}
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       NFT details
                                   </Text>
                                   <Text   color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2} onClick={
                                       ()=>{
                                           onCollectorNftOpen()
                                       }
                                   }>
                                       View NFT details
                                   </Text>
                               </Box>

                           </Grid>
                          {offer?.offered_status==1||offer?.sale_status=="completed"?
                           <Grid marginTop='1.5rem' templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}}  mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Stored in
                                   </Text>
                                   <Link  color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       DadaVault wallet
                                   </Link>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                       Transaction details
                                   </Text>
                                   <Link isExternal href={`${scanLink}tx/${offer?.artist_artwork?.buying_hash}`}  color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       View on Etherscan
                                   </Link>
                               </Box>
                           </Grid>
                           :null}
                       </Box>
                   </Flex>
                    <Divider/>
                </Box>
            </Box>
            <Modal onClose={onCollectorNftClose} isOpen={isCollectorNftOpen} size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton  />
                    <ModalBody>


                        <Box pt={'90px'} pb={'48px'}>
                            <Box py={'5rem'} px={'112px'}>
                                <Flex gap={16}>
                                    <Box width={'50%'}>
                                        <Heading fontWeight={'600'} fontSize={'16px'} mb={'1rem'} color={'#636262'} lineHeight={'24px'} mb={4}>{artworkData?.artistName} </Heading>

                                        <Text  color={'#363535'} fontSize={'60px'} lineHeight={'60px'} fontWeight={'700'}  mb={4} textAlign={'left'} mb={4}>
                                           {artworkData?.title}
                                        </Text>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={8} textAlign={'left'} mb={4}>
                                            {artworkData?.description}
                                        </Text>
                                        <Flex mb={10} gap={4}>
                                            <Button onClick={onProvenancepen} mb={3} bg='#0F0EA7' color='#fff'  borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                    rightIcon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00293 3.0605L1.54768 9.51575L0.487183 8.45525L6.94168 2H1.25293V0.5H9.50293V8.75H8.00293V3.0605Z" fill="white"/>
                                            </svg>
                                            } >Provenance
                                            </Button>
                                            <Link isExternal  href={`${scanLink}address/${artworkData?.galleryContractAddress}`} textDecoration={"none!important"}>
                                            <Button   mb={'2rem'}  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  rightIcon={<ExternalLinkIcon />}   marginRight={'1rem'} >
                                                
                                                Smart contract
                                            </Button>
                                            </Link>
                                        </Flex>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={1} textAlign={'left'} mb={4}>
                                            Minted with DadaVault by <Link onClick={()=>
                                            {
                                                window.open(`/GalleryStoreFront/${artworkData?.galleryProfile}`)
                                            }
                                            } color={'#0F0EA7'} fontWeight={'500'}>{artworkData?.galleryName}</Link>
                                        </Text>
                                    </Box>
                                    <Box width={'50%'}>
                                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${artworkData?.file}`}  width={'100%'} maxH={'500px'}/>
                                    </Box>

                                </Flex>

                            </Box>
                            <Box mt={'100px'} width={'100%'}  display={'flex'}>
                                <Button mb={3} bg='#0C0B86' color='#fff'  borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        mx={'auto'}>Close Window</Button>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal onClose={onProvenanceClose} isOpen={isProvenanceOpen} size={'3xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton/>
                    <ModalHeader borderBottom={'1px solid #D2D2D2'}>Provenance</ModalHeader>
                    <ModalBody px={0}>
                        <Box  width={'100%'}  display={'flex'}>
                            <Box overflowX={"auto"} width={'100%'}>
                                <Table
                                    borderWidth="1px"
                                    borderCollapse={"separate"}
                                    borderSpacing={"0"}
                                    p={0}
                                    width={'100%'}
                                    variant='striped' colorScheme='gray'
                                >

                                    <Tbody>

                                    <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                            {artworkData?.status==6 ?
                                            soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                            :
                                            <Text>Not Delivered</Text>
                                        }
                                            </Td>
                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                               {artworkData?.status==6?
                                               <Text>
                                              <Link  isExternal href={`${scanLink}tx/${artworkData?.buying_hash}`}>  Delivered to {userName} </Link> </Text> 
                                                :
                                                <Text>Not Delivered Yet</Text>
                                               }
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {
                                                artworkData?.status==6?    
                                                soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                                :
                                                <Text>Not Sold</Text>
                                            }
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            {(artworkData?.status!=6) ?
                                            <Text>Not Sold Yet</Text>

                                            :
                                            <Text>
                                           <Link  isExternal href={`${scanLink}tx/${artworkData?.buying_hash}`}> Sold by {artworkData?.galleryName} to {userName} </Link>
                                            </Text>
}
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                            {listDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${artworkData?.listing_hash}`}>    Listed for sale by {artworkData?.galleryName} </Link>
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {
                                                    
                                                mintDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                                }
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${artworkData?.mint_hash}`}>  Minted by {artworkData?.galleryName} with {artworkData?.artistName} </Link>
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>
                            </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    );
}

export default PurchaseDetail;

import {
    Box,
    Text,
    Flex,
    Image,
    Heading,
    Icon,
    InputGroup,
    InputLeftElement,
    Button,
    Input,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Td,Tr,ModalContent,ModalCloseButton,Table,Tbody,ModalHeader,ModalOverlay,Modal,ModalBody,
    Grid,
    Link,Avatar,useColorModeValue,HStack,VStack,
} from '@chakra-ui/react';
import CryptoJS from 'crypto-js';
import {ArrowForwardIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import { SearchIcon } from '@chakra-ui/icons';
import React from "react";
import cardImge from '../../assets/images/cardimg.png';
import cardImge1 from '../../assets/images/cardIMG1.png';
import {NFTCustomCard} from '../../assets/StyledComponent/styeledComponent';
import { Link as ReachLink, navigate } from "@reach/router";
import { HiUsers,HiBadgeCheck } from 'react-icons/hi'
import Dummy from "../../assets/images/dummy.png";
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
} from '../../assets/StyledComponent/styeledComponent';
const scanLink = process.env.REACT_APP_SCAN_LINK;
function NFTCARD(props) {
    const draftList=props?.nftDraftList
    const collectorDAta=props?.collectorsData
    console.log(collectorDAta)
    const mintDate=new Date(collectorDAta?.mint_date)
    const listDate= new Date(collectorDAta?.listed_Date)
    const User1 = JSON.parse(localStorage.getItem("User"))

    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    const userName=userType?.name
    const soldDate=new Date(collectorDAta?.sold_date)
    const { isOpen: isCollectorNftOpen , onOpen: onCollectorNftOpen, onClose:onCollectorNftClose
    } = useDisclosure();

   const { isOpen: isProvenanceOpen , onOpen: onProvenancepen, onClose:onProvenanceClose
    } = useDisclosure();
   
    function handleNftDetail()
    {
        navigate(`/NFTsDetailNew/${draftList._id}`, { state: { draftList } })
    }
    return (
        <>
              <Card   cursor={'pointer'} border={'none'} boxShadow={'none'} p={'0px'} alignItems={'flex-start'}   onClick={draftList? handleNftDetail:onCollectorNftOpen} >
                  <Box height={'266px'} maxH={'266px'} display={'flex'} alignItems={'center'} justifyContent={'center'} mb={'1.5rem'} bg={'#E6E6E6'} width={'100%'} border={'1px solid #E6E6E6'}>
                      <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${draftList?props.nftDraftList?.file:collectorDAta?.file}`} maxW={'100%'} maxH={'266px'} objectFit={'cover'} height={'100%'}  w={'100%'}/>
                  </Box>
            <Text color={'#636262'} fontSize={'12px'} fontWeight={'400'} textAlign={'left'} >
                {
            draftList?.artistName ? draftList?.artistName:collectorDAta?.artistName?collectorDAta?.artistName : 'Unspecified Artist' 
                }
            </Text>
            <Text  color={'#363535'} fontSize={'14px'} fontWeight={'500'} textAlign={'left'} >
            {
            draftList?.title ? draftList?.title:collectorDAta?.title?collectorDAta?.title : 'Unspecified Title' 
            }
             </Text>
             {(draftList?.status==5 || draftList?.status==6)?
             <Text>{draftList?.price} ETH </Text>
        //      :(draftList?.status== 3 || draftList?.status==4 || draftList?.status==5 || draftList?.status==6)?
        //      <Box  mb={6} display={'flex'} alignItems={'center'}>
        //      <Icon mr={'5px'} width="12px" height="12px" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        //          <path d="M6 1C5.0111 1 4.0444 1.29324 3.22215 1.84265C2.3999 2.39206 1.75904 3.17295 1.3806 4.08658C1.00217 5.00021 0.90315 6.00555 1.09608 6.97545C1.289 7.94536 1.76521 8.83627 2.46447 9.53553C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1573 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67439 10.4712 3.40352 9.53383 2.46617C8.59648 1.52882 7.32561 1.00154 6 1V1ZM8.88625 4.41667L6.03417 8.28708C6.0005 8.33176 5.95826 8.36928 5.90993 8.39745C5.8616 8.42563 5.80814 8.4439 5.75268 8.45119C5.69721 8.45848 5.64085 8.45465 5.58688 8.43993C5.53291 8.4252 5.48241 8.39987 5.43833 8.36542L3.40167 6.73708C3.35893 6.70288 3.32335 6.6606 3.29696 6.61266C3.27057 6.56471 3.25387 6.51203 3.24784 6.45763C3.23565 6.34776 3.2676 6.23756 3.33667 6.15125C3.40574 6.06494 3.50626 6.00961 3.61612 5.99742C3.72599 5.98523 3.8362 6.01718 3.9225 6.08625L5.62083 7.445L8.21542 3.92375C8.24665 3.87688 8.28707 3.83683 8.33422 3.80601C8.38137 3.7752 8.43428 3.75427 8.48975 3.74448C8.54522 3.7347 8.6021 3.73626 8.65694 3.74907C8.71179 3.76189 8.76348 3.78569 8.80887 3.81904C8.85426 3.85239 8.89241 3.8946 8.92103 3.94312C8.94965 3.99163 8.96813 4.04544 8.97536 4.1013C8.9826 4.15716 8.97843 4.21391 8.96311 4.26811C8.9478 4.32232 8.92165 4.37285 8.88625 4.41667Z" fill="#CA9C00"/>
        //      </Icon>
        //      <Text color={'#797979'} fontWeight={'400'} fontSize={'14px'} lineHeight={'19px'}> Certified authentic</Text>
        //  </Box>
         :null
        

}
        </Card>
        

             


                {/* <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
        //        <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
        //            <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
        //            </Icon>
        //        </Text> */}
         <Modal onClose={onCollectorNftClose} isOpen={isCollectorNftOpen} size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton  />
                    <ModalBody>


                        <Box pt={'90px'} pb={'48px'}>
                            <Box py={'5rem'} px={{base:'20px',md:'60px',lg:'112px'}}>
                                <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}} gap={16}>
                                    <Box>
                                        <Heading fontWeight={'600'} fontSize={'16px'} mb={'1rem'} color={'#636262'} lineHeight={'24px'} mb={4}> {collectorDAta?.artistName}</Heading>

                                        <BioRymHeading  color={'#363535'} fontSize={'60px'} lineHeight={'60px'} fontWeight={'700'}  mb={'16px'} textAlign={'left'} >
                                            {collectorDAta?.title}
                                        </BioRymHeading>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={8} textAlign={'left'} mb={4}>
                                            {collectorDAta?.description}
                                        </Text>
                                        <Flex mb={10} gap={4} flexWrap={'wrap'}>
                                            <Button onClick={onProvenancepen} mb={3} bg='#0F0EA7' color='#fff' borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                    rightIcon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00293 3.0605L1.54768 9.51575L0.487183 8.45525L6.94168 2H1.25293V0.5H9.50293V8.75H8.00293V3.0605Z" fill="white"/>
                                            </svg>
                                            } >Provenance
                                            </Button>
                                            <Link isExternal  href={`${scanLink}address/${collectorDAta?.galleryContractAddress}`} textDecoration={"none!important"}>
                                            <Button   mb={'2rem'}  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  rightIcon={<ExternalLinkIcon />}    marginRight={'1rem'} >
                                                Smart contract
                                            </Button>
                                            </Link>
                                        </Flex>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={1} textAlign={'left'} mb={4}>
                                            Minted with DadaVault by <Link onClick={()=>{
                                            
                                                window.open(`/GalleryStoreFront/${collectorDAta?.galleryProfile}`)
                                            }} color={'#0F0EA7'} fontWeight={'500'}>{collectorDAta?.galleryName}</Link>
                                        </Text>
                                    </Box>
                                    <Box width={'100%'}>
                                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${collectorDAta?.file}`}  maxH={'500px'} maxW={'100%'} width={'100%'} objectFit={'cover'}/>
                                    </Box>
                                </Grid>
                            </Box>
                            <Box mt={'100px'} width={'100%'}  display={'flex'}>
                                <Button mb={3} bg='#0C0B86' color='#fff'  borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        mx={'auto'} onClick={onCollectorNftClose}>Close Window</Button>
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
                                            {soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                              <Link isExternal href={`${scanLink}tx/${collectorDAta?.buying_hash}`} > Delivered to {userName} </Link>
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${collectorDAta?.buying_hash}`} > Sold by {collectorDAta?.galleryName} to {userName} </Link>
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                            {listDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${collectorDAta?.listing_hash}`} > Listed for sale by {collectorDAta?.galleryName} </Link>
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {mintDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${collectorDAta?.mint_hash}`} >   Minted by {collectorDAta?.galleryName} with {collectorDAta?.artistName} </Link>
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
              
    )
}

export default NFTCARD;

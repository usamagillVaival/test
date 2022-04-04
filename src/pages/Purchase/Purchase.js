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
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalBody,ModalCloseButton,
    Td,
    Image,
    Modal,
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
    Menu,
    MenuButton,
    MenuList,
    ModalHeader,
    MenuItem, Container, FormControl, Spinner
} from "@chakra-ui/react";
import {ArrowForwardIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card, CardHeading, CustomBadge, NFTCustomCard} from '../../assets/StyledComponent/styeledComponent';
import Avatar from '../../assets/images/avatar.png';
import {ArtistListing} from "../index";
import moment from "moment";
import ReactPaginate from 'react-paginate';
import Dummy from '../../assets/images/dummy2.png'
import React , { useState,useEffect }  from "react";
import CryptoJS from 'crypto-js';
import server from "../../apis/server";
import { navigate} from "@reach/router";
import {descendingDate} from '../StoreFront/GalleryStoreFront/FilterFunctions'
import { LoadingScreen } from "../../components";
const scanLink = process.env.REACT_APP_SCAN_LINK;



function Sales(props) {
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""
    const userName=userType?.name
    const userId=userType?._id
    const [loader,setLoader]=useState(true);
    const [mintDate,setMintDate]=useState()
    const [listDate,setListDate]=useState()
    const [soldDate,setSoldDate]=useState()
    const [spin,setSpinner]=useState(false);

    const [offers,setOffers]=useState([]);
    const [completed,setCompleted]=useState([]);
    const [canceled,setCanceled]=useState([]);
    const [nftDetail,setNftDetail]=useState([])
    const { isOpen: isCollectorNftOpen , onOpen: onCollectorNftOpen, onClose:onCollectorNftClose
    } = useDisclosure();

   const { isOpen: isProvenanceOpen , onOpen: onProvenancepen, onClose:onProvenanceClose
    } = useDisclosure();
   
    const itemsPerPage=8
    
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const [currentItems1, setCurrentItems1] = useState(null);
    const [pageCount1, setPageCount1] = useState(0);
    const [itemOffset1, setItemOffset1] = useState(0);

    const [currentItems2, setCurrentItems2] = useState(null);
    const [pageCount2, setPageCount2] = useState(0);
    const [itemOffset2, setItemOffset2] = useState(0);



    useEffect(async() => {
       
        await loadSales();
       
        
         },[itemOffset, itemsPerPage]);

      useEffect(async() => {
       
       
         await loadCompleted();
        
        
         },[itemOffset1, itemsPerPage]);


         useEffect(async() => {
       
            
            
             await loadCanceled();
            
             },[itemOffset2, itemsPerPage]);
    

    const loadSales = async() => {
        
    
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/offer/getOfferByCollector",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
            setLoader(false);
            console.log("data",r.data)
            setOffers(r.data.data.filter(val=>val?.tx_status=="confirmed"));
            const endOffset = itemOffset + itemsPerPage;
    
    setCurrentItems(r?.data?.data.filter(val=>val?.tx_status=="confirmed").sort(descendingDate).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(r?.data?.data.filter(val=>val?.tx_status=="confirmed").length / itemsPerPage));
            
           }).catch(e=>{console.log(e)
        })
           
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % offers.length;
        setItemOffset(newOffset);
      };
    const loadCompleted = async() => {
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/nft/PurchaseByCollector",
             {
               payload: ciphertext,
             },
             {
               headers: {
                 "Content-Type": "application/json",
               },
             }
           ).then((r)=>{
               setLoader(false)
            console.log(r.data)
            setCompleted(r.data.data);
            const endOffset1 = itemOffset1 + itemsPerPage;
    
    setCurrentItems1(r?.data?.data.sort(descendingDate).slice(itemOffset1, endOffset1));
    setPageCount1(Math.ceil(r?.data?.data.length / itemsPerPage));
           
           }).catch(e=>console.log(e))
    }
    const handlePageClick1 = (event) => {
        const newOffset = (event.selected * itemsPerPage) % completed.length;
        setItemOffset1(newOffset);
      };

    const loadCanceled = async() => {
        console.log(userId)
        let data = {
            userId
         };
         let ciphertext = CryptoJS.AES.encrypt(
           JSON.stringify(data),
           "dvault@123"
         ).toString();
         await server
           .post(
             "/nft/CancelledByCollector",
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
            setCanceled(r.data.data);
            setLoader(false)
            const endOffset2 = itemOffset2 + itemsPerPage;
    
            setCurrentItems2(r?.data?.data.sort(descendingDate).slice(itemOffset2, endOffset2));
            setPageCount2(Math.ceil(r?.data?.data.length / itemsPerPage));
           }).catch(e=>console.log(e))

    }
    const handlePageClick2 = (event) => {
        const newOffset = (event.selected * itemsPerPage) % canceled.length;
        setItemOffset2(newOffset);
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
                                        
        /></Box>
          )
        
    }

    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  bg={'#fff'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'} mt={'6px'} flex="1">
                            <Heading color={'#4D4D4D'}  fontWeight="400" fontSize="14px">Purchases</Heading>
                        </Box>
                    </Flex>
                    <Heading mt={'54px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>{} NFT sales</Heading>
                </Box>
                {!offers?.length&&!completed?.length&&!canceled?.length?
                <Box as='section'  className='Login' borderTop={'1px solid #BCBCBC'}>
                    <Flex   >
                        <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column" >
                            <Box mb={'2.5rem'} mt={'5rem'}className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                <FormControl>
                                    <Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                        <path d="M22.8998 14.1L32.7988 15.515L34.2128 25.415L25.0208 34.607C24.8333 34.7944 24.579 34.8998 24.3138 34.8998C24.0487 34.8998 23.7944 34.7944 23.6068 34.607L13.7068 24.707C13.5194 24.5194 13.4141 24.2651 13.4141 24C13.4141 23.7348 13.5194 23.4805 13.7068 23.293L22.8998 14.1ZM25.7278 22.586C25.9136 22.7717 26.1341 22.9189 26.3768 23.0194C26.6195 23.1199 26.8796 23.1716 27.1422 23.1715C27.4049 23.1715 27.6649 23.1197 27.9076 23.0191C28.1502 22.9186 28.3707 22.7712 28.5563 22.5855C28.742 22.3997 28.8893 22.1792 28.9898 21.9365C29.0903 21.6939 29.1419 21.4338 29.1419 21.1711C29.1419 20.9085 29.0901 20.6484 28.9895 20.4058C28.889 20.1631 28.7416 19.9427 28.5558 19.757C28.3701 19.5713 28.1496 19.424 27.9069 19.3235C27.6642 19.2231 27.4041 19.1714 27.1415 19.1714C26.611 19.1715 26.1024 19.3823 25.7273 19.7575C25.3523 20.1326 25.1417 20.6414 25.1418 21.1718C25.1419 21.7023 25.3527 22.211 25.7278 22.586Z" fill="#795E00"/>
                                    </Icon>


                                    <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >No NFTs sales</Text>
                                    <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >  You haven’t received any sales or offers yet.  </Text>

                                </FormControl>


                            </Box>

                        </Container>


                    </Flex>
                </Box>:

                <Box h={'100%'} px={'24px'}>
                        <Tabs>
                            <TabList   >
                                <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Offers</Tab>
                                <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}} >Completed</Tab>
                                <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Canceled</Tab>
                            </TabList>
                            <TabPanels  h={'100%'} mb={10}>
                                <TabPanel  p={0} color={'#000'} h={'100%'} py={6} >
                                   
                                {spin==false?
                                             offers.length?
                                             <>
                                            
                                    <Box p={0} color={'#000'} h={'100%'} >
                                             
                                        <Box overflowX={"auto"}>
                                            
                                            
                                            <Table
                                                borderWidth="1px"
                                                borderCollapse={"separate"}
                                                borderSpacing={"0"}
                                                p={0}
                                                mb={'40px'}
                                                minW={'800px'}
                                            >
                                                <Thead bg={'#F7F7F7'}>
                                                    <Tr >
                                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'28%'}>GALLERY</Th>
                                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'19%%'}>NFT</Th>
                                                        <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>LIST PRICE</Th>
                                                        <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>OFFERED PRICE</Th>
                                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'15%'}></Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    { currentItems?.map(offer=>(
                                                        <Tr mb="0"  borderWidth="1px">
                                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                <Flex alignItems={'center'}>
                                                                    <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.gallery?.gallery_logo}`} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                                    <Box pl={'1rem'}>
                                                                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >{offer?.gallery?.name}</Text>
                                                                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{offer?.gallery?.email}</Text>
                                                                    </Box>
                                                                </Flex>
                                                            </Td>

                                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'14px'} fontWeight={"500"} >
                                                               
                                                                <Link onClick={()=>{
                                                                    setMintDate(new Date(offer?.artist_artwork?.mint_date ))
                                                                    setListDate(new Date(offer?.artist_artwork?.listed_Date))
                                                                    setSoldDate(new Date(offer?.artist_artwork?.sold_date))
                                                                   setNftDetail(offer.artist_artwork)
                                                                   onCollectorNftOpen()
                                                               }}> {offer?.artist_artwork?.title} </Link>
                                                            </Td>  <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                                {offer?.sale_price} ETH
                                                            </Td>
                                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                {offer?.offered_price} ETH
                                                            </Td>

                                                            <Td textAlign={'end'}>
                                                                <Link  color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={()=>navigate("/purchaseDetail",{ state: {offer }})} >View details</Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                    }
                                                </Tbody>
                                            </Table>


                                        </Box>
                                        
                                        <Box display={'flex'} alignItems={'center'} >
                                            <Text color={'#8F8F8F'}>{offers?.length} offers</Text>
                                            <Box ml={'auto'}>
                                                {/* <Button  color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>
                                                <Button  color={"#8F8F8F"} background={'none'}  fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"}  border={'1px solid #D2D2D2'}>Next</Button> */}
                                                 <Box ml={'auto'} className={'newPaginations'} >
        
        <ReactPaginate
               breakLabel="..."
               nextLabel="Next"
               onPageChange={handlePageClick}
               pageRangeDisplayed={5}
               pageCount={pageCount}
               previousLabel="Previous"
               pageClassName="Mypage-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
              
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
             />
       
           </Box>
                                            </Box>

                                        </Box>
                                        
                                        
                                    </Box>
                                        </>
                                        : <Box as='section'  className='Login'>
                                                     <Flex   >
                                                         <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column" >
                                                             <Box mb={'2.5rem'} mt={'5rem'}className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                                                 <FormControl>
                                                                     <Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                         <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                                         <path d="M22.8998 14.1L32.7988 15.515L34.2128 25.415L25.0208 34.607C24.8333 34.7944 24.579 34.8998 24.3138 34.8998C24.0487 34.8998 23.7944 34.7944 23.6068 34.607L13.7068 24.707C13.5194 24.5194 13.4141 24.2651 13.4141 24C13.4141 23.7348 13.5194 23.4805 13.7068 23.293L22.8998 14.1ZM25.7278 22.586C25.9136 22.7717 26.1341 22.9189 26.3768 23.0194C26.6195 23.1199 26.8796 23.1716 27.1422 23.1715C27.4049 23.1715 27.6649 23.1197 27.9076 23.0191C28.1502 22.9186 28.3707 22.7712 28.5563 22.5855C28.742 22.3997 28.8893 22.1792 28.9898 21.9365C29.0903 21.6939 29.1419 21.4338 29.1419 21.1711C29.1419 20.9085 29.0901 20.6484 28.9895 20.4058C28.889 20.1631 28.7416 19.9427 28.5558 19.757C28.3701 19.5713 28.1496 19.424 27.9069 19.3235C27.6642 19.2231 27.4041 19.1714 27.1415 19.1714C26.611 19.1715 26.1024 19.3823 25.7273 19.7575C25.3523 20.1326 25.1417 20.6414 25.1418 21.1718C25.1419 21.7023 25.3527 22.211 25.7278 22.586Z" fill="#795E00"/>
                                                                     </Icon>


                                                                     <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >No NFTs sales</Text>
                                                                     <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >  You haven’t received any sales or offers yet.  </Text>

                                                                 </FormControl>


                                                             </Box>

                                                         </Container>


                                                     </Flex>
                                                 </Box>
                                        :
                                        <Box height='100%' width='100%' minH='80vh' display='flex'>
                                        <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        margin='auto'
                                        />
                                        </Box>
                                        }

                                </TabPanel>
                                <TabPanel  p={0} color={'#000'} h={'100%'} py={6}>
                                    
                                {spin==false?
                                        completed?.length?
                                        <>
                                    <Box overflowX={"auto"}>
                                        
                                        <Table
                                            borderWidth="1px"
                                            borderCollapse={"separate"}
                                            borderSpacing={"0"}
                                            p={0}
                                            mb={'40px'}
                                            minW={'800px'}
                                        >
                                            <Thead bg={'#F7F7F7'}>
                                                <Tr >

                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'28%'}>GALLERY</Th>
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'19%%'}>NFT</Th>
                                                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>LIST PRICE</Th>
                                                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'19%'}>PURCHASE OPTION</Th>
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'15%'}></Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                            
                                            { currentItems1?.map(offer=>(
                                                        <Tr mb="0"  borderWidth="1px">
                                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                <Flex alignItems={'center'}>
                                                                    <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.gallery?.gallery_logo}`} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                                    <Box pl={'1rem'}>
                                                                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >{offer?.gallery?.name}</Text>
                                                                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{offer?.gallery?.email}</Text>
                                                                    </Box>
                                                                </Flex>
                                                            </Td>

                                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'14px'} fontWeight={"500"} >

                                                               
                                                               <Link onClick={()=>{
                                                                   
                                                                    setMintDate(new Date(offer?.artist_artwork?.mint_date ))
                                                                    setListDate(new Date(offer?.artist_artwork?.listed_Date))
                                                                    setSoldDate(new Date(offer?.artist_artwork?.sold_date))
                                                                   setNftDetail(offer?.artist_artwork)
                                                                   onCollectorNftOpen()
                                                               }}> {offer?.artist_artwork?.title} </Link>

                                                            </Td>  <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                                {offer?.sale_price} ETH
                                                            </Td>
                                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                {offer?.purchase_option=="buy"?"Buy now":null}{offer?.purchase_option=="offer"?"Make offer":null}
                                                            </Td>

                                                            <Td textAlign={'end'}>
                                                                <Link  color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={()=>navigate("/purchaseDetail",{ state: {offer }})} >View details</Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                    }
                                            </Tbody>
                                        </Table>
                                    </Box>
                                        <Box display={'flex'} alignItems={'center'} >
                                            <Text color={'#8F8F8F'}>{completed?.length} purchases</Text>
                                            <Box ml={'auto'}>
                                                {/* <Button  color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>
                                            
                                            <Button  color={"#8F8F8F"} background={'none'}  fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"}  border={'1px solid #D2D2D2'}>Next</Button> */}
                                             <Box ml={'auto'} className={'newPaginations'} >
        
        <ReactPaginate
               breakLabel="..."
               nextLabel="Next"
               onPageChange={handlePageClick1}
               pageRangeDisplayed={5}
               pageCount={pageCount1}
               previousLabel="Previous"
               pageClassName="Mypage-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
              
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
             />
       
           </Box>
                                            </Box>

                                        </Box>
                                        </>
                                        :
                                            <Box as='section'  className='Login' >
                                                <Flex   >
                                                    <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column" >
                                                        <Box mb={'2.5rem'} mt={'5rem'}className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                                            <FormControl>
                                                                <Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                                    <path d="M22.8998 14.1L32.7988 15.515L34.2128 25.415L25.0208 34.607C24.8333 34.7944 24.579 34.8998 24.3138 34.8998C24.0487 34.8998 23.7944 34.7944 23.6068 34.607L13.7068 24.707C13.5194 24.5194 13.4141 24.2651 13.4141 24C13.4141 23.7348 13.5194 23.4805 13.7068 23.293L22.8998 14.1ZM25.7278 22.586C25.9136 22.7717 26.1341 22.9189 26.3768 23.0194C26.6195 23.1199 26.8796 23.1716 27.1422 23.1715C27.4049 23.1715 27.6649 23.1197 27.9076 23.0191C28.1502 22.9186 28.3707 22.7712 28.5563 22.5855C28.742 22.3997 28.8893 22.1792 28.9898 21.9365C29.0903 21.6939 29.1419 21.4338 29.1419 21.1711C29.1419 20.9085 29.0901 20.6484 28.9895 20.4058C28.889 20.1631 28.7416 19.9427 28.5558 19.757C28.3701 19.5713 28.1496 19.424 27.9069 19.3235C27.6642 19.2231 27.4041 19.1714 27.1415 19.1714C26.611 19.1715 26.1024 19.3823 25.7273 19.7575C25.3523 20.1326 25.1417 20.6414 25.1418 21.1718C25.1419 21.7023 25.3527 22.211 25.7278 22.586Z" fill="#795E00"/>
                                                                </Icon>


                                                                <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >No NFTs sales</Text>
                                                                <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >  You haven’t received any sales or offers yet.  </Text>

                                                            </FormControl>


                                                        </Box>

                                                    </Container>


                                                </Flex>
                                            </Box>

                                    :<Box height='100%' width='100%' minH='80vh' display='flex'>
                                        <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        margin='auto'
                                    
                                        />
                                        </Box>}
                                </TabPanel>
                                <TabPanel  p={0} color={'#000'} h={'100%'} py={6}>

                                {spin==false?
                                        canceled?.length?
                                        <>
                                    <Box overflowX={"auto"}>
                                    
                                        
                                        <Table
                                            borderWidth="1px"
                                            borderCollapse={"separate"}
                                            borderSpacing={"0"}
                                            p={0}
                                            mb={'40px'}
                                            minW={'800px'}
                                        >
                                            <Thead bg={'#F7F7F7'}>
                                                <Tr >
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'28%'}>GALLERY</Th>
                                                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'24%'}>NFT</Th>
                                                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'24%'}>OFFERED PRICE</Th>
                                                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'24%'}>REASON</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>

                                                {currentItems2?.map(offer=>(
                                                <Tr mb="0"  borderWidth="1px">
                                                    <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                                <Flex alignItems={'center'}>
                                                                    <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${offer?.gallery?.gallery_logo}`} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                                    <Box pl={'1rem'}>
                                                                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >{offer?.gallery?.name}</Text>
                                                                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{offer?.gallery?.email}</Text>
                                                                    </Box>
                                                                </Flex>
                                                            </Td>

                                                    <Td color={"#0F0EA7"} border={"none"} fontSize={'14px'} fontWeight={"500"} >
                                                   
                                                    <Link onClick={()=>{
                                                        setMintDate(new Date(offer?.artist_artwork?.mint_date ))
                                                        setListDate(new Date(offer?.artist_artwork?.listed_Date))
                                                        setSoldDate(new Date(offer?.artist_artwork?.sold_date))
                                                                   setNftDetail(offer.artist_artwork)
                                                                   onCollectorNftOpen()
                                                               }}> {offer?.artist_artwork?.title} </Link>
                                                    </Td>  <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                    {offer?.offered_price} ETH
                                                </Td>
                                                    <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                        {offer?.cancelled_reason}
                                                    </Td>
                                                </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </Box>
                                        <Box display={'flex'} alignItems={'center'} >
                                            <Text color={'#8F8F8F'}>{canceled?.length} cancelations</Text>
                                            <Box ml={'auto'}>
                                                {/* <Button  color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>
                                                <Button  color={"#8F8F8F"} background={'none'}  fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"}  border={'1px solid #D2D2D2'}>Next</Button> */}
                                            <Box ml={'auto'} className={'newPaginations'} >
        
        <ReactPaginate
               breakLabel="..."
               nextLabel="Next"
               onPageChange={handlePageClick2}
               pageRangeDisplayed={5}
               pageCount={pageCount2}
               previousLabel="Previous"
               pageClassName="Mypage-item"
               pageLinkClassName="page-link"
               previousClassName="page-item"
               previousLinkClassName="page-link"
               nextClassName="page-item"
               nextLinkClassName="page-link"
              
               breakClassName="page-item"
               breakLinkClassName="page-link"
               containerClassName="pagination"
               activeClassName="active"
               renderOnZeroPageCount={null}
             />
       
           </Box>
                                            </Box>

                                        </Box>
                                        </>
                                        :
                                            <Box as='section'  className='Login' >
                                                <Flex   >
                                                    <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column" >
                                                        <Box mb={'2.5rem'} mt={'5rem'}className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                                            <FormControl>
                                                                <Icon width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                                    <path d="M22.8998 14.1L32.7988 15.515L34.2128 25.415L25.0208 34.607C24.8333 34.7944 24.579 34.8998 24.3138 34.8998C24.0487 34.8998 23.7944 34.7944 23.6068 34.607L13.7068 24.707C13.5194 24.5194 13.4141 24.2651 13.4141 24C13.4141 23.7348 13.5194 23.4805 13.7068 23.293L22.8998 14.1ZM25.7278 22.586C25.9136 22.7717 26.1341 22.9189 26.3768 23.0194C26.6195 23.1199 26.8796 23.1716 27.1422 23.1715C27.4049 23.1715 27.6649 23.1197 27.9076 23.0191C28.1502 22.9186 28.3707 22.7712 28.5563 22.5855C28.742 22.3997 28.8893 22.1792 28.9898 21.9365C29.0903 21.6939 29.1419 21.4338 29.1419 21.1711C29.1419 20.9085 29.0901 20.6484 28.9895 20.4058C28.889 20.1631 28.7416 19.9427 28.5558 19.757C28.3701 19.5713 28.1496 19.424 27.9069 19.3235C27.6642 19.2231 27.4041 19.1714 27.1415 19.1714C26.611 19.1715 26.1024 19.3823 25.7273 19.7575C25.3523 20.1326 25.1417 20.6414 25.1418 21.1718C25.1419 21.7023 25.3527 22.211 25.7278 22.586Z" fill="#795E00"/>
                                                                </Icon>


                                                                <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >No NFTs sales</Text>
                                                                <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >  You haven’t received any sales or offers yet.  </Text>

                                                            </FormControl>


                                                        </Box>

                                                    </Container>


                                                </Flex>
                                            </Box>
                                    :<Box height='100%' width='100%' minH='80vh' display='flex'>
                                        <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='#0C0B86'
                                        size='xl'
                                        margin='auto'
                                    
                                        />
                                        </Box>}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>}
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
                                        <Heading fontWeight={'600'} fontSize={'16px'} mb={'1rem'} color={'#636262'} lineHeight={'24px'} >{nftDetail?.artistName} </Heading>

                                        <Text  color={'#363535'} fontSize={'60px'} lineHeight={'60px'} fontWeight={'700'}  mb={4} textAlign={'left'} >
                                           {nftDetail?.title}
                                        </Text>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={8} textAlign={'left'} mb={4}>
                                            {nftDetail?.description}
                                        </Text>
                                        <Flex mb={10} gap={4}>
                                            <Button onClick={onProvenancepen} mb={3} bg='#0C0B86' color='#fff'  borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                    rightIcon={<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.00293 3.0605L1.54768 9.51575L0.487183 8.45525L6.94168 2H1.25293V0.5H9.50293V8.75H8.00293V3.0605Z" fill="white"/>
                                            </svg>
                                            } >Provenance
                                            </Button>
                                            <Link isExternal  href={`${scanLink}address/${nftDetail?.galleryContractAddress}`} textDecoration={"none!important"}>
                                            <Button   mb={'2rem'}  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D'   rightIcon={<ExternalLinkIcon />}  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginRight={'1rem'} >
                                                Smart contractggjh
                                            </Button>
                                            </Link>
                                        </Flex>
                                        <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'400'}  mb={1} textAlign={'left'} mb={4}>
                                            Minted with DadaVault by <Link
                                            onClick={()=>{
                                                window.open(`/GalleryStoreFront/${nftDetail?.galleryProfile}`)
                                            }}
                                             color={'#0F0EA7'} fontWeight={'500'}>{nftDetail?.galleryName}</Link>
                                        </Text>
                                    </Box>
                                    <Box width={'50%'}>
                                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${nftDetail?.file}`}  width={'100%'} maxH={'500px'}/>
                                    </Box>

                                </Flex>

                            </Box>
                            <Box mt={'100px'} width={'100%'}  display={'flex'}>
                                <Button mb={3} bg='#0C0B86' color='#fff'  borderRadius={'0px'}  mx={'auto'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                >Close Window</Button>
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
                                            {nftDetail?.status==6 ?
                                            soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                            :
                                            <Text>Not Delivered</Text>
                                        }
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                               {nftDetail?.status==6?
                                               <Text>
                                             <Link  isExternal href={`${scanLink}tx/${nftDetail?.buying_hash}`}>   Delivered to {userName} </Link> </Text>
                                                :
                                                <Text>Not Delivered Yet</Text>
                                               }
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {
                                                nftDetail?.status==6?    
                                                soldDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                                :
                                                <Text>Not Sold</Text>
                                            }
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            {(nftDetail?.status!=6) ?
                                            <Text>Not Sold Yet</Text>

                                            :
                                            <Text>
                                           <Link  isExternal href={`${scanLink}tx/${nftDetail?.buying_hash}`}> Sold by {nftDetail?.galleryName} to {userName} </Link>
                                            </Text>
}
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                            {listDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${nftDetail?.listing_hash}`}>     Listed for sale by {nftDetail?.galleryName} </Link>
                                            </Td>
                                        </Tr>  <Tr mb="0"  borderWidth="1px">
                                            <Td color={"#4D4C4C"} border={"none"} fontSize={'16px'} fontWeight={"400"} width={'25%'}>
                                                {
                                                    
                                                mintDate?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
                                                }
                                            </Td>

                                            <Td color={"#0F0EA7"} border={"none"} fontSize={'16px'} fontWeight={"600"} width={'75%'}>
                                            <Link isExternal href={`${scanLink}tx/${nftDetail?.mint_hash}`}> Minted by {nftDetail?.galleryName} with {nftDetail?.artistName}</Link>
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

export default Sales;

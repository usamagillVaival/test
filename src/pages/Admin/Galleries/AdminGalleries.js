import React,{useEffect, useState} from "react";
import {
    Alert,
    AlertIcon,
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
import { useToast } from '@chakra-ui/react'
import { navigate} from "@reach/router";
import ReactPaginate from 'react-paginate';
import { descendingDate } from "../../StoreFront/GalleryStoreFront/FilterFunctions";


function AdminGalleries(props) {

    const toast=useToast()

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
    const [deactive, setDeactive] = useState([]);

    const itemsPerPage=8
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(async() => {
        await load()
         },[itemOffset, itemsPerPage]);

         const load = async ()=>{
            try  { 
                const {data} = await server.post(
                    "users/deactive_gallery",
                    { 
                      headers: {
                        "Content-Type": "application/json",
                      },
                    } 
                  )
               
                  if(data){
                    if(data?.data){
                        console.log("dataaa: ",data?.data)
                     setDeactive(data?.data.sort(descendingDate))
                     const endOffset = itemOffset + itemsPerPage;
                     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
                     setCurrentItems(data?.data.sort(descendingDate).slice(itemOffset, endOffset));
                     setPageCount(Math.ceil(data?.data.length / itemsPerPage));
                    }
                    else{
                    
                    }
                
                  }
                 setLoader(false);
              } catch (e) {
                  alert(e.message)
               
              }
         
            }   

            const handlePageClick = (event) => {
                const newOffset = (event.selected * itemsPerPage) % deactive.length;
                console.log(
                  `User requested page number ${event.selected}, which is offset ${newOffset}`
                );
                setItemOffset(newOffset);
              };
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
              
              if(data?.error){
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
            //   else{
            //     toast({
            //       title: 'Failed',
            //       description: `${data.error}`,
            //       status: 'error',
            //       duration: 4000,
            //       isClosable: true,
            //     })
            //   }
            
            
          }
          
        
  };

    return (


        <Formik
        initialValues={{  email: "",name:"" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          emailSender(values, resetForm);
        }} 
        >   
           {(formikProps) => ( 
        <>
<ToastContainer />
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  bg={'#fff'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} alignItems={'center'}>
                        <Box mr={'auto'}  flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" mb={{base:2 , md:0}}>Galleries</Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center" mb={{base:2, md:0}}>

                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={()=>{ onInviteArtistOpen()}} >
                                   + Send invite
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Heading mt={'40px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>Galleries on DadaVault</Heading>

                </Box>


                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }}>
                    <Tabs>
                        <TabList   >
                            <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Active</Tab>
                            <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Invited</Tab>
                            <Tab color={'#666666'} _selected={{color:'#0C0B86', borderBottom:'2px solid #0C0B86'}} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'400'} _hover={{color: "#0C0B86"}} _focus={{boxShadow: "none"}}>Deactivated</Tab>
                        </TabList>
                        <TabPanels px={{base: '2', sm:'4', md: '6', lg: '0' }}  h={'100%'} mb={10}>

                            <TabPanel p={0} color={'#000'} h={'100%'} py={8}>
                         <ActiveGalleries />
                            </TabPanel>
                            <TabPanel  p={0} color={'#000'} h={'100%'} py={8}>
                            <InvitationList invited ={invited}/>
                               
                            </TabPanel>
                            <TabPanel  p={0} color={'#000'} h={'100%'} py={8}>
                                <Box overflowX={"auto"}>
                                    <Table
                                        borderWidth="1px"
                                        borderCollapse={"separate"}
                                        borderSpacing={"0"}
                                        p={0}
                                        mb={'40px'}
                                    >
                                        <Thead bg={'#F7F7F7'}>
                                            <Tr >
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'24%'}>GALLERY</Th>
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'30%'}>DEACTIVATED</Th>
                                                <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'30%'}>SMART CONTRACT</Th>
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} padding={'20px'} width={'16%'}></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                        {currentItems?.map((gallery, i) => ( 
                                            <Tr mb="0"  borderWidth="1px">
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                    <Flex alignItems={'center'}>
                                                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${gallery?.gallery_logo}`} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                        <Box pl={'1rem'}>
                                                            <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >{gallery?.name}</Text>
                                                            <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{gallery?.email}</Text>
                                                        </Box>
                                                    </Flex>
                                                </Td>

                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                {moment(gallery?.pause_date).format('MMMM D, YYYY')}
                                                </Td>
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                    <Box bg={'#DD2922'} color={'#fff'} py={'2px'} px={2} width={'fit-content'}>
                                                        {/* {gallery?.pause_status} */}Pause
                                                    </Box>
                                                </Td>
                                                <Td textAlign={'end'} >
                                                    <Link  color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={()=>navigate("/admin/GalleryDetails",{ state: {gallery}})} >View details</Link>
                                                </Td>
                                            </Tr>
                                        ))}

                                        </Tbody>
                                    </Table>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} >
                              
                                    <Box ml={'auto'} className={'newPaginations'}>
                                       
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

                            </TabPanel>
                            </TabPanels>
                    </Tabs>
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

                    {!invited ?
                        <Box width={'90%'} m={'auto'} pt={'12.5rem'} mb={'auto'} display={'flex'} alignItems={'center'} flexDirection={'column'}>

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
            {formikProps.errors.name && formikProps.touched.name && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                    {formikProps.errors.name}
                                                    </Alert>
        
                                                )}
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
             {formikProps.errors.email && formikProps.touched.email && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                    {formikProps.errors.email}
                                                    </Alert>
        
                                                )}
        </Box>


    </Box>
</Box>

                            <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" mx={'auto'} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}} gap={6}   mb='auto'   name="form-name">
                                <Divider/>
                                <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                    <Button onClick={formikProps.handleSubmit}
                                        mb={3} bg='#0C0B86' color='#fff'  ml={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                            rightIcon={<ArrowForwardIcon />}  >Send invite</Button>
                                </Box>
                            </Grid>
                        </Box>

                    :null}

                        {invited ?<>

<Box px={6} py={6} bg={'#fff'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  >
<Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
 <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'} >You’ve invited {invitationName}</BioRymHeading>
 <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>You’ll be notified when {invitationName} accepts their invite.</Text>
 <Box display='flex' mb={'3'} flexWrap={'wrap'}>
     <Button mb={3} bg='#0C0B86' color='#fff' mx={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
             onClick={()=>{setInvited(false);onInviteArtistClose()}} >Close window</Button>
 </Box>
</Box></>
                      :null}  
                    </ModalBody>
                </ModalContent>
            </Modal>
    
            </>
			   )}
			   </Formik>

    );
}

export default AdminGalleries;

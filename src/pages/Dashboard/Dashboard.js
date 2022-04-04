import React,{useEffect, useState,useRef} from "react";
import {
    Box, Button,Spinner,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Icon, useColorModeValue as mode, Container, FormControl, Divider, useToast,useDisclosure,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Modal
} from "@chakra-ui/react";
import {SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card,CardHeading,CustomBadge} from '../../assets/StyledComponent/styeledComponent';
import Avatar from '../../assets/images/avatar.png';
import { LoadingScreen, SideBar } from "../../components";
import {FaChevronRight} from "react-icons/fa";
import Dummy2 from "../../assets/images/dummy2.png";
import Dummy from "../../assets/images/dummy2.png";
// import {useColorModeValue as mode} from "@chakra-ui/color-mode/dist/declarations/src/color-mode-provider";
import { navigate } from '@reach/router';
import server from "../../apis/server";
import CryptoJS from 'crypto-js';
import {   useDispatch, useSelector} from 'react-redux'
import { toast } from "@chakra-ui/react";
import { setMintSteps } from "../../redux/action/tradingBot";
import CreateNFTStep1 from "../NFTs/CreateNft/CreateNftStep1";
import CreateNftStep2 from "../NFTs/CreateNft/CreateNftStep2";
import CreateNftStep3 from "../NFTs/CreateNft/CreateNftStep3";
import CreateNftStep4 from "../NFTs/CreateNft/CreateNftStep4";
import socketIOClient from "socket.io-client";
import moment from 'moment'
const ENDPOINT = "http://localhost:3033";
function Dashboard(props) {
    const toast=useToast()
    const User1 = JSON.parse(localStorage.getItem("User"))
 
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    const userId=userType?._id
    const userName=userType?.name
    const [artistCount,setArtistCount]=useState('')
    const [nftCount,setNftCount]=useState('')
    const [saleCount,setSaleCount]=useState(0)

    const [dashboardStats,setDashboardStats]=useState([])
    const [datee,setDate]=useState()
    const [loader,setLoader]=useState(true)
    const [notification,setNotification] = useState([])
    const state = useSelector(state => state);
    const {mintsteps}  =   state?.TradingBot

    const socket = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
        loadDashboardStats() 
          },[mintsteps]);


          useEffect(() => {
            getNotification()
              },[]);
              useEffect(() => {
                getTotalSale()
                  },[]);

        
        
        //   useEffect(() => {
        //     const socket = socketIOClient(ENDPOINT);
        //     socket.emit("change",userId);
        //     socket.on("notification", data => {
        //      const dataa =    data?.filter((x)=>x?.notification_reciever==userId)
        //         setNotification(dataa)

        //     //   setResponse(data);
        //     });
        //   }, []);
          const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose:onInviteArtistClose
          } = useDisclosure();







          async function getNotification()
          {
          try{   
             const {data} = await server.post(
                 "/notification/getNotification",
               
                  {userId:userId},
                 { 
                   headers: {
                     "Content-Type": "application/json",
                   },
                 } 
               )
               console.log(data.error)
              
               if(data)
               {
                   console.log('notification',data)
             setNotification(data?.data)
               }
             }
         
          
             catch(e)
             {
                 toast({
                     title: 'Fail',
                     description: `${e} `,
                     status: 'Error',
                     position:'top-right',
                     duration: 4000, variant:'top-accent',
                     isClosable: true,
                     
                   })
                 setLoader(false)
             }
          }
          async function getTotalSale()
          {
          try{   
             const {data} = await server.post(
                 "/nft/TotalSalesByGallery",
               
                  {userId:userId},
                 { 
                   headers: {
                     "Content-Type": "application/json",
                   },
                 } 
               )
               console.log(data.error)
              
               if(data)
               {

             setSaleCount(data?.saleCount)
               }
             }
         
          
             catch(e)
             {
                
                 setLoader(false)
             }
          }




 async function loadDashboardStats()
 {
 try{   
    
    const {data} = await server.post(
        "/gallery/dashboard ",
      
        
         {userId:userId},
        { 
          headers: {
            "Content-Type": "application/json",
          },
        } 
      )
      console.log(data.error)
     
      if(data)
      {
          console.log(data)
      //   setArtistCount(1)
      //   setNftCount(0)
          setArtistCount(data?.artistCount)
          setNftCount(data?.nftCount)
          setDashboardStats(data)
         setDate(new Date(data?.gallery_last_login))
         setLoader(false)
      }
    }

 
    catch(e)
    {
        toast({
            title: 'Fail',
            description: `${e} `,
            status: 'Error',
            position:'top-right',
            duration: 4000, variant:'top-accent',
            isClosable: true,
            
          })
        setLoader(false)
    }
 }   
 function xyz()
 {
     dispatch(setMintSteps(1))
 }
if (loader)
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
    
        /></Box>)
}
  return (
      <>
       
      
          <Box height={'100vh'} overflowY={'scroll'}>
              <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} py={6} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                  <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'24px'} flexDirection={'column'}>
                      <Box mr={'auto'} mt={'6px'} flex="1" display={'flex'} >
                          <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" cursor={'pointer'} lineHeight={'20px'} > Dashboard </Heading>
                      </Box>
                      <Text fontWeight={'800'} color={'#4D4C4C'} fontSize={'20px'} mt={'54px'} lineHeight={'28px'} >Dashboard</Text>
                      <Text fontWeight={'700'} color={'#363535'} fontSize={'30px'} mt={'48px'} lineHeight={'36px'} mb={2}>{userName}</Text>
                      {!dashboardStats?.gallery_login_count?
                      <Text fontWeight={'400'} color={'#797979'} fontSize={'16px'}  lineHeight={'24px'}>Welcome to your DadaVault application.</Text>
                      :
                     <>
                      <Text fontWeight={'400'} color={'#797979'} fontSize={'16px'} lineHeight={'24px'}>Welcome back. Your last visit was on {datee?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})} at {datee?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}.</Text>
                      
                      </>
}
                  </Flex>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={[10,10,8,6]}   mb='auto'   name="form-name" width={'100%'}>
                      <Box p={6} bg={'#fff'} cursor={'pointer'} boxShadow={'0px 4px 6px -1px rgba(32, 31, 31, 0.1), 0px 2px 4px -1px rgba(32, 31, 31, 0.06)'} onClick={() => {
                          navigate("/Artists")
                      }}>
                          <Text fontWeight={'500'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'} mb={2}>Artists</Text>
                          <Text fontWeight={'700'} color={'#201F1F'} fontSize={'30px'} lineHeight={'36px'}>{artistCount}</Text>
                      </Box>
                      <Box p={6} bg={'#fff'} cursor={'pointer'} boxShadow={'0px 4px 6px -1px rgba(32, 31, 31, 0.1), 0px 2px 4px -1px rgba(32, 31, 31, 0.06)'} onClick={()=>{
                          navigate("/NFTs")
                      }}>
                          <Text fontWeight={'500'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'} mb={2}>NFTs</Text>

                          <Text fontWeight={'700'} color={'#201F1F'} fontSize={'30px'} lineHeight={'36px'}>{nftCount}</Text>

                      </Box>
                          <Box  p={6} bg={'#fff'} cursor={'pointer'} boxShadow={'0px 4px 6px -1px rgba(32, 31, 31, 0.1), 0px 2px 4px -1px rgba(32, 31, 31, 0.06)'} 
                          onClick={()=>{
                              navigate("/Sales")
                          }}>
                          <Text fontWeight={'500'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'} mb={2}>Sales</Text>

                          <Text fontWeight={'700'} color={'#201F1F'} fontSize={'30px'} lineHeight={'36px'}>{saleCount.toFixed(6)} ETH</Text>
                      </Box>
                  </Grid>
              </Box>

              <Box px={6}>
         
            
            
            
                  
              {!saleCount?
              <>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)']} gap={[10,10,8,6]}   mb='auto'   name="form-name" width={'100%'}>
                     
                      <Box >
                          <Box height={1} width={'100%'} bg={
                              !artistCount? '#0F0EA7':
                              '#008A27'
                              } mb={4}></Box>
                          <Text fontWeight={'500'} color={
                              
                              !artistCount? '#0F0EA7':
                              '#008A27'} fontSize={'14px'} lineHeight={'16px'} mb={2}>
                                   {!artistCount?
                             <Text> 
                                  Step 1
                                 </Text>
                                 :
                                 <Text>
                                  COMPLETE
                                 </Text>
}
                                 </Text>
                          <Text fontWeight={'500'} color={'#636262'} fontSize={'14px'} lineHeight={'20px'}>
                           
                                 Add your first artist
                                 

                              </Text>
                      </Box>

                      <Box>
                          <Box height={1} width={'100%'} bg={
                              !artistCount && !nftCount?
                            '#D2D2D2'                           :                             
                              artistCount && !nftCount?
                              '#0F0EA7':
                              '#008A27' } mb={4}></Box>

                          <Text fontWeight={'600'} color={
                               !artistCount && !nftCount?
                               '#8F8F8F'                           :                             
                                 artistCount && !nftCount?
                                 '#0F0EA7':
                                 '#008A27'                                 
                          } fontSize={'14px'} lineHeight={'16px'} mb={2}>
                              
                              
                              {!nftCount?
                              <Text> STEP 2 </Text>
                              :
                              <Text>Complete </Text>
}
                             </Text>
                          <Text fontWeight={'500'} color={'#636262'} fontSize={'14px'} lineHeight={'20px'}>Create your first NFT</Text>
                      </Box>

                      <Box>
                          <Box height={1} width={'100%'} bg={
                              (artistCount && nftCount)?
                              '#0F0EA7'
:

                              '#D2D2D2'} mb={4}></Box>
                          <Text fontWeight={'500'} color={'#8F8F8F'} fontSize={'14px'} lineHeight={'16px'} mb={2}>STEP 3</Text>
                          <Text fontWeight={'500'} color={'#636262'} fontSize={'14px'} lineHeight={'20px'}>List a NFT for sale</Text>
                      
                      </Box>
                     
                  </Grid>
                  <Box as='section'  className='Login'>
                      <Flex>
                          <Container display={'flex'} flexDirection={'column'}  align='center'   direction="column">
                              <Box mb={'2.5rem'} mt={'5rem'}  className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  >
                                  <FormControl>

                                      {
                                          !artistCount?
                                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                              <path d="M32 34H16V32C16 30.6739 16.5268 29.4021 17.4645 28.4645C18.4021 27.5268 19.6739 27 21 27H27C28.3261 27 29.5979 27.5268 30.5355 28.4645C31.4732 29.4021 32 30.6739 32 32V34ZM24 25C23.2121 25 22.4319 24.8448 21.7039 24.5433C20.9759 24.2417 20.3145 23.7998 19.7574 23.2426C19.2002 22.6855 18.7583 22.0241 18.4567 21.2961C18.1552 20.5681 18 19.7879 18 19C18 18.2121 18.1552 17.4319 18.4567 16.7039C18.7583 15.9759 19.2002 15.3145 19.7574 14.7574C20.3145 14.2002 20.9759 13.7583 21.7039 13.4567C22.4319 13.1552 23.2121 13 24 13C25.5913 13 27.1174 13.6321 28.2426 14.7574C29.3679 15.8826 30 17.4087 30 19C30 20.5913 29.3679 22.1174 28.2426 23.2426C27.1174 24.3679 25.5913 25 24 25V25Z" fill="#795E00"/>
                                          </svg>
                                              :!nftCount?
                                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                                      <path d="M32 34H16V32C16 30.6739 16.5268 29.4021 17.4645 28.4645C18.4021 27.5268 19.6739 27 21 27H27C28.3261 27 29.5979 27.5268 30.5355 28.4645C31.4732 29.4021 32 30.6739 32 32V34ZM24 25C23.2121 25 22.4319 24.8448 21.7039 24.5433C20.9759 24.2417 20.3145 23.7998 19.7574 23.2426C19.2002 22.6855 18.7583 22.0241 18.4567 21.2961C18.1552 20.5681 18 19.7879 18 19C18 18.2121 18.1552 17.4319 18.4567 16.7039C18.7583 15.9759 19.2002 15.3145 19.7574 14.7574C20.3145 14.2002 20.9759 13.7583 21.7039 13.4567C22.4319 13.1552 23.2121 13 24 13C25.5913 13 27.1174 13.6321 28.2426 14.7574C29.3679 15.8826 30 17.4087 30 19C30 20.5913 29.3679 22.1174 28.2426 23.2426C27.1174 24.3679 25.5913 25 24 25V25Z" fill="#795E00"/>
                                                  </svg>
                                              :
                                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                              <path d="M24 14C29.522 14 34 17.978 34 22.889C33.9992 24.3622 33.4136 25.7748 32.3717 26.8165C31.3299 27.8581 29.9172 28.4435 28.444 28.444H26.478C25.556 28.444 24.811 29.189 24.811 30.111C24.811 30.533 24.978 30.922 25.233 31.211C25.5 31.511 25.667 31.9 25.667 32.333C25.667 33.256 24.9 34 24 34C18.478 34 14 29.522 14 24C14 18.478 18.478 14 24 14ZM22.811 30.111C22.8106 29.6293 22.9052 29.1523 23.0893 28.7072C23.2735 28.2622 23.5436 27.8578 23.8842 27.5172C24.2248 27.1766 24.6292 26.9065 25.0742 26.7223C25.5193 26.5382 25.9963 26.4436 26.478 26.444H28.444C29.3866 26.4435 30.2905 26.0689 30.9572 25.4026C31.6239 24.7363 31.9989 23.8326 32 22.89C32 19.139 28.468 16 24 16C21.9356 15.9981 19.9503 16.7944 18.4594 18.2223C16.9684 19.6501 16.0872 21.5991 15.9999 23.6617C15.9126 25.7243 16.626 27.7408 17.991 29.2895C19.3559 30.8383 21.2668 31.7994 23.324 31.972C22.9892 31.4093 22.812 30.7668 22.811 30.112V30.111ZM19.5 24C19.1022 24 18.7206 23.842 18.4393 23.5607C18.158 23.2794 18 22.8978 18 22.5C18 22.1022 18.158 21.7206 18.4393 21.4393C18.7206 21.158 19.1022 21 19.5 21C19.8978 21 20.2794 21.158 20.5607 21.4393C20.842 21.7206 21 22.1022 21 22.5C21 22.8978 20.842 23.2794 20.5607 23.5607C20.2794 23.842 19.8978 24 19.5 24ZM28.5 24C28.1022 24 27.7206 23.842 27.4393 23.5607C27.158 23.2794 27 22.8978 27 22.5C27 22.1022 27.158 21.7206 27.4393 21.4393C27.7206 21.158 28.1022 21 28.5 21C28.8978 21 29.2794 21.158 29.5607 21.4393C29.842 21.7206 30 22.1022 30 22.5C30 22.8978 29.842 23.2794 29.5607 23.5607C29.2794 23.842 28.8978 24 28.5 24ZM24 21C23.6022 21 23.2206 20.842 22.9393 20.5607C22.658 20.2794 22.5 19.8978 22.5 19.5C22.5 19.1022 22.658 18.7206 22.9393 18.4393C23.2206 18.158 23.6022 18 24 18C24.3978 18 24.7794 18.158 25.0607 18.4393C25.342 18.7206 25.5 19.1022 25.5 19.5C25.5 19.8978 25.342 20.2794 25.0607 20.5607C24.7794 20.842 24.3978 21 24 21Z" fill="#795E00"/>
                                          </svg>
                                      }
                                      <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >
                                          {!artistCount?
                                          <Text>
                                          Add your first Artist
                                          </Text>
                                          :!nftCount?
                                          <Text>Create your first NFT</Text>
                                          :
                                          <Text>Make your first sale</Text>
                                              }
                                           </Text>
                                      <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >
                                          {!artistCount?
                                          <Text>
                                          Invite an Artist to join you on DadaVault so you can mint NFTs together.

                                          </Text>
                                          :!nftCount?
                                          <Text>
                                              It only takes a few minutes to draft, mint, and list NFTs with DadaVault.
                                          </Text>
                                          :
                                          <Text>
                                              List your NFT for sale on your complementary NFT storefront.
                                          </Text>
}
</Text>
                                      {!artistCount?
                                      <Button bg='#0F0EA7' borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86",color:'#fff' }} _active={{ bg: "#090864", }}  color='#fff'
                                      onClick={() =>
                                      {
                                        navigate(`/Artists`, { state: {  invite:true } })
                                      }}>
                                          + Invite artist
                                      </Button>
                                      :!nftCount?
                                      <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff'
                                              _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                              onClick={() =>
                                      {
                                        onInviteArtistOpen();xyz()
                                      }}>
                                          + Create NFT
                                      </Button>
                                      :
                                      <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff'
                                              _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                              onClick={
                                          ()=>{
                                              navigate("/NFTs")
                                          }
                                      }
                                      >
                                          + List NFT
                                      </Button>

                                    

}
                                  </FormControl>


                              </Box>

                          </Container>
                          
                      </Flex>
                      </Box>
                      </>
                      :
                      <>
                                            <Box my={'1rem'} px={6}>
                      <Text  fontWeight={'700'} color={'#363535'} fontSize={'18px'} lineHeight={'28px'} mb={1}>Recent Activity</Text>
                      <Text fontWeight={'400'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'}>Recent Activity</Text>
                  </Box>
                  <Divider borderColor={'#D2D2D2'} my={6}/>
                  <Box overflowX={"auto"}>
                          <Table
                              border={'none'}
                              borderWidth="0px"
                              borderCollapse={"separate"}
                              borderSpacing={"0"}
                              p={0}
                              mb={'40px'}
                          >


                              <Tbody>
                                  <Box width={'100%'} display={'flex'} flexWrap={'wrap'}>




                                  {
          notification?.map((x)=>
          (

              <Tr mb="0" border={'none'}  borderWidth="1px" width={{base:'100%',lg:'100%', xl:'50%' ,'2xl':'50%' }} tableLayout={'fixed'} verticalAlign={'middle'}>
            <Td color={"#636262"} border={"none"} fontSize={'14px'}  fontWeight={"400"}  width={'50%'} display={'inline-block'} >
                <Flex alignItems={'center'} width={'100%'}>
                    {
                       x?.notification_type=="artist update" &&( 

                        
                    <Image src=
                    {`http://51.222.241.160:8001/api/users/artist_profile/${x?.notification_sender?.artist_head_shot}
                    `}
                    width={'48px'} height={'48px'} borderRadius={'50px'}  />
                     
                     )}


                      {
                       x?.notification_type=="sale" &&( 
                    <Image src=
                    {`http://51.222.241.160:8001/api/users/artist_profile/${x?.nft?.file}
                    `}
                    width={'48px'} height={'48px'} borderRadius={'50px'}  />
                     )}


                   {
                       x?.notification_type=="nft" &&( 
                    <Image src=
                    {`http://51.222.241.160:8001/api/users/artist_profile/${x?.nft?.file}
                    `}
                    width={'48px'} height={'48px'} borderRadius={'50px'}  />
                     )}


{
                       x?.notification_type=="offer" &&( 
                    <Image src=
                    {`http://51.222.241.160:8001/api/users/artist_profile/${x?.nft?.file}
                    `}
                    width={'48px'} height={'48px'} borderRadius={'50px'}  />
                     )}

                   {
                       x?.notification_type=="rejected" &&( 
                    <Image src=
                    {`http://51.222.241.160:8001/api/users/artist_profile/${x?.nft?.file}
                    `}
                    width={'48px'} height={'48px'} borderRadius={'50px'}  />
                     )}



                    <Box pl={'1rem'}>
                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} lineHeight={'20px'}>{x?.notification_sender?.name}</Text>
                       
                       

                       {  x?.notification_type=="artist update" &&(
                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  lineHeight={'16px'}>
                            Accepted 
                             <Text px={2} as={'span'} color={'#0F0EA7'} fontWeight={'600'}>
                                 {
                                 x?.notification_sender?.email
                             }</Text></Text>
                         )  }


                          {  x?.notification_type=="offer" &&(
                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  lineHeight={'16px'}>
                            Offered
                             <Text px={2} as={'span'} color={'#0F0EA7'} fontWeight={'600'}>
                                  
                                 {
                                  x?.nft?.title
                             }</Text></Text>
                         )  }

                           {  x?.notification_type=="nft" &&(
                        <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  lineHeight={'16px'}>
                            Approved
                             <Text px={2} as={'span'} color={'#0F0EA7'} fontWeight={'600'}>
                                 {
                                 x?.nft?.title
                             }</Text></Text>
                         )  }



                         {

                         x?.notification_type=="sale" &&(
                         <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  lineHeight={'16px'}>
                            Bought
                             <Text px={2} as={'span'} color={'#0F0EA7'} fontWeight={'600'}>
                                 {
                                 x?.nft?.title
                             }</Text></Text>
                         )
                         }


                         {
                           x?.notification_type=="rejected" &&(
                           <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  lineHeight={'16px'}>
                            Rejected
                             <Text px={2} as={'span'} color={'#0F0EA7'} fontWeight={'600'}>
                                 {
                                 x?.nft?.title
                             }</Text></Text>
                         )  }







                    </Box>
                </Flex>
            </Td>
            <Td color={"#8F8F8F"} border={"none"} fontSize={'12px'} fontWeight={"400"} width={'25%'} display={'inline-block'} >
            {moment(x?.createdAt).fromNow()}
            </Td>
           {
          
          x?.notification_type=="artist update" &&(
            <Td color={"#201F1F"} border={"none"} fontSize={'14px'} fontWeight={"600"}   width={'25%'} display={'inline-block'}> 
           <Link
            onClick={()=>navigate(`/Artists/ArtistDetailNew/${x?.notification_sender?._id}`)}
                     >
                View details
                </Link>
            </Td>
           )
           }

          {
           x?.notification_type=="sale" &&(
            <Td color={"#201F1F"} border={"none"} fontSize={'14px'} fontWeight={"600"}   width={'25%'} display={'inline-block'}> 
           <Link
            onClick={()=>navigate(`/Sales`)}
                     >
                View details
                </Link>
            </Td>
           )
           }


{
           x?.notification_type=="nft" &&(
            <Td color={"#201F1F"} border={"none"} fontSize={'14px'} fontWeight={"600"}   width={'25%'} display={'inline-block'}> 
           <Link
              onClick={()=>navigate(`/NFTsDetailNew/${x?.nft?._id}` )}
                 >
                View details
                </Link>

            </Td>
           )
           }


{
           x?.notification_type=="offer" &&(
            <Td color={"#201F1F"} border={"none"} fontSize={'14px'} fontWeight={"600"}   width={'25%'} display={'inline-block'}> 
           <Link
            onClick={()=>navigate(`/Sales`)}
                     >
                View details
                </Link>
            </Td>
           )
           }


{
           x?.notification_type=="rejected" &&(
            <Td color={"#201F1F"} border={"none"} fontSize={'14px'} fontWeight={"600"}   width={'25%'} display={'inline-block'}> 
           <Link
            onClick={()=>navigate(`/Sales`)}
                     >
                View details
                </Link>
            </Td>
           )
           }




  




        </Tr>

          )
        )}

                                  </Box>


                              </Tbody>
                          </Table>
                      
                     
                  </Box>
                  </>
      
}
    
                  
              
              </Box>
          </Box>
          <Modal onClose={onInviteArtistClose} isOpen={isInviteArtistOpen} size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton  />
                    <ModalBody>
                        {mintsteps===1&&(
                            <Box>
                                <CreateNFTStep1 onClick={onInviteArtistClose}/>
                            </Box>
                        )}
                        {mintsteps===2&&(
                            <Box>
                                <CreateNftStep2  data={onInviteArtistClose}/>
                            </Box>
                        )}
                        {mintsteps===3&&(
                            <Box>
                                <CreateNftStep3 dataaa={onInviteArtistClose}/>

                            </Box>
                        )}
                        {mintsteps===4&&(
                            <Box>
                                <CreateNftStep4  dataaaa={onInviteArtistClose} />

                            </Box>
                        )}
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
      </>
    
  );
}

export default Dashboard;

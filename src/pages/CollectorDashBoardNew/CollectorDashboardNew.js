import React,{useState,useEffect} from "react";
import {
    Box, Button,
    Flex, Grid, Badge, FormLabel,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Icon, useColorModeValue as mode, Container, FormControl, IconButton,Spinner
} from "@chakra-ui/react";
import {SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card,CardHeading,CustomBadge} from '../../assets/StyledComponent/styeledComponent';
import Avatar from '../../assets/images/avatar.png';
import {FaCheck} from "react-icons/fa";
import { Link as ReachLink, navigate } from "@reach/router";
import moment from 'moment'
import server from "../../apis/server";
import CryptoJS from 'crypto-js';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3033";


// import {useColorModeValue as mode} from "@chakra-ui/color-mode/dist/declarations/src/color-mode-provider";

function CollectorDashboardNew(props) {

    const User1 = JSON.parse(localStorage.getItem("User"))
 
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    const userId=userType?._id
    const userName=userType?.name
    const collectorWalletAddress=userType?.collector_wallet_public_key
    const [collectorNftCount,setCollectorNftCount]=useState(0)

    const [loader,setLoader]=useState(true)
    const [notification,setNotification] = useState([])
    const [saleCount,setSaleCount]=useState(0)
    const [clear,setClear]=useState(false)

    
    useEffect(() => {
        getNotification()
          },[]);


          useEffect(() => {
            getTotalSale()
              },[]);

              async function getTotalSale()
              {
              try{   
                 const {data} = await server.post(
                     "/nft/TotalSalesByCollector",
                   
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
                 setLoader(false)
                   }
                 }
             
              
                 catch(e)
                 {
                    
                     setLoader(false)
                 }
              }

          useEffect(() => {
            loadCollectorCount()
              },[]);
          async function loadCollectorCount()
          {
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
                if (data)
                {
                    setLoader(false)
                    const filteredData=data?.userNfts?.filter(current_owner_wallet_address => current_owner_wallet_address.current_owner_wallet_address?.toLowerCase()===collectorWalletAddress.toLowerCase())
                      setCollectorNftCount(filteredData?.length)
                }
          }



          const clearNotification= async(id)=>{
            const {dataa}=await server.post(
                "/notification/deleteNotification",
                {_id:id}
                ,
                { 
                    headers: {
                      "Content-Type": "application/json",
                 },
                  } 
            )
            setClear(!clear)
                  if(dataa){ 
                      
                    //   alert('clear')
                    // setLoader(true)
                    setClear(!clear)
    
                  }
    
    
           }

    //   useEffect(() => {
    //     socket.current = io("ws://localhost:8001");
    //     console.log("socket === ", socket.current);
    //     // console.log("user === ", user);


    //     socket.current.on("notification", (data) => {
    //      console.log(data)
    //     });


    //   }, []);

    
    //   useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.emit("change",userId);
    //     socket.on("notification", data => {
    //      const dataa =    data?.filter((x)=>x?.notification_reciever==userId)
    //         setNotification(dataa)

    //     //   setResponse(data);
    //     });
    //   }, []);
     





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
            
             setLoader(false)
         }
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



          <Box height={'100vh'} overflowY={'scroll'}>
              <Box bg={'#F7F7F7'}>
                  <Box  display={'flex'} flexDirection={'column'}   alignItems={'start'} py={6} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} bg={'#F7F7F7'}>
                      <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} flexDirection={'column'}>
                          <Box mr={'auto'} mt={'6px'} flex="1" display={'flex'} >
                              <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" cursor={'pointer'} lineHeight={'20px'} > Dashboard </Heading>
                          </Box>
                          <Text fontWeight={'800'} color={'#4D4C4C'} fontSize={'20px'} mt={'54px'} lineHeight={'28px'} >Dashboard</Text>
                          <Text fontWeight={'700'} color={'#4D4C4C'} fontSize={'36px'} mt={'48px'} lineHeight={'36px'} mb={2}>{userName}</Text>
                              <Text fontWeight={'400'} color={'#797979'} fontSize={'16px'}  lineHeight={'24px'}>Welcome to your DadaVault application.</Text>

                      </Flex>
                  </Box>


              <Box px={6} pb={6}>
                  <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']} gap={[10,10,8,6]}   mb={6}   name="form-name">
                      <Box p={6} bg={'#fff'} boxShadow={'0px 4px 6px -1px rgba(32, 31, 31, 0.1), 0px 2px 4px -1px rgba(32, 31, 31, 0.06)'}>
                          <Text fontWeight={'500'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'} mb={2}>NFTs</Text>
                          <Text fontWeight={'700'} color={'#201F1F'} fontSize={'30px'} lineHeight={'36px'}>{collectorNftCount}</Text>
                      </Box>
                      <Box p={6} bg={'#fff'} boxShadow={'0px 4px 6px -1px rgba(32, 31, 31, 0.1), 0px 2px 4px -1px rgba(32, 31, 31, 0.06)'}>
                          <Text fontWeight={'500'} color={'#797979'} fontSize={'14px'} lineHeight={'20px'} mb={2}>Portfolio Value</Text>
                          <Text fontWeight={'700'} color={'#201F1F'} fontSize={'30px'} lineHeight={'36px'}>{saleCount.toFixed(5)} ETH</Text>
                      </Box>
                  </Grid>
              </Box>
              </Box>


             {notification.length>0 &&( 
              <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                  <Flex flexWrap={'wrap'} mb={'4rem'}>
                      <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                          <Text color={'#363535'} fontWeight="700" fontSize="24px" lineHeight={'32px'}>Purchases</Text>
                          <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'32px'}>All Purchases action items since your last login</Text>
                      </Box>
                      <Box width={{base:'100%',md:'100%' ,lg:'65%'}}  pl={{base:'0px', md:'0px',lg:'32px'}} mb={{base:6,md:6,lg:0}}>


                      
                      { notification?.map((x)=>
                      {
    if(x.notification_type=='collector accepted'){
return (
                          <Box width={'100%'} mb={'2rem'}>
                              <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                                  <Box width={'100%'}>
                                  <Heading color={'#4D4C4C'} fontWeight="600" mb={1} fontSize="16px" lineHeight={'24px'}>Sales</Heading>

                                      <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}>

                                      {moment(x?.createdAt).format('MMMM D, YYYY')}

                                          </Text>
                                      <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}>
                                          

                                          <Link  >{x?.notification_sender?.name}   </Link> accepted your offer for <Link color={'#0F0EA7'}
                                        onClick={()=>navigate(`/NFTsDetailNew/${x?.nft?._id}`)}

                                          
                                          >{x?.nft?.title}   </Link>
                                            for sale</Text>
                                  </Box>
                                  <IconButton

onClick={()=>{
    clearNotification(x?._id)
}}
                                      height={'32px'}
                                      minWidth={'32px'}
                                      width={'32px'} 
                                      bg={'transparent'}
                                      border={'1px solid #D2D2D2'}
                                      borderRadius={'0px'}
                                      icon={<FaCheck color={'#636262'} fontSize={'11px'}/>}
                                  />                                  </FormLabel>
                          </Box>
        
    
        )}
    }  )} 
                        


                        

                        { notification?.map((x)=>


{
    if(x.notification_type=='Gallery rejected'){
return (   
                          <Box width={'100%'} mb={'2rem'}>
                              <Box width={'100%'}>
                              </Box>
                              <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                                  <Box width={'100%'}>
                                  <Heading color={'#4D4C4C'} fontWeight="600" mb={1} fontSize="16px" lineHeight={'24px'}>Offers</Heading>

                                      <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}>
                                          {moment(x?.createdAt).format('MMMM D, YYYY')}

                                          </Text>
                                      <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}><Link color={'#0F0EA7'} >
                                          {x?.notification_sender?.name}
                                            </Link> rejected your offer for
                                            <Link color={'#0F0EA7'}
                                        onClick={()=>navigate(`/NFTsDetailNew/${x?.nft?._id}`)}

                                          
                                          >{x?.nft?.title}   </Link>
                                            </Text>
                                  </Box>
                                  <IconButton
                                      height={'32px'}
                                      minWidth={'32px'}
                                      width={'32px'}
                                      bg={'transparent'}
                                      border={'1px solid #D2D2D2'}
                                      borderRadius={'0px'}
                                      icon={<FaCheck color={'#636262'} fontSize={'11px'}/>}
                                  />
                              </FormLabel>
                          </Box>
                          
        )}
    }  )} 
    
                      </Box>
                  </Flex>
                  <Flex flexWrap={'wrap'}  mb={'4rem'}>
                      <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                          <Text color={'#363535'} fontWeight="700" fontSize="24px" lineHeight={'32px'}>NFTs</Text>
                          <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'32px'}>All NFTs action items since your last login</Text>
                      </Box>
                      <Box width={{base:'100%',md:'100%' ,lg:'65%'}}  pl={{base:'0px', md:'0px',lg:'32px'}} mb={{base:6,md:6,lg:0}}>
                 
                      
                 

                        
                        { notification?.map((x)=>


{
    if(x.notification_type=='collector recieved nft'){
return (   


                          <Box width={'100%'} mb={'2rem'}>
                              <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                                  <Box width={'100%'}>
                                      <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}>
                                          {moment(x?.createdAt).format('MMMM D, YYYY')}
                                          </Text>
                                      <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}>
                                     { x?.notification_sender?.name} sent 
                                     <Link px={2} color={'#0F0EA7'}
                                     
                                     >
                                             {x?.nft?.title} 
                                             </Link>
                                            to your DadaVault wallet</Text>
                                  </Box>
                                  <IconButton
                                   onClick={()=>{
                                    clearNotification(x?._id)
                                }}
                                      height={'32px'}
                                      minWidth={'32px'}
                                      width={'32px'}
                                      bg={'transparent'}
                                      border={'1px solid #D2D2D2'}
                                      borderRadius={'0px'}
                                      icon={<FaCheck color={'#636262'} fontSize={'11px'}/>}
                                  />                                  </FormLabel>
                          </Box>
)}
}  )} 
                      </Box>
                  </Flex>
                  <Flex flexWrap={'wrap'} mb={'4rem'}>
                      <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                          <Text color={'#363535'} fontWeight="700" fontSize="24px" lineHeight={'32px'}>Messages</Text>
                          <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'32px'}>All Messages action items since your last login</Text>
                      </Box>
                      <Box width={{base:'100%',md:'100%' ,lg:'65%'}}  pl={{base:'0px', md:'0px',lg:'32px'}} mb={{base:6,md:6,lg:0}}>
                          {/* <Box width={'100%'} mb={'2rem'}>
                              <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                                  <Box width={'100%'}>

                                      <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}>Month DD, YYYY</Text>
                                      <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}><Link color={'#0F0EA7'} >Clark Gallery  </Link> accepted their invitation</Text>
                                  </Box>
                                  <IconButton
                                      height={'32px'}
                                      minWidth={'32px'}
                                      width={'32px'}
                                      bg={'transparent'}
                                      border={'1px solid #D2D2D2'}
                                      borderRadius={'0px'}
                                      icon={<FaCheck color={'#636262'} fontSize={'11px'}/>}
                                  />                                  </FormLabel>
                          </Box> */}
                        
                      </Box>
                  </Flex>
              </Box>
             )}
              { notification.length==0 &&(
              <Box as='section'  className='Login'>
                  <Flex>
                      <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column"  >
                          <Box mb={'2.5rem'}  className="Box-card" p='1.5rem' bg='#F7F7F7' borderRadius='0px' boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}  mt={'80px'}>
                              <FormControl>
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                      <path d="M24 34C18.477 34 14 29.523 14 24C14 18.477 18.477 14 24 14C29.523 14 34 18.477 34 24C34 29.523 29.523 34 24 34ZM23.003 28L30.073 20.929L28.659 19.515L23.003 25.172L20.174 22.343L18.76 23.757L23.003 28Z" fill="#795E00"/>
                                  </svg>


                                  <Text fontWeight={'500'} fontSize={'18px'} textAlign={'center'} color={'#363535'} >You have no action items</Text>
                                  <Text fontWeight={'400'} mb={'1.5rem'} fontSize={'14px'} textAlign={'center'} color={'#8F8F8F'}  >You will be notified when your gallery has something for you to do.</Text>

                              </FormControl>


                          </Box>

                      </Container>


                  </Flex>
              </Box>
              )}

          </Box>

      </>
    
  );
}

export default CollectorDashboardNew;

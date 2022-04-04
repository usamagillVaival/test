import React,{useState,useEffect} from "react";
import {
    Box, Button,
    Flex, Grid, Badge, FormLabel,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Icon,useColorModeValue as mode,IconButton,Spinner,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import {Card,CardHeading,CustomBadge} from '../../../assets/StyledComponent/styeledComponent';
import Avatar from '../../../assets/images/avatar.png';
import { FaCheck } from "react-icons/fa";
import server from "../../../apis/server";
import CryptoJS from 'crypto-js';
import { Link as ReachLink, navigate } from "@reach/router";
import moment from 'moment'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3033";
function AdminDashboardNew(props) {


    const User1 = JSON.parse(localStorage.getItem("User"))
 
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    const userId=userType?._id
    const [loader,setLoader]=useState(true)
    const [galleriesCount,setGalleriesCount]=useState('')
    const [clear,setClear]=useState(false)
    const [smartContractCount,setSmartContractCount]=useState('')
    const [notification,setNotification] = useState([])
    useEffect(() => {
        getNotification()
          },[clear]);

       const clearNotification= async(id)=>{
        const {data}=await server.post(
            "/notification/deleteNotification",
            {_id:id}
            ,
            { 
                headers: {
                  "Content-Type": "application/json",
             },
              }  
        )
        console.log(data)
              if(data){
                setClear(!clear)
              }


       }

          useEffect(() => {
            loadDashboardStats() 
              },[]);
    
              async function loadDashboardStats()
              {
              try{   
                 
                 const {data} = await server.post(
                     "/admin/dashboard",
                   
                     
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
                   setLoader(false)
                       setGalleriesCount(data?.galleryCount)
                       setSmartContractCount(data?.galleryContractCount)
                      
                     
                   }
                 }
             
              
                 catch(e)
                 {
                    
                     setLoader(false)
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
        
          
           if(data)
           {
    
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
              <Flex backgroundColor="#fff" minH={'136'} py={'30px'} px={6} flexDirection={'column'}>
                      <Box >
                          <Heading color={'#4D4C4C'} fontWeight="400" fontSize="14px">Dashboard</Heading>
                      </Box>
                      <Text mt={'57px'} color={'#4D4C4C'} fontWeight="800" fontSize="20px">DadaVault Dashboard</Text>
              </Flex>
              <Box px={6}>
                  <Grid marginTop='1rem' templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']} gap={[10,10,8,6]}   mb={6}   name="form-name">
                      <Box p={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                          <Text  color={'#797979'} fontWeight="500" fontSize="14px" lineHeight={'20px'}>Galleries</Text>
                          <Heading color={'#201F1F'} fontWeight="700" fontSize="30px" lineHeight={'36px'}>{galleriesCount}</Heading>
                      </Box>
                      <Box p={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                          <Text  color={'#797979'} fontWeight="500" fontSize="14px" lineHeight={'20px'}>Smart Contracts</Text>
                          <Heading color={'#201F1F'} fontWeight="700" fontSize="30px" lineHeight={'36px'}>{smartContractCount}</Heading>
                      </Box>
                  </Grid>
                  <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                      <Flex flexWrap={'wrap'}>
                          <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                              <Text color={'#363535'} fontWeight="700" fontSize="24px" lineHeight={'32px'}>Galleries</Text>
                              <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'32px'}> All Galleries action items since your last login</Text>
                          </Box>
                          <Box width={{base:'100%',md:'100%' ,lg:'65%'}} pl={{base:'0px', md:'0px',lg:'32px'}}>
                          
                         { notification?.map((x)=>


        {
            if(x.notification_type=='gallery update'){

            return (

                              <Box width={'100%'} mb={'2rem'}>
                                  <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                                      <Box width={'100%'}>
                                          <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}> 
                                          {moment(x?.createdAt).format('MMMM D, YYYY')}
</Text>
                                          <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}><Link color={'#0F0EA7'}
                                          
                                          onClick={()=>navigate('/admin/Galleries')}

                                          >   { x?.notification_sender?.name}  </Link> accepted their invitation</Text>
                                      </Box>
                                      <IconButton
                                      
                                       height={'32px'}
                                       minWidth={'32px'}
                                        width={'32px'}
                                        bg={'transparent'}
                                        border={'1px solid #D2D2D2'}
                                        borderRadius={'0px'}
                                        icon={<FaCheck 
                                            onClick={()=>{
                                            clearNotification(x?._id)
                                        }

                                        }  color={'#636262'} fontSize={'11px'}/>}
                                      />
                                  </FormLabel>
                              </Box>
                  
            )}
                            }  )}      
                          </Box>
                      </Flex>
                  </Box>
                  <Box p={8} mb={6} border={'1px solid #D2D2D2'} boxShadow={' 0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                      <Flex flexWrap={'wrap'}>
                          <Box width={{base:'100%',md:'100%' ,lg:'35%'}} pr={'32px'} mb={{base:6,md:6,lg:0}}>
                              <Text color={'#363535'} fontWeight="700" fontSize="24px" lineHeight={'32px'}>Smart contracts</Text>
                              <Text color={'#797979'} fontWeight="400" fontSize="16px" lineHeight={'32px'}> All Smart contracts action items since your last login</Text>
                          </Box>
                          <Box width={{base:'100%',md:'100%' ,lg:'65%'}}  pl={{base:'0px', md:'0px',lg:'32px'}} mb={{base:6,md:6,lg:0}}>
                          { notification?.map((x)=>


{
    if(x.notification_type=='deployed'){

                                 return (
                              <Box width={'100%'} mb={'2rem'}>
                                  <FormLabel width={'100%'} className="form-control myNewFormcontrol">
                             
                                 
                                      <Box width={'100%'}>
                                          <Text color={'#8F8F8F'} fontWeight="400" mb={1} fontSize="14px" lineHeight={'20px'}> {
                                          moment(x?.createdAt).format('MMMM D, YYYY')
                                          } </Text>
                                          <Text color={'#4D4C4C'} fontWeight="500" fontSize="14px" lineHeight={'20px'}>The smart contract for <Link color={'#0F0EA7'} 
                                          
                                          onClick={()=>navigate('/admin/SmartContract')}

                                          >{x?.notification_sender?.name}  </Link> was deployed</Text>
                                      </Box>
                                      <IconButton
                                          height={'32px'}
                                          minWidth={'32px'}
                                          width={'32px'}
                                          bg={'transparent'}
                                          border={'1px solid #D2D2D2'}
                                          borderRadius={'0px'}
                                          icon={<FaCheck color={'#636262'}
                                          onClick={()=>{
                                            clearNotification(x?._id)
                                        }}
                                          fontSize={'11px'}/>}
                                      />                                  </FormLabel>
                              </Box>
                             
                                    
            )}
        }  )}      

                          </Box>
                      </Flex>
                  </Box>

              </Box>
          </Box>

      </>
    
  );
}

export default AdminDashboardNew;

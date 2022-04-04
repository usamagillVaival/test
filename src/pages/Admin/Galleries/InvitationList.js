import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  Grid,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, useColorModeValue as mode,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import server from "../../../apis/server";
import { navigate, Redirect, redirectTo } from "@reach/router";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { useWallet, UseWalletProvider } from "use-wallet";
import moment from 'moment'
import { useToast } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate';

 

const InvitationList = ({invited}) => {
  const [gallery, setGallery] = React.useState([]);
  const [name, setName] = React.useState();
  const [symbol, setSymbol] = React.useState();
  const [error, setError] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const wallet = useWallet();
  const [options, setOption] = useState([]);
  const [cancelArtist, setCancelArtist] = useState(false);
  const toast=useToast()

  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes =User1?  CryptoJS.AES.decrypt(User1, "userObject"):"";
  const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""

  const userID=userType?._id
  const itemsPerPage=8
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => { 
    load();
  },[invited,cancelArtist,itemOffset, itemsPerPage]);

const load = async ()=>{
    try  { 
        const {data} = await server.post(
            "users/pending_gallery",
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
         
        //    alert(JSON.stringify(data))
          if(data){
            if(data?.data){
                console.log(data?.data)
             setOption(data?.data)
             const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data?.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.data.length / itemsPerPage));
            //   setValidInvitation(true)
            //  setEmail(data?.user?.email)
            //  setAccountType(data?.user?.account_type)
            //  setAccountType(data?.user?.account_type)
            }
            else{
             //  alert('Invalid Invitation Code')
            //  setValidInvitation(false)
            }
        
          }
         
      } catch (e) {
          alert(e.message)
        //  setIsLoading(false)
        // console.log(e); 
        // handleSnackBar(e.message);
        // alert("you have entered wrong email or password");
      }
 
    }     
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % options.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    const cancelInvitation = async (email)=>{
      try  { 
          const {data} = await server.put(
              "users/Invitation/cancel", {
                 email
                },
              { 
                headers: {
                  "Content-Type": "application/json",
                },
              } 
            )
           
          //    alert(JSON.stringify(data))
            if(data){
              console.log(data)
              if(data?.message){
                toast({
                  title: 'Success',
                  description: data?.message,
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                    position:'top-right',
                    variant:'top-accent',
                })
             setCancelArtist(!cancelArtist)
              }
              else{
               //  alert('Invalid Invitation Code')
              //  setValidInvitation(false)
              }
          
            }
           
        } catch (e) {
            alert(e.message)
          //  setIsLoading(false)
          // console.log(e); 
          // handleSnackBar(e.message);
          // alert("you have entered wrong email or password");
        }
   
     
      }     
        

return (
    // <Box as={'section'} className="Login">
    //   <ToastContainer />
    //      <Grid
    //         marginTop="1.5rem"
    //         templateColumns="repeat(1, 1fr)"
    //         gap={6}  mb="2rem"
    //       >
    //         <Box overflowX={"auto"}>
    //           <Table
    //               borderWidth="1px"
    //             borderCollapse={"separate"}
    //             borderSpacing={"0"}
    //             p={0}
    //           >
    //             <Thead bg={'#F7F7F7'}>
    //               <Tr >
    //                 <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'24%'}>DATE</Th>
                    
    //                 <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'33%'}>Name</Th>
    //                 <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'33%'}>Email Address</Th>
    //                 <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'10%'}></Th>
    //               </Tr>
    //             </Thead>
    //             <Tbody>
    //                {options?.map((artist, i) => ( 
    //                 <Tr mb="0"  borderWidth="1px">
    //                   <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
    //                     {moment(artist?.createdAt).format('MMMM Do YYYY')}
    //                   </Td>
                      
    //                   <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
    //                     {artist?.name}
    //                   </Td>
    //                   <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
    //                     {artist?.email}
    //                   </Td>
    //                   <Td textAlign={'end'} >
    //                     <Button onClick={()=>{
    //                        cancelInvitation(artist?.email)
    //                     } } color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"}>Cancel</Button>
    //                   </Td>
    //                 </Tr>
    //                ))}
    //             </Tbody>
    //           </Table>
    //         </Box>
    //       </Grid>


    // </Box>






       <>
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
                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'24%'}>DATE</Th>
                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'30%'}>Name</Th>
                <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'33%'}>Email Address</Th>
                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'13%'}></Th>
            </Tr>
        </Thead>
                   <Tbody>
                    {currentItems?.map((artist, i) => ( 
                     <Tr mb="0"  borderWidth="1px">
                       <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                         {moment(artist?.createdAt).format('MMMM D, YYYY')}
                      </Td>
                      
                      <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                         {artist?.name}
                       </Td>
                       <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                         {artist?.email}
                       </Td>
                       <Td textAlign={'end'} >
                         <Button 
                         onClick={()=>{
                            cancelInvitation(artist?.email)
                         } }
                          color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} variant={'ghost'}>Cancel</Button>
                       </Td>
                     </Tr>
                    ))}
                 </Tbody>
    </Table>
</Box>
<Box display={'flex'} alignItems={'center'} >
 
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


</>













  );
};

export default InvitationList;

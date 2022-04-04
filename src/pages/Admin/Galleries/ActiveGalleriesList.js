import React, { useState,useEffect } from "react";
import ReactPaginate from 'react-paginate';
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
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useDisclosure, useColorModeValue as mode,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import server from "../../../apis/server";
import { navigate, Redirect, redirectTo } from "@reach/router";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { useWallet, UseWalletProvider } from "use-wallet";
import moment from 'moment'
import { LoadingScreen } from "../../../components";
import Dummy from "../../../assets/images/dummy.png";
import { descendingDate } from "../../StoreFront/GalleryStoreFront/FilterFunctions";

const ActiveGalleriesList = ({invited}) => {
  const [gallery, setGallery] = React.useState([]);
  const [name, setName] = React.useState();
  const [symbol, setSymbol] = React.useState();
  const [error, setError] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const wallet = useWallet();
  const [activeGalleriesList, SetActiveGalleriesList] = useState([]);
  const [cancelArtist, setCancelArtist] = useState(false);
  const [loader,setLoader]=useState(true);

  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject") :"";
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
            "users/approved_gallery",
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
       
          if(data){
            if(data?.data){
                console.log(data?.data)
             SetActiveGalleriesList(data?.data.sort(descendingDate))
             const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data?.data.sort(descendingDate).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.data.length / itemsPerPage));
            //   setValidInvitation(true)
            //  setEmail(data?.user?.email)
            //  setAccountType(data?.user?.account_type)
            }
            else{
             //  alert('Invalid Invitation Code')
            //  setValidInvitation(false)
            }
        
          }
         setLoader(false);
      } catch (e) {
          alert(e.message)
        //  setIsLoading(false)
        // console.log(e); 
        // handleSnackBar(e.message);
        // alert("you have entered wrong email or password");
      }
 
    }     
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % activeGalleriesList.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    
    const cancelInvitation = async (email)=>{
      alert('cc')
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
             toast(data?.message)
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
                                    
                                        />
                                        </Box>                         
        )
      }

return (
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
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'22.5%'}>GALLERY</Th>
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'22.5%'}>MEMBER SINCE</Th>
                                                <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'20%%'}>SUBSCRIPTION TYPE</Th>
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'22.5%%'}>SMART CONTRACT</Th>
                                                <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'12.5%'}></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                        {currentItems?.map((gallery, i) => ( 
                                                <Tr mb="0"  borderWidth="1px">
                                                    <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                        <Flex alignItems={'center'}>
                                                            <Image src={gallery?.gallery_logo?`http://51.222.241.160:8001/api/users/artist_profile/${gallery?.gallery_logo}`:Dummy} width={'48px'} height={'48px'} borderRadius={'50px'}  />
                                                            <Box pl={'1rem'}>
                                                                <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >  {gallery?.name} </Text>
                                                                <Text fontWeight={'400'}  fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{gallery?.email}</Text>
                                                            </Box>
                                                        </Flex>
                                                    </Td>

                                                    <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                    {moment(gallery?.createdAt).format('MMMM D, YYYY')}
                                                    </Td>
                                                    <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                        Monthly
                                                    </Td>
                                                    {gallery?.gallery_deploy_status=="deployed"?
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                <Box bg={'#008A27'} color={'#fff'} py={'2px'} px={2} lineHeight={'20px'} width={'fit-content'}>
                                                    Deployed
                                                </Box>
                                                </Td>
                                            :
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                <Box bg={'#24A6DB'} color={'#fff'} py={'2px'} px={2} width={'fit-content'} fontSize={'14px'} fontWeight={'500'}>
                                                    Not deployed
                                                </Box>
                                                </Td>
                                            }
                                                    <Td textAlign={'end'}>
                                                        <Link  color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={()=>navigate("/admin/GalleryDetails",{ state: {gallery }})}>View details</Link>
                                                    </Td>
                                                </Tr>
                                               
                                                      ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                                <Box display={'flex'} alignItems={'center'} >
                                    <Text color={'#8F8F8F'}>{activeGalleriesList?.length} galleries</Text>
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
                                        {/* <Button  color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>
                                        <Button  color={"#8F8F8F"} background={'none'}  fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"}  border={'1px solid #D2D2D2'}>Next</Button> */}


                                    </Box>

                                </Box>
</>



  );
};

export default ActiveGalleriesList;

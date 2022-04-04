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
import server from "../../apis/server";
import { navigate, Redirect, redirectTo } from "@reach/router";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import Factory from "../../abis/DadaVault.json";
import { useWallet, UseWalletProvider } from "use-wallet";
import moment from 'moment'

const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;

 

const ArtistListing = ({invited}) => {
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

  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject"):"";
  const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) :""

  const userID=userType?._id
  useEffect(() => {
    load();
  },[invited,cancelArtist]);

const load = async ()=>{
    try  { 
        const {data} = await server.get(
            "users/pending_artist_byGallery", {
                params: {
                    invited_from: userID
                }
              },
            { 
              headers: {
                "Content-Type": "application/json",
              },
            } 
          )
          if(data){
            if(data?.data){
                console.log(data?.data)
             setOption(data?.data)
            }
            else{
            }
        
          }
         
      } catch (e) {
          alert(e.message)
      }
 
    }     
    
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
            if(data){
              console.log(data)
              if(data?.message){
             toast(data?.message)
             setCancelArtist(!cancelArtist)

              }
              else{

              }
          
            }
           
        } catch (e) {
            alert(e.message)
        }
   
     
      }     
        

return (
    <Box as={'section'} className="Login">
      <ToastContainer />
      {options?.length?

         <Grid
            marginTop="1.5rem"
            templateColumns="repeat(1, 1fr)"
            gap={6}  mb="2rem"
          >
            <Box overflowX={"auto"}>
              <Table
                  borderWidth="1px"
                borderCollapse={"separate"}
                borderSpacing={"0"}
                  minW={'700px'}
                p={0}
              >
                <Thead bg={'#F7F7F7'}>
                  <Tr>
                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'24%'}>DATE</Th>
                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'33%'}>Name</Th>
                    <Th color={'#797979'} fontWeight={"700"}  TextTransform={'capitalize'} fontSize={'12px'} width={'33%'}>Email Address</Th>
                    <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'}  width={'10%'}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                   {options?.map((artist, i) => ( 
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
                        <Button onClick={()=>{
                           cancelInvitation(artist?.email)
                        } } color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} bg={'transparent'} _focus={{bg:'transparent'}}  _hover={{bg:'transparent'}} _active={{bg:'transparent'}}>Cancel</Button>
                      </Td>
                    </Tr>
                   ))}
                </Tbody>
              </Table>
            </Box>
          </Grid>
:
          <Box as='section' className='Login' width={'100%'}>
              <Flex width={'100%'}>
                  <Container display={'flex'} flexDirection={'column'}
                             align='center' justifyContent='center'
                             direction="column" >
                      <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                           bg='#F7F7F7' borderRadius='0px'
                           boxShadow={'0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)'}>
                          <FormControl>
                              <svg width="48" height="48" viewBox="0 0 48 48"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                  <rect width="48" height="48" rx="24"
                                        fill="#F4EBCC"/>
                                  <path
                                      d="M24 14C29.522 14 34 17.978 34 22.889C33.9992 24.3622 33.4136 25.7748 32.3717 26.8165C31.3299 27.8581 29.9172 28.4435 28.444 28.444H26.478C25.556 28.444 24.811 29.189 24.811 30.111C24.811 30.533 24.978 30.922 25.233 31.211C25.5 31.511 25.667 31.9 25.667 32.333C25.667 33.256 24.9 34 24 34C18.478 34 14 29.522 14 24C14 18.478 18.478 14 24 14ZM22.811 30.111C22.8106 29.6293 22.9052 29.1523 23.0893 28.7072C23.2735 28.2622 23.5436 27.8578 23.8842 27.5172C24.2248 27.1766 24.6292 26.9065 25.0742 26.7223C25.5193 26.5382 25.9963 26.4436 26.478 26.444H28.444C29.3866 26.4435 30.2905 26.0689 30.9572 25.4026C31.6239 24.7363 31.9989 23.8326 32 22.89C32 19.139 28.468 16 24 16C21.9356 15.9981 19.9503 16.7944 18.4594 18.2223C16.9684 19.6501 16.0872 21.5991 15.9999 23.6617C15.9126 25.7243 16.626 27.7408 17.991 29.2895C19.3559 30.8383 21.2668 31.7994 23.324 31.972C22.9892 31.4093 22.812 30.7668 22.811 30.112V30.111ZM19.5 24C19.1022 24 18.7206 23.842 18.4393 23.5607C18.158 23.2794 18 22.8978 18 22.5C18 22.1022 18.158 21.7206 18.4393 21.4393C18.7206 21.158 19.1022 21 19.5 21C19.8978 21 20.2794 21.158 20.5607 21.4393C20.842 21.7206 21 22.1022 21 22.5C21 22.8978 20.842 23.2794 20.5607 23.5607C20.2794 23.842 19.8978 24 19.5 24ZM28.5 24C28.1022 24 27.7206 23.842 27.4393 23.5607C27.158 23.2794 27 22.8978 27 22.5C27 22.1022 27.158 21.7206 27.4393 21.4393C27.7206 21.158 28.1022 21 28.5 21C28.8978 21 29.2794 21.158 29.5607 21.4393C29.842 21.7206 30 22.1022 30 22.5C30 22.8978 29.842 23.2794 29.5607 23.5607C29.2794 23.842 28.8978 24 28.5 24ZM24 21C23.6022 21 23.2206 20.842 22.9393 20.5607C22.658 20.2794 22.5 19.8978 22.5 19.5C22.5 19.1022 22.658 18.7206 22.9393 18.4393C23.2206 18.158 23.6022 18 24 18C24.3978 18 24.7794 18.158 25.0607 18.4393C25.342 18.7206 25.5 19.1022 25.5 19.5C25.5 19.8978 25.342 20.2794 25.0607 20.5607C24.7794 20.842 24.3978 21 24 21Z"
                                      fill="#795E00"/>
                              </svg>
                              <Text fontWeight={'500'} fontSize={'18px'}
                                    textAlign={'center'} color={'#363535'}>No Artist Invited Yet </Text>
                              <Text fontWeight={'400'} mb={'1.5rem'}
                                    fontSize={'14px'} textAlign={'center'}
                                    color={'#8F8F8F'}>Invite an Artist to join
                                  you on DadaVault so you can mint NFTs
                                  together.</Text>
                          </FormControl>
                      </Box>
                  </Container>
              </Flex>
          </Box>
}
    </Box>
  );
};

export default ArtistListing;

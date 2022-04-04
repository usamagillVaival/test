import React , {useState} from "react";
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
    Textarea,
    Radio,
    InputRightElement,
} from "@chakra-ui/react";

import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    BioRymHeading,
    BioRymHeadingNew
} from '../../assets/StyledComponent/styeledComponent';
import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Formik } from "formik"; 
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import CryptoJS from "crypto-js";
import "react-toastify/dist/ReactToastify.css";
import server from '../../apis/server'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

import {   useDispatch, useSelector} from 'react-redux'

import {Link as ReachLink} from "@reach/router";
import FLogoD from "../../assets/images/flogoD.svg";

function ArtistInvite(props) {

    const state = useSelector(state => state);

    const [preview,setPreview]=useState(false);
    const [token,setToken]=useState('');
    const getUserObj = JSON.parse(localStorage.getItem("User"))
    const decryptUserObj = CryptoJS.AES.decrypt(getUserObj, "userObject");
    const userObj = JSON.parse(decryptUserObj.toString(CryptoJS.enc.Utf8))
    console.log(userObj)

    const {gallery_invitation_link} = userObj

    const showPreview=()=>{
        setPreview(true);
         
        
    }
    
    let validationSchema = yup.object({ 
        email: yup.string().email('Invalid email').required('Required'),
        name: yup.string().required('Required'),
       });  
       const handleSignup =async(values, resetForm) => {
          

           let dataa ={
            email: values?.email,
            name:values?.name,
            accountType: "artist"
        }
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
        console.log(ciphertext)
          const {data} = await server.post(
              
              "users/InviteGallery",
              {
                payload: ciphertext
                
              } ,
              { 
                headers: {
                  "Content-Type": "application/json",
                },
              },
               
            )
            if(data){
                if(data.message){
                    toast(data.message)
                }
                else{
                   toast(data.error)
                }
              console.log(data)
              
            }
            
          
       }


       const InviteArtist =async(values, resetForm) => {
          
console.log(values.email)
        let dataa ={
         email: values?.email,
         name:values?.name,
         accountType: "artist",

         
     }
     let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
     console.log(ciphertext)
       const {data} = await server.post(
           "users/InviteArtist",
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
             setToken(data.token)
             if(data.message){
                //  toast(data.message)
             }
             else{
                // toast(data.error)
             }
           console.log(data)
           
         }
         
       
    }

    return (
        <Formik
            initialValues={{  name: "",email:"",InvitationCode:gallery_invitation_link }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
           <ToastContainer />
        <Box width={'100%'} m={'auto'} pt={'2rem'} pb={'1rem'} mb={'auto'}>
                                        <Box w={{base:"100%",md:"100%", lg:'100%',xl:'100%'}}  margin='auto auto  0.5rem' p='2rem'   display='flex' bg='#fff'   align='center' justifyContent='center' flexDirection="column">
                                            <Box m='auto' pb={10} >
                                                <Flex m='auto' pb={10} >
                                                    <Image src={FLogoD} w={'50px'} alt="image not avaiable" pr={2}/>
                                                    <Box flex="1">
                                                        <BioRymHeadingNew textAlign={'center'} >Dada Vault</BioRymHeadingNew>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <BioRymHeadingNew textAlign={'center'} >Invite artist to join DadaVault</BioRymHeadingNew>
                                                <Text textAlign={'center'}  mt={4}  mb={4} color={'#1A1A1A'} fontWeight={'400'}>Artists can set up their own accounts on DadaVault to begin creating and minting NFT arworks.</Text>
                                            </Box>
                                            <Box width={'100%'} mx={'auto'}>
                                                <Text textAlign={'left'} color={'#4D4D4D'} mb={3}>Name</Text>
                                                <InputGroup mr={3} borderColor={'#C4C4C4'} mb={3}>

                                                    {/*<InputRightElement pointerEvents="none" children={ <Icon width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                                    {/*    <path d="M0 0V15H20V0H0ZM1.53846 1.5H18.4615V13.5H15.8415C15.7815 13.3973 15.8085 13.257 15.7208 13.1715C15.4308 12.888 15.0177 12.75 14.6154 12.75C14.2131 12.75 13.8008 12.888 13.5092 13.1722C13.4223 13.257 13.4492 13.3973 13.3892 13.5H6.61077C6.55077 13.3973 6.57769 13.257 6.49077 13.1715C6.19846 12.888 5.78692 12.75 5.38462 12.75C4.98231 12.75 4.57 12.888 4.27846 13.1722C4.19154 13.257 4.21846 13.3973 4.15846 13.5H1.53846V1.5ZM6.92308 3C5.23077 3 3.84615 4.35 3.84615 6C3.84615 6.83475 4.21308 7.58775 4.78385 8.133C4.26049 8.47773 3.83141 8.94189 3.53393 9.48512C3.23645 10.0283 3.07957 10.6342 3.07692 11.25H4.61538C4.61538 10.6533 4.85852 10.081 5.29129 9.65901C5.72407 9.23705 6.31104 9 6.92308 9C7.53512 9 8.12209 9.23705 8.55486 9.65901C8.98764 10.081 9.23077 10.6533 9.23077 11.25H10.7692C10.7666 10.6342 10.6097 10.0283 10.3122 9.48512C10.0147 8.94189 9.58567 8.47773 9.06231 8.133C9.63308 7.58775 10 6.8355 10 6C10 4.35 8.61539 3 6.92308 3ZM6.92308 4.5C7.78231 4.5 8.46154 5.16225 8.46154 6C8.46154 6.83775 7.78231 7.5 6.92308 7.5C6.06385 7.5 5.38462 6.83775 5.38462 6C5.38462 5.16225 6.06385 4.5 6.92308 4.5ZM12.3077 5.25V6.75H16.9231V5.25H12.3077ZM12.3077 8.25V9.75H16.9231V8.25H12.3077Z" fill="#C4C4C4"/>*/}
                                                    {/*</Icon>} />*/}
                                                    <Input type="text" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} 
                                                    name="name"
                                                    id ="name"
                                                       value={formikProps.values.name}
                                                        onChange={formikProps.handleChange("name")}
                                                        onBlur={formikProps.handleBlur("name")}
                                                        error={
                                                          formikProps.errors.name && formikProps.touched.name
                                                            ? true
                                                            : false
                                                        }
                                                    />
 
                                                </InputGroup>
                                                <Box>
          {formikProps.errors.name && formikProps.touched.name && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.name}
             </Alert>
                   
         )}


        </Box>
                                                <Text textAlign={'left'} mb={3}>Email</Text>
                                                <InputGroup mr={3} borderColor={'#C4C4C4'} mb={3}>


                                                    <Input type="email" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} 
                                                    name="email"
                                                    id ="email"
                                                       value={formikProps.values.email}
                                                        onChange={formikProps.handleChange("email")}
                                                    //    onBlur={formikProps.handleBlur("email")}
                                                        error={
                                                          formikProps.errors.email && formikProps.touched.email
                                                            ? true
                                                            : false
                                                        }
                                                    />

                                                </InputGroup>
                                                <Box>
          {formikProps.errors.email && formikProps.touched.email && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.email}
             </Alert>
                   
         )}
        </Box>
                                                {/* <Box width={'13%'} ml={3}>
                                                   <Button onClick={InviteArtist} mb={3}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}  > Generate Invite Link</Button>


                                               </Box> */}
                                            </Box>
                                            <Box width={'100%'} mx={'auto'} d={'flex'} mb={6}>
                                                <Box width={'45%'} bg={'#ADADAD'} h={'1px'} mt='14px' position='relative'></Box>
                                                <Box width={'10%'} color={'#000'} h={'1px'}>or</Box>
                                                <Box width={'45%'} bg={'#ADADAD'} h={'1px'}  position='relative' mt='14px'></Box>
                                            </Box>
                                            <Box width={'100%'} mx={'auto'} d={'flex'} mb={6}>
                                                <Text textAlign={'left'} color={'#4D4D4D'} mb={3}>Invite Share Link</Text>
                                            </Box>
                                            <Flex width={'100%'} mx={'auto'}>
                                                 <Box width={'100%'} ml={'auto'}>
                                                    <InputGroup mr={3} borderColor={'#C4C4C4'} mb={3} width={'100%'}>

                                                        <InputRightElement pointerEvents="none" children={ <Icon width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0V15H20V0H0ZM1.53846 1.5H18.4615V13.5H15.8415C15.7815 13.3973 15.8085 13.257 15.7208 13.1715C15.4308 12.888 15.0177 12.75 14.6154 12.75C14.2131 12.75 13.8008 12.888 13.5092 13.1722C13.4223 13.257 13.4492 13.3973 13.3892 13.5H6.61077C6.55077 13.3973 6.57769 13.257 6.49077 13.1715C6.19846 12.888 5.78692 12.75 5.38462 12.75C4.98231 12.75 4.57 12.888 4.27846 13.1722C4.19154 13.257 4.21846 13.3973 4.15846 13.5H1.53846V1.5ZM6.92308 3C5.23077 3 3.84615 4.35 3.84615 6C3.84615 6.83475 4.21308 7.58775 4.78385 8.133C4.26049 8.47773 3.83141 8.94189 3.53393 9.48512C3.23645 10.0283 3.07957 10.6342 3.07692 11.25H4.61538C4.61538 10.6533 4.85852 10.081 5.29129 9.65901C5.72407 9.23705 6.31104 9 6.92308 9C7.53512 9 8.12209 9.23705 8.55486 9.65901C8.98764 10.081 9.23077 10.6533 9.23077 11.25H10.7692C10.7666 10.6342 10.6097 10.0283 10.3122 9.48512C10.0147 8.94189 9.58567 8.47773 9.06231 8.133C9.63308 7.58775 10 6.8355 10 6C10 4.35 8.61539 3 6.92308 3ZM6.92308 4.5C7.78231 4.5 8.46154 5.16225 8.46154 6C8.46154 6.83775 7.78231 7.5 6.92308 7.5C6.06385 7.5 5.38462 6.83775 5.38462 6C5.38462 5.16225 6.06385 4.5 6.92308 4.5ZM12.3077 5.25V6.75H16.9231V5.25H12.3077ZM12.3077 8.25V9.75H16.9231V8.25H12.3077Z" fill="#C4C4C4"/>
                                                        </Icon>} />
                                                        <Input isDisabled value={`http://51.222.241.160:3000/Invitation/${gallery_invitation_link}`} type="text" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />
                                    
                                                    </InputGroup>
                                                </Box>   
                                               <Box width={'13%'} ml={3}>
                                                   <Button 
                                                   onClick={() =>  navigator.clipboard.writeText(`http://51.222.241.160:3000/Invitation/${gallery_invitation_link}`)}
                                                   mb={3}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   > Copy Link</Button>
                                               </Box>
                                            </Flex>
                                            <Grid width={'100%'} mx={'auto'} marginTop='1rem' templateColumns="repeat(2, 1fr)"  gap={2}   mb='auto'   name="form-name">
                                                {/* <Box d={'flex'}>
                                                    <Link mr={'auto'}  color={'#0048FF'}><Icon mr={1} width="14px" height="14px" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#0048FF"/>
                                                    </Icon>
                                                        Add another information</Link>
                                                </Box> */}
                                                <Box d={'flex'}>
                                                    <Button  bg='#0048FF' color='#fff' _focus={{ bg: "#2d427a", }}  _hover={{ bg: "#2d427a", }} _active={{ bg: "#2d427a", }}  ml={'auto'} onClick={formikProps.handleSubmit}>Invite</Button>

                                                </Box>
                                            </Grid>

                                        </Box>


                                    </Box>
                                    </>
                                    )}
                                    </Formik>
    
    )
    }
export default ArtistInvite;

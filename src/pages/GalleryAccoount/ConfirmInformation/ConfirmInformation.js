import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Heading,
    RadioGroup,
    Stack,
    Icon,
    Image,
    Spacer,
    FormLabel,
    FormControl ,
    RadioCard ,
    Box,
    Link,
    Radio,
    Badge,
    ChakraProvider,
    Flex , Input , FormHelperText,Checkbox ,
    InputGroup ,InputRightElement ,  Button, Container , Grid, GridItem ,Text } from "@chakra-ui/react";
import { ArrowForwardIcon , ArrowBackIcon} from '@chakra-ui/icons';
import {DataTable} from '../../../components/index';
import { AccountInfoComponent } from '../../../components/index';
import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard,
    BioRymHeading,
    BioRymHeadingNew
} from '../../../assets/StyledComponent/styeledComponent';
import { navigate } from '@reach/router';
import { Formik } from "formik"; 
import * as yup from "yup";
import {setSteps,setGallery} from "../../../redux/action/tradingBot"
import server from '../../../apis/server'
import {   useDispatch, useSelector} from 'react-redux'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'



const ConfirmInformation=()=>{


    
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state)
    const {steps,accountInfo,galleryInfo}  =   state?.TradingBot
    
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState("1")
    const handleClick = () => setShow(!show);
    
    const {name,email,password,}  = accountInfo
  
  const {
    gallery_name,
    gallery_address,
    gallery_email,
    gallery_phoneNumber,
    gallery_website,
    role,
    auth
  } = galleryInfo;
 
    // function navigateNext()
    // {
     
    //     navigate("/paymentinfo")
    // }
    
    useEffect(() => {
       
      }, [steps,galleryInfo]);
    
    
    function navigateBack()
    {
        dispatch(setSteps(steps-1))
        
    }



    let validationSchema = yup.object({ 
         gallery_name:yup.string().required("Required"),
         gallery_email:yup.string().email('Invalid email').required('Required'),
         gallery_phoneNumber:yup.number("invalid format").required("Required"),
         gallery_website:yup.string().required("Required"),
         gallery_address:yup.string().required("Required"),
         role:yup.string().required("Required"),
         auth:yup.string().required("Required"),
       });
       
       const handleSignup =async(values, resetForm) => {
                 
                  dispatch(setSteps(steps+1))
                  dispatch(setGallery(values))
                   console.log(values)
                   console.log(state)
        
      };
     
    
    return(

        <Formik
        enableReinitialize={true} 
            initialValues={{

                gallery_name:gallery_name?gallery_name:'',
                gallery_address:gallery_address?gallery_address:'',
                gallery_website:gallery_website?gallery_website:'',
                gallery_phoneNumber:gallery_phoneNumber?gallery_phoneNumber:"",
                gallery_email:gallery_email?gallery_email:'',
                name:name?name:'',
                email:email?email:'',
                auth:auth?auth:'',
                role:role?role:''
            
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
            <>
            <Box bg='fff' py={'6rem'}>
                <Container maxW={'container.xl'} display='flex' >
                    <Box w={'100%'}>
                        <Box display='flex' flexDirection='column' >
                            <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" colorScheme="green">
                                Step 1
                            </Badge>
                            <BioRymHeadingNew  textAlign='center' fontSize='1.9rem' mb='1rem'>
                                You’ve been invited to skip the waitlist.
                            </BioRymHeadingNew>
                            <Text textAlign='center' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                Please confirm your information below.
                            </Text>
                        </Box>
                            <Flex gap={2}   flexWrap={'wrap'}>
                                <Box width={{base:'100%',md:'39%'}} mb={3} >
                                    <Heading color={'#1A1A1A'} fontWeight={'bold'} fontSize={'1.5rem'}>Gallery Information</Heading>
                                    <Text color={'#666666'}  >Please confirm this information about your<br/> gallery, lorem ipsum dolor.</Text>
                                </Box>
                              
                                    {/* <DataTable/> */}


                                    {/* gallery Table  */}
                                <Box width={{base:'100%',md:'60%'}} mb={3} overflowX={'scroll'}>
                                    <Table border={'1px solid #C4C4C4'} borderCollapse={'separate'} borderSpacing={'0'} cellPadding={0} cellPadding={0} p={0} borderRadius={'12px'}>
                                        <Thead borderBottom={'1px solid #C4C4C4'}>
                                            <Tr>
                                                <Th fontSize={'1.12rem'} color={"#1A1A1A"} textTransform={'captilize'} width={'38%'}>Gallery Information</Th>
                                                <Th textAlign={'right'}>
                                                    <Button  mr='auto' fontSize='1rem' px='1rem' border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                                             leftIcon={<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z" fill="#4D4D4D"/>
                                                    </svg>
                                                    } marginLeft='auto' >Edit</Button>
                                                </Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr bg={'#F2F2F2'}>
                                                <Td color={'#333333'} fontSize={'16px'}>Gallery Name</Td>
                                                
                                                <Td fontWeight={'600'}>
                                                    <Input placeholder='Enter Name' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                                    name="gallery_name"
                                                    id ="gallery_name"
                                                        value={formikProps.values.gallery_name}
                                                        onChange={formikProps.handleChange("gallery_name")}
                                                        onBlur={formikProps.handleBlur("gallery_name")}
                                                        error={
                                                        formikProps.errors.gallery_name && formikProps.touched.gallery_name
                                                            ? true
                                                            : false
                                                        }
                                                    />
                                                    <div>
          {formikProps.errors.gallery_name && formikProps.touched.gallery_name && (
               <Alert status='error' fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} color={'#DD2922'}  pl={0}>

               {formikProps.errors.gallery_name}
             </Alert>
                   
         )}


        </div>
                                                    </Td>

                                            </Tr>
                                            <Tr>
                                                <Td  color={'#333333'} fontSize={'16px'}>Address</Td>
                                                <Td fontWeight={'600'}>
                                                    <Input placeholder='Enter Address' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                                    
                                                    name="gallery_address"
                                                    id ="gallery_address"
                                                        value={formikProps.values.gallery_address}
                                                        onChange={formikProps.handleChange("gallery_address")}
                                                        onBlur={formikProps.handleBlur("gallery_address")}
                                                        error={
                                                        formikProps.errors.gallery_address && formikProps.touched.gallery_address
                                                            ? true
                                                            : false
                                                        }
                                                    />
                                                   <div>
          {formikProps.errors.gallery_address && formikProps.touched.gallery_address && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.gallery_address}
             </Alert>
                   
         )}


        </div>
                                                    </Td>
                    
                                            </Tr>
                                            <Tr  bg={'#F2F2F2'}>
                                                <Td  color={'#333333'} fontSize={'16px'}>Phone Number</Td>
                                                <Td fontWeight={'600'}>
                                                    <Input placeholder='Enter Phone Number' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                                    name="gallery_phoneNumber"
                                                    id ="gallery_phoneNumber"
                                                    value={formikProps.values.gallery_phoneNumber}
                                                        onChange={formikProps.handleChange("gallery_phoneNumber")}
                                                        onBlur={formikProps.handleBlur("gallery_phoneNumber")}
                                                        error={
                                                        formikProps.errors.gallery_phoneNumber && formikProps.touched.gallery_phoneNumber
                                                            ? true
                                                            : false
                                                        }
                                                    />
                                                    <div>
                            {formikProps.errors.gallery_phoneNumber && formikProps.touched.gallery_phoneNumber && (
                                        <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                                        {formikProps.errors.gallery_phoneNumber}
                                    </p>
                            )}


                            </div>
                                                    </Td>

                                            </Tr>
                                            <Tr>
                                                <Td  color={'#333333'} fontSize={'16px'}>Email Address</Td>
                                                <Td fontWeight={'600'} >
                                                    <Input
                                                    
                                                    placeholder='Enter Email Address' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                                    name="gallery_email"
                                                    id ="gallery_email"
                                                        value={formikProps.values.gallery_email}
                                                        onChange={formikProps.handleChange("gallery_email")}
                                                        onBlur={formikProps.handleBlur("gallery_email")}
                                                        error={
                                                        formikProps.errors.gallery_email && formikProps.touched.gallery_email
                                                            ? true
                                                            : false
                                                        }
                                                        
                                                    />
                                                    <div>
                            {formikProps.errors.gallery_email && formikProps.touched.gallery_email && (
                                        <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                                        {formikProps.errors.gallery_email}
                                    </p>
                            )}


                            </div>
                                                    </Td>

                                            </Tr>
                                            <Tr  bg={'#F2F2F2'}>
                                                <Td  color={'#333333'} fontSize={'16px'}>Website</Td>
                                                <Td fontWeight={'600'}>
                                                    <Input placeholder='Enter Website' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                                    name="gallery_website"
                                                    id ="gallery_website"
                                                    value={formikProps.values.gallery_website}
                                                        onChange={formikProps.handleChange("gallery_website")}
                                                        onBlur={formikProps.handleBlur("gallery_website")}
                                                        error={
                                                        formikProps.errors.gallery_website && formikProps.touched.gallery_website
                                                            ? true
                                                            : false
                                                        }
                                                    />
                                                    <div>
                            {formikProps.errors.gallery_website && formikProps.touched.gallery_website && (
                                        <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                                        {formikProps.errors.gallery_website}
                                    </p>
                            )}


                            </div>
                                                    </Td>
                                            </Tr>
                                        </Tbody>
                                        <Tfoot>
                                            <Tr>

                                            </Tr>
                                        </Tfoot>
                                    </Table>


                                </Box>
                               
                            </Flex>

                        <Flex mt={'2rem'} flexWrap={'wrap'}>
                                <Box width={{base:'100%',md:'40%'}} mb={3}>
                                    <Heading color={'#1A1A1A'} fontWeight={'bold'} fontSize={'1.5rem'}>Account Owner's Information</Heading>
                                    <Text color={'#666666'}  >Please confirm this information about your<br/> gallery, lorem ipsum dolor.</Text>
                                </Box>
                                <Box width={{base:'100%',md:'60%'}} mb={3} >
                                <>
            <Box overflowX={'scroll'}>
                <Table border={'1px solid #C4C4C4'} borderCollapse={'separate'} borderSpacing={'0'} cellPadding={0} cellPadding={0} p={0} borderRadius={'12px'}>
                    <Thead borderBottom={'1px solid #C4C4C4'}>
                        <Tr>
                            <Th fontSize={'1.12rem'} color={"#1A1A1A"} textTransform={'captilize'} width={'38%'}>Account Owner's Information</Th>
                            <Th textAlign={'right'}>
                                <Button  mr='auto' fontSize='1rem' px='1rem' border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                         leftIcon={<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z" fill="#4D4D4D"/>
                                </svg>
                                } marginLeft='auto' >Edit</Button>
                            </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr bg={'#F2F2F2'}>
                            <Td color={'#333333'} fontSize={'16px'}>Full Name</Td>
                            <Td fontWeight={'600'}>

                            <Input placeholder='Enter' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
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
                                    isDisabled
                                />                                
                                
                                </Td>
                        </Tr>
                        <Tr>
                            <Td  color={'#333333'} fontSize={'16px'}>Email Address</Td>
                            <Td fontWeight={'600'}>

 <Input placeholder='Enter' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                name="email"
                                id ="email"
                                   value={formikProps.values.email}
                                    onChange={formikProps.handleChange("email")}
                             //       onBlur={formikProps.handleBlur("email")}
                                    error={
                                      formikProps.errors.email && formikProps.touched.email
                                        ? true
                                        : false
                                    }
                                    isDisabled ={true}
                                />


                                </Td>
                        </Tr>
                        <Tr  bg={'#F2F2F2'}>
                            <Td  color={'#333333'} fontSize={'16px'}>Role/Title</Td>
                            <Td fontWeight={'600'}>
                            <Input placeholder='Enter' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                name="role"
                                id ="role"
                                   value={formikProps.values.role}
                                    onChange={formikProps.handleChange("role")}
                                    onBlur={formikProps.handleBlur("role")}
                                    error={
                                      formikProps.errors.role && formikProps.touched.role
                                        ? true
                                        : false
                                    }
                                />                                
                                
                                </Td>
                        </Tr>
                        <div>
          {formikProps.errors.role && formikProps.touched.role && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.role}
                 </p>
         )}


        </div>
                        <Tr>
                            <Td  color={'#333333'} fontSize={'16px'}>Authorization</Td>
                            <Td fontWeight={'600'}>
                            <Input placeholder='Enter' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}
                                name="auth"
                                id ="auth"
                                   value={formikProps.values.auth}
                                    onChange={formikProps.handleChange("auth")}
                                    onBlur={formikProps.handleBlur("auth")}
                                    error={
                                      formikProps.errors.auth && formikProps.touched.auth
                                        ? true
                                        : false
                                    }
                                />                                
                                </Td>
                                
                        </Tr>
                        <div>
          {formikProps.errors.auth && formikProps.touched.auth && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.auth}
                 </p>
         )}


        </div>
                    </Tbody>
                    <Tfoot>
                        <Tr>

                        </Tr>
                    </Tfoot>
                </Table>


            </Box>
        </>
                                </Box>
                            </Flex>
                            



                        <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                            <Box display='flex' mb={'3'}>
                                <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                         leftIcon={<ArrowBackIcon />} marginLeft='auto' onClick={navigateBack}>Back</Button>
                                <Button bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={formikProps.handleSubmit}>Next</Button>
                            </Box>

                        </Grid>

                        <Box></Box>

                    </Box>
                </Container>

            </Box>
            </>
			   )}
         
			   </Formik>
    )
}
export default ConfirmInformation;
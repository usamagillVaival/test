import React from 'react';
import { Icon } from "@chakra-ui/react";
import Logo1 from '../../assets/images/logo1.png';
import Logo2 from '../../assets/images/logo2.png';
import Logo3 from '../../assets/images/logo4.png';
import {
    Heading,
    Image,
    Spacer,
    FormLabel,
    FormControl ,
    Box,
    ChakraProvider,
    Flex , Input , FormHelperText
    ,InputGroup ,InputRightElement ,  Button, Container , Grid, GridItem ,Text ,Link} from "@chakra-ui/react";
import SignupWelcome from "./Component/Welcome/SignupWelcome";
import {BioRymHeadingNew} from '../../assets/StyledComponent/styeledComponent';
import { navigate } from '@reach/router';
import { Formik } from "formik"; 
import * as yup from "yup";
import { Link as ReachLink } from "@reach/router"
import CryptoJS from 'crypto-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import server from '../../apis/server';
import { IoLogoFacebook , IoLogoGoogle,IoLogoTwitter,IoMdEyeOff, IoMdEye } from 'react-icons/io'

import {   useDispatch, useSelector} from 'react-redux'
import {setSignUp} from "../../redux/action/tradingBot"

import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
import FLogoD from "../../assets/images/flogoD.svg";



const Signup=()=>{
    const state = useSelector(state => state);

    const {accountType}  =   state?.TradingBot
    const dispatch = useDispatch();

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    let validationSchema = yup.object({ 
        name:yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required'),
    //    invitationCode: yup.string().required('Required'),
       });  
       const handleSignup =async(values, resetForm) => {


        let dataa ={
            email: values?.email,
            password: values?.password, 
            name:values?.name,
        }
console.log(dataa)
        dispatch(setSignUp(dataa))



        navigate("/signupwelcome")

        
         };
   
    return(
        <Formik
            initialValues={{name:"",  email: "",password:"",invitationCode:"" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>

<ToastContainer />
            <Box width={'100%'}>
                <Grid templateColumns={{base:'repeat(1, 1fr)', sm:'repeat(1, 1fr)',md:'repeat(2, 1fr)'}} gap={0} minHeight='100vh' bg="#E5E5E5">
                    <Container display='flex' maxW='490px' flexDirection="column" >
                        <Box w="100%" margin='auto auto  0.5rem' p='2rem'  borderRadius='0.5rem' boxShadow='0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)' display='flex' bg='#fff'   align='center' justifyContent='center' flexDirection="column">
                            <Flex alignItems={'center'} >
                                <Image src={FLogoD} w={'50px'} alt="image not avaiable" pr={2}/>
                                <Box>
                                    <BioRymHeadingNew textAlign={'left'} >Dada Vault</BioRymHeadingNew>
                                </Box>
                            </Flex>
                            <Box className='sign-information' pt={5}>
                                <BioRymHeadingNew  mb='2rem' textAlign='left' fontWeight='700' >Welcome to DadaVault</BioRymHeadingNew>
                                <Text textAlign='left' mb='1rem' color='#666'>Enter your info to get started</Text>
                            </Box>
                            <Box className="Box-card"  border-radius='0.8'  >
                                <FormControl id="email">
                                    <FormLabel  color='#4D4D4D' fontWeight='500'>Name</FormLabel>
                                    <Input mb={3} type="text"
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
                                  <div>
          {formikProps.errors.name && formikProps.touched.name && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.name}
             </Alert>
                   
         )}


        </div>
                                    <FormLabel  color='#4D4D4D' fontWeight='500'>Email address</FormLabel>
                                    <Input mb={3} type="email" 
                                     name="email"
                                     id ="email"
                                        value={formikProps.values.email}
                                         onChange={formikProps.handleChange("email")}
                             //            onBlur={formikProps.handleBlur("email")}
                                         error={
                                           formikProps.errors.email && formikProps.touched.email
                                             ? true
                                             : false
                                         }
                                    />
                                   <div>
          {formikProps.errors.email && formikProps.touched.email && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.email}
             </Alert>
                   
         )}


        </div>




        {/* <FormLabel  color='#4D4D4D' fontWeight='500'>Invitation Code</FormLabel>
                                    <Input mb={3} type="text" 
                                     name="invitationCode"
                                     id ="invitationCode"
                                        value={formikProps.values.invitationCode}
                                         onChange={formikProps.handleChange("invitationCode")}
                             //            onBlur={formikProps.handleBlur("email")}
                                         error={
                                           formikProps.errors.invitationCode && formikProps.touched.invitationCode
                                             ? true
                                             : false
                                         }
                                    />
                                    <div>
          {formikProps.errors.invitationCode && formikProps.touched.invitationCode && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.invitationCode}
                 </p>
         )}


        </div> */}




                                    <Flex >
                                        <Box >
                                            <FormLabel color='#4D4D4D' fontWeight='500' >Password</FormLabel>
                                        </Box>
                                    </Flex>

                                    <InputGroup size="md" mb={3}>
                                        <Input
                                            pr="4.5rem"
                                            type={show ? "text" : "password"}
                                            name="password"
                                            id ="password"
                                               value={formikProps.values.password}
                                                onChange={formikProps.handleChange("password")}
                                                onBlur={formikProps.handleBlur("password")}
                                                error={
                                                  formikProps.errors.password && formikProps.touched.password
                                                    ? true
                                                    : false
                                                }
                                        />
                                       
                                        <InputRightElement width="4.5rem">
                                            <Button _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} bg='transparent' h="1.75rem" size="sm" onClick={handleClick}>
                                                {show ?   <IoMdEye/> : <IoMdEyeOff/>}
                                            </Button>
                                        </InputRightElement>
                                        
                                    </InputGroup>
                                    <div>
          {formikProps.errors.password && formikProps.touched.password && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.password}
             </Alert>
                   
         )}


        </div>
                                    <FormLabel color='#808080;' fontWeight='300' fontSize='0.80rem' >Password rules go here</FormLabel>
                                    <Button  py='1.5rem' w='100%' my='1rem' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                             onClick={formikProps.handleSubmit}> Create my account</Button>
                                </FormControl>
                            </Box>
                        </Box>
                        <Text mb='auto' color='#666' textAlign='center'>Have an account already ? <Link as={ReachLink} to='/Login' color='#0039CC' fontWeight={700} >Logged In</Link></Text>

                    </Container>

                    <Box w="100%" h="100%" bg="#fff" p='4rem' display='flex' justifyContent='center' flexDirection='column'>
                        <Box mt='auto'  mb='2rem'>
                            <Heading mb='2rem'>Crypto fine art</Heading>
                            <Text  mb='2rem'>
                                Curated NFTs created by top digital artists represented by name brand galleries.</Text>
                            <Text  mb='2rem'>
                                Backed and trusted by top companies in the fine art world. Lorem ipsum dolor sit atmet.
                            </Text>
                            <Button borderColor='#0048FF' color='#0048FF' _focus={{ bg: "#fff",color:'#0048FF' }}  _hover={{ bg: "#fff",color:'#0048FF' }} _active={{bg: "#fff",color:'#0048FF' }} variant="outline">Learn more</Button>

                        </Box>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt='auto'  mb='auto' >
                            <Box display='flex' justifyContent='center' flexDirection='column'>
                                <Image src={Logo1} />
                            </Box>
                            <Box display='flex' justifyContent='center' flexDirection='column'>
                                <Image src={Logo2} />
                            </Box>
                            <Box display='flex' justifyContent='center' flexDirection='column'>
                                <Image src={Logo3} />
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
            
        </>
        )}
        </Formik>
    )
}
export default Signup;
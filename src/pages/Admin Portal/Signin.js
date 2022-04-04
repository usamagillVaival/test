import React,{useState} from 'react';
import {
    Box, Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    FormErrorMessage,
     Text, Link, 
} from "@chakra-ui/react";
import {BioRymHeading, } from '../../assets/StyledComponent/styeledComponent'
import server from '../../apis/server'

import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import {  useDispatch } from 'react-redux'
import { Formik } from "formik"; 
import * as yup from "yup";
import {Link as ReachLink, navigate,  } from '@reach/router';
import CryptoJS from 'crypto-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {setToken,setUser} from "../../redux/action/tradingBot"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { useToast,Spinner } from '@chakra-ui/react'
import FLogoD from "../../assets/images/flogoD.svg";
  


    const AdminLogin=()=>{
        const toast=useToast()
        const [loader,setLoader]=useState(false)




    const [show, setShow] = React.useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setShow(!show);
    let validationSchema = yup.object({ 
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required'),
       });  

       
       const handleSignup =async(values, resetForm) => {
           setLoader(true)
          let dataa ={
              email: values?.email,
              password: values?.password, 
          }
          let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
           
        //     try  { 
             const {data} = await server.post(
                 "/signin",
                {
                  payload: ciphertext
                } ,
                 { 
                   headers: {
                     "Content-Type": "application/json",
                },
                 } 
               )
              
              
               if(data.User){
                   
                   if (data.User.account_type =="admin")
                {
                    localStorage.setItem('token', data.Token);
                    let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.User), 'userObject').toString();
                    localStorage.setItem('User', JSON.stringify(userObj));

                    dispatch(setToken(data.Token))
     
                    dispatch(setUser(data.User))
    
                    navigate("admin/Dashboard")

                    toast({
                        title: 'Authorization successful',
                        description: `Log in as ${data.User.account_type} user`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position:'top-right',
                        variant:'top-accent',
                      })

                }
                   if(data.User.account_type =="gallery")
                   {
                    let email=data?.User?.email
                    let userObj=data?.User
                    let userToken=data?.Token
                       

                    if(data.User.gallery_signup_step===1 && !data.User.is_two_FA){
                      
                        navigate("/2fa", { state: { value: data.User } })
                        return
                    }
                    if(data.User.gallery_signup_step===1 && data.User.is_two_FA){
                        navigate("/OnBoardingUserDetail", { state: { value: data.User.email }})

                        return
                    }
                    if(data.User.gallery_signup_step===3){
                       
                       if (data.User.is_two_FA)
                         {
                             
                            const {data} = await server.post(
                                "/users/Enable2FA",
                               {
                                  email:email
                               } ,
                                { 
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                } 
                              )
                              if(data)
                              {
                                  
                                navigate("/LoginnAuthenticator", { state: { user: userObj,token:userToken }})
                                setLoader(false)
                              }
                         }
                         else
                         {
                        
                    localStorage.setItem('token', data.Token);
                    
                    let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.User), 'userObject').toString();
                    localStorage.setItem('User', JSON.stringify(userObj)); 
                    dispatch(setToken(data.Token))
                    dispatch(setUser(data.User))
                    navigate("gallery/Dashboard")
                    toast({
                        title: 'Authorization successful',
                        description: `Log in as ${data?.User?.name} user`,
                        status: 'success',
                        variant:'top-accent',
                        duration: 4000,
                        isClosable: true,
                        position:'top-right',

                      })
                    }
                }
                     }
                   if(data.User.account_type =="artist"){
                    let email=data?.User?.email
                    let userObj=data?.User
                    let userToken=data?.Token
                    if (data.User.is_two_FA)
                    {
                        
                       const {data} = await server.post(
                           "/users/Enable2FA",
                          {
                             email:email
                          } ,
                           { 
                             headers: {
                               "Content-Type": "application/json",
                             },
                           } 
                         )
                         if(data)
                         {
                            
                           navigate("/LoginnAuthenticator", { state: { user: userObj,token:userToken }})
                           setLoader(false)
                         }
                    }
                    else
                    {
                    localStorage.setItem('token', data.Token);
                    let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.User), 'userObject').toString();
                    localStorage.setItem('User', JSON.stringify(userObj));
                    dispatch(setToken(data.Token))
                    dispatch(setUser(data.User))
                    navigate("/ArtistDashboardNew")
                    toast({
                        title: 'Authorization successful',
                        description: `Log in as ${data?.User?.name} `,
                        status: 'success',
                        variant:'top-accent',
                        duration: 4000,
                        isClosable: true,
                        position:'top-right',
                      })
                    }
                   }
                   if(data.User.account_type =="collector"){
                    localStorage.setItem('token', data.Token);
                    let userObj = CryptoJS.AES.encrypt(JSON.stringify(data.User), 'userObject').toString();
                    localStorage.setItem('User', JSON.stringify(userObj));
                    dispatch(setToken(data.Token))
                    dispatch(setUser(data.User))
                    navigate("/collector/Dashboard")
                    
                    toast({
                        title: 'Authorization successful',
                        description: `Log in as ${data.User.account_type} user`,
                        status: 'success',
                        duration: 4000,
                        variant:'top-accent',
                        isClosable: true,
                        position:'top-right',
                      })
                   }                
               }
               else 
               {
                 setLoader(false)
                toast({
                    title: 'Authorization failed',
                    description: `Invalid email or password`,
                    status: 'error',
                    variant:'top-accent',
                    duration: 4000,
                    isClosable: true,
                    position:'top-right',
                  })
        }
         };

function handleForgetPassword()
{
    navigate("/ResetPassword")
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

    return(


        <Formik
            initialValues={{  email: "",password:"" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
<ToastContainer />
            <Box as='section' bg={'#F7F7F7'} className='Login'>
                <Flex>
                    <Container display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column"  minHeight='100vh'>
                        <Flex my={'64px'} mx='auto'>
                            <svg width="164" height="39" viewBox="0 0 164 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.3977 10.1291H51.642C55.4568 10.0533 56.9979 11.6196 56.9473 15.485V22.8115C57.0232 26.6768 55.4568 28.2432 51.642 28.1674H47.3977V10.1291ZM51.7178 25.9191C53.6378 25.9191 54.1431 25.1612 54.1684 22.3316V15.9651C54.1431 13.1355 53.6378 12.3777 51.7178 12.3777H50.1766V25.9191H51.7178Z" fill="#0F0EA7"/>
                                <path d="M64.0987 24.4284L63.2903 28.1674H60.2839L65.1851 10.129H67.5092L72.3851 28.1674H69.3788L68.5956 24.4284H64.0987ZM66.3472 13.9692L64.5786 22.1799H68.0904L66.3472 13.9692Z" fill="#0F0EA7"/>
                                <path d="M76.3235 10.1291H80.5677C84.3825 10.0533 85.9237 11.6196 85.8732 15.485V22.8115C85.9489 26.6768 84.3825 28.2432 80.5677 28.1674H76.3235V10.1291ZM80.6436 25.9191C82.5635 25.9191 83.0688 25.1612 83.094 22.3316V15.9651C83.0688 13.1355 82.5635 12.3777 80.6436 12.3777H79.1024V25.9191H80.6436Z" fill="#0F0EA7"/>
                                <path d="M93.0248 24.4284L92.2163 28.1674H89.21L94.1111 10.1291H96.4354L101.311 28.1674H98.305L97.5218 24.4284L93.0248 24.4284ZM95.2732 13.9692L93.5048 22.1799H97.0165L95.2732 13.9692Z" fill="#0F0EA7"/>
                                <path d="M102.276 10.1291H105.055L107.884 23.6451L110.689 10.1291H113.468L109.097 28.1674H106.646L102.276 10.1291Z" fill="#0F0EA7"/>
                                <path d="M118.307 24.4284L117.499 28.1674H114.493L119.394 10.129H121.718L126.594 28.1674H123.588L122.805 24.4284H118.307ZM120.556 13.9692L118.788 22.1799H122.299L120.556 13.9692Z" fill="#0F0EA7"/>
                                <path d="M132.831 10.1291V22.761C132.831 23.999 132.907 24.6305 133.109 25.0854C133.437 25.8431 133.918 26.1465 134.776 26.1465C135.838 26.1465 136.343 25.8179 136.671 24.9338C136.823 24.5042 136.873 23.8726 136.873 22.7611V10.1291H139.652V22.7611C139.652 24.9338 139.476 25.8432 138.844 26.7275C137.985 27.9149 136.823 28.4202 134.852 28.4202C132.755 28.4202 131.492 27.8139 130.684 26.4497C130.204 25.6413 130.052 24.7569 130.052 22.7612V10.1292L132.831 10.1291Z" fill="#0F0EA7"/>
                                <path d="M144.571 10.1291H147.35V25.8683H152.908V28.1675H144.571V10.1291Z" fill="#0F0EA7"/>
                                <path d="M157.914 12.4281H154.756V10.1291H163.851V12.4281H160.693V28.1674H157.914V12.4281Z" fill="#0F0EA7"/>
                                <path d="M19.2301 10.0797L16.4219 7.27145H22.0383L19.2301 10.0797Z" fill="#0F0EA7"/>
                                <path d="M19.2303 11.3205C17.324 11.3205 15.4606 11.8858 13.8757 12.9448C12.2907 14.0039 11.0554 15.5091 10.3259 17.2702C9.59646 19.0314 9.4056 20.9692 9.77748 22.8388C10.1494 24.7084 11.0673 26.4257 12.4152 27.7736C13.7631 29.1215 15.4804 30.0395 17.35 30.4113C19.2196 30.7832 21.1575 30.5924 22.9186 29.8629C24.6797 29.1334 26.1849 27.8981 27.244 26.3131C28.303 24.7282 28.8683 22.8647 28.8683 20.9585C28.8683 18.4024 27.8528 15.9509 26.0454 14.1434C24.2379 12.336 21.7864 11.3205 19.2303 11.3205ZM26.8969 24.1341C26.8583 24.2273 25.3526 23.7434 24.4753 23.4524C24.2342 23.9582 23.9213 24.4264 23.5463 24.8427C24.1585 25.5342 25.1925 26.7318 25.0981 26.8263C25.0509 26.8735 23.8346 25.8599 23.1274 25.2633C22.7101 25.6415 22.24 25.957 21.7319 26.2001C22.0328 27.0733 22.5293 28.5741 22.4059 28.6251C22.3757 28.6377 21.6275 27.2426 21.1921 26.4249C20.6592 26.6162 20.1011 26.7283 19.5357 26.7574C19.4795 27.6792 19.3639 29.2568 19.2303 29.2568C19.0967 29.2568 18.9812 27.6792 18.925 26.7574C18.3595 26.7283 17.8014 26.6162 17.2685 26.4249C16.8331 27.2426 16.0849 28.6377 16.0547 28.6251C15.9313 28.574 16.4278 27.0733 16.7288 26.2001C16.2207 25.957 15.7505 25.6415 15.3331 25.2633C14.6261 25.8599 13.4098 26.8735 13.3625 26.8263C13.268 26.7318 14.3022 25.5341 14.9143 24.8427C14.5393 24.4264 14.2264 23.9582 13.9853 23.4524C13.1078 23.7434 11.6022 24.2273 11.5637 24.1341C11.5126 24.0108 12.9254 23.3004 13.7556 22.8957C13.5694 22.3703 13.4602 21.8206 13.4314 21.2639C12.5095 21.2077 10.932 21.0921 10.932 20.9585C10.932 20.8249 12.5095 20.7093 13.4314 20.6532C13.4602 20.0964 13.5694 19.5468 13.7556 19.0213C12.9254 18.6167 11.5126 17.9063 11.5637 17.7829C11.6148 17.6595 13.1155 18.1561 13.9887 18.457C14.2294 17.9541 14.5411 17.4885 14.9142 17.0744C14.302 16.3829 13.2681 15.1853 13.3625 15.0908C13.4568 14.9963 14.6546 16.0305 15.3461 16.6425C15.7603 16.2693 16.2259 15.9577 16.7287 15.717C16.4278 14.8437 15.9313 13.343 16.0547 13.2919C16.1781 13.2409 16.8884 14.6537 17.2931 15.4839C17.8186 15.2977 18.3682 15.1885 18.9249 15.1596C18.9811 14.2378 19.0967 12.6602 19.2303 12.6602C19.3639 12.6602 19.4794 14.2378 19.5356 15.1596C20.0924 15.1885 20.642 15.2977 21.1675 15.4839C21.5721 14.6536 22.2825 13.2408 22.4059 13.2919C22.5293 13.3431 22.0328 14.8437 21.7318 15.717C22.2346 15.9577 22.7002 16.2694 23.1143 16.6425C23.8059 16.0305 25.0035 14.9964 25.098 15.0908C25.1925 15.1852 24.1583 16.3829 23.5462 17.0744C23.9194 17.4885 24.2311 17.9541 24.4718 18.457C25.345 18.1561 26.8458 17.6596 26.8969 17.7829C26.9479 17.9063 25.5351 18.6167 24.7049 19.0213C24.8911 19.5468 25.0003 20.0964 25.0292 20.6532C25.951 20.7094 27.5286 20.825 27.5286 20.9586C27.5286 21.0922 25.951 21.2077 25.0292 21.2639C25.0003 21.8207 24.8911 22.3703 24.7049 22.8958C25.5351 23.3004 26.948 24.0108 26.8969 24.1341H26.8969Z" fill="#0F0EA7"/>
                                <path d="M37.1697 32.0454C36.1766 30.6553 35.5344 28.6628 36.1766 27.4915C36.8985 26.1752 37.7652 24.8108 37.354 22.7752C37.245 22.2589 37.1668 21.7366 37.1198 21.211C37.1198 21.211 38.4602 20.2886 38.4602 19.2733C38.4602 18.2579 37.1198 17.3356 37.1198 17.3356C37.1668 16.8099 37.245 16.2874 37.354 15.771C37.7652 13.7357 36.8985 12.3713 36.1766 11.055C35.5343 9.88345 36.1766 7.89118 37.1697 6.50108C38.1628 5.11098 37.8467 4.39293 37.8467 3.35902C37.8467 2.32511 38.5596 1.77161 37.8149 0.688338C36.7316 -0.0563582 36.1781 0.656593 35.1442 0.656593C34.1103 0.656593 33.3923 0.340966 32.0024 1.33381C30.6126 2.32665 24.7675 -0.368426 22.7322 0.0430238C21.7824 0.23494 21.1677 1.38349 21.1677 1.38349C21.1677 1.38349 20.2456 0.0430238 19.2303 0.0430238C18.215 0.0430238 17.2925 1.38349 17.2925 1.38349C17.2925 1.38349 16.6779 0.234963 15.7281 0.0430238C13.6928 -0.368449 7.84805 2.3267 6.45817 1.33388C5.0683 0.341056 4.34979 0.656684 3.31611 0.656684C2.28243 0.656684 1.72872 -0.0562221 0.645427 0.688428C-0.0992686 1.7717 0.613683 2.32552 0.613683 3.35911C0.613683 4.3927 0.297828 5.11105 1.29065 6.50117C2.28347 7.8913 2.92597 9.88354 2.28379 11.0551C1.56175 12.3714 0.695062 13.7359 1.10626 15.7712C1.21522 16.2876 1.29343 16.81 1.34049 17.3357C1.34049 17.3357 0 18.258 0 19.2733C0 20.2886 1.34049 21.2111 1.34049 21.2111C1.29343 21.7366 1.21522 22.2589 1.10626 22.7752C0.695062 24.8108 1.56175 26.1752 2.28368 27.4915C2.92593 28.6628 2.28368 30.6553 1.29054 32.0454C0.297398 33.4356 0.61357 34.1536 0.61357 35.1873C0.61357 36.2209 -0.0993366 36.7746 0.645314 37.8582C1.72861 38.6026 2.28241 37.8899 3.316 37.8899C4.34959 37.8899 5.06796 38.2055 6.45806 37.2127C7.84816 36.2199 13.6927 38.9148 15.728 38.5033C16.6778 38.3112 17.2925 37.1631 17.2925 37.1631C17.2925 37.1631 18.2147 38.5033 19.2303 38.5033C20.2459 38.5033 21.1678 37.1631 21.1678 37.1631C21.1678 37.1631 21.7824 38.3112 22.7323 38.5033C24.7676 38.9148 30.6124 36.2199 32.0025 37.2127C33.3926 38.2055 34.1106 37.8899 35.1443 37.8899C36.1779 37.8899 36.7317 38.6026 37.815 37.8582C38.5597 36.7746 37.8467 36.2211 37.8467 35.1873C37.8467 34.1534 38.1625 33.4353 37.1697 32.0454ZM19.2302 32.8677H6.92291C6.58156 32.8677 6.25419 32.7321 6.01282 32.4908C5.77145 32.2494 5.63585 31.922 5.63584 31.5807V6.96595C5.63584 6.6246 5.77144 6.29723 6.01281 6.05586C6.25419 5.81449 6.58156 5.67889 6.92291 5.67889H31.5374C31.8788 5.67889 32.2061 5.8145 32.4475 6.05587C32.6889 6.29724 32.8245 6.62461 32.8245 6.96595V31.5807C32.8245 31.922 32.6889 32.2494 32.4475 32.4908C32.2061 32.7321 31.8788 32.8677 31.5374 32.8677H19.2302Z" fill="#0F0EA7"/>
                            </svg>
                        </Flex>
                        <Box mt={'32px'} pb={0} mb={0}>
                            <BioRymHeading color="#201F1F" fontSize='2.25rem' pt='1.5rem' mb='1rem'  fontWeight='700' lineHeight={'43.3px'} >Sign in to your account</BioRymHeading>
                            <Text display={'flex'} alignItmes={'center'} justifyContent={'center'} pb={0} fontSize='16px' fontWeight={'400'} color={'#797979'} >Don’t have an account? <Text pb={'0px'} pl={1}> <Link pb={0} color='#0F0EA7' fontWeight={'500'}> Apply now</Link></Text></Text>
                        </Box>
                        <Box mt={'2rem'} mb={'auto'} className="Box-card" p='2rem'  bg='#fff' borderRadius='0' >

                            <FormControl id="email">
                                <FormLabel  color='#636262' fontWeight='500'>Email address</FormLabel>
                                <Input
                                  mb={3}
                                   type="text"
                                  name="email"
                                  id ="email"
                                  bg={'#fff'}
                                  borderRadius={'0'}
                                  borderColor={'#D2D2D2'}
                                     value={formikProps.values.email}
                                      onChange={formikProps.handleChange("email")}
                                      onBlur={formikProps.handleBlur("email")}
                                      error={
                                        formikProps.errors.email && formikProps.touched.email
                                          ? true
                                          : false
                                      }
                                />

        <div>
          {formikProps.errors.email && formikProps.touched.email && (
               <FormErrorMessage status='error'>

               {formikProps.errors.email}
             </FormErrorMessage>

         )}


        </div>
                                <Flex >
                                    <Box >
                                        <FormLabel color='#636262' fontWeight='500' >Password</FormLabel>
                                    </Box>
                                    <Spacer />
                                    <Link color={'#0F0EA7'} fontSize={'16px'} ml={'auto'} fontWeight={500} onClick={handleForgetPassword}>
                                        Forgot Password?
                                    </Link>

                                </Flex>

                                <InputGroup size="md" mb={3}>
                                

<Input
    borderRadius={'0'}
    borderColor={'#D2D2D2'}
               pr="4.5rem"
               type={show ? "text" : "password"}
              name="password"
              id ="password"
               bg={'#fff'}
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
                                        <Button _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} bg='transparent' h="1.75rem" size="sm" onClick={handleClick} color={'#636262'}>
                                            {show ?  <IoMdEye  fontSize={'20px'}/> : <IoMdEyeOff  fontSize={'20px'}/> }
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {formikProps.errors.password && formikProps.touched.password && (
                                    <FormErrorMessage>

                                    {formikProps.errors.password}
                                  </FormErrorMessage>
               

         )}
                                <Button  py='1.5rem' w='100%' my='1rem' borderRadius={'0px'} bg='#0F0EA7' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                         _disabled={{opacity:'50%'}}
                                isDisabled={!(formikProps?.values?.email && formikProps?.values?.password)?true:false} onClick={formikProps.handleSubmit}
                                > Sign in </Button>
</FormControl>
                           

                        </Box>


                    </Container>


                </Flex>
            </Box>


           

            </>
			   )}
			   </Formik>

    );
}
export default AdminLogin;
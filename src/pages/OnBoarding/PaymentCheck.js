import React,{useEffect} from 'react';
import {
    Box, Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    Checkbox, Text, Link,Divider
} from "@chakra-ui/react";
import {BioRymHeading} from '../../assets/StyledComponent/styeledComponent'
import server from '../../apis/server'
import {   useDispatch, useSelector} from 'react-redux'
import { Formik } from "formik"; 
import * as yup from "yup";
import { navigate } from '@reach/router';
import {setSteps,setAccount} from "../../redux/action/tradingBot"
import CryptoJS from "crypto-js";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import {IoIosArrowBack, IoIosLock} from "react-icons/io";
import { FaBullseye } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react'
import { LoadingScreen } from "../../components";
import { loadStripe } from "@stripe/stripe-js";

    const PaymentCheck =({userId})=>{

        const [loader,setLoader]=React.useState(true)

      
      useEffect(() => {
        // localStorage.clear()
        validateInvitation() 
       },[]);

       const validateInvitation =async() => {
           try  { 
            //    alert(userId)
           const {data} = await server.post(
               `users/getUserById`,
               {
                     userId: userId
               },
               { 
                 
                 headers: {
                   "Content-Type": "application/json",
                 },
               } 
             )
             setLoader(false)
             console.log('dataaaaaa',data)
           //    alert(JSON.stringify(data))
             if(data)
             {
          if(data?.user?.account_type==='gallery'){
                  navigate("/OnBoardingUserDetail", { state: { value: data?.user?.email,name:data?.user?.name }})
          }
          if(data?.user?.account_type==='artist'){
            navigate("/artist/CreateProfile", { state: { value: data?.user?.email,name:data?.user?.name }})
    }
            
             }
            
         } catch (e) {
         //    alert(e.message)
           //  setIsLoading(false)
           // console.log(e); 
           // handleSnackBar(e.message);
           // alert("you have entered wrong email or password");
         }
   
     
     };



    
    
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
if (!userId)
{
  return (
    <Box>
      <text>
        Invalid or broken link.
      </text>
    </Box>
  )
}
 
{
    return(
      <>
      </>

    );
}
    }
export default PaymentCheck;
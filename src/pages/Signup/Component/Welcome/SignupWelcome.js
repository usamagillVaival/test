import React,{useState} from 'react';
import '../../SignUp.scss';
import {
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
    Radio,
    Badge,
    ChakraProvider,
    Flex , Input , FormHelperText
    ,InputGroup ,InputRightElement ,  Button, Container , Grid, GridItem ,Text ,Link} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
// import CustomRadio from "./radio/CustomRadio";
import Logo1 from '../../../../assets/images/logo1.png';
import Logo2 from '../../../../assets/images/logo1.png';
import { navigate } from '@reach/router';
import {setAccountType} from "../../../../redux/action/tradingBot"
import {   useDispatch, useSelector} from 'react-redux'
import CryptoJS from 'crypto-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import server from '../../../../apis/server';
import { useToast } from '@chakra-ui/react'

  
  


  



const SignupWelcome=()=>{
    const state = useSelector(state => state);
    
    const {steps,signUp}  =   state?.TradingBot

    const [accountType, setAccount] = useState("collector");
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState("1")
    const dispatch = useDispatch();

   async function navigateNext(){
        dispatch(setAccountType(accountType))
            
        
        const dataa = signUp
        dataa.accountType = accountType
    
              
              let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
               console.log(ciphertext)
            //     try  { 
                 const {data} = await server.post(
                      "users/signUp",
                    {
                      payload: ciphertext
                    } ,
                     { 
                       headers: {
                         "Content-Type": "application/json",
                       },
                     } 
                   )
                   if(data.message){
                    toast({
                        title: 'Success',
                        description: `${data.message}`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true, variant:'top-accent',
                        position:'top-right',
                      })
                      return
                   }
                   if(data.error){
                    toast({
                        title: 'Failed',
                        description: `${data.error} in the system`,
                        status: 'error',
                        duration: 4000, variant:'top-accent',
                        isClosable: true,
                        position:'top-right',
                      })
                       return
                   }
                   else{
                       toast('Something went wrong')
                   }

    }


    const handleClick = () =>{
         setShow(!show);
        }

       
    return(
        <>
        <ToastContainer />
            <Box height='100vh' bg='fff'>
               
                <Container maxW="container.xl" height='100%' display='flex' >
                    <Box m='auto'>
                        <Box display='flex' flexDirection='column' >
                            <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" colorScheme="green">
                                Step 1
                            </Badge>
                            <Heading textAlign='center' fontSize='1.9rem' mb='1rem'>
                                Welcome, Damon.
                            </Heading>
                            <Text textAlign='center' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                What type of account are we creating today?
                            </Text>
                        </Box>
                        <Grid  templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)" ,lg:"repeat(3, 1fr)"}} gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"85%"}} pt={'3rem'}  m={'auto'}  >
                        
                        
                            <Box
                            onClick={(e) => {
                                e.preventDefault();
                                toast({
                                    title: 'Feature Disabled',
                                    description: `For now this option is disabled`,
                                    status: 'error',
                                    duration: 4000, variant:'top-accent',
                                    isClosable: true,
                                    position:'top-right',
                                  })
                                  
                              }}
                            className={'custom_radio'}>
                                <input type="radio" id="featured-1" value={accountType}name="accountType"checked={accountType == "gallery"}  />
                                <label className={'customLabel'} htmlFor="featured-1">
                                    <Icon  width='100%' margin='auto'  height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 17.2498C15.4033 17.2498 14.831 17.0127 14.409 16.5908C13.9871 16.1688 13.75 15.5965 13.75 14.9998C13.75 14.403 13.9871 13.8307 14.409 13.4088C14.831 12.9868 15.4033 12.7498 16 12.7498C16.5967 12.7498 17.169 12.9868 17.591 13.4088C18.0129 13.8307 18.25 14.403 18.25 14.9998C18.25 15.5965 18.0129 16.1688 17.591 16.5908C17.169 17.0127 16.5967 17.2498 16 17.2498ZM15.208 21.7408C15.4705 22.0558 15.7345 22.3618 16 22.6543C16.2655 22.3618 16.5295 22.0573 16.792 21.7408C16.2641 21.752 15.7359 21.752 15.208 21.7408ZM12.2155 21.5533C11.0636 21.4334 9.9193 21.2491 8.788 21.0013C8.6755 21.5263 8.59 22.0363 8.533 22.5253C8.248 24.8998 8.6455 26.3428 9.25 26.6908C9.8545 27.0403 11.302 26.6623 13.2175 25.2298C13.612 24.9343 14.0095 24.6058 14.4085 24.2473C13.6277 23.3909 12.8956 22.4915 12.2155 21.5533ZM23.212 21.0013C22.1365 21.2413 20.9875 21.4273 19.7845 21.5533C19.1044 22.4915 18.3723 23.3909 17.5915 24.2473C17.9905 24.6073 18.388 24.9343 18.7825 25.2298C20.698 26.6623 22.1455 27.0403 22.75 26.6908C23.3545 26.3428 23.7505 24.8998 23.4685 22.5253C23.4066 22.0137 23.3215 21.5052 23.2135 21.0013H23.212ZM25.387 20.4208C26.2525 24.3793 25.798 27.5308 23.875 28.6408C21.952 29.7508 18.9955 28.5688 16 25.8403C13.0045 28.5688 10.048 29.7493 8.125 28.6393C6.202 27.5293 5.7475 24.3793 6.6115 20.4193C2.7505 19.1908 0.25 17.2198 0.25 14.9998C0.25 12.7798 2.7505 10.8103 6.6115 9.57877C5.7475 5.62027 6.202 2.46877 8.125 1.35877C10.048 0.248774 13.0045 1.43077 16 4.15927C18.9955 1.43077 21.952 0.250275 23.875 1.36027C25.798 2.47027 26.2525 5.62027 25.3885 9.58027C29.2495 10.8088 31.75 12.7798 31.75 14.9998C31.75 17.2198 29.2495 19.1893 25.3885 20.4208H25.387ZM14.407 5.75227C14.0255 5.40698 13.6286 5.07915 13.2175 4.76977C11.302 3.33727 9.8545 2.95927 9.25 3.30877C8.6455 3.65677 8.2495 5.09977 8.5315 7.47427C8.5915 7.96477 8.6755 8.47327 8.7865 8.99827C9.91829 8.75037 11.0631 8.56609 12.2155 8.44627C12.928 7.46677 13.663 6.56527 14.4085 5.75227H14.407ZM19.7845 8.44627C20.9875 8.57227 22.1365 8.75977 23.212 8.99827C23.3245 8.47327 23.41 7.96327 23.467 7.47427C23.752 5.09977 23.3545 3.65677 22.75 3.30877C22.1455 2.95927 20.698 3.33727 18.7825 4.76977C18.3709 5.07911 17.9735 5.40695 17.5915 5.75227C18.337 6.56527 19.072 7.46677 19.7845 8.44627ZM16.792 8.25877C16.5295 7.94377 16.2655 7.63777 16 7.34527C15.7345 7.63777 15.4705 7.94227 15.208 8.25877C15.7359 8.24757 16.2641 8.24757 16.792 8.25877ZM10.558 19.0558C10.2843 18.6044 10.0203 18.1473 9.766 17.6848C9.6235 18.0703 9.4915 18.4498 9.3715 18.8263C9.757 18.9103 10.153 18.9868 10.5565 19.0558H10.558ZM13.456 19.4068C15.1497 19.5326 16.8503 19.5326 18.544 19.4068C19.4998 18.0027 20.3501 16.5297 21.088 14.9998C20.3501 13.4699 19.4998 11.9968 18.544 10.5928C16.8503 10.467 15.1497 10.467 13.456 10.5928C12.5002 11.9968 11.6499 13.4699 10.912 14.9998C11.6499 16.5297 12.5002 18.0027 13.456 19.4068ZM22.234 12.3148C22.3765 11.9293 22.5085 11.5498 22.6285 11.1733C22.2353 11.0879 21.8402 11.0114 21.4435 10.9438C21.7167 11.3951 21.9802 11.8522 22.234 12.3148ZM7.195 11.7553C6.685 11.9203 6.202 12.1003 5.749 12.2953C3.5515 13.2373 2.5 14.3023 2.5 14.9998C2.5 15.6973 3.55 16.7623 5.749 17.7043C6.202 17.8993 6.685 18.0793 7.195 18.2443C7.528 17.1943 7.9405 16.1053 8.4325 14.9998C7.95974 13.9422 7.54659 12.859 7.195 11.7553ZM9.37 11.1733C9.4915 11.5483 9.6235 11.9293 9.766 12.3133C10.0203 11.8512 10.2844 11.3946 10.558 10.9438C10.153 11.0128 9.757 11.0893 9.3715 11.1733H9.37ZM24.805 18.2443C25.315 18.0793 25.798 17.8993 26.251 17.7043C28.4485 16.7623 29.5 15.6973 29.5 14.9998C29.5 14.3023 28.45 13.2373 26.251 12.2953C25.7774 12.0935 25.2949 11.9133 24.805 11.7553C24.472 12.8053 24.0595 13.8943 23.5675 14.9998C24.0595 16.1053 24.472 17.1928 24.805 18.2443ZM22.63 18.8263C22.5085 18.4513 22.3765 18.0703 22.234 17.6863C21.9797 18.1483 21.7156 18.6049 21.442 19.0558C21.847 18.9868 22.243 18.9103 22.6285 18.8263H22.63Z" fill="#4D4D4D"/>
                                    </Icon>
                                    <Heading textAlign='center' color={'#333333'} pt='0.5rem' fontSize='1.25rem'>Gallery</Heading>
                                    <Text  mb='1rem'  pt='0.5rem' color={'#333333'} textAlign='center' fontSize='0.85rem'>Create and sell NFTs
                                        with your Artists.</Text>
                                </label>
                            </Box>



                            <Box
                             onClick={(e) => {
                                e.preventDefault();
                                toast({
                                    title: 'Feature Disabled',
                                    description: `For now this option is disabled`,
                                    status: 'error',
                                    duration: 4000, variant:'top-accent',
                                    isClosable: true,
                                    position:'top-right',
                                  })
                                  
                              }}
                            className={'custom_radio'} disabled>
                                <input type="radio" id="featured-1" value={accountType}name="accountType"checked={accountType == "artist"}  disabled />
                                <label className={'customLabel'} htmlFor="featured-2">
                                    <Icon width='100%' margin='auto'  height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 17.2498C15.4033 17.2498 14.831 17.0127 14.409 16.5908C13.9871 16.1688 13.75 15.5965 13.75 14.9998C13.75 14.403 13.9871 13.8307 14.409 13.4088C14.831 12.9868 15.4033 12.7498 16 12.7498C16.5967 12.7498 17.169 12.9868 17.591 13.4088C18.0129 13.8307 18.25 14.403 18.25 14.9998C18.25 15.5965 18.0129 16.1688 17.591 16.5908C17.169 17.0127 16.5967 17.2498 16 17.2498ZM15.208 21.7408C15.4705 22.0558 15.7345 22.3618 16 22.6543C16.2655 22.3618 16.5295 22.0573 16.792 21.7408C16.2641 21.752 15.7359 21.752 15.208 21.7408ZM12.2155 21.5533C11.0636 21.4334 9.9193 21.2491 8.788 21.0013C8.6755 21.5263 8.59 22.0363 8.533 22.5253C8.248 24.8998 8.6455 26.3428 9.25 26.6908C9.8545 27.0403 11.302 26.6623 13.2175 25.2298C13.612 24.9343 14.0095 24.6058 14.4085 24.2473C13.6277 23.3909 12.8956 22.4915 12.2155 21.5533ZM23.212 21.0013C22.1365 21.2413 20.9875 21.4273 19.7845 21.5533C19.1044 22.4915 18.3723 23.3909 17.5915 24.2473C17.9905 24.6073 18.388 24.9343 18.7825 25.2298C20.698 26.6623 22.1455 27.0403 22.75 26.6908C23.3545 26.3428 23.7505 24.8998 23.4685 22.5253C23.4066 22.0137 23.3215 21.5052 23.2135 21.0013H23.212ZM25.387 20.4208C26.2525 24.3793 25.798 27.5308 23.875 28.6408C21.952 29.7508 18.9955 28.5688 16 25.8403C13.0045 28.5688 10.048 29.7493 8.125 28.6393C6.202 27.5293 5.7475 24.3793 6.6115 20.4193C2.7505 19.1908 0.25 17.2198 0.25 14.9998C0.25 12.7798 2.7505 10.8103 6.6115 9.57877C5.7475 5.62027 6.202 2.46877 8.125 1.35877C10.048 0.248774 13.0045 1.43077 16 4.15927C18.9955 1.43077 21.952 0.250275 23.875 1.36027C25.798 2.47027 26.2525 5.62027 25.3885 9.58027C29.2495 10.8088 31.75 12.7798 31.75 14.9998C31.75 17.2198 29.2495 19.1893 25.3885 20.4208H25.387ZM14.407 5.75227C14.0255 5.40698 13.6286 5.07915 13.2175 4.76977C11.302 3.33727 9.8545 2.95927 9.25 3.30877C8.6455 3.65677 8.2495 5.09977 8.5315 7.47427C8.5915 7.96477 8.6755 8.47327 8.7865 8.99827C9.91829 8.75037 11.0631 8.56609 12.2155 8.44627C12.928 7.46677 13.663 6.56527 14.4085 5.75227H14.407ZM19.7845 8.44627C20.9875 8.57227 22.1365 8.75977 23.212 8.99827C23.3245 8.47327 23.41 7.96327 23.467 7.47427C23.752 5.09977 23.3545 3.65677 22.75 3.30877C22.1455 2.95927 20.698 3.33727 18.7825 4.76977C18.3709 5.07911 17.9735 5.40695 17.5915 5.75227C18.337 6.56527 19.072 7.46677 19.7845 8.44627ZM16.792 8.25877C16.5295 7.94377 16.2655 7.63777 16 7.34527C15.7345 7.63777 15.4705 7.94227 15.208 8.25877C15.7359 8.24757 16.2641 8.24757 16.792 8.25877ZM10.558 19.0558C10.2843 18.6044 10.0203 18.1473 9.766 17.6848C9.6235 18.0703 9.4915 18.4498 9.3715 18.8263C9.757 18.9103 10.153 18.9868 10.5565 19.0558H10.558ZM13.456 19.4068C15.1497 19.5326 16.8503 19.5326 18.544 19.4068C19.4998 18.0027 20.3501 16.5297 21.088 14.9998C20.3501 13.4699 19.4998 11.9968 18.544 10.5928C16.8503 10.467 15.1497 10.467 13.456 10.5928C12.5002 11.9968 11.6499 13.4699 10.912 14.9998C11.6499 16.5297 12.5002 18.0027 13.456 19.4068ZM22.234 12.3148C22.3765 11.9293 22.5085 11.5498 22.6285 11.1733C22.2353 11.0879 21.8402 11.0114 21.4435 10.9438C21.7167 11.3951 21.9802 11.8522 22.234 12.3148ZM7.195 11.7553C6.685 11.9203 6.202 12.1003 5.749 12.2953C3.5515 13.2373 2.5 14.3023 2.5 14.9998C2.5 15.6973 3.55 16.7623 5.749 17.7043C6.202 17.8993 6.685 18.0793 7.195 18.2443C7.528 17.1943 7.9405 16.1053 8.4325 14.9998C7.95974 13.9422 7.54659 12.859 7.195 11.7553ZM9.37 11.1733C9.4915 11.5483 9.6235 11.9293 9.766 12.3133C10.0203 11.8512 10.2844 11.3946 10.558 10.9438C10.153 11.0128 9.757 11.0893 9.3715 11.1733H9.37ZM24.805 18.2443C25.315 18.0793 25.798 17.8993 26.251 17.7043C28.4485 16.7623 29.5 15.6973 29.5 14.9998C29.5 14.3023 28.45 13.2373 26.251 12.2953C25.7774 12.0935 25.2949 11.9133 24.805 11.7553C24.472 12.8053 24.0595 13.8943 23.5675 14.9998C24.0595 16.1053 24.472 17.1928 24.805 18.2443ZM22.63 18.8263C22.5085 18.4513 22.3765 18.0703 22.234 17.6863C21.9797 18.1483 21.7156 18.6049 21.442 19.0558C21.847 18.9868 22.243 18.9103 22.6285 18.8263H22.63Z" fill="#4D4D4D"/>
                                    </Icon>
                                    <Heading textAlign='center' color={'#333333'}  pt='0.5rem' fontSize='1.25rem'>Artist</Heading>
                                    <Text  mb='1rem' color={'#333333'}  pt='0.5rem' textAlign='center' fontSize='0.85rem'>Approve NFTs created by
                                        your Gallery.</Text>
                                </label>
                            </Box>
                            <Box
                            onClick={() => {
                                setAccount("collector");
                              }}
                            className={'custom_radio'}>
                                <input type="radio" id="featured-1" value={accountType}name="accountType"checked={accountType == "collector"}  />
                                <label className={'customLabel'} htmlFor="featured-3">
                                    <Icon  width='100%' margin='auto'   height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 17.2498C15.4033 17.2498 14.831 17.0127 14.409 16.5908C13.9871 16.1688 13.75 15.5965 13.75 14.9998C13.75 14.403 13.9871 13.8307 14.409 13.4088C14.831 12.9868 15.4033 12.7498 16 12.7498C16.5967 12.7498 17.169 12.9868 17.591 13.4088C18.0129 13.8307 18.25 14.403 18.25 14.9998C18.25 15.5965 18.0129 16.1688 17.591 16.5908C17.169 17.0127 16.5967 17.2498 16 17.2498ZM15.208 21.7408C15.4705 22.0558 15.7345 22.3618 16 22.6543C16.2655 22.3618 16.5295 22.0573 16.792 21.7408C16.2641 21.752 15.7359 21.752 15.208 21.7408ZM12.2155 21.5533C11.0636 21.4334 9.9193 21.2491 8.788 21.0013C8.6755 21.5263 8.59 22.0363 8.533 22.5253C8.248 24.8998 8.6455 26.3428 9.25 26.6908C9.8545 27.0403 11.302 26.6623 13.2175 25.2298C13.612 24.9343 14.0095 24.6058 14.4085 24.2473C13.6277 23.3909 12.8956 22.4915 12.2155 21.5533ZM23.212 21.0013C22.1365 21.2413 20.9875 21.4273 19.7845 21.5533C19.1044 22.4915 18.3723 23.3909 17.5915 24.2473C17.9905 24.6073 18.388 24.9343 18.7825 25.2298C20.698 26.6623 22.1455 27.0403 22.75 26.6908C23.3545 26.3428 23.7505 24.8998 23.4685 22.5253C23.4066 22.0137 23.3215 21.5052 23.2135 21.0013H23.212ZM25.387 20.4208C26.2525 24.3793 25.798 27.5308 23.875 28.6408C21.952 29.7508 18.9955 28.5688 16 25.8403C13.0045 28.5688 10.048 29.7493 8.125 28.6393C6.202 27.5293 5.7475 24.3793 6.6115 20.4193C2.7505 19.1908 0.25 17.2198 0.25 14.9998C0.25 12.7798 2.7505 10.8103 6.6115 9.57877C5.7475 5.62027 6.202 2.46877 8.125 1.35877C10.048 0.248774 13.0045 1.43077 16 4.15927C18.9955 1.43077 21.952 0.250275 23.875 1.36027C25.798 2.47027 26.2525 5.62027 25.3885 9.58027C29.2495 10.8088 31.75 12.7798 31.75 14.9998C31.75 17.2198 29.2495 19.1893 25.3885 20.4208H25.387ZM14.407 5.75227C14.0255 5.40698 13.6286 5.07915 13.2175 4.76977C11.302 3.33727 9.8545 2.95927 9.25 3.30877C8.6455 3.65677 8.2495 5.09977 8.5315 7.47427C8.5915 7.96477 8.6755 8.47327 8.7865 8.99827C9.91829 8.75037 11.0631 8.56609 12.2155 8.44627C12.928 7.46677 13.663 6.56527 14.4085 5.75227H14.407ZM19.7845 8.44627C20.9875 8.57227 22.1365 8.75977 23.212 8.99827C23.3245 8.47327 23.41 7.96327 23.467 7.47427C23.752 5.09977 23.3545 3.65677 22.75 3.30877C22.1455 2.95927 20.698 3.33727 18.7825 4.76977C18.3709 5.07911 17.9735 5.40695 17.5915 5.75227C18.337 6.56527 19.072 7.46677 19.7845 8.44627ZM16.792 8.25877C16.5295 7.94377 16.2655 7.63777 16 7.34527C15.7345 7.63777 15.4705 7.94227 15.208 8.25877C15.7359 8.24757 16.2641 8.24757 16.792 8.25877ZM10.558 19.0558C10.2843 18.6044 10.0203 18.1473 9.766 17.6848C9.6235 18.0703 9.4915 18.4498 9.3715 18.8263C9.757 18.9103 10.153 18.9868 10.5565 19.0558H10.558ZM13.456 19.4068C15.1497 19.5326 16.8503 19.5326 18.544 19.4068C19.4998 18.0027 20.3501 16.5297 21.088 14.9998C20.3501 13.4699 19.4998 11.9968 18.544 10.5928C16.8503 10.467 15.1497 10.467 13.456 10.5928C12.5002 11.9968 11.6499 13.4699 10.912 14.9998C11.6499 16.5297 12.5002 18.0027 13.456 19.4068ZM22.234 12.3148C22.3765 11.9293 22.5085 11.5498 22.6285 11.1733C22.2353 11.0879 21.8402 11.0114 21.4435 10.9438C21.7167 11.3951 21.9802 11.8522 22.234 12.3148ZM7.195 11.7553C6.685 11.9203 6.202 12.1003 5.749 12.2953C3.5515 13.2373 2.5 14.3023 2.5 14.9998C2.5 15.6973 3.55 16.7623 5.749 17.7043C6.202 17.8993 6.685 18.0793 7.195 18.2443C7.528 17.1943 7.9405 16.1053 8.4325 14.9998C7.95974 13.9422 7.54659 12.859 7.195 11.7553ZM9.37 11.1733C9.4915 11.5483 9.6235 11.9293 9.766 12.3133C10.0203 11.8512 10.2844 11.3946 10.558 10.9438C10.153 11.0128 9.757 11.0893 9.3715 11.1733H9.37ZM24.805 18.2443C25.315 18.0793 25.798 17.8993 26.251 17.7043C28.4485 16.7623 29.5 15.6973 29.5 14.9998C29.5 14.3023 28.45 13.2373 26.251 12.2953C25.7774 12.0935 25.2949 11.9133 24.805 11.7553C24.472 12.8053 24.0595 13.8943 23.5675 14.9998C24.0595 16.1053 24.472 17.1928 24.805 18.2443ZM22.63 18.8263C22.5085 18.4513 22.3765 18.0703 22.234 17.6863C21.9797 18.1483 21.7156 18.6049 21.442 19.0558C21.847 18.9868 22.243 18.9103 22.6285 18.8263H22.63Z" fill="#4D4D4D"/>
                                    </Icon>
                                    <Heading textAlign='center' color={'#333333'}  pt='0.5rem' fontSize='1.25rem'>Collector</Heading>
                                    <Text mb='1rem'  pt='0.5rem' color={'#333333'} textAlign='center' fontSize='0.85rem'>Buy NFTs listed for
                                        sale on DadaVault.</Text>

                                </label>
                            </Box>
                        </Grid>
                        <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                            <Box  marginTop='1rem'  marginBottom='1rem'  height='1px' bg='#ADADAD'></Box>
                            <Box display='flex'>
                                <Button bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        rightIcon={<ArrowForwardIcon />} marginLeft='auto' onClick={navigateNext}>Next</Button>

                            </Box>

                        </Grid>

                        <Box></Box>

                    </Box>
                </Container>

            </Box>

        </>
    )
}
export default SignupWelcome;
import React , { useState }  from "react";
import {
    Wrap, WrapItem ,
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputRightElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider,Center
} from "@chakra-ui/react";
import DVLogo from '../../assets/images/DVlOGO.png';
import {ArrowForwardIcon, ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { navigate } from "@reach/router";
import {   useDispatch, useSelector} from 'react-redux'
import {setToken} from "../../redux/action/tradingBot"


function StoreFrontHeader(props) {
    //const User=localStorage.getItem("User")
    // const {account_type}=Use
    const dispatch = useDispatch();

function navigateNext()
{
    
    navigate("/SignUpPage")
}
function navigateSignIn()
{
    navigate("/Login")
}
function navigateSignout()
{
    dispatch(setToken(''))
            localStorage.removeItem("token");
            localStorage.removeItem("User")

}

    return (
        <>
           <header>
               <Box width={'100%'}>
                   <Box display='flex' my={'1rem'}>
                       {localStorage.getItem("token") ==null?
                       <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #C4C4C4' bg='#C4C4C4' color='#000' _focus={{ bg: "#C4C4C4", }}  _hover={{ bg: "#C4C4C4", }} _active={{ bg: "#C4C4C4", }}  marginLeft='auto' marginRight={'1rem'} fontWeight={'400'} fontSize={'16px'} onClick={navigateSignIn}>Sign in</Button>
                       :
                       <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #C4C4C4' bg='#C4C4C4' color='#000' _focus={{ bg: "#C4C4C4", }}  _hover={{ bg: "#C4C4C4", }} _active={{ bg: "#C4C4C4", }}  marginLeft='auto' marginRight={'1rem'} fontWeight={'400'} fontSize={'16px'} onClick={navigateSignout}>Sign Out</Button>
    }
                      {localStorage.getItem("token") ==null?
                       <Button  textAlign={'center'}  bg='transparent' color='#000' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}  fontWeight={'400'} fontSize={'16px'} onClick={navigateNext}> Get Started</Button>
                       :null
                      }
                   </Box>
               </Box>
               <Box width={'100%'} display={'flex'} pb={4}>
                   <Wrap display={'flex'} alignItems={'center'} justifyContent={'center'}>
                           <WrapItem display={'flex'} >
                               <Link m={'auto'}>
                                   <Image src={DVLogo} />
                               </Link>
                           </WrapItem>
                           <WrapItem display={'flex'}>
                               <Link px={5} my={'auto'}  fontSize='1rem' color={'#000'} fontWeight={'700'}>Discover</Link>
                           </WrapItem>
                           <WrapItem >
                               <Link px={5} my={'auto'}  fontSize='1rem' color={'#000'} fontWeight={'700'}>Buy/Sell</Link>

                           </WrapItem>
                           <WrapItem>
                               <Link px={5} my={'auto'}  fontSize='1rem' color={'#000'} fontWeight={'700'}>Editorial</Link>

                           </WrapItem>
                           <WrapItem>
                               <Link px={5} my={'auto'}  fontSize='1rem' color={'#000'} fontWeight={'700'}>How to mint</Link>
                           </WrapItem>
                       </Wrap>
                   <Box ml={'auto'} d={'flex'} alignItems={'center'}>
                       <InputGroup  >
                           <InputRightElement pointerEvents="none" children={<SearchIcon color="#000" />} />
                           <Input type="text" placeholder="Search" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />
                       </InputGroup>
                   </Box>
               </Box>

           </header>

        </>

    );
}

export default StoreFrontHeader;

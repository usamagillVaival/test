import React, { useState, useEffect,Component }  from "react";
import {
    Alert, AlertIcon,
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup,useDisclosure, InputLeftElement, Table, Tbody, Td, Image,Divider, Modal, ModalOverlay, ModalContent, ModalBody,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Container, FormControl,
     
    FormLabel,     
} from "@chakra-ui/react";
import {SearchIcon, TriangleUpIcon,ArrowForwardIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading, NFTCustomCard
} from '../../assets/StyledComponent/styeledComponent';
import Avatar from '../../assets/images/avatar.png';
import {NFTCARD} from '../../components/index'
import {Link as ReachLink} from "@reach/router";
import ArtistGallery from "./AddNewArtist/component/ArtistGallery";
import ArtistOnDadaValut from "./AddNewArtist/component/AddArtistArtWork/ArtistOnDadaValut";
import {ArtistInvite, GalleryList} from "../index";
import Select from 'react-select'
import CryptoJS from "crypto-js";
import server from '../../apis/server'
import { navigate } from '@reach/router';
import Dummy from '../../assets/images/dummy2.png';
import {setSteps,setGallery,setSelectedArtistLabel} from "../../redux/action/tradingBot"
import {   useDispatch, useSelector} from 'react-redux'
import { ArtistListing } from "../index";
import { Formik } from "formik"; 
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingScreen } from "../../components/index";
import { useToast,Spinner } from '@chakra-ui/react'




function Artists(props) {
    const toast=useToast()

    const setting = {
        dots: false,
        arrows:true,
        speed: 500,
        autoplay:false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
        nextArrow: <MainNextArrow />,
        prevArrow: <MainPrevArrow />,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },

        ]
    };

    function MainNextArrow(props) {

        const { className, style, onClick } = props;
        return (
            <div className='mainslider_nextarrow' onClick={onClick}
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12.5" viewBox="0 0 20 12.5">

                    <g transform="translate(0 0)">
                        <path fill='#3e4559'
                              d="M19.717,5.458c.012.015.022.03.034.045s.027.035.039.054.022.036.033.055.02.033.03.05.018.038.027.057.017.036.025.054.014.037.021.056.015.039.021.059.01.038.015.057.011.041.015.062.007.044.01.066.006.036.008.055a1.253,1.253,0,0,1,0,.247c0,.019-.005.036-.008.055s-.006.044-.01.066-.01.041-.015.062-.009.038-.015.057-.014.04-.021.059-.013.038-.021.056-.017.036-.025.054-.017.038-.027.057-.02.033-.03.05-.021.037-.033.055-.026.036-.039.053-.022.03-.034.045q-.038.047-.081.09h0l-5,5a1.25,1.25,0,1,1-1.768-1.768L15.732,7.5H1.25a1.25,1.25,0,1,1,0-2.5H15.732L12.866,2.134A1.25,1.25,0,0,1,14.634.366l5,5h0Q19.678,5.411,19.717,5.458Z"
                              transform="translate(0 0)"/>
                    </g>
                </svg>
            </div>
        );
    }
    function MainPrevArrow(props) {
        const { className, style, onClick } = props;

        return (
            <div className='mainslider_prevarrow' onClick={onClick} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12.5" viewBox="0 0 20 12.5">
                    <g transform="translate(0)">
                        <g transform="translate(0 0)">
                            <path fill='#3e4559'
                                  d="M.283,5.458c-.012.015-.022.03-.034.045s-.027.035-.039.054-.022.036-.033.055-.02.033-.03.05S.129,5.7.12,5.718.1,5.753.1,5.772s-.014.037-.021.056-.015.039-.021.059-.01.038-.015.057-.011.041-.015.062-.007.044-.01.066-.006.036-.008.055a1.253,1.253,0,0,0,0,.247c0,.019.005.036.008.055s.006.044.01.066.01.041.015.062.009.038.015.057.014.04.021.059.013.038.021.056.017.036.025.054.017.038.027.057.02.033.03.05.021.037.033.055S.236,6.98.25,7s.022.03.034.045q.038.047.081.09h0l5,5a1.25,1.25,0,1,0,1.768-1.768L4.268,7.5H18.75a1.25,1.25,0,1,0,0-2.5H4.268L7.134,2.134A1.25,1.25,0,0,0,5.366.366l-5,5h0Q.322,5.411.283,5.458Z"
                                  transform="translate(0 0)"/>
                        </g>
                    </g>
                </svg>

            </div>
        );
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose: onInviteArtistClose } = useDisclosure();
    const finalRef = React.useRef();
    const [options, setOption] = useState([]);
    const [galleryArtist, setGalleryArtist] = useState([]);
    const [invited, setInvited] = useState(false);
    const [invitationName, setInvitationName] = useState('');
    const [data, setData] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState("");
    const dispatch = useDispatch();
    const User1 = JSON.parse(localStorage.getItem("User"))
    const [loader,setLoader]=React.useState(true)
    const bytes =  User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
    const galName=userType?.name

    useEffect(() => {
       load();
       if (props?.location?.state?.invite || props?.location?.state?.invitee)
       {
        setInvited(false)
        onInviteArtistOpen()
        
       }
      },[]);

      let validationSchema = yup.object({ 
        email: yup.string().email('Invalid email').required('Required'),
        name: yup.string().required('Required'),
       });  
       const handleSignup =async(values, resetForm) => {
          
           let dataa ={
            email: values?.email,
            name:values?.name,
            accountType: "artist",
            invitedFrom: userType?._id
        }
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(dataa), 'dvault@123').toString();
          const {data} = await server.post(
              
              "users/InviteArtist",
              dataa ,
              { 
                headers: {
                  "Content-Type": "application/json",
                },
              },
            )
            if(data){
                if(data.message){
                    toast({
                        title: 'Success',
                        description: `${data.message}`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position:'top-right', variant:'top-accent',
                      })
                    setInvited(true)
                    setInvitationName(values?.name)
                }
                if(data?.error){
                    toast({
                        title: 'Failed',
                        description: `${data.error}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                        position:'top-right', variant:'top-accent',
                      })
                  }
                
              
            }
       }
 function handleArtistProfile(artist)
 {
    navigate(`/Artists/ArtistDetailNew/${artist._id}`, { state: {artist } })
 }
    const load = async ()=>{
        try  { 
            const {data} = await server.get(
                "users/artist_byGallery", {
                    params: {
                        invited_from: userType?._id
                    }
                  },
                { 
                  headers: {
                    "Content-Type": "application/json",
                  },
                } 
              )
              if(data){
                if(data.data){
                    
                    setGalleryArtist(data?.data)
                    setLoader(false)
                }
                else{
                }
              }
          } catch (e) {
              alert(e.message)
          }
    }
    const sumbitArtist =()=>{
        dispatch(setSelectedArtistLabel(selectedArtist));
        navigate("/Artists/AddNewArtist", { state: { selectedArtist } })
            }
if(loader)
{
    return(
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
        <Formik
        initialValues={{  name: "",email:"" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSignup(values, resetForm);
        }} 
        > 
           {(formikProps) => (
        <>
        <ToastContainer />
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'}  >
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'} flex="1" d="flex" alignItems={"center"}>
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px">Artists</Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center">
                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={
                                    ()=>{
                                       setInvited(false)
                                        onInviteArtistOpen()
                                    }
                                    }> 
                                  + Invite artist
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Heading mt={'48px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>
                            <Text>{galName}'s artists</Text>
                    </Heading>
                </Box>

                <Box h={'100%'} px={'24px'}>
                               
                                    <Tabs>
                                        <TabList>
                                            <Tab color={'#666666'}
                                                 _selected={{color: '#0C0B86', borderBottom: '2px solid #0C0B86'}}
                                                 fontSize={{base: '12px', sm: '12px', md: '14', lg: '16px'}}
                                                 fontWeight={'400'} _hover={{color: "#0C0B86"}}
                                                 _focus={{boxShadow: "none"}}>Artists</Tab>
                                            <Tab color={'#666666'}
                                                 _selected={{color: '#0C0B86', borderBottom: '2px solid #0C0B86'}}
                                                 fontSize={{base: '12px', sm: '12px', md: '14', lg: '16px'}}
                                                 fontWeight={'400'} _hover={{color: "#0C0B86"}}
                                                 _focus={{boxShadow: "none"}}>Invitations</Tab>
                                        </TabList>
                                        <TabPanels h={'100%'} mb={10}>
                                            <TabPanel p={0} color={'#000'} h={'100%'} py={8}>
                                                {!galleryArtist.length ?
                                                    <Box as='section' className='Login' width={'100%'}>
                                                        <Flex width={'100%'}>

                                                            <Container display={'flex'} flexDirection={'column'}
                                                                       align='center' justifyContent='center'
                                                                       direction="column" >
                                                                <Box mb={'2.5rem'} mt={'80px'} className="Box-card" p='1.5rem'
                                                                     bg='#F7F7F7' borderRadius='0px!important'
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
                                                                              textAlign={'center'} color={'#363535'}>Add
                                                                            your first Artist </Text>
                                                                        <Text fontWeight={'400'} mb={'1.5rem'}
                                                                              fontSize={'14px'} textAlign={'center'}
                                                                              color={'#8F8F8F'}>Invite an Artist to join
                                                                            you on DadaVault so you can mint NFTs
                                                                            together.</Text>
                                                                        <Button bg='#0F0EA7' borderRadius={'0px'}
                                                                                color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                                                                                onClick={() => {
                                                                                    setInvited(false)
                                                                                    onInviteArtistOpen()
                                                                                }}>
                                                                            + Invite artist
                                                                        </Button>

                                                                    </FormControl>


                                                                </Box>

                                                            </Container>


                                                        </Flex>
                                                    </Box>

                                                    :
                                                    <>
                                                    <Grid templateColumns={{
                                                        base: "repeat(1 , 1fr)",
                                                        sm: "repeat(2, 1fr)",
                                                        md: "repeat(3, 1fr)",
                                                        lg: "repeat(4, 1fr)"
                                                    }} gap={6}>
                                                        {
                                                    galleryArtist?.map((artist) => {
                                                        return (

                                                                    <NFTCustomCard>
                                                                        <Image
                                                                            src={`http://51.222.241.160:8001/api/users/artist_profile/${artist?.artist_head_shot}`}
                                                                            // width={'48px'} height={'48px'}
                                                                             width={'96px'}
                                                                            height={'96px'} borderRadius={'9999px'}
                                                                            mb={4} verticleAlign={'middle'}/>
                                                                        <Heading color={'#4D4C4C'} fontSize={'16px'}
                                                                                 textAlign={'center'} fontWeight="700"
                                                                                 lineHeight={'24px'}> {artist?.name}</Heading>
                                                                        <Text mb={4} lineHeight={'20px'}
                                                                              fontSize={'14px'} fontWeight={'400'}
                                                                              color={'#797979'}
                                                                              textAlign={'center'}>{`${artist?.artist_nationality},b. ${artist?.artist_year_of_birth}`}
                                                                        </Text>
                                                                        <Text mb={4} lineHeight={'20px'}
                                                                              fontSize={'14px'} fontWeight={'400'}
                                                                              color={'#797979'} textAlign={'center'}>
                                                                            <Icon width="21px" height="20px"
                                                                                  viewBox="0 0 21 20" fill="none"
                                                                                  xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M8.83342 16.4567V13.6667C8.83342 12.5975 9.66258 11.7567 10.8892 11.2767C10.0982 10.9825 9.26077 10.8323 8.41675 10.8334C6.84175 10.8334 5.38675 11.3475 4.21091 12.2167C4.5755 13.2478 5.18766 14.1736 5.99362 14.9129C6.79959 15.6522 7.77473 16.1823 8.83342 16.4567ZM16.2334 13.405C15.9042 12.9609 14.8084 12.5 13.4167 12.5C11.7451 12.5 10.5001 13.1642 10.5001 13.6667V16.6667C11.6566 16.6673 12.7934 16.3669 13.7987 15.7951C14.8039 15.2232 15.643 14.3995 16.2334 13.405ZM8.45842 9.58335C8.9557 9.58335 9.43261 9.38581 9.78424 9.03418C10.1359 8.68255 10.3334 8.20564 10.3334 7.70835C10.3334 7.21107 10.1359 6.73416 9.78424 6.38253C9.43261 6.0309 8.9557 5.83335 8.45842 5.83335C7.96113 5.83335 7.48422 6.0309 7.13259 6.38253C6.78096 6.73416 6.58342 7.21107 6.58342 7.70835C6.58342 8.20564 6.78096 8.68255 7.13259 9.03418C7.48422 9.38581 7.96113 9.58335 8.45842 9.58335ZM13.4167 10.4167C13.8588 10.4167 14.2827 10.2411 14.5953 9.92853C14.9078 9.61597 15.0834 9.19205 15.0834 8.75002C15.0834 8.30799 14.9078 7.88407 14.5953 7.57151C14.2827 7.25895 13.8588 7.08335 13.4167 7.08335C12.9747 7.08335 12.5508 7.25895 12.2382 7.57151C11.9257 7.88407 11.7501 8.30799 11.7501 8.75002C11.7501 9.19205 11.9257 9.61597 12.2382 9.92853C12.5508 10.2411 12.9747 10.4167 13.4167 10.4167ZM10.5001 18.3334C5.89758 18.3334 2.16675 14.6025 2.16675 10C2.16675 5.39752 5.89758 1.66669 10.5001 1.66669C15.1026 1.66669 18.8334 5.39752 18.8334 10C18.8334 14.6025 15.1026 18.3334 10.5001 18.3334Z"
                                                                                    fill="#797979"/>
                                                                            </Icon>
                                                                            {artist?.artist_artwork?.length} NFTs
                                                                        </Text>
                                                                        <Button mb={3}
                                                                                borderRadius={'0px'} minW={'170px'}
                                                                                width={'100%'}
                                                                                fontSize={'14px'}
                                                                                fontWeight={'500'}
                                                                                lineHeight={'20px'}
                                                                                bg={'transparent'}
                                                                                border={'1px solid #0C0B86'}
                                                                                color={'#0C0B86'}
                                                                                _hover={{bg:''}}

                                                                                onClick={() => {
                                                                            handleArtistProfile(artist)
                                                                        }}>View Profile</Button>
                                                                    </NFTCustomCard>
                                                        )
                                                    })
                                                        }
                                                    </Grid>
                                                    </>
                                                }

                                            </TabPanel>

                                            <TabPanel p={0} color={'#000'} h={'100%'} py={8}>

                                                <ArtistListing invited={invited}/>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                            </Box>
            </Box>
            <Modal
                onClose={onInviteArtistClose}
                isOpen={isInviteArtistOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton onClick={
                        () =>{
                            if (props?.location?.state?.invite)
       {
        navigate("gallery/Dashboard")
        
       }
       else if ( props?.location?.state?.invitee)
        {
            navigate(`/Artists`)
        }
                        }
                    }/>
                    <ModalBody >

                        {!invited &&(

<Box width={'90%'} m={'auto'} pt={'12.5rem'} mb={'auto'} display={'flex'} alignItems={'center'} flexDirection={'column'}>

<Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Invite your artist to DadaVault</Heading>
<Text fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>This is the first step to minting NFTs together on DadaVault.</Text>

<Box px={6} py={6}  bg={'#F7F7F7'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  >
    <Box maxW={'400px'} mx={'auto'}>
        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
            <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}
            >Name</FormLabel>
        </Box>
        <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
            <Input type="text" mb={1} color={'#4D4D4D'} placeholder={'Enter Name'}
                   name="name"
                   border={'1px solid #D2D2D2'}
                   borderRadius={'0px'}
                   id ="name"
                   bg={'#FFFFFF'}
                   value={formikProps.values.name}
                   onChange={formikProps.handleChange("name")}
                   onBlur={formikProps.handleBlur("name")}
                   error={
                     formikProps.errors.name && formikProps.touched.name
                       ? true
                       : false
                   }
            />
            {formikProps.errors.name && formikProps.touched.name && (
                <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                {formikProps.errors.name}
                </Alert>
            )}
        </Box>
        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
            <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}>Email Address</FormLabel>
        </Box>
        <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={8}>
            <Input type="email" mb={1} color={'#4D4D4D'} placeholder={'Enter Email'}
                   border={'1px solid #D2D2D2'}
                   name="email"
                   id ="email"
                   borderRadius={'0px'}
                   bg={'#FFFFFF'}
                   value={formikProps.values.email}
                   onChange={formikProps.handleChange("email")}
                   onBlur={formikProps.handleBlur("email")}
                   error={
                     formikProps.errors.email && formikProps.touched.email
                       ? true
                       : false
                   }
            />
            {formikProps.errors.email && formikProps.touched.email && (
                                                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                    {formikProps.errors.email}
                                                    </Alert>
        
                                                )}
        </Box>
    </Box>
</Box>

<Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" mx={'auto'} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}} gap={6}   mb='auto'   name="form-name">
    <Divider/>
    <Box display='flex' mb={'3'} flexWrap={'wrap'}>
        <Button
        onClick={formikProps.handleSubmit}
        mb={3} bg='#0C0B86' color='#fff'  ml={'auto'} borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
        rightIcon={<ArrowForwardIcon />}  >Send invite</Button>
    </Box>
</Grid>
</Box>
                        )}
                      {invited && (
                          <>

<Box px={6} py={6} pb={6}  bg={'#fff'}  gap={6} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}   m={'auto'}  >
<Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
 <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'} >You’ve invited {invitationName}</BioRymHeading>
 <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>You’ll be notified when {invitationName} accepts their invite.</Text>
 <Box display='flex' mb={'3'} flexWrap={'wrap'}>
     <Button mb={3} bg='#0C0B86' color='#fff' mx={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

             onClick={()=>{
        if (props?.location?.state?.invite)
        {
         navigate("gallery/Dashboard")
         
        }
        else if ( props?.location?.state?.invitee)
        {
            navigate(`/Artists`)
        }
         setInvited(false);onInviteArtistClose()}}
     >Close window</Button>
 </Box>
</Box>
                          </>
                      )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            </>
			   )}
			   </Formik>

    );
}

export default Artists;
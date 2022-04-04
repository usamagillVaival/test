import React,{useEffect, useState} from "react";
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Image,
    Divider,
    Text,
   
    Link,
    Stack,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    
    FormControl,
    
    InputGroup,
    
    Input,
    
    useColorModeValue as mode,
    
    FormLabel,
    
    InputRightElement,
    Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik"; 
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { FaApple, FaPlaneDeparture, FaPlaystation } from 'react-icons/fa';
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import { FaChevronRight } from "react-icons/fa";
import Dummy from '../../../assets/images/dummy2.png'
import {navigate} from "@reach/router";
import {IoIosLock, IoMdArrowForward} from "react-icons/io";
import server from "../../../apis/server";
import CryptoJS from 'crypto-js';
import { useToast,Spinner } from '@chakra-ui/react'
import { LoadingScreen } from "../../../components";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import * as yup from "yup";
  const storefrontUrl=process.env.REACT_APP_STOREFRONT
function GalleryProfile(props) {
    
    const toast=useToast()
    const { isOpen:isArtworkDeleteOpen, onOpen:onArtworkDeleteOpen, onClose:onArtworkDeleteClose } = useDisclosure()
    const { isOpen:isArtworkEditOpen, onOpen:onArtworkEditOpen, onClose:onArtworkEditClose } = useDisclosure()
    const {
        isOpen: isArtistApproveModal,
        onOpen: onOpenArtistApproveModal,
        onClose: onCloseArtistApproveModal,
    } = useDisclosure();

        const {
        isOpen: isListNftModal,
        onOpen: onOpenListNftModal,
        onClose: onCloseListNftModal,
    } = useDisclosure();
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes =User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
    const galleryId=userType?._id
    
    const userEmail=userType?.email
    
    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose: onInviteArtistClose } = useDisclosure();
    const [publishCheck,setPublishCheck]=useState(false)
    const [unPublishCheck,setUnPublishCheck]=useState(false)
    const [updated,setUpdated]=useState(false)
    const [profile,setProfile]=useState("")
    const [url, setURL] = useState("");
    const [loader,setLoader]=useState(true)
    const [coverArt,setCoverArt]=useState();
    const [profileAvailable,setProfileAvailable]=useState("")

    let validationSchema = yup.object({ 
        
        profile: yup.string().required('Required'),
        bio:yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        website:yup.string().required('Required')

       });  
    const handleChangeFile = event => {
        const fileUploaded = event.target.files[0];
        if(fileUploaded.type.includes("image")){
            
            setCoverArt(fileUploaded);
            setURL(URL.createObjectURL(event.target.files[0]))
        }else{
            
            setURL("");
            setCoverArt(undefined)
        }       

    };
    useEffect(() => {
       load()
       
         },[publishCheck,unPublishCheck,updated]);
         const [galleryData,setGalleryData]=useState([])
         
   async function load()
   {
    let bodyFormData = new FormData();
      bodyFormData.append('email',userEmail );
     
      bodyFormData.append('account_type',"gallery")
      bodyFormData.append('gallery_signup_step',3 );
      try  { 
       
          const {data} = await server.post(
              
              `user/createGalleryAccount`,
                bodyFormData 
                ,
              { 
                headers: { 
                  "Content-Type": 'multipart/form-data',
                },
              } 
            )
          
         
            if(data){
            
                setGalleryData(data)
                setLoader(false)
                setProfile(data?.gallery_profile
                    )
             
             
            }
           
        } catch (e) {
          
        }
   }
   async function handleGalleryProfileEdit(values,resetForm)
   {
       let bodyFormData = new FormData();
        if(values?.email)
       bodyFormData.append('email',values?.email );
      if(profileAvailable=="available" && profile)
      bodyFormData.append('gallery_profile',profile );
      if(values?.bio)
      bodyFormData.append('gallery_bio',values?.bio );
      if(values?.vat)
      bodyFormData.append('gallery_vat_registration',values?.vat );
      if(values?.website)
      bodyFormData.append('gallery_website',values?.website );
      if(coverArt!=undefined)
      bodyFormData.append('file', coverArt);
     
      bodyFormData.append('account_type',"gallery")
      bodyFormData.append('gallery_signup_step',3 );
      setLoader(true)
      try  {    
       
          const {data} = await server.post(
              
              `user/createGalleryAccount`,
                bodyFormData 
                ,
              { 
                headers: { 
                  "Content-Type": 'multipart/form-data',
                },
              } 
            )
          
          //    alert(JSON.stringify(data))
            if(data){
                setLoader(false)
                toast({
                    title: 'Success',
                    description: `Profile updated successfully`,
                    status: 'success',
                    position:'top-right',
                    duration: 4000, variant:'top-accent',
                    isClosable: true,
                    
                  })
                  
                if(!updated)
                setUpdated(true)
                else
                setUpdated(false)
                onArtworkDeleteClose()
                const {data1} = await server.post(
                    "users/changeGalleryProfile",
                   {
                    'galleryId':galleryId,
                     'updatedGalleryProfile':profile
                   } ,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  
              
             
             
            }
           
        } catch (e) {
          
        }
   }
async function handlePublishStoreFront()
{
    let bodyFormData = new FormData();
    bodyFormData.append('account_type',"gallery")
    bodyFormData.append('gallery_published',true)
      bodyFormData.append('gallery_signup_step',3 );
      bodyFormData.append('email',userEmail );
     setLoader(true)

    
      try  { 
       
          const {data} = await server.post(
              
              `user/createGalleryAccount`,
                bodyFormData 
                ,
              { 
                headers: { 
                  "Content-Type": 'multipart/form-data',
                },
              } 
            )
          
          //    alert(JSON.stringify(data))
            if(data){
                
            
              setPublishCheck(true)
              setUnPublishCheck(false)
              toast({
                title: 'Success',
                description: `Gallery storeFront published successfully`,
                status: 'success',
                position:'top-right',
                duration: 4000, variant:'top-accent',
                isClosable: true,
                
              })
              setLoader(false)
              userType.gallery_published=true
              let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
               localStorage.setItem('User', JSON.stringify(userObj));
             
            }
           
        } catch (e) {
            toast({
                title: 'Success',
                description: `${e}`,
                status: 'success',
                position:'top-right',
                duration: 4000, variant:'top-accent',
                isClosable: true,
                
              })
              
          
        }
}
async function handleUnpublishStoreFront()
{
    let bodyFormData = new FormData();
    bodyFormData.append('account_type',"gallery")
    bodyFormData.append('gallery_published',false)
      bodyFormData.append('gallery_signup_step',3 );
      bodyFormData.append('email',userEmail );
      setLoader(true)

    
      try  { 
       
          const {data} = await server.post(
              
              `user/createGalleryAccount`,
                bodyFormData 
                ,
              { 
                headers: { 
                  "Content-Type": 'multipart/form-data',
                },
              } 
            )
          
          //    alert(JSON.stringify(data))
            if(data){
                
              setUnPublishCheck(true)
              setPublishCheck(false)
              toast({
                title: 'Success',
                description: `Gallery StoreFront UnPublished Successfully`,
                status: 'success',
                position:'top-right',
                duration: 4000, variant:'top-accent',
                isClosable: true,
               
              })
              userType.gallery_published=false
              let userObj = CryptoJS.AES.encrypt(JSON.stringify(userType), 'userObject').toString();
               localStorage.setItem('User', JSON.stringify(userObj));
             setLoader(false)
             
            }
           
        } catch (e) {
            toast({
                title: 'Success',
                description: `${e}`,
                status: 'success',
                position:'top-right',
                duration: 4000, variant:'top-accent',
                isClosable: true,
                
              })
        }
}
 const handleChangee=async (event ) =>
 {

    const value=event.target.value

    
        setProfile(value)
        // alert(event.target.value)
     const {data} = await server.post(
              
         `users/galleryProfileAvailability`,
         {
            gallery_profile:value
          },
           
           { 
            headers: {
              "Content-Type": "application/json",
         },
          } 
       )
       if(data)
       {
          
          setProfileAvailable(data.message)
          


       }
 } 
if (loader)
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
    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'} py={15} px={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} >
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} mb={'48px'} flexWrap={'wrap'} >
                        <Box mr={'auto'} my={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" cursor={'pointer'} >
                                Profile </Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center">
                                <Button bg='#0F0EA7' borderRadius={'0px'} color='#fff' _hover={{color: "#fff"}} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={()=>{
                                    navigate("/NFTs")
                                }}>
                                    + List NFT
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Heading color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} lineHeight={'20px'} pb={12} borderBottom={'1px solid #BCBCBC'} width={'100%'} >{galleryData.name}'s public profile</Heading>
                </Box>
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                   <Flex flexWrap={'wrap'} >
                       <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Storefront 
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               Your complementary NFT storefront
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>

                           <Grid p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>

                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                       Storefront status
                                   </Text>
                                   {!galleryData?.gallery_published?
                                   <Text color={'#797979'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                       Unpublished
                                   </Text>
                                   :
                                   <Text color={'#797979'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                       Published
                                   </Text>
}
                               </Box>
                               <Box>
                                   {!galleryData?.gallery_published?
                                   <Button  color={'#fff'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='#0F0EA7' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                            marginLeft='auto' marginRight={'1rem'} width={'100%'}
                                   onClick={handlePublishStoreFront}
                                   >Publish storefront
                                   </Button>
                                   :
                                   <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent'  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'}
                                            onClick={()=>{onOpenArtistApproveModal(); handleUnpublishStoreFront();}}
                                   // onClick={handleUnpublishStoreFront}
                                   >
                                       Unpublish storefront
                                   </Button>
}
                               </Box>
                           </Grid>
                       </Box>
                   </Flex>
                    <Divider border={'1px solid'} borderColor={'#BCBCBC'}/>
                    <Flex flexWrap={'wrap'} >
                        <Box  width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                                Gallery profile
                            </Text>

                            <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                            Your profile accessible by all visitors to your storefront
                            </Text>
                        </Box>
                        <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>

                            <Box p={0}  width={'100%'} >
                                {/*<Flex mb={'2rem'}  width={'100%'} gap={6} flexWrap={'wrap'} >*/}
                                    <Grid p={0} mb={'2rem'} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>

                                    <Box   width={{base:'100%',sm:'100%',md:'100%'}}>
                                        <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                            Gallery name
                                        </Text>
                                        <Text color={'#797979'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                        {galleryData?.name}
                                        </Text>
                                    </Box>
                                    <Box width={{base:'100%',sm:'100%',md:'100%'}}>
                                        <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={()=>{
                                            onArtworkDeleteOpen();
                                            setProfile(galleryData?.gallery_profile)
                                        }
                                        } >
                                            Edit profile
                                        </Button>
                                    </Box>
                                    </Grid>
                                {/*</Flex>*/}
                            </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                        DadaVault profile
                                    </Text>
                                    {galleryData?.gallery_published?
                                    <Link href={'/GalleryStoreFront/'+ galleryData?.gallery_profile} isExternal color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>

                                       {storefrontUrl}/{galleryData?.gallery_profile}  <ExternalLinkIcon mx='2px' />
                                   </Link>
                                   :
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                          {storefrontUrl}/{galleryData?.gallery_profile}
                                   </Text>
                                    }
                                </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                        Gallery email
                                    </Text>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                    {galleryData?.email}
                                    </Text>
                                </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                        Gallery website
                                    </Text>
                                    <Link href={`https://${galleryData?.gallery_website}/`} isExternal color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                        {galleryData?.gallery_website}
                                    </Link>
                                </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                        Gallery bio
                                    </Text>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                       {galleryData?.gallery_bio}
                                    </Text>
                                </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} mb={2}>
                                    VAT registration number
                                    </Text>
                                    <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} lineHeight={'20px'}  mb={2} >
                                       {galleryData?.gallery_vat_registration}
                                    </Text>
                                </Box>

                        </Box>
                    </Flex>


                </Box>
            </Box>

            <Modal closeOnOverlayClick={false}
                onClose={onArtworkDeleteClose}
                isOpen={isArtworkDeleteOpen}

            >
                <ModalOverlay />
                <ModalContent minW={'fit-content'}>
                    <ModalCloseButton 
                    onClick={()=>{
                        setCoverArt(undefined);
                        setURL("")
                   }}/>
                    <ModalBody p={0}>
                    <Formik
            initialValues={{ 
                profile:galleryData?.gallery_profile,
                email:galleryData?.email,
                website:galleryData?.gallery_website,
                bio:galleryData?.gallery_bio,
                vat:galleryData?.gallery_vat_registration
             }}
             validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleGalleryProfileEdit(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
                        <Box className="Box-card" p='2rem' maxW="3xl" mx="auto" bg='#fff' borderRadius='0.5rem' width={'100%'} minW={{base: "98%", sm:"98%", md: "98%", lg: "784px" ,xl:'784px'}}>
                            <FormControl >
                                <Box>
                                    <FormLabel color='#636262' fontWeight='500' >Gallery Logo</FormLabel>
                                    <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                        <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>
                                        
                                                <Box width={'70px'} height={'70px'} borderRadius={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                                {!galleryData?.gallery_logo &&    url==""?
                                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_96:20422)">
                                                            <rect width="64" height="64" rx="32" fill="#EDF2F7"/>
                                                            <path d="M64 55.9842V64.0028H0V56.0135C3.72253 51.0387 8.55442 47.0011 14.1114 44.2216C19.6685 41.4422 25.7973 39.9976 32.0107 40.0028C45.088 40.0028 56.704 46.2802 64 55.9842ZM42.672 24.0002C42.672 26.8291 41.5482 29.5422 39.5478 31.5426C37.5474 33.543 34.8343 34.6668 32.0053 34.6668C29.1764 34.6668 26.4632 33.543 24.4629 31.5426C22.4625 29.5422 21.3387 26.8291 21.3387 24.0002C21.3387 21.1712 22.4625 18.4581 24.4629 16.4577C26.4632 14.4573 29.1764 13.3335 32.0053 13.3335C34.8343 13.3335 37.5474 14.4573 39.5478 16.4577C41.5482 18.4581 42.672 21.1712 42.672 24.0002Z" fill="#A0AEC0"/>
                                                            <path opacity="0.14" d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z" fill="#171923"/>
                                                            <path d="M41.219 27.3817C40.6981 26.8709 40.0698 26.6155 39.3337 26.6155H37.0003L36.4691 25.2261C36.3371 24.8925 36.0959 24.6047 35.7451 24.3628C35.3943 24.121 35.035 24 34.6669 24H29.3334C28.9653 24 28.6059 24.121 28.2552 24.3628C27.9045 24.6047 27.6632 24.8925 27.5313 25.2261L27 26.6155H24.6667C23.9304 26.6155 23.3021 26.8709 22.7812 27.3817C22.2604 27.8925 22 28.5088 22 29.2308V38.3846C22 39.1066 22.2604 39.723 22.7812 40.2337C23.3021 40.7445 23.9305 41 24.6667 41H39.3334C40.0696 41 40.6978 40.7445 41.2188 40.2337C41.7395 39.723 42 39.1066 42 38.3846V29.2308C42.0001 28.5088 41.7397 27.8925 41.219 27.3817ZM35.2969 37.0412C34.3838 37.9369 33.2849 38.3848 32.0001 38.3848C30.7152 38.3848 29.6164 37.9369 28.7032 37.0412C27.7899 36.1457 27.3334 35.0678 27.3334 33.808C27.3334 32.5478 27.79 31.4701 28.7032 30.5745C29.6163 29.6788 30.7153 29.231 32.0001 29.231C33.2849 29.231 34.3838 29.6789 35.2969 30.5745C36.2102 31.47 36.6668 32.5478 36.6668 33.808C36.6668 35.0678 36.2102 36.1456 35.2969 37.0412Z" fill="white"/>
                                                            <path d="M31.9991 30.8672C31.1727 30.8672 30.4661 31.155 29.8793 31.7306C29.2924 32.3061 28.999 32.999 28.999 33.8097C28.999 34.6201 29.2924 35.3131 29.8793 35.8886C30.4661 36.4641 31.1727 36.7518 31.9991 36.7518C32.8255 36.7518 33.5321 36.4641 34.119 35.8886C34.7058 35.3131 34.9993 34.6201 34.9993 33.8097C34.9993 32.999 34.7058 32.3061 34.119 31.7306C33.5322 31.155 32.8255 30.8672 31.9991 30.8672Z" fill="white"/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_96:20422">
                                                                <rect width="64" height="64" rx="32" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    :
                                                    <Box  display='flex'  alignItems='start' justifyContent='start' >
    <Box display='flex'  alignItems='center' justifyContent='center' width={'64px'} height={'64px'} position={'relative'}  borderRadius={'50px'} border={'1px solid #c4c4c4'}>
        <Image  src= {url?url:`http://51.222.241.160:8001/api/users/artist_profile/${galleryData?.gallery_logo}`} objectFit={'cover'} maxH={'100%'} width={'100%'} borderRadius={'50px'} height={'100%'} />
        <Icon position={'absolute'} left={'21px'} top={'21px'} zIndex={2} width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49996 2.5H12.5L14.1666 4.16667H17.5C17.721 4.16667 17.9329 4.25446 18.0892 4.41074C18.2455 4.56702 18.3333 4.77899 18.3333 5V16.6667C18.3333 16.8877 18.2455 17.0996 18.0892 17.2559C17.9329 17.4122 17.721 17.5 17.5 17.5H2.49996C2.27895 17.5 2.06698 17.4122 1.9107 17.2559C1.75442 17.0996 1.66663 16.8877 1.66663 16.6667V5C1.66663 4.77899 1.75442 4.56702 1.9107 4.41074C2.06698 4.25446 2.27895 4.16667 2.49996 4.16667H5.83329L7.49996 2.5ZM9.99996 15.8333C11.326 15.8333 12.5978 15.3065 13.5355 14.3689C14.4732 13.4312 15 12.1594 15 10.8333C15 9.50725 14.4732 8.23548 13.5355 7.2978C12.5978 6.36012 11.326 5.83333 9.99996 5.83333C8.67388 5.83333 7.40211 6.36012 6.46443 7.2978C5.52674 8.23548 4.99996 9.50725 4.99996 10.8333C4.99996 12.1594 5.52674 13.4312 6.46443 14.3689C7.40211 15.3065 8.67388 15.8333 9.99996 15.8333ZM9.99996 14.1667C9.1159 14.1667 8.26806 13.8155 7.64294 13.1904C7.01782 12.5652 6.66663 11.7174 6.66663 10.8333C6.66663 9.94928 7.01782 9.10143 7.64294 8.47631C8.26806 7.85119 9.1159 7.5 9.99996 7.5C10.884 7.5 11.7319 7.85119 12.357 8.47631C12.9821 9.10143 13.3333 9.94928 13.3333 10.8333C13.3333 11.7174 12.9821 12.5652 12.357 13.1904C11.7319 13.8155 10.884 14.1667 9.99996 14.1667Z" fill="white"/>
        </Icon>

    </Box>
</Box>                                                
}
                                                </Box>


                                               
                                            <Input type="file" onChange={handleChangeFile} display={'none'} borderRadius={'50px'} width={'50px'}  visibility={'hidden'}/>



                                        </FormLabel>
                                        <Text color={'#797979'} fontWeight={'400'} pl={'1rem'}>  Change your gallery logo</Text>
                                    </Box>
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <FormLabel color='#636262' fontWeight='500' >Gallery Name</FormLabel>
                                    <InputGroup size="md" minH={'2rem'}  mb={'0.5rem'}>
                                        <Input color={'#636262'}
                                               borderRadius={'0'}
                                               borderColor={'#D2D2D2'}
                                               pr="4.5rem"
                                               name="password"
                                               id ="password"
                                               bg={'#fff'}
                                              value={galleryData?.name}
                                              isDisabled

                                        />

                                        <InputRightElement width="4.5rem">
                                            <Button _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} bg='transparent' h="1.75rem" size="sm" >
                                                <IoIosLock fontSize={'14px'} color={'#B3B3B3'}/>
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>

                                    <Text color='#8F8F8F' fontWeight={'400'} align={'left'} fontSize={'14px'}>Contact DadaVault if you need to change this.</Text>
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <FormLabel color='#636262' fontWeight='500' >DadaVault Profile</FormLabel>
                                    <InputGroup size="md" mb={3}  border='1px solid #D2D2D2'>
                                        <Input
                                            color={'#636262'}
                                            width={'50%'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            bg={'#E6E6E6'}
                                            value={'https://www.dadavault.com/'}
                                            isDisabled={true}
                                        />
                                        <Input
                                            color={'#636262'}
                                            width={'50%'}
                                            type="text"
                                            bg={'#fff'}
                                            borderRadius={'0'}
                                            border={'none'}
                                            name="profile"
                                            id ="profile"
                                            value={profile}
                                            onChange={handleChangee}
                                            // onBlur={formikProps.handleBlur("profile")}
                                            // error={
                                            //   formikProps.errors.profile && formikProps.touched.profile
                                            //     ? true
                                            //     : false
                                            // }
                                                                 />
                                                                  {/* <div>
                                    {formikProps.errors.profile && formikProps.touched.profile && (
                                         <Alert status='error'>
                                         <AlertIcon />
                                         {formikProps.errors.profile}
                                       </Alert>
                          
                                   )}
                          
                          
                                  </div> */}
                                            
                                                
 
                                    </InputGroup>
                                    {(profileAvailable=="available" && profile!="")?
                                    <Text color={'#008A27'} fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>That name is  {profileAvailable}</Text>
                                    :
                                    (profileAvailable=="notavailable" && profile!="")?
                                    <Text color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineHeight={'20px'}>That name is  not available </Text>
:null
                                }
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <Text color='#636262' fontWeight='500' >Gallery Email</Text>
                                    <Input
                                        color={'#636262'}

                                        type="gallery_email"
                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        name="gallery_email"
                                        id ="gallery_email"
                                        value={formikProps.values.email}
                  onChange={formikProps.handleChange("email")}
                  onBlur={formikProps.handleBlur("email")}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  }
                  isDisabled
                                       />
                                        <div>
          {formikProps.errors.email && formikProps.touched.email && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.email}
             </Alert>

         )}


        </div>

                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <Text color='#636262' fontWeight='500' >Gallery Website</Text>
                                    <Input
                                        type="email"
                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        color={'#636262'}
                                        name="website"
                                        id ="website"
                                        value={formikProps.values.website}
                  onChange={formikProps.handleChange("website")}
                  onBlur={formikProps.handleBlur("website")}
                  error={
                    formikProps.errors.website && formikProps.touched.website
                      ? true
                      : false
                  }
                                        />
                                         <div>
          {formikProps.errors.website && formikProps.touched.website && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.website}
             </Alert>

         )}


        </div>

                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                    <Text color='#636262' fontWeight='500' >Gallery Bio</Text>
                                    <Textarea
                                        type="email"

                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        color={'#636262'}
                                        name="bio"
                                        id ="bio"
                                        value={formikProps.values.bio}
                  onChange={formikProps.handleChange("bio")}
                  onBlur={formikProps.handleBlur("bio")}
                  error={
                    formikProps.errors.bio && formikProps.touched.bio
                      ? true
                      : false
                  }
                                       />
 <div>
          {formikProps.errors.bio && formikProps.touched.bio && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.bio}
             </Alert>

         )}


        </div>
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <FormLabel color='#636262' fontWeight='500' >VAT Registration Number</FormLabel>
                                    <Input
                                        type="email"

                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        placeholder={'optional'}
                                        name="vat"
                                        id ="vat"

                                        color={'#636262'}
                                        value={formikProps.values.vat}
                  onChange={formikProps.handleChange("vat")}
                  onBlur={formikProps.handleBlur("vat")}
                  error={
                    formikProps.errors.vat && formikProps.touched.vat
                      ? true
                      : false
                  }
                                    />
                                </Box>

                            </FormControl>
                            <Divider borderColor='#BCBCBC' opacity={'1'}/>

                            <Box display='flex' mt={6} mb={'3'} flexWrap={'wrap'}>
                                <Button mb={3}  textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} onClick={
                                   
                                       ()=>{
                                           onArtworkDeleteClose()
                                            setCoverArt(undefined);
                                            setURL("")
                                       }}
                                    
                                >Cancel</Button>
                                <Button mb={3} bg='#0F0EA7' color='#fff'  borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        marginLeft={{base:'0rem', sm:"1rem" ,md:'1rem'}}  onClick={formikProps.handleSubmit}>Save</Button>
                            </Box>
                        </Box>
                        </>
               )}
               </Formik>

 
                    </ModalBody>
                </ModalContent>
            </Modal>


        </>

    );
}
export default GalleryProfile;

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
import { useToast } from '@chakra-ui/react'
import * as yup from "yup";
import { Formik } from "formik"; 

import {IoIosLock, } from "react-icons/io";
import server from "../../apis/server";
import CryptoJS from 'crypto-js';
import { LoadingScreen } from "../../components";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Spinner
  } from '@chakra-ui/react'

function ArtistProfile() {
    
    const toast =useToast()
    const { isOpen:isArtworkDeleteOpen, onOpen:onArtworkDeleteOpen, onClose:onArtworkDeleteClose } = useDisclosure()
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes =User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
    const userID=userType?._id
    const userEmail=userType?.email
    const [artistDataa,setArtistDataa]=useState([])
    const [loader,setLoader]=useState(true)
    const [updateCheck,setUpdateCheck]=useState(false)
    const [url, setURL] = useState("");
    const [coverArt,setCoverArt]=useState();
    const { isOpen: isInviteArtistOpen , onOpen: onInviteArtistOpen, onClose: onInviteArtistClose } = useDisclosure();
    let validationSchema = yup.object({ 
        
        nationality: yup.string().required('Required'),
        bio:yup.string().required('Required'),
        birth:yup.string().required('Required')
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
         },[updateCheck]);
   async function load()
   {
    
       const obj={
           userId:userID
       }
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), 'dvault@123').toString();
    const {data}=await server.post(
        'user/getArtistProfileById',
        
        {
            payload:ciphertext
        },
        { 
            headers: { 
                "Content-Type": "application/json",
            },
          } 
    )
    if (data)
    {
     setArtistDataa(data)
     setLoader(false)
    }
   }
async function handleArtistProfileEdit(values,resetForm)
{
    
    let bodyFormData = new FormData();
    if(values?.nationality)
    bodyFormData.append('nationality', values?.nationality);
    if(values?.birth)
    bodyFormData.append('yearOfBirth', values?.birth);
    if(values?.bio)
    bodyFormData.append('biography', values?.bio);
    if(values?.website)
    bodyFormData.append('website', values?.website);
    if(values?.profile)
    bodyFormData.append('artsyProfile', values?.profile);
    if(values?.twitter)
    bodyFormData.append('twitter', values?.twitter);
    if(values?.instragram)
    bodyFormData.append('instagram', values?.instragram);
    if(coverArt!=undefined)
      bodyFormData.append('file', coverArt);
    bodyFormData.append('signupStep',3 );
    bodyFormData.append('email',userEmail)
    try{
        setLoader(true)
    const {data} = await server.post(
                
        'user/createArtistAccount',
          bodyFormData 
          ,
        { 
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        } 
      )
      if(data)
      {
        updateCheck?setUpdateCheck(false):setUpdateCheck(true)
        onArtworkDeleteClose()
          setLoader(false)
          toast({
            title: 'Success',
            description: `Profile updated successfully`,
            status: 'success',
            position:'top-right',
            duration: 4000, variant:'top-accent',
            isClosable: true,
            
          })
      }
    }
    catch(e)
    {
        setLoader(false)
        toast({
            title: 'Fail',
            description: `${e}`,
            status: 'error',
            position:'top-right',
            duration: 4000,
            isClosable: true, variant:'top-accent',
            
          })
    }
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
    
        /></Box>
    )
}

    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box  display={'flex'} flexDirection={'column'}  marginBottom={'2rem'}  alignItems={'start'}  p={{base: '2', sm:'4', md: '6', lg: '6' }} minH={'136'} >
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} >
                        <Box mr={'auto'} mt={'6px'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px" cursor={'pointer'} >
                                Profile </Heading>
                        </Box>

                    </Flex>
                    <Heading mt={'54px'} color={'#4D4C4C'} fontWeight={'800'} fontSize={'20px'} lineHeight={'20px'} pb={12} borderBottom={'1px solid #BCBCBC'} width={'100%'} >{artistDataa?.name}’s public profile</Heading>
                </Box>
                <Box px={{base: '2', sm:'4', md: '6', lg: '6' }} bg={'#fff'}>
                    <Flex flexWrap={'wrap'}>
                        <Box width={{base:'100%',sm:'100%',md:'35%'}} p={{base:2,sm:2,md:8}}  mb={2}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} >
                                Actions
                            </Text>


                        </Box>
                        <Box width={{base:'100%',sm:'100%',md:'65%'}}  p={{base:2,sm:2,md:8}} mb={2}>
                            <Grid p={0} templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}>
                                        <Button  color={'#201F1F'} textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} width={'100%'} onClick={onArtworkDeleteOpen} >

                                            <Icon width="17px" mr={2} height="16px" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2803_16241)">
                                                    <path d="M7.79732 2.73926H3.15879C2.8073 2.73926 2.47021 2.87889 2.22167 3.12743C1.97312 3.37597 1.8335 3.71306 1.8335 4.06455V13.3416C1.8335 13.6931 1.97312 14.0302 2.22167 14.2787C2.47021 14.5273 2.8073 14.6669 3.15879 14.6669H12.4358C12.7873 14.6669 13.1244 14.5273 13.373 14.2787C13.6215 14.0302 13.7611 13.6931 13.7611 13.3416V8.70308" stroke="#201F1F" stroke-width="2" stroke-linecap="round"/>
                                                    <path d="M12.7669 1.74521C13.0305 1.48159 13.388 1.3335 13.7608 1.3335C14.1337 1.3335 14.4912 1.48159 14.7548 1.74521C15.0184 2.00883 15.1665 2.36637 15.1665 2.73918C15.1665 3.11199 15.0184 3.46954 14.7548 3.73315L8.45967 10.0283L5.80908 10.6909L6.47173 8.04036L12.7669 1.74521Z" stroke="#201F1F" stroke-width="2" stroke-linecap="round"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2803_16241">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
                                                    </clipPath>
                                                </defs>
                                            </Icon>
                                                <Text>Edit </Text>
                                        </Button>


                            </Grid>
                        </Box>
                    </Flex>
                    <Divider border={'1px solid'} borderColor={'#BCBCBC'}/>
                    <Flex flexWrap={'wrap'}>
                        <Box width={{base:'100%',sm:'100%',md:'35%'}}  p={{base:2,sm:2,md:8}}>
                            <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                                Artist profile
                            </Text>
                            <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                                Your profile accessible by all visitors to your storefront
                            </Text>
                        </Box>
                        <Box width={{base:'100%',sm:'100%',md:'65%'}}  p={{base:2,sm:2,md:8}}>

                            <Box p={0}  width={'100%'} >
                                <Flex mb={'2rem'}  width={'100%'} >
                                   <Box>
                                       <Text color={'#4D4C4C'} fontSize={'16px'} fontWeight={'600'} lineHeight={'24px'} mb={3}>Headshot</Text>
                                       <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${artistDataa?.artist_head_shot}`} width={'64px'} height={'64px'} objerctFit={'cover'} borderRadius={'99999px'}/>
                                   </Box>
                                </Flex>
                            </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Artist
                                    </Text>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.name ?artistDataa?.name:"Unspecified name"}
                                    </Text>
                                </Box>
                            <Box display={'flex'}  flexWrap={'wrap'}>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Ethnicity / Nationality
                                    </Text>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_nationality?artistDataa?.artist_nationality:"unspecified Nationality"}
                                    </Text>
                                </Box>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Birth Year
                                    </Text>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_year_of_birth ?artistDataa?.artist_year_of_birth:"Unspecified birthyear"}
                                    </Text>
                                </Box>
                            </Box>
                                <Box width={'100%'} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Artist Bio
                                    </Text>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'}  mb={2} >
                                        {artistDataa?.artist_biography?artistDataa?.artist_biography:"Unspecified Bio"}
                                    </Text>
                                </Box>
                            <Box display={'flex'} flexWrap={'wrap'}>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Personal Website
                                    </Text>
                                    {artistDataa?.artist_website?
                                    <Link color={'#0F0EA7'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_website}
                                    </Link>:
                                    <Text>Unspecified Website</Text>
}
                                </Box>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Artsy Profile
                                    </Text>
                                    {artistDataa?.artist_artsy_profile?
                                    <Link color={'#0F0EA7'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_artsy_profile} 
                                    </Link>
                                    :
                                    <Text>Unspecified artsy Profile</Text>
}
                                </Box>

                            </Box>
                            <Box display={'flex'} flexWrap={'wrap'}>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Twitter
                                    </Text>
                                    {artistDataa?.artist_twitter?
                                    <Link color={'#0F0EA7'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_twitter}
                                    </Link>
                                    :
                                    <Text>Unspecified Twitter Account</Text>
}
                                </Box>
                                <Box width={{base:'100%',md:'50%'}} mb={'2rem'}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Instragram
                                    </Text>
                                    {artistDataa?.artist_instagram?
                                    <Link color={'#0F0EA7'} fontSize={'16px'} fontWeight={'400'} lineHeight={'24px'} mb={2}>
                                        {artistDataa?.artist_instagram}
                                    </Link>
                                    :
                                    <Text>Unspecified Instragram Account</Text>
}
                                </Box>

                            </Box>
                        </Box>
                    </Flex>


                </Box>
            </Box>

            <Modal closeOnOverlayClick={false}
                onClose={onArtworkDeleteClose}
                useInert={true}
                isOpen={isArtworkDeleteOpen}

            >
                <ModalOverlay />
                <ModalContent minW={'fit-content'}>
                    <ModalCloseButton onClick={()=>{
                         setCoverArt(undefined);
                         setURL("")
                    }} />
                    <ModalBody p={0}>
                    <Formik
            initialValues={{ 
                 profile:artistDataa?.artist_artsy_profile?artistDataa?.artist_artsy_profile:"",
                 bio:artistDataa?.artist_biography?artistDataa?.artist_biography:"",
                 twitter:artistDataa?.artist_twitter?artistDataa?.artist_twitter:"",
                 instragram:artistDataa?.artist_instagram?artistDataa?.artist_instagram:"",
                 website:artistDataa?.artist_website?artistDataa?.artist_website:"",
                 birth:artistDataa?.artist_year_of_birth?artistDataa?.artist_year_of_birth:"",
                 nationality:artistDataa?.artist_nationality?artistDataa?.artist_nationality:"",
                 name:artistDataa?.name?artistDataa?.name:''

             }}
             validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleArtistProfileEdit(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
                        <Box className="Box-card" p='2rem' maxW="3xl" mx="auto" bg='#fff' borderRadius='0.5rem' width={'100%'} minW={{base: "98%", sm:"98%", md: "98%", lg: "784px" ,xl:'784px'}}>
                            <FormControl >
                                <Box>
                                    <FormLabel color='#636262' fontWeight='600' fontSize={'16px'} lineHeight={'24px'} >Headshot</FormLabel>
                                    <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                        <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>

                                                <Box width={'70px'} height={'70px'} borderRadius={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                                    {(!artistDataa?.artist_head_shot && url=="")?
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
        <Image  src= {url?url:`http://51.222.241.160:8001/api/users/artist_profile/${artistDataa?.artist_head_shot}`} objectFit={'cover'} maxH={'100%'} width={'100%'} borderRadius={'50px'} height={'100%'} />
        <Icon position={'absolute'} left={'21px'} top={'21px'} zIndex={2} width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49996 2.5H12.5L14.1666 4.16667H17.5C17.721 4.16667 17.9329 4.25446 18.0892 4.41074C18.2455 4.56702 18.3333 4.77899 18.3333 5V16.6667C18.3333 16.8877 18.2455 17.0996 18.0892 17.2559C17.9329 17.4122 17.721 17.5 17.5 17.5H2.49996C2.27895 17.5 2.06698 17.4122 1.9107 17.2559C1.75442 17.0996 1.66663 16.8877 1.66663 16.6667V5C1.66663 4.77899 1.75442 4.56702 1.9107 4.41074C2.06698 4.25446 2.27895 4.16667 2.49996 4.16667H5.83329L7.49996 2.5ZM9.99996 15.8333C11.326 15.8333 12.5978 15.3065 13.5355 14.3689C14.4732 13.4312 15 12.1594 15 10.8333C15 9.50725 14.4732 8.23548 13.5355 7.2978C12.5978 6.36012 11.326 5.83333 9.99996 5.83333C8.67388 5.83333 7.40211 6.36012 6.46443 7.2978C5.52674 8.23548 4.99996 9.50725 4.99996 10.8333C4.99996 12.1594 5.52674 13.4312 6.46443 14.3689C7.40211 15.3065 8.67388 15.8333 9.99996 15.8333ZM9.99996 14.1667C9.1159 14.1667 8.26806 13.8155 7.64294 13.1904C7.01782 12.5652 6.66663 11.7174 6.66663 10.8333C6.66663 9.94928 7.01782 9.10143 7.64294 8.47631C8.26806 7.85119 9.1159 7.5 9.99996 7.5C10.884 7.5 11.7319 7.85119 12.357 8.47631C12.9821 9.10143 13.3333 9.94928 13.3333 10.8333C13.3333 11.7174 12.9821 12.5652 12.357 13.1904C11.7319 13.8155 10.884 14.1667 9.99996 14.1667Z" fill="white"/>
        </Icon>

    </Box>
</Box>
}
                                                </Box>

                                                {/*<Box  display='flex'  alignItems='start' justifyContent='start' mb={'2rem'}>*/}
                                                {/*    <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'} width={'80px'} height={'80px'}  borderRadius={'50px'} border={'1px solid #c4c4c4'}>*/}
                                                {/*        /!*<Image width={'51px'} src= {}/>*!/*/}
                                                {/*    </Box>*/}
                                                {/*</Box>*/}

                                            <Input type="file" onChange={handleChangeFile} display={'none'} borderRadius={'50px'} width={'50px'}  visibility={'hidden'}/>



                                        </FormLabel>
                                        <Text color={'#797979'} fontWeight={'400'} pl={'1rem'}>Change your headshot</Text>
                                    </Box>
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'50%' , xl:'50%'}}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>
                                        Artist Name
                                    </Text>
                                    <InputGroup size="md" minH={'2rem'}  mb={'0.5rem'}>
                                        <Input color={'#636262'}
                                               borderRadius={'0'}
                                               borderColor={'#D2D2D2'}
                                               pr="4.5rem"
                                               name="password"
                                               id ="password"
                                               bg={'#fff'}
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

                                        <InputRightElement width="4.5rem">
                                            <Button _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} bg='transparent' h="1.75rem" size="sm" >
                                                <IoIosLock fontSize={'14px'} color={'#B3B3B3'}/>
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>

                                    <Text color='#8F8F8F' fontWeight={'400'} align={'left'} fontSize={'14px'}>Contact DadaVault if you need to change this.</Text>
                                </Box>
                                <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6} >
                                    <Box mb={'2rem'} >
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Ethnicity / Nationality</Text>
                                        <Input
                                            color={'#636262'}

                                            type="text"
                                            bg={'#fff'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            name="nationality"
                                            id ="nationality"
                                            value={formikProps.values.nationality}
                                            onChange={formikProps.handleChange("nationality")}
                                            onBlur={formikProps.handleBlur("nationality")}
                                            error={
                                              formikProps.errors.nationality && formikProps.touched.nationality
                                                ? true
                                                : false
                                            }

                                        />
                                        <div>
          {formikProps.errors.nationality && formikProps.touched.nationality && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.nationality}
             </Alert>

         )}


        </div>

                                    </Box>
                                    <Box mb={'2rem'}>
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Birth Year</Text>
                                        <Input
                                            type="text"
                                            bg={'#fff'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            color={'#636262'}
                                            name="birth"
                                            id ="birth"
                                            value={formikProps.values.birth}
                                            onChange={formikProps.handleChange("birth")}
                                            onBlur={formikProps.handleBlur("birth")}
                                            error={
                                              formikProps.errors.birth && formikProps.touched.birth
                                                ? true
                                                : false
                                            }
                                        />
                                        <div>
          {formikProps.errors.birth && formikProps.touched.birth && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.birth}
             </Alert>

         )}


        </div>

                                    </Box>

                                </Grid>

                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                    <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Artist bio</Text>
                                    <Textarea
                                        type="text"

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

                                <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6} >
                                    <Box mb={'2rem'} >
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Personal Website</Text>
                                        <InputGroup size="md" mb={3}  border='none!important'>
                                            <Input
                                                color={'#636262'}
                                                width={'80px'}
                                                borderRadius={'0'}
                                                bg={'#E6E6E6'}
                                                value={'https://'}
                                                isDisabled={true}
                                                _disabled={{opacity:'1'}}
                                                px={'12px'}
                                                maxWidth={'fit-content'}
                                                border='1px solid #D2D2D2!important'
                                                borderRight={'none!important'}
                                                
                                            />
                                            <Input
                                                color={'#636262'}
                                                type="text"
                                                bg={'#fff'}
                                                borderRadius={'0'}
                                                border='1px solid #D2D2D2!important'
                                                name="profile"
                                                id ="profile"
                                                width={'calc(100% - 80px )'}
                                                value={formikProps.values.website}
                                                onChange={formikProps.handleChange("website")}
                                                onBlur={formikProps.handleBlur("website")}
                                                error={
                                                  formikProps.errors.website && formikProps.touched.website
                                                    ? true
                                                    : false
                                                }
                                            />

                                        </InputGroup>
                                        <Text color={'#8F8F8F'} fontSize={'14px'}  lineHeight={'20px'} fontWeight={'400'}>Optional</Text>
                                    </Box>
                                    <Box mb={'2rem'}>
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Artsy Profile</Text>
                                        <InputGroup size="md" mb={3}  border='none'>
                                            <Input
                                                px={'12px'}
                                                color={'#636262'}
                                                width={'50%'}
                                                borderRadius={'0'}
                                                border='1px solid #D2D2D2!important'
                                                borderRight={'none!important'}
                                                bg={'#E6E6E6'}
                                                value={'https://www.artsy.net/artist/'}
                                                isDisabled={true}
                                                _disabled={{opacity:'1'}}
                                            />
                                            <Input
                                                color={'#636262'}
                                                width={'50%'}
                                                type="text"
                                                bg={'#fff'}
                                                borderRadius={'0'}

                                                name="profile"
                                                border='1px solid #D2D2D2!important'

                                                id ="profile"
                                                value={formikProps.values.profile}
                                                onChange={formikProps.handleChange("profile")}
                                                onBlur={formikProps.handleBlur("profile")}
                                                error={
                                                  formikProps.errors.profile && formikProps.touched.profile
                                                    ? true
                                                    : false
                                                }
                                            />
                                        </InputGroup>
                                        <Text color={'#8F8F8F'} fontSize={'14px'}  lineHeight={'20px'} fontWeight={'400'}>Optional</Text>
                                    </Box>
                                </Grid>
                                <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(2, 1fr)" , lg:"repeat(2, 1fr)" }} gap={6}  >
                                    <Box mb={'2rem'}>
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Twitter</Text>
                                        <InputGroup  mb={3} border={'none'} >
                                            <Input
                                                color={'#636262'}
                                                width={'40px'}
                                                borderRadius={'0'}
                                                borderColor={'#D2D2D2'}
                                                bg={'#E6E6E6'}
                                                value={'@'}
                                                isDisabled={true}
                                                _disabled={{opacity:'1'}}
                                                px={'12px'}
                                                maxWidth={'fit-content'}
                                                border='1px solid #D2D2D2'
                                                borderRight={'none'}
                                            />
                                            <Input
                                                border='1px solid #D2D2D2!important'
                                                color={'#636262'}
                                                type="text"
                                                bg={'#fff'}
                                                borderRadius={'0'}
                                                name="profile"
                                                id ="profile"
                                                width={'calc(100% - 40px )'}
                                                value={formikProps.values.twitter}
                                                onChange={formikProps.handleChange("twitter")}
                                                onBlur={formikProps.handleBlur("twitter")}
                                                error={
                                                  formikProps.errors.twitter && formikProps.touched.twitter
                                                    ? true
                                                    : false
                                                }
                                            />

                                        </InputGroup>
                                        <Text color={'#8F8F8F'} fontSize={'14px'}  lineHeight={'20px'} fontWeight={'400'}>Optional</Text>
                                    </Box>
                                    <Box mb={'2rem'} >
                                        <Text color={'#636262'} fontSize={'16px'} fontWeight={'500'} lineHeight={'24px'} mb={2}>Instagram</Text>
                                        <InputGroup size="md" mb={3}  border='none'>
                                            <Input
                                                border='1px solid #D2D2D2'
                                                borderRight={'none'}
                                                color={'#636262'}
                                                width={'40px'}
                                                borderRadius={'0'}
                                                borderColor={'#D2D2D2'}
                                                bg={'#E6E6E6'}
                                                value={'@'}
                                                isDisabled={true}
                                                _disabled={{opacity:'1'}}
                                                px={'12px'}
                                                maxWidth={'fit-content'}
                                            />
                                            <Input
                                                color={'#636262'}
                                                type="text"
                                                bg={'#fff'}
                                                borderRadius={'0'}
                                                border='1px solid #D2D2D2!important'
                                                name="profile"
                                                id ="profile"
                                                width={'calc(100% - 40px )'}
                                                value={formikProps.values.instragram}
                                                onChange={formikProps.handleChange("instragram")}
                                                onBlur={formikProps.handleBlur("instragram")}
                                                error={
                                                  formikProps.errors.instragram && formikProps.touched.instragram
                                                    ? true
                                                    : false
                                                }
                                            />
                                        </InputGroup>
                                        <Text color={'#8F8F8F'} fontSize={'14px'}  lineHeight={'20px'} fontWeight={'400'}>Optional</Text>
                                    </Box>
                                </Grid>
                            </FormControl>
                            <Divider borderColor='#BCBCBC' opacity={'1'}/>

                            <Box display='flex' mt={6} mb={'3'} flexWrap={'wrap'}>
                                <Button mb={3}  textAlign={'center'} border='1px solid #C4C4C4' borderRadius={'0px'} bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'}
                                onClick={
                                    async()=>{
                                       


                                         onArtworkDeleteClose()
                                        setCoverArt(undefined);
                         setURL("")
                                    }
                                }
                                >
                                    Cancel
                                </Button>
                                <Button mb={3} bg='#0C0B86' color='#fff' borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
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
export default ArtistProfile;

import React, {useState} from "react";
import {   useDispatch, useSelector} from 'react-redux'
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
    Checkbox,
    Textarea ,
    Alert,
    AlertIcon,
    Container, FormControl, InputRightElement,
    toast,useToast
} from "@chakra-ui/react";


import {ExternalLinkIcon, ChevronLeftIcon, SearchIcon} from '@chakra-ui/icons'
import { navigate } from "@reach/router";
import {BioRymHeading} from "../../assets/StyledComponent/styeledComponent";
import server from '../../apis/server'


import { Formik } from "formik"; 
import * as yup from "yup";
import { setGalleryProfileDetails } from "../../redux/action/tradingBot";
import {IoMdArrowForward , IoIosLock } from "react-icons/io";

function OnBoardingUserDetail(props) {
    const toast=useToast()
    const email=props?.location?.state?.value
    const name=props?.location?.state?.name
    const [url, setURL] = useState("");
    const [coverArt,setCoverArt]=useState();
    const [imageError,setImageError]=useState(false);

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {galleryProfileDetails}  =   state?.TradingBot
    const [galleryProfile,setGalleryProfile]=useState("")
    const [profileAvailable,setProfileAvailable]=useState("")
    let validationSchema = yup.object({  
        
        // gallery_email :yup.string().email().required('Email is Required'),
        // email: yup.string().email('Invalid email').required('Required'),
        website: yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ).required('Required'),
        bio: yup.string().required('Required'),
       });

    const handleContinue =async(values, resetForm) => {
        console.log(profileAvailable)
        console.log(galleryProfile)
        if (profileAvailable=="available" && galleryProfile)
        {
        console.log(coverArt)        
        if(coverArt!==undefined){
            console.log(coverArt)
            values.file = coverArt;
            if(profileAvailable=="available" && galleryProfile )
            values.gallery_profile=galleryProfile
            dispatch(setGalleryProfileDetails(values))
            navigate('/AddPaymentGateway', { state: { value: email }});
        }
        else{
            setImageError(true);
        }
    }
    else
    {
       
        toast({
            title: 'Gallery Profile',
            description: `Gallery Profile is not available`,
            status: 'Error',
            position:'top-right',
            duration: 4000, variant:'top-accent',
            isClosable: true,
            
          })
    }

    }

    const handleChangeFile = event => {
        const fileUploaded = event.target.files[0];
        if(fileUploaded.type.includes("image")){
            setImageError(false)
            setCoverArt(fileUploaded);
            setURL(URL.createObjectURL(event.target.files[0]))
        }else{
            setImageError(true);
            setURL("");
            setCoverArt(undefined)
        }       
      };
      async function handleprofilechange(event)
      {
        const value=event.target.value

    
        setGalleryProfile(value)
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
    return (
        <Formik
        enableReinitialize={true}
            initialValues={{ gallery_email:"", website:"", bio:""}}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                handleContinue(values, resetForm);
            }} 
            > 
		{(formikProps) => ( 
        <>
            <Box as='section' bg={'#F7F7F7'} className='Login'>
                <Flex overflowY={'scroll'} >
                    <Box as='section' mx={'auto'}  pb="12" px={{ md: '8' }} display={'flex'} flexDirection={'column'}  align='center' justifyContent='center'  direction="column"  minHeight='100vh'>
                        <Flex mx='auto' mt={'4rem'} mb={'6rem'}>
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
                        <Box mb={'2rem'} pb={0} >
                            <Heading color="#363535" fontSize='1.5rem' mb='0.5rem' lineHeight={'32px'}  fontWeight='700' >Create gallery profile</Heading>
                            <Text display={'flex'} alignItmes={'center'} justifyContent={'center'}  fontSize='16px' fontWeight={'400'} color={'#797979'} lineHeight={'24px'}>Add more details about your gallery so you can publish your complementary NFT storefront.</Text>
                        </Box>
                        <Box className="Box-card" p='2rem' maxW="3xl" mx="auto" bg='#fff' borderRadius='0px' width={'100%'} minW={{base: "98%", sm:"98%", md: "98%", lg: "784px" ,xl:'784px'}}>
                            <FormControl >
                                <Box>
                                
                                    <FormLabel color='#636262' fontWeight='500' >Gallery Logo</FormLabel>
                                    <Box display='flex'  alignItems='center' justifyContent='start' mb={8} flexDirection='column' >
                                    <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0} cursor={'pointer'} mr={"auto!important"} display='flex' alignItems={'center'}>
                                        {url===""?
                                            <Box width={'64px'} height={'64px'} borderRadius={'50px'} display={'flex'} alignItems={'center'}  position={'relative'} justifyContent={'center'}>
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 32C0 14.3269 14.3269 0 32 0V0C49.6731 0 64 14.3269 64 32V32C64 49.6731 49.6731 64 32 64V64C14.3269 64 0 49.6731 0 32V32Z" fill="#D2D2D2"/>
                                                    <path d="M32 36.5C39.575 36.5 45.7143 30.3447 45.7143 22.75C45.7143 15.1553 39.575 9 32 9C24.425 9 18.2857 15.1553 18.2857 22.75C18.2857 30.3447 24.425 36.5 32 36.5ZM41.6 39.9375H39.8107C37.4321 41.0332 34.7857 41.6562 32 41.6562C29.2143 41.6562 26.5786 41.0332 24.1893 39.9375H22.4C14.45 39.9375 8 46.4043 8 54.375V58.8438C8 61.6904 10.3036 64 13.1429 64H50.8571C53.6964 64 56 61.6904 56 58.8438V54.375C56 46.4043 49.55 39.9375 41.6 39.9375Z" fill="white"/>
                                                </svg>
                                                
                                            </Box>
                                            :
                                            <Box  display='flex'  alignItems='start' justifyContent='start' >
                                                <Box display='flex'  alignItems='center' justifyContent='center' width={'64px'} height={'64px'} position={'relative'}  borderRadius={'50px'} border={'1px solid #c4c4c4'}>
                                                    <Image  src= {url} objectFit={'cover'} maxH={'100%'} width={'100%'} borderRadius={'50px'} height={'100%'} />
                                                    <Icon position={'absolute'} left={'21px'} top={'21px'} zIndex={2} width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.49996 2.5H12.5L14.1666 4.16667H17.5C17.721 4.16667 17.9329 4.25446 18.0892 4.41074C18.2455 4.56702 18.3333 4.77899 18.3333 5V16.6667C18.3333 16.8877 18.2455 17.0996 18.0892 17.2559C17.9329 17.4122 17.721 17.5 17.5 17.5H2.49996C2.27895 17.5 2.06698 17.4122 1.9107 17.2559C1.75442 17.0996 1.66663 16.8877 1.66663 16.6667V5C1.66663 4.77899 1.75442 4.56702 1.9107 4.41074C2.06698 4.25446 2.27895 4.16667 2.49996 4.16667H5.83329L7.49996 2.5ZM9.99996 15.8333C11.326 15.8333 12.5978 15.3065 13.5355 14.3689C14.4732 13.4312 15 12.1594 15 10.8333C15 9.50725 14.4732 8.23548 13.5355 7.2978C12.5978 6.36012 11.326 5.83333 9.99996 5.83333C8.67388 5.83333 7.40211 6.36012 6.46443 7.2978C5.52674 8.23548 4.99996 9.50725 4.99996 10.8333C4.99996 12.1594 5.52674 13.4312 6.46443 14.3689C7.40211 15.3065 8.67388 15.8333 9.99996 15.8333ZM9.99996 14.1667C9.1159 14.1667 8.26806 13.8155 7.64294 13.1904C7.01782 12.5652 6.66663 11.7174 6.66663 10.8333C6.66663 9.94928 7.01782 9.10143 7.64294 8.47631C8.26806 7.85119 9.1159 7.5 9.99996 7.5C10.884 7.5 11.7319 7.85119 12.357 8.47631C12.9821 9.10143 13.3333 9.94928 13.3333 10.8333C13.3333 11.7174 12.9821 12.5652 12.357 13.1904C11.7319 13.8155 10.884 14.1667 9.99996 14.1667Z" fill="white"/>
                                                    </Icon>
                                                    
                                                </Box>
                                               
                                            </Box>                                                
                                            }
                                            
                                            <Input type="file" onChange={handleChangeFile} display={'none'} borderRadius={'50px'} width={'50px'}  visibility={'hidden'}/>
                                           
                                            <Text color={'#797979'} fontWeight={'400'} pl={'1rem'}>  Change your gallery logo</Text>

                                             
                                            
                                            </FormLabel>
                                            {imageError && (
                                                <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                Image Required
                                                </Alert>    
                                            )}
                                           
                                           
                                    </Box>
                                   
                                          
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'75%' , xl:'75%'}}>
                                    <Text color='#636262' fontWeight='500' textAlign={'left'} mb={2}>Gallery Name</Text>
                                    <InputGroup size="md"  minH={'2rem'} mb={'0.5rem'}>
                                        <Input color={'#636262'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            pr="4.5rem"
                                            name="password"
                                            id ="password"
                                            bg={'#fff'}
                                            value={name}
                                            disabled
                                        />
                                        <InputRightElement width="fit-content">
                                            <Button _focus={{ bg: "transparent", }} px={'15px'}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} bg='transparent' h="1.75rem" size="sm" >
                                                <IoIosLock fontSize={'18px'} color={'#B3B3B3'}/>
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>



                                    <Text color='#8F8F8F' fontWeight={'400'} align={'left'} fontSize={'14px'}>Contact DadaVault if you need to change this.</Text>
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'75%' , xl:'75%'}}>
                                    <Text color='#636262' fontWeight='500' textAlign={'left'} mb={2}>DadaVault Profile</Text>
                                    <InputGroup size="md" mb={3}  border='1px solid #D2D2D2'>
                                        <Input
                                            color={'#636262'}
                                            fontSize={'14px'}
                                            width={'50%'}
                                            borderRadius={'0'}
                                            borderColor={'#D2D2D2'}
                                            bg={'#E6E6E6'}
                                            value={'http://51.222.241.160:3000/Gallery'}
                                            isDisabled={true}
                                            _disabled={{color:'#636262',opacity:'1'}}
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
                                            value={galleryProfile}
                                            onChange={handleprofilechange}
                                            // onBlur={formikProps.handleBlur("profile")}
                                            // error={
                                            //     formikProps.errors.profile && formikProps.touched.profile
                                            //     ? true
                                            //     : false
                                            // }
                                            />


                                    </InputGroup>
                                    {(profileAvailable=="available" && galleryProfile!="")?
                                    <Text color={'#008A27'} fontWeight={'400'} fontSize={'14px'} textAlign={'left'} lineHeight={'20px'}>That name is  {profileAvailable}</Text>
                                    :
                                    (profileAvailable=="notavailable" && galleryProfile!="")?
                                    <Text color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} textAlign={'left'} lineHeight={'20px'}>That name is  not available </Text>
:null
                                }
                                    {/* {formikProps.errors.profile && formikProps.touched.profile && (
                                        <Alert status='error' mt={1}>
                                            <AlertIcon />
                                            {formikProps.errors.profile}
                                        </Alert>
                                    )} */}
                                    
                                   </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'75%' , xl:'75%'}}>
                                    <Text color='#636262' fontWeight='500' textAlign={'left'} mb={2}>Gallery Email</Text>
                                    <Input
                                        color={'#636262'}

                                        type="gallery_email"
                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        value={email}
                                        disabled
                                        // onChange={formikProps.handleChange("gallery_email")}
                                        // onBlur={formikProps.handleBlur("gallery_email")}
                                        // error={
                                        //     formikProps.errors.gallery_email && formikProps.touched.gallery_email
                                        //     ? true
                                        //     : false
                                        // }
                                        />
                                        {formikProps.errors.gallery_email && formikProps.touched.gallery_email && (
                                            <Alert status='error' mt={1} color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                            {formikProps.errors.gallery_email}
                                            </Alert>      
                                        )}
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'75%' , xl:'75%'}}>
                                    <Text color='#636262' fontWeight='500'  textAlign={'left'} mb={2}>Gallery Website</Text>
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
                                        }/>
                                        {formikProps.errors.website && formikProps.touched.website && (
                                            <Alert status='error' mt={1} color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                            {formikProps.errors.website}
                                            </Alert>      
                                        )}
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'100%' , xl:'100%'}}>
                                    <Text color='#636262' fontWeight='500' textAlign={'left'} mb={2}>Gallery Bio</Text>
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
                                        }/>
                                        {formikProps.errors.bio && formikProps.touched.bio && (
                                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} mt={1}>

                                            {formikProps.errors.bio}
                                            </Alert>      
                                        )}
                                </Box>
                                <Box mb={'2rem'} width={{base:'100%',sm:'100%' , md:'100%' , lg:'75%' , xl:'75%'}}>
                                    <Text color='#636262' fontWeight='500' textAlign={'left'} mb={2}>VAT Registration Number</Text>
                                    <Input
                                        type="email"
                                        bg={'#fff'}
                                        borderRadius={'0'}
                                        borderColor={'#D2D2D2'}
                                        placeholder={'optional'}
                                        name="vat"
                                        id ="vat"
                                        value={formikProps.values.vat}
                                        onChange={formikProps.handleChange("vat")}
                                        onBlur={formikProps.handleBlur("vat")}
                                        color={'#636262'}
                                    />
                                </Box>

                            </FormControl>
                            <Divider borderColor='#BCBCBC' opacity={'1'}/>
                            <Box display={'flex'} >
                                <Button onClick={formikProps.handleSubmit} ml={'auto'} rightIcon={<IoMdArrowForward />}  maxW={'121px'}  minW={'121px'} py='1.5rem' w='100%' mt='1rem' borderRadius={'0px'} bg='#0F0EA7' color='#fff' _focus={{ bg: "#0F0EA7", }}  _hover={{ bg: "#0F0EA7", }} _active={{ bg: "#0F0EA7", }}
                                > Continue  </Button>

                            </Box>
                        </Box>

                    </Box>
                </Flex>
            </Box>

        </>

        )}
        </Formik>

    );
}

export default OnBoardingUserDetail;

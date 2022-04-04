import React , {useState, useEffect} from "react";
import moment from "moment";
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
    Textarea,
    Radio,
    InputRightElement,
} from "@chakra-ui/react";
import { Formik } from "formik"; 
import * as yup from "yup";
import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    BioRymHeading,
    BioRymHeadingNew
} from '../../../assets/StyledComponent/styeledComponent';
import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import PreviewArtist from "./component/PreviewArtist";
import ArtistArtWorkCategory from "./component/AddArtistArtWork/ArtistArtWorkCategory";
import DragDropMedia from "./component/AddArtistArtWork/DragDropMedia";
import ArtistProfileView from "./component/AddArtistArtWork/ArtistProfileView";
import ArtDetail from "./component/AddArtistArtWork/ArtDetail";
import ArtDetailPreview from "./component/AddArtistArtWork/ArtDetailPreview";
// import ArtistArtWork from './component/AddArtistArtWork/ArtistArtWork'
import ArtistArtWork from "./ArtistArtWork";
import {Link as ReachLink} from "@reach/router";
import {   useDispatch, useSelector} from 'react-redux'
import server from '../../../apis/server'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { navigate } from '@reach/router';

import {setPreviewInfo, setPreview} from "../../../redux/action/tradingBot"
import { useToast } from '@chakra-ui/react'



import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
function AddNewArtist(props) {
    const toast = useToast()
    const [data, setData] = useState([]);
    const [artistName, setName] = useState("");
    const [image, setImage] = useState("");
    const [url, setURL] = useState("");



    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {preview}  =   state?.TradingBot
        useEffect(() => {
            load();
        },[]);

    const load = async() => {
        dispatch(setPreview(false))

        
        const artist_name = props.location.state.selectedArtist
        setName(artist_name)
        try  { 
            const {data} = await server.get(
                "users/artist_profile", {
                    params: {
                        userId: artist_name
                    }
                  },
                
                { 
                  headers: {
                    "Content-Type": "application/json",
                  },
                } 
              )
             
            //    alert(JSON.stringify(data))
              if(data){
                console.log(data)
                setData(data?.data);
                if(data?.data.artist_cover_art_filename===undefined){
                    setImage("")
                }else{
                    setImage(data?.data?.artist_cover_art_filename)
                }
                
                console.log(image)
              }
             
          } catch (e) {
            //   alert(e.message)
            //  setIsLoading(false)
            // console.log(e); 
            // handleSnackBar(e.message);
            // alert("you have entered wrong email or password");
          }

    }


    const [coverArt,setCoverArt]=useState();



    let validationSchema = yup.object({ 
        year: yup.string().required('Required').test(
            'Is positive?', 
            'Required', 
            (value) => value > 0
          ),
        description: yup.string().required('Required'),
        link: yup.string().required('Required'),
        country: yup.string().required('Required'),
        category: yup.string().required('Required'),
       });  
       const handleSave =async(values, resetForm) => {
        let bodyFormData = new FormData();
        bodyFormData.append('yearOfBirth', values?.year);
        bodyFormData.append('nationality', values?.country);
        bodyFormData.append('biography', values?.description);
        bodyFormData.append('networkCategory', values?.category);
        bodyFormData.append('links', values?.link);
        if(coverArt!==undefined){
            bodyFormData.append('file', coverArt);
        }
        

         try  { 
            const {data} = await server.put(
                `users/artist_profile/${props.location.state.selectedArtist}`, 
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
                console.log(data)
                toast({
                    title: 'Record Uptated',
                    description: ``,
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position:'top-right', variant:'top-accent',
                  })
                navigate("/Artists")
              }
             
          } catch (e) {
            
          }
        }

       const valid = current => {
        const thisYear = new Date().getFullYear();
        const year = current.year(); 
        return year >= 1800 && year <= thisYear;
    };

    function formatDate(momentDate) {        
        return moment(momentDate).format("YYYY");
    }
    

    // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  const handleChangeFile = event => {
    const fileUploaded = event.target.files[0];
    setCoverArt(fileUploaded);
    setURL(URL.createObjectURL(event.target.files[0]))
    // props.handleFile(fileUploaded);

    console.log(fileUploaded)
  };

  const handlePreview = (values) => {
    values.name = data?.name;
    values.url = url;
    values.image= image;
    values.cover = coverArt;
    values.artist_id = props.location.state.selectedArtist
    dispatch(setPreviewInfo(values))
    dispatch(setPreview(true))

    // navigate("/Artists/AddNewArtist/PreviewArtist")
    }

    return (
        <Formik
        enableReinitialize={true}
            initialValues={{  year:data?.artist_year_of_birth?data?.artist_year_of_birth:"",link:data?.artist_links?data?.artist_links:"", description:data?.artist_biography ? data?.artist_biography:"", country:data?.artist_nationality?data?.artist_nationality:"", category:data?.artist_network_category?data?.artist_network_category:""}}
            // validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                handleSave(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 

        <>
       
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box backgroundColor="#F2F2F2" display={'flex'} justifyContent={'center'} alignItems={'center'} py={15} px={12} minH={'136'}>
                    <Flex w={'100%'} display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="700" mb={{base:"1rem",md:'0'}} fontSize="30px">{data.name}</Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center">
                                <Button bg='#0048FF' color='#fff' _hover={{color: "#fff"}} fontWeight={'600'} fontSoze={'16px'}>
                                    <Icon width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3332 14.6665H0.666504V13.3332C0.666504 12.4491 1.01769 11.6013 1.64281 10.9761C2.26794 10.351 3.11578 9.99984 3.99984 9.99984H7.99984C8.88389 9.99984 9.73174 10.351 10.3569 10.9761C10.982 11.6013 11.3332 12.4491 11.3332 13.3332V14.6665ZM5.99984 8.6665C5.47455 8.6665 4.95441 8.56304 4.4691 8.36202C3.9838 8.161 3.54284 7.86637 3.17141 7.49493C2.79998 7.1235 2.50534 6.68254 2.30432 6.19724C2.1033 5.71194 1.99984 5.19179 1.99984 4.6665C1.99984 4.14122 2.1033 3.62107 2.30432 3.13577C2.50534 2.65047 2.79998 2.20951 3.17141 1.83808C3.54284 1.46664 3.9838 1.172 4.4691 0.970986C4.95441 0.769967 5.47455 0.666504 5.99984 0.666504C7.0607 0.666504 8.07812 1.08793 8.82826 1.83808C9.57841 2.58822 9.99984 3.60564 9.99984 4.6665C9.99984 5.72737 9.57841 6.74479 8.82826 7.49493C8.07812 8.24508 7.0607 8.6665 5.99984 8.6665Z" fill="white"/>
                                    </Icon>
                                    Invite Artist
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
                <Box h={'100%'}>
                    <Tabs>
                        <TabList  px={{base: '1', sm:'4', md: '6', lg: '12' }}  backgroundColor="#F2F2F2" >
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Overview</Tab>
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Artworks</Tab>
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Documents</Tab>
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>CV</Tab>
                        </TabList>
                        <TabPanels px={{base: '1', sm:'4', md: '6', lg: '12' }}  h={'100%'} mb={10}>
                            <TabPanel  m={5}  color={'#000'} h={'100%'} py={8}>

                                {
                                    preview ?
                                        <Flex flexDirection={'column'}>
                                            <PreviewArtist/>
                                        </Flex>
                                        :
                                        <Flex flexDirection={'column'}>
                                        <Box width={'33%%'} m={'auto'}>
                                            <BioRymHeading textAlign={'center'} >Enter artist information</BioRymHeading>
                                            <Text fontSize={'19px'} textAlign={'center'} mt={2} mb={10} fontWeight={'400'} color={'#1a1a1a'}>Provide infomation about artist that collectors will see.</Text>
                                            <Box>

                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Year of birth</FormLabel>
                                                </Box>
                                                <Datetime dateFormat="YYYY" timeFormat={false}  inputProps={ {placeholder: "Enter year"} }  isValidDate={valid}
                                                className={'date_time_picker'}
                                                name="year"
                                                id ="year"
                                                   value={formikProps.values.year}
                                                   onChange={(dateFromValue) => {formikProps.setFieldValue('year', formatDate(dateFromValue))}}
                                                     onBlur={formikProps.handleBlur("year")}
                                                    error={
                                                      formikProps.errors.year && formikProps.touched.year
                                                        ? true
                                                        : false
                                                    }
                                                />
                                                  <div>
                                                    {formikProps.errors.year && formikProps.touched.year && (
                                                        <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                        {formikProps.errors.year}
                                                        </Alert>
                                                            
                                                    )}
                                                    </div>

                                                <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                        
                                                </Box>
                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Nationality</FormLabel>
                                                </Box>
                                                <Box display='block'  alignItems='center' justifyContent='center' mb={3}>
                                                    <Select mb={2} color={'#718096'} placeholder="Select country"
                                                    name="country"
                                                    id ="country"
                                                    value={formikProps.values.country}
                                                    onChange={formikProps.handleChange("country")}
                                                     onBlur={formikProps.handleBlur("country")}
                                                    error={
                                                      formikProps.errors.country && formikProps.touched.country
                                                        ? true
                                                        : false
                                                    }>
                                                        <option>United Arab Emirates</option>
                                                        <option>Nigeria</option>
                                                    </Select>

                                                    {formikProps.errors.country && formikProps.touched.country && (
                                                        <Alert  status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
                                                        {formikProps.errors.country}
                                                        </Alert>
                                                            
                                                    )}
                                                </Box>
                                                
                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={'2rem'} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Cover art</FormLabel>
                                                </Box>
                                                {   url!==""?
                                                <Box onClick={handleClick}  display='flex'  alignItems='start' justifyContent='start' mb={'2rem'}>

                                                <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'}  maxH={'150px'} >
                                                <Image objectFit='contain' maxHeight="inherit" src={url} />
                                            </Box>
                                            </Box>:
                                                    image!=="" ?
                                                    <Box onClick={handleClick}  display='flex'  alignItems='start' justifyContent='start' mb={'2rem'}>

                                                    <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'}  maxH={'150px'} >
                                                    <Image objectFit='contain' maxHeight="inherit" src={`http://51.222.241.160:8001/api/users/artist_profile/${image}`} />
                                                </Box>
                                                </Box>  
                                                    :
                                                    <Box onClick={handleClick}  display='flex'  alignItems='start' justifyContent='start' mb={'2rem'}>
                                                    <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'} width={'80px'} height={'80px'}  borderRadius={'50px'} border={'1px solid #c4c4c4'}>
                                                        <Image width={'51px'} src= {"https://img.icons8.com/pastel-glyph/64/000000/upload--v1.png"}/>
                                                    </Box>
                                                </Box>
                                                }

                                               

                                                <input
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    onChange={handleChangeFile}
                                                    style={{display: 'none'}} 
                                                    
                                                    />

                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Biography</FormLabel>
                                                </Box>
                                                <Box display='block'  alignItems='start' justifyContent='center' mb={'2rem'}>
                                                    <Textarea mb={2} placeholder="Enter description" 
                                                    name="description"
                                                    id ="description"
                                                    value={formikProps.values.description}
                                                    onChange={formikProps.handleChange("description")}
                                                     onBlur={formikProps.handleBlur("description")}
                                                    error={
                                                      formikProps.errors.description && formikProps.touched.description
                                                        ? true
                                                        : false
                                                    }/>
                                                    {formikProps.errors.description && formikProps.touched.description && (
                                                        <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                        {formikProps.errors.description}
                                                        </Alert>
                                                            
                                                    )}
                                                </Box>
                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Categories of artwork</FormLabel>
                                                </Box>
                                                <Box display='block'  alignItems='center' justifyContent='center' mb={'2rem'}>
                                                    <Select mb={2} color={'#718096'} placeholder="Select category"
                                                    name="category"
                                                    id ="category"
                                                    value={formikProps.values.category}
                                                    onChange={formikProps.handleChange("category")}
                                                     onBlur={formikProps.handleBlur("category")}
                                                    error={
                                                      formikProps.errors.category && formikProps.touched.category
                                                        ? true
                                                        : false
                                                    }>
                                                        <option>Category 1</option>
                                                        <option>Category 2</option>
                                                    </Select>
                                                    {formikProps.errors.category && formikProps.touched.category && (
                                                        <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                        {formikProps.errors.category}
                                                        </Alert>
                                                            
                                                    )}
                                                </Box>

                                                <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                    <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Link</FormLabel>
                                                </Box>
                                                <Box display='block' alignItems='center' justifyContent='center' mb={6}>
                                                    <Input type="text" placeholder={'Enter Link'} 
                                                    name="link"
                                                    id ="link"
                                                           mb={2}
                                                           value={formikProps.values.link}
                                                    onChange={formikProps.handleChange("link")}
                                                     onBlur={formikProps.handleBlur("link")}
                                                    error={
                                                      formikProps.errors.year && formikProps.touched.link
                                                        ? true
                                                        : false
                                                    }/>
                                                    {formikProps.errors.link && formikProps.touched.link && (
                                                        <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                        {formikProps.errors.link}
                                                        </Alert> 
                                                    )} 
                                                </Box>

                                            </Box>


                                        </Box>
                                        <Divider/>
                                        <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                            <Box display='flex' mb={'3'} flexWrap={'wrap'} >
                                                <Button mb={2} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={{base:'1rem'}} onClick={formikProps.handleSubmit} >Save & exit</Button>
                                                <Button mb={2} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  rightIcon={<ExternalLinkIcon />}  onClick={() => handlePreview(formikProps.values)}  > Preview</Button>
                                                <Button mb={2} bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                        rightIcon={<ArrowForwardIcon />} marginLeft='1rem' >Continue</Button>
                                            </Box>
                                        </Grid>
                                    </Flex>
                                    }

                            </TabPanel>
                            <TabPanel display={'flex'} flexDirection={'column'} h={'100%'} >
                                <ArtistArtWork/>                                 
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

            </Box>

        </>
         )}
         </Formik>

    );
}

export default AddNewArtist;

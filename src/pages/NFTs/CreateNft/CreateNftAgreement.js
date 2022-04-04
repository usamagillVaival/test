import React from "react";
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
    RadioGroup, Radio, Container,
} from "@chakra-ui/react";
import {   useDispatch, useSelector} from 'react-redux'
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import {setMintSteps} from "../../../redux/action/tradingBot"
import { setArtistAggrement } from "../../../redux/action/tradingBot";
import { Formik } from "formik"; 
import * as yup from "yup";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
function CreateNftAgreement(props) {
    const state = useSelector(state => state);
    const {mintsteps,artistagreement,nftdetails,nftupload}  =   state?.TradingBot
    const {scope,time,rights,compensation,termination,aggreement}=artistagreement
    const {title,year,description,edition,price,tags}=nftdetails
    const {id,file}=nftupload

    const dispatch = useDispatch();
    let validationSchema = yup.object({ 
        scope: yup.string().required('Required'),
        time: yup.string().required('Required'),
        rights: yup.string().required('Required'),
        compensation: yup.string().required('Required'),
        termination:yup.string().required('Required'),
        aggreement: yup.string().required('Required'),

       }); 
    function handleNext(values,resetForm)
    {
        console.log(values)
        dispatch(setMintSteps(mintsteps+1))
        dispatch(setArtistAggrement(values))
    }
    function handleExit()
    {
        dispatch(setMintSteps(0))
    }



    return (
        <Formik
        initialValues={{  
           scope:scope?scope:'',
           time:time?time:'',
           rights:rights?rights:'',
           compensation:compensation?compensation:'',
           termination:termination?termination:'',
           aggreement:aggreement?aggreement:''
        }}
        // validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
        handleNext(values,resetForm)
        }} 
        > 
           {(formikProps) => ( 
        <>
            <Box display='flex' flexDirection='column' mb={6} >
                <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em"  mb={4} colorScheme="green">
                    Step 3
                </Badge>
                <BioRymHeading   textAlign={'center'} >Artist agreement</BioRymHeading>
                <Text mt={4} textAlign='center' fontSize='1rem' mb='1rem' fontWeight={'400'}  color='#1A1A1A'>
                    Prepare details for artist’s approval.
                </Text>
            </Box>

            <Flex   pt={'3rem'}  pb={'3rem'} m={'auto'} width={'100%'} flexWrap={'wrap'}>
                <Box width={{base:'100%' ,md:'30%',lg:'25%'}} pr={4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Box p={{base:10,md:6,lg:5,xl:10}} bg={'#C4C4C422'} >
                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${file}`} width={'100%'} maxh={'320px'} />
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}  pt={'3rem'}>
                            <Box>
                                <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >{title},    {year}, Ed. 1/1</Heading>
                            </Box>
                            <Box>
                                <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ {price}</Text>
                            </Box>

                        </Grid>



                    </Box>

                </Box>
               <Box  width={{base:'100%' ,md:'70%',lg:'75%'}} pl={4}>
                   <Box>
                       <Text mb={4} fontWeight={'500'} color={'#4D4D4D'} fontSize={'16px'}>This agreement, entered mm/dd/yyyy between Artist and Gallery</Text>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Scope of work</FormLabel>

                       </Box>
                       <Box display='flex'  flexDirection={'column'}  alignItems='start' justifyContent='center' mb={3}>
                           <Input type="text" mb={1} color={'#4D4D4D'} placeholder={'Describe works to be produced by artists'}
                            name="scope"
                            id ="scope"
                               value={formikProps.values.scope}
                                onChange={formikProps.handleChange("scope")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.scope && formikProps.touched.scope
                                    ? true
                                    : false
                                }
                           />
                            <Box w={'100%'}>
          {formikProps.errors.scope && formikProps.touched.scope && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.scope}
             </Alert>
                   
         )}


        </Box>
                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Time schedule</FormLabel>

                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                           <Input type="text" color={'#4D4D4D'} placeholder={'Set time for producing artwork'} />
                       </Box> <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Time schedule</FormLabel>

                       </Box>
                       <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={3}>
                           <Input type="text" color={'#4D4D4D'} mb={1} placeholder={'Set time for producing artwork'}
                            name="time"
                            id ="time"
                               value={formikProps.values.time}
                                onChange={formikProps.handleChange("time")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.time && formikProps.touched.time
                                    ? true
                                    : false
                                }
                           />
                            <Box w={'100%'}>
          {formikProps.errors.time && formikProps.touched.time && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.time}
             </Alert>
                   
         )}


        </Box>
                       </Box>
                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Rights</FormLabel>
                       </Box>
                       <Box display='flex'  flexDirection={'column'}   alignItems='center' justifyContent='center' mb={3}>
                           <Textarea color={'#4D4D4D'} mb={1} placeholder="Rights of artist - authorship credit Gallery will retain non-exclusive license"
                            name="rights"
                            id ="rights"
                               value={formikProps.values.rights}
                                onChange={formikProps.handleChange("rights")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.rights && formikProps.touched.rights
                                    ? true
                                    : false
                                }
                           />
                            <Box w={'100%'}>
          {formikProps.errors.rights && formikProps.touched.rights && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.rights}
             </Alert>
                   
         )}


        </Box>
                       </Box>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Compensation</FormLabel>
                       </Box>
                       <Box display='flex'  flexDirection={'column'}  alignItems='start' justifyContent='center' mb={3}>
                           <Input color={'#4D4D4D'} mb={1}  type="text" placeholder={'Gallery will pay artist ___%'}
                            name="compensation"
                            id ="compensation"
                               value={formikProps.values.compensation}
                                onChange={formikProps.handleChange("compensation")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.compensation && formikProps.touched.compensation
                                    ? true
                                    : false
                                } 
                            />
                             <Box w={'100%'}>
          {formikProps.errors.compensation && formikProps.touched.compensation && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.compensation}
             </Alert>
                   
         )}


        </Box>
                       </Box>

                       <Box display='flex'   alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700'  fontSize={'16px'} m={0}>Termination</FormLabel>
                       </Box>
                       <Box display='flex'  flexDirection={'column'}  alignItems='center' justifyContent='center' mb={'2rem'}>
                           <Input type="text" color={'#4D4D4D'} 
                            name="termination"
                                  mb={1}
                            id ="termination"
                               value={formikProps.values.termination}
                                onChange={formikProps.handleChange("termination")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.termination && formikProps.touched.termination
                                    ? true
                                    : false
                                }
                           />
                            <Box w={'100%'}>
          {formikProps.errors.termination && formikProps.touched.termination && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.termination}
             </Alert>
                   
         )}


        </Box>
                       </Box>

                       <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                           <FormLabel color='#4D4D4D' fontWeight='700' fontSize={'16px'} m={0}>Agreement</FormLabel>
                       </Box>
                       <Box display='flex'  flexDirection={'column'}   alignItems='center' justifyContent='center' mb={6}>
                           <Input type="text" color={'#4D4D4D'} mb={1}
                            name="aggreement"
                            id ="aggreement"
                               value={formikProps.values.aggreement}
                                onChange={formikProps.handleChange("aggreement")}
                              //   onBlur={formikProps.handleBlur("email")}
                                error={
                                  formikProps.errors.aggreement && formikProps.touched.aggreement
                                    ? true
                                    : false
                                }
                             />
                              <Box w={'100%'}>
          {formikProps.errors.aggreement && formikProps.touched.aggreement && (
               <Alert status='error' color={'#DD2922'} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} pl={0}>

               {formikProps.errors.aggreement}
             </Alert>
                   
         )}


        </Box>
                       </Box>

                   </Box>


               </Box>
            </Flex>
            <Divider/>
            <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                <Box display='flex' mb={'3'}>
                    <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                             marginLeft='auto' marginRight={'1rem'} onClick={handleExit}>Save & exit</Button>
                    <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                             rightIcon={<ExternalLinkIcon />} > Preview</Button>
                    <Button bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={formikProps.handleSubmit} >Continue</Button>
                </Box>
            </Grid>






        </>

)}
</Formik>
   );
}

export default CreateNftAgreement;

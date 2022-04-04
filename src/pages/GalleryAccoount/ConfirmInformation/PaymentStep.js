import React from 'react';
import {
    Heading,
    RadioGroup,
    UnorderedList,
    Stack,
    Icon,
    Spacer,
    FormLabel,
    FormControl ,
    RadioCard ,
    Box,
    Link,
    Radio,
    ListItem,
    Badge,
    ChakraProvider,
    Flex , Input , FormHelperText,Checkbox ,
    InputGroup ,InputRightElement ,  Button, Container , Grid, GridItem ,Text , Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Select,
    Image,
    InputLeftElement,
    TableCaption,} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { ArrowForwardIcon , ArrowBackIcon} from '@chakra-ui/icons';
import {DataTable} from '../../../components/index';
import Truspiolot from '../../../assets/images/trustPiolit.png';
import { createBreakpoints } from "@chakra-ui/theme-tools";
import {BioRymHeadingNew} from '../../../assets/StyledComponent/styeledComponent'
import { navigate } from '@reach/router';
import {   useDispatch, useSelector} from 'react-redux'
import {setSteps,setAccount,setPayment_Steps} from "../../../redux/action/tradingBot"
import { Formik } from "formik"; 
import * as yup from "yup";
const PaymentSteps=()=>{

  
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {steps,exchangeList,apiNames,selectedApi,payment,galleryInfo}  =   state?.TradingBot
    //const {PaymentSteps}  =   state?.TradingBot
    
    const [show, setShow] = React.useState(false);
    const [value, setValue] = React.useState("1")
    const handleClick = () => setShow(!show);
    const {
      gallery_name,
      gallery_email,
    } = galleryInfo;
    const {firstname,expiration,lastname,cardnumber,securitycode,AddressLane1,AddressLane2,city,zipcode}  = payment
    
    const cardIcon=<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3337 6.33333V14.6667C17.3337 14.8877 17.2459 15.0996 17.0896 15.2559C16.9333 15.4122 16.7213 15.5 16.5003 15.5H1.50033C1.27931 15.5 1.06735 15.4122 0.91107 15.2559C0.75479 15.0996 0.666992 14.8877 0.666992 14.6667V6.33333H17.3337ZM17.3337 4.66667H0.666992V1.33333C0.666992 1.11232 0.75479 0.900358 0.91107 0.744078C1.06735 0.587797 1.27931 0.5 1.50033 0.5H16.5003C16.7213 0.5 16.9333 0.587797 17.0896 0.744078C17.2459 0.900358 17.3337 1.11232 17.3337 1.33333V4.66667ZM11.5003 11.3333V13H14.8337V11.3333H11.5003Z" fill="#969696"/>
</svg>
;
    const breakpoints = createBreakpoints({
        sm: "30em",
        md: "48em",
        lg: "62em",
        xl: "80em",
        "2xl": "96em",
    })
    const yesterday = new Date(Date.now() -86400000);
    let validationSchema = yup.object({ 
        firstname:yup.string().required("Required"),
        lastname:yup.string("invalid email").required("Required"),
        cardnumber:yup.number("invalid format").required("Required"),
        securitycode:yup.string("invalid format").required("Required"),
        AddressLane1:yup.string("invalid format").required("Required"),
        AddressLane2:yup.string("invalid format").required("Required"),
        city:yup.string("invalid format").required("Required"),
        zipcode:yup.string("invalid format").required("Required"),
        
        expiration:yup.date("invalid").min(yesterday, "Date cannot be in the past").required("Required")
        
      });  
  function navigateNext(values,resetForm)
  {
  

    dispatch(setSteps(steps+1))
    dispatch(setPayment_Steps(values))
    //   navigate("/Review")

  }
  function navigateBack()
  {
    dispatch(setSteps(steps-1))

  }
    return(
        <Formik
        enableReinitialize={true} 
            initialValues={{ 
                firstname:firstname,
                lastname:lastname,
                cardnumber:cardnumber,
                expiration:expiration,
                securitycode:securitycode,
                AddressLane1:AddressLane1,
                AddressLane2:AddressLane2,
                city:city,
                zipcode:zipcode
            
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              navigateNext(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
            <Box bg='fff' py={'6rem'}>
                <Container maxW={'container.xl'} display='flex' >
                    <Box w={'100%'}>
                        <Box display='flex' flexDirection='column' >
                            <Badge bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" colorScheme="green">
                                Step 2
                            </Badge>
                            <BioRymHeadingNew textAlign='center' fontSize='1.9rem' mb='1rem'>
                                Enter payment information
                            </BioRymHeadingNew>
                            <Text textAlign='center' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                Your first month is free, lorem ipsum, learn more.
                            </Text>
                        </Box>
                        <Flex gap={2} flexWrap={'wrap'} >
                            <Box width={{base:'100%',md:'39%'}} mb={3} >
                                <Heading color={'#1A1A1A'} fontWeight={'bold'} fontSize={'1.5rem'}>Subscription Information</Heading>
                                <Text color={'#666666'} mt={3}>  All DadaVault subscriptions include:
                                </Text>
                                    <UnorderedList color={'#666666'} ml={'2em'} pb={'1em'}>
                                        <ListItem>Lorem ipsum </ListItem>
                                        <ListItem>Lorem ipsum </ListItem>
                                        <ListItem>Lorem ipsum </ListItem>
                                        <ListItem>Lorem ipsum </ListItem>
                                    </UnorderedList>

                                      <Text olor={'#666666'}> Questions ? Read FAQs or Contact us</Text>
                            </Box>
                            <Box width={{base:'100%',md:'60%'}}  mb={3}>
                                <Box overflowX={'scroll'}>
                                    <Table   border={'1px solid  #C4C4C4'}>
                                        <Thead>
                                            <Tr>
                                                <Th borderColor={'transparent'} color={'#333333'} fontSize={'16px'} fontweight={'600'} width={'38%'} textTransform={'captilization'}>Invoice</Th>
                                                <Th borderColor={'transparent'}></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr borderColor={'transparent'}>
                                                <Td color={'#333333'} borderColor={'transparent'} fontSize={'16px'}>Prepared for</Td>
                                                <Td fontWeight={'600'} borderColor={'transparent'}>{gallery_name}</Td>
                                            </Tr>
                                            <Tr  border={'none'}>
                                                <Td color={'#333333'} borderColor={'transparent'} fontSize={'16px'}>Email</Td>
                                                <Td fontWeight={'600'} borderColor={'transparent'}>{gallery_email}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td color={'#333333'} borderColor={'transparent'} fontSize={'16px'}>Total</Td>
                                                <Td fontWeight={'600'} borderColor={'transparent'}>$348 ($29/mo billed annually) - first month free</Td>
                                            </Tr>
                                            <Tr>
                                                <Td color={'#333333'} borderColor={'transparent'} fontSize={'16px'}>Starts</Td>
                                                <Td fontWeight={'600'} borderColor={'transparent'}>August 11, 2021</Td>
                                            </Tr>
                                        </Tbody>
                                        <Tfoot>
                                            <Tr>

                                            </Tr>
                                        </Tfoot>

                                    </Table>
                                </Box>
                            </Box>
                        </Flex>
                        <Flex mt={'2rem'} flexWrap={'wrap'}>
                            <Box width={{base:'100%',md:'40%'}} mb={3} >
                                <Heading color={'#1A1A1A'}  marginBottom={'1.5rem!important'} fontWeight={'bold'} fontSize={'1.5rem'}>Payment Information</Heading>
                                <Text color={'#666666'}  marginBottom={'3rem!important'} >Your payment information is securely transferred, various safety guarantees, lorem ipsum dolor sit atmet.</Text>
                                <Image  maxW={'140px'} src={Truspiolot}/>
                            </Box>
                            <Box padding={'1.5rem'} width={{base:'100%',md:'60%'}} mb={3} border={'1px solid #C4C4C4'} display={'flex'} flexDirection={'column'} >
                                <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(1, 1fr)" ,lg:"repeat(1, 1fr)",xl:"repeat(1, 1fr)", '2xl':"repeat(2, 1fr)"}}  gap={2}>
                                    <Box w="100%" mb={'1rem'} >
                                        <FormControl id="first-name" >
                                            <FormLabel>Cardholder’s First Name</FormLabel>
                                            <Input
                                              name="firstname"
                                              id ="firstname"
                                                 value={formikProps.values.firstname}
                                                  onChange={formikProps.handleChange("firstname")}
                                                  onBlur={formikProps.handleBlur("firstname")}
                                                  error={
                                                    formikProps.errors.firstname && formikProps.touched.firstname
                                                      ? true
                                                      : false
                                                  }
                                             placeholder="First name" />
                                        </FormControl>
                                        <div>
          {formikProps.errors.firstname && formikProps.touched.firstname && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.firstname}
                 </p>
         )}


        </div>
                                    </Box>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>Cardholder’s Last Name</FormLabel>
                                            <Input 
                                             name="lastname"
                                             id ="lastname"
                                                value={formikProps.values.lastname}
                                                 onChange={formikProps.handleChange("lastname")}
                                                 onBlur={formikProps.handleBlur("lastname")}
                                                 error={
                                                   formikProps.errors.lastname && formikProps.touched.lastname
                                                     ? true
                                                     : false
                                                 }
                                             placeholder="Last Name" />
                                        </FormControl>
                                        <div>
          {formikProps.errors.lastname && formikProps.touched.lastname && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.lastname}
                 </p>
         )}


        </div>
                                    </Box>
                                    <Box w="100%" mb={'1rem'} >
                                        <FormLabel>Card Number </FormLabel>

                                        <InputGroup>
                                            <InputRightElement children={cardIcon} />
                                            <Input
                                             name="cardnumber"
                                             id ="cardnumber"
                                                value={formikProps.values.cardnumber}
                                                 onChange={formikProps.handleChange("cardnumber")}
                                                 onBlur={formikProps.handleBlur("cardnumber")}
                                                 error={
                                                   formikProps.errors.cardnumber && formikProps.touched.cardnumber
                                                     ? true
                                                     : false
                                                 }
                                             type="tel" placeholder="•••• •••• •••• 1234" />
                                        </InputGroup>
                                        <div>
          {formikProps.errors.cardnumber && formikProps.touched.cardnumber && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.cardnumber}
                 </p>
         )}


        </div>
                                    </Box>
                                    <Box w="100%">
                                        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                            <Box>
                                                <FormControl id="first-name" >
                                                    <FormLabel>Expiration </FormLabel>
                                                    <Input
                                                  name="expiration"
                                                  id ="expiration"
                                                     value={formikProps.values.expiration}
                                                      onChange={formikProps.handleChange("expiration")}
                                                      onBlur={formikProps.handleBlur("expiration")}
                                                      error={
                                                        formikProps.errors.expiration && formikProps.touched.expiration
                                                          ? true
                                                          : false
                                                      }  
                                                      type={'date'} />
                                                </FormControl>
                                                <div>
          {formikProps.errors.expiration && formikProps.touched.expiration && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.expiration}
                 </p>
         )}


        </div>
                                            </Box>
                                            <Box>
                                                <FormControl id="first-name" >
                                                    <FormLabel>Security Code</FormLabel>
                                                    <Input
                                                    name="securitycode"
                                                    id ="securitycode"
                                                       value={formikProps.values.securitycode}
                                                        onChange={formikProps.handleChange("securitycode")}
                                                        onBlur={formikProps.handleBlur("securitycode")}
                                                        error={
                                                          formikProps.errors.securitycode && formikProps.touched.securitycode
                                                            ? true
                                                            : false
                                                        }
                                                      />
                                                </FormControl>
                                                <div>
          {formikProps.errors.securitycode && formikProps.touched.securitycode && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.securitycode}
                 </p>
         )}


        </div>
                                            </Box>

                                        </Grid>
                                    </Box>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>Billing Address Line 1</FormLabel>
                                            <Input
                                            name="AddressLane1"
                                            id ="AddressLane1"
                                               value={formikProps.values.AddressLane1}
                                                onChange={formikProps.handleChange("AddressLane1")}
                                                onBlur={formikProps.handleBlur("AddressLane1")}
                                                error={
                                                  formikProps.errors.AddressLane1 && formikProps.touched.AddressLane1
                                                    ? true
                                                    : false
                                                }
                                             />
                                        </FormControl>
                                        <div>
          {formikProps.errors.AddressLane1 && formikProps.touched.AddressLane1 && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.AddressLane1}
                 </p>
         )}


        </div>
                                    </Box>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>Billing Address Line 2</FormLabel>
                                            <Input
                                            name="AddressLane2"
                                            id ="AddressLane2"
                                               value={formikProps.values.AddressLane2}
                                                onChange={formikProps.handleChange("AddressLane2")}
                                                onBlur={formikProps.handleBlur("AddressLane2")}
                                                error={
                                                  formikProps.errors.AddressLane2 && formikProps.touched.AddressLane2
                                                    ? true
                                                    : false
                                                }
                                              />
                                        </FormControl>
                                        <div>
          {formikProps.errors.AddressLane2 && formikProps.touched.AddressLane2 && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.AddressLane2}
                 </p>
         )}


        </div>
                                    </Box>
                                </Grid>
                                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>City</FormLabel>
                                            <Input 
                                            name="city"
                                            id ="city"
                                               value={formikProps.values.city}
                                                onChange={formikProps.handleChange("city")}
                                                onBlur={formikProps.handleBlur("city")}
                                                error={
                                                  formikProps.errors.city && formikProps.touched.city
                                                    ? true
                                                    : false
                                                }
                                             />
                                        </FormControl>
                                        <div>
          {formikProps.errors.city && formikProps.touched.city && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.city}
                 </p>
         )}


        </div>
                                    </Box>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>State</FormLabel>
                                            <Select placeholder="Select State">
                                                <option>United Arab Emirates</option>
                                                <option>Nigeria</option>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box w="100%" mb={'1rem'}>
                                        <FormControl id="first-name" >
                                            <FormLabel>Zip code</FormLabel>
                                            <Input
                                            name="zipcode"
                                            id ="zipcode"
                                               value={formikProps.values.zipcode}
                                                onChange={formikProps.handleChange("zipcode")}
                                                onBlur={formikProps.handleBlur("zipcode")}
                                                error={
                                                  formikProps.errors.zipcode&& formikProps.touched.zipcode                                                  ? true
                                                    : false
                                                }
                                              />
                                        </FormControl>
                                        <div>
          {formikProps.errors.zipcode && formikProps.touched.zipcode && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.zipcode}
                 </p>
         )}


        </div>
                                    </Box>
                                </Grid>
                            </Box>
                        </Flex>
                        <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                            <Box display='flex' mb={'3'}>
                                <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  leftIcon={<ArrowBackIcon />} marginLeft='auto' onClick={navigateBack}>Back</Button>
                                <Button bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={formikProps.handleSubmit}>Preview</Button>
                            </Box>

                        </Grid>

                        <Box></Box>

                    </Box>
                </Container>

            </Box>

        </>
         )}
         
         </Formik>
    )
}
export default PaymentSteps;
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Heading,
  RadioGroup,
  Stack,
  Icon,
  Image,
  Spacer,
  FormLabel,
  FormControl,
  RadioCard,
  Box,
  Link,
  Radio,
  Badge,
  ChakraProvider,
  Flex,
  Input,
  FormHelperText,
  Checkbox,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { DataTable } from "../../../components/index";
import { BioRymHeadingNew } from "../../../assets/StyledComponent/styeledComponent";
import { PaymentInfoComponent } from "../../../components/index";
import { navigate } from "@reach/router";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setSteps, setAccount } from "../../../redux/action/tradingBot";
import server from "../../../apis/server";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'


const PaymentInfo = () => {
  const [show, setShow] = React.useState(false);
  const [first, setCheckedfirst] = React.useState(false);
  const [second, setCheckedSecond] = React.useState(false);

  const [value, setValue] = React.useState("1");
  const handleClick = () => setShow(!show);
  const [disabled, setDisabled] = React.useState(true);
  const [disableAccountInfo, setdisableAccountInfo] = React.useState(true);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { steps, galleryInfo, accountInfo } = state?.TradingBot;
  const {
    gallery_name,
    gallery_address,
    gallery_email,
    gallery_phoneNumber,
    gallery_website,
    role,
    auth
  } = galleryInfo;
  const { name, email, password } = accountInfo;

  function navigateBack() {
    dispatch(setSteps(steps - 1));
  }
  function editControl() {
    setDisabled(false);
  }
  function doneControl()
  {
    setDisabled(true)
  }
  function editAccountInfo() {
    setdisableAccountInfo(false);
  }
  function doneAccountInfo() {
    setdisableAccountInfo(true);
  }
  let validationSchema = yup.object({
    name: yup.string().required("Required"),
    email: yup.string().email('Invalid email').required('Required'),
    gallery_name:yup.string().required("Required"),
    gallery_address:yup.string().required("Required"),
    gallery_phoneNumber:yup.string().required("Required"),
    gallery_email:yup.string().email('Invalid email').required('Required'),
    gallery_website:yup.string().required("Required"),
    role:yup.string().required("Required"),
    auth:yup.string().required("Required"),
    terms:Yup.bool().oneOf([true], 'Please Accept Terms & Conditions.'),
    privacy:Yup.bool().oneOf([true], 'Please Accept Privacy Policy.')
  });
  const handleSignup = async (values, resetForm) => 
  {
    console.log(values)
    //if(first==false||second==false){
      //toast("Please agree to terms and policies")
    //}else{

    // console.log(values);
    let dataa = {
      password: password,
      name: values?.name,
      email: values?.email,
      account_type: "gallery",
      gallery_name: values.gallery_name,
      gallery_address: values.gallery_address,
      gallery_email: values.gallery_email,
      gallery_phoneNumber: values.gallery_phoneNumber,
      gallery_website: values.gallery_website,
    };
    try {
      const { data } = await server.post("user/createGalleryAccount", dataa, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (data) {
        localStorage.setItem('token', data.Token);
        navigate("gallery/Dashboard");

        //   alert(JSON.stringify(data))
        //   setUserDetail(data?.data)
        //   setIsLoading(false)
        // navigation.navigate("ChooseApp")
      } else {
        //   setIsLoading(false)
        // //  alert(data.message)
        // setShowSnack(true)
        // handleSnackBar(data.message);
      }
      //   alert(JSON.stringify(data))
    } catch (e) {
      alert(e.message);
      //  setIsLoading(false)
      // console.log(e);
      // handleSnackBar(e.message);
      // alert("you have entered wrong email or password");
    }

    // setLoading(true);
    // server
    //   .post("/signup", values, {
    // 	headers: {
    // 	  "Content-Type": "application/json",
    // 	},
    //   })
    //   .then((res) => {
    // 	resetForm({
    // 	  values: "",
    // 	});
    // 	navigation.navigate("Login");
    // 	setLoading(false);
    //   })
    //   .catch((e) => {
    // 	setLoading(false);
    // 	console.log(e);
    // 	alert("user with this email already exist try other!");
    //   });
  
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        gallery_name: gallery_name,
        gallery_address: gallery_address,
        gallery_website: gallery_website,
        gallery_phoneNumber: gallery_phoneNumber,
        gallery_email: gallery_email,
        name: name,
        email: email,
        role: role,
        auth: auth,
        terms:false,
        privacy:false
      }}
    
       validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        
          handleSignup(values, resetForm);

      }}
    >
      {(formikProps) => (
        <>
                  <ToastContainer />

          <Box bg="fff" py={"6rem"}>
            <Container maxW={"container.xl"} display="flex">
              <Box w={"100%"}>
                <Box display="flex" flexDirection="column">
                  <Badge
                    bg="#0048FF"
                    color="#fff"
                    m="auto"
                    fontSize="0.8em"
                    colorScheme="green"
                  >
                    Step 3
                  </Badge>
                  <BioRymHeadingNew
                    textAlign="center"
                    fontSize="1.9rem"
                    mb="1rem"
                  >
                    Review & Confirm
                  </BioRymHeadingNew>
                  <Text
                    textAlign="center"
                    fontSize="0.8rem"
                    mb="1rem"
                    color="#1A1A1A"
                  >
                    You can go back and change anything if you need to.
                  </Text>
                </Box>
                <Flex gap={2} flexWrap={"wrap"}>
                  <Box width={{ base: "100%", md: "39%" }}>
                    <Heading
                      color={"#1A1A1A"}
                      fontWeight={"bold"}
                      fontSize={"1.5rem"}
                    >
                      Gallery Information
                    </Heading>
                    <Text color={"#666666"}>
                      Please confirm this information about your
                      <br /> gallery, lorem ipsum dolor.
                    </Text>
                  </Box>
                  <Box width={{ base: "100%", md: "60%" }}>
                    <>
                      <Box overflowX={"scroll"}>
                        <Table
                          border={"1px solid #C4C4C4"}
                          borderCollapse={"separate"}
                          borderSpacing={"0"}
                          cellPadding={0}
                          cellPadding={0}
                          p={0}
                          borderRadius={"12px"}
                        >
                          <Thead borderBottom={"1px solid #C4C4C4"}>
                            <Tr>
                              <Th
                                fontSize={"1.12rem"}
                                color={"#1A1A1A"}
                                textTransform={"captilize"}
                                width={"38%"}
                              >
                                Gallery Information
                              </Th>
                              <Th textAlign={"right"}>
                                {disabled==true?
                                <Button
                                  mr="auto"
                                  fontSize="1rem"
                                  px="1rem"
                                  border="1px solid #C4C4C4"
                                  bg="transparent"
                                  color="#4D4D4D"

                                  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                                  leftIcon={
                                    <svg
                                      width="12"
                                      height="14"
                                      viewBox="0 0 12 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z"
                                        fill="#4D4D4D"
                                      />
                                    </svg>
                                  }
                                  marginLeft="auto"
                                  onClick={editControl}
                                >
                                  Edit
                                </Button> :
                                 <Button
                                 mr="auto"
                                 fontSize="1rem"
                                 px="1rem"
                                 border="1px solid #C4C4C4"
                                 bg="transparent"
                                 color="#4D4D4D"

                                 _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                                 leftIcon={
                                   <svg
                                     width="12"
                                     height="14"
                                     viewBox="0 0 12 14"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg"
                                   >
                                     <path
                                       d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z"
                                       fill="#4D4D4D"
                                     />
                                   </svg>
                                 }
                                 marginLeft="auto"
                                 onClick={doneControl}
                               >
                                 Done
                               </Button>
}
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr bg={"#F2F2F2"}>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Gallery Name
                              </Td>

                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                         S         border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  value={formikProps.values.gallery_name}
                                  onChange={formikProps.handleChange("gallery_name")}
                                  onBlur={formikProps.handleBlur("gallery_name")}
                                  error={
                                    formikProps.errors.gallery_name && formikProps.touched.gallery_name
                                      ? true
                                      : false
                                  }
                                  isDisabled={disabled}
                                />
                             
                             <div>
          {formikProps.errors.gallery_name  && formikProps.touched.gallery_name  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.gallery_name}
                  </Alert>
         )}


        </div>  
                              </Td>
                              
                            </Tr>
                            <Tr>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Address
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="gallery_address"
                                  id="gallery_address"
                                  value={formikProps.values.gallery_address}
                                  onChange={formikProps.handleChange(
                                    "gallery_address"
                                  )}
                                  onBlur={formikProps.handleBlur(
                                    "gallery_address"
                                  )}
                                  error={
                                    formikProps.errors.gallery_address &&
                                    formikProps.touched.gallery_address
                                      ? true
                                      : false
                                  }
                                  isDisabled={disabled}
                                />
                               <div>
          {formikProps.errors.gallery_address  && formikProps.touched.gallery_address  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.gallery_address}
                  </Alert>
         )}


        </div>
                              </Td>
                              
                            </Tr>
                            <Tr bg={"#F2F2F2"}>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Phone Number
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="gallery_phoneNumber"
                                  id="gallery_phoneNumber"
                                  value={formikProps.values.gallery_phoneNumber}
                                  onChange={formikProps.handleChange(
                                    "gallery_phoneNumber"
                                  )}
                                  onBlur={formikProps.handleBlur(
                                    "gallery_phoneNumber"
                                  )}
                                  error={
                                    formikProps.errors.gallery_phoneNumber &&
                                    formikProps.touched.gallery_phoneNumber
                                      ? true
                                      : false
                                  }
                                  isDisabled={disabled}
                                />
                                <div>
          {formikProps.errors.gallery_phoneNumber  && formikProps.touched.gallery_phoneNumber  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.gallery_phoneNumber}
                  </Alert>
         )}


        </div>
                              </Td>
                              
                            </Tr>
                            <Tr>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Email Address
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="gallery_email"
                                  id="gallery_email"
                                  value={formikProps.values.gallery_email}
                                  onChange={formikProps.handleChange(
                                    "gallery_email"
                                  )}
                                  onBlur={formikProps.handleBlur(
                                    "gallery_email"
                                  )}
                                  error={
                                    formikProps.errors.gallery_email &&
                                    formikProps.touched.gallery_email
                                      ? true
                                      : false
                                  }
                                  isDisabled={disabled}
                                />
                                <div>
          {formikProps.errors.gallery_email  && formikProps.touched.gallery_email  && (
                    <Alert status='error'  fontWeight={'400'} fontSize={'14px'} lineheight={'20px'} color={'#DD2922'} pl={0}>

                    {formikProps.errors.gallery_email}
                  </Alert>
         )}


        </div>
                              </Td>
                              
                            </Tr>
                            <Tr bg={"#F2F2F2"}>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Website
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="gallery_website"
                                  id="gallery_website"
                                  value={formikProps.values.gallery_website}
                                  onChange={formikProps.handleChange(
                                    "gallery_website"
                                  )}
                                  onBlur={formikProps.handleBlur(
                                    "gallery_website"
                                  )}
                                  error={
                                    formikProps.errors.gallery_website &&
                                    formikProps.touched.gallery_website
                                      ? true
                                      : false
                                  }
                                  isDisabled={disabled}
                                />
                                <div>
          {formikProps.errors.gallery_website  && formikProps.touched.gallery_website  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
                    {formikProps.errors.gallery_website}
                  </Alert>
         )}


        </div>
                              </Td>
                            </Tr>
                          </Tbody>
                          <Tfoot>
                            <Tr></Tr>
                          </Tfoot>
                        </Table>
                      </Box>
                    </>
                  </Box>
                </Flex>

                <Flex mt={"2rem"} flexWrap={"wrap"}>
                  <Box width={{ base: "100%", md: "40%" }}>
                    <Heading
                      color={"#1A1A1A"}
                      fontWeight={"bold"}
                      fontSize={"1.5rem"}
                    >
                      Account Owner’s Information
                    </Heading>
                    <Text color={"#666666"}>
                      Please confirm this information about the account owner,
                      lorem ipsum dolor.
                    </Text>
                  </Box>
                  <Box width={{ base: "100%", md: "60%" }}>
                    <>
                      <Box overflowX={"scroll"}>
                        <Table
                          border={"1px solid #C4C4C4"}
                          borderCollapse={"separate"}
                          borderSpacing={"0"}
                          cellPadding={0}
                          cellPadding={0}
                          p={0}
                          borderRadius={"12px"}
                        >
                          <Thead borderBottom={"1px solid #C4C4C4"}>
                            <Tr>
                              <Th
                                fontSize={"1.12rem"}
                                color={"#1A1A1A"}
                                textTransform={"captilize"}
                                width={"38%"}
                              >
                                Account Owner's Information
                              </Th>
                              <Th textAlign={"right"}>
                                {disableAccountInfo==true?
                                <Button
                                  mr="auto"
                                  fontSize="1rem"
                                  px="1rem"
                                  border="1px solid #C4C4C4"
                                  bg="transparent"
                                  color="#4D4D4D"

                                  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                                  leftIcon={
                                    <svg
                                      width="12"
                                      height="14"
                                      viewBox="0 0 12 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z"
                                        fill="#4D4D4D"
                                      />
                                    </svg>
                                  }
                                  marginLeft="auto"
                                  onClick={editAccountInfo}
                                >
                                  Edit
                                </Button>:
                                <Button
                                mr="auto"
                                fontSize="1rem"
                                px="1rem"
                                border="1px solid #C4C4C4"
                                bg="transparent"
                                color="#4D4D4D"

                                _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                                leftIcon={
                                  <svg
                                    width="12"
                                    height="14"
                                    viewBox="0 0 12 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z"
                                      fill="#4D4D4D"
                                    />
                                  </svg>
                                }
                                marginLeft="auto"
                                onClick={doneAccountInfo}
                              >
                                Done
                              </Button>
}  
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            <Tr bg={"#F2F2F2"}>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Full Name
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="name"
                                  id="name"
                                  value={formikProps.values.name}
                                  onChange={formikProps.handleChange("name")}
                                  onBlur={formikProps.handleBlur("name")}
                                  error={
                                    formikProps.errors.name &&
                                    formikProps.touched.name
                                      ? true
                                      : false
                                  }
                                  isDisabled={disableAccountInfo}
                                />
                                <div>
          {formikProps.errors.name  && formikProps.touched.name  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.name}
                  </Alert>
         )}


        </div>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Email Address
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="email"
                                  id="email"
                                  value={formikProps.values.email}
                                  onChange={formikProps.handleChange("email")}
                                  onBlur={formikProps.handleBlur("email")}
                                  error={
                                    formikProps.errors.email &&
                                    formikProps.touched.email
                                      ? true
                                      : false
                                  }
                                  isDisabled={disableAccountInfo}
                                />
                                <div>
          {formikProps.errors.email  && formikProps.touched.email  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.email}
                  </Alert>
         )}


        </div>
                              </Td>
                            </Tr>
                            <Tr bg={"#F2F2F2"}>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Role/Title
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="role"
                                  id="role"
                                  value={formikProps.values.role}
                                  onChange={formikProps.handleChange("role")}
                                  onBlur={formikProps.handleBlur("role")}
                                  error={
                                    formikProps.errors.role &&
                                    formikProps.touched.role
                                      ? true
                                      : false
                                  }
                                  isDisabled={disableAccountInfo}
                                />
                                <div>
          {formikProps.errors.role  && formikProps.touched.role  && (
                    <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                    {formikProps.errors.role}
                  </Alert>
         )}


        </div>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td color={"#333333"} fontSize={"16px"}>
                                Authorization
                              </Td>
                              <Td fontWeight={"600"}>
                                <Input
                                  placeholder="Enter"
                                  type="text"
                                  width={"100%"}
                                  border="none"
                                  bg={"transparent"}
                                  _focus={{ border: "none" }}
                                  name="auth"
                                  id="auth"
                                  value={formikProps.values.auth}
                                  onChange={formikProps.handleChange("auth")}
                                  onBlur={formikProps.handleBlur("auth")}
                                  error={
                                    formikProps.errors.auth &&
                                    formikProps.touched.auth
                                      ? true
                                      : false
                                  }
                                  isDisabled={disableAccountInfo}
                                />
                                <div>
          {formikProps.errors.auth && formikProps.touched.auth && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.auth}
             </Alert>
                   
         )}


        </div> 
                              </Td>
                            </Tr>
                          </Tbody>
                          <Tfoot>
                            <Tr></Tr>
                          </Tfoot>
                        </Table>
                      </Box>
                    </>
                  </Box>
                </Flex>
                <Flex mt={"2rem"} flexWrap={"wrap"}>
                  <Box width={{ base: "100%", md: "40%" }}>
                    <Heading
                      color={"#1A1A1A"}
                      fontWeight={"bold"}
                      fontSize={"1.5rem"}
                    >
                      Payment Information
                    </Heading>
                    <Text color={"#666666"}>
                      Please confirm this information about the account owner,
                      lorem ipsum dolor.
                    </Text>
                  </Box>
                  <Box width={{ base: "100%", md: "60%" }}>
                    <PaymentInfoComponent />
                  </Box>
                </Flex>
                <Flex mt={"2rem"} flexWrap={"wrap"}>
                  <Box width={{ base: "100%", md: "40%" }}>
                    <Heading
                      color={"#1A1A1A"}
                      fontWeight={"bold"}
                      fontSize={"1.5rem"}
                    >
                      Terms & Conditions
                    </Heading>
                    <Text color={"#666666"}>
                      Please agree to our terms lorem ipsum.
                    </Text>
                  </Box>
                  <Box
                    padding={"1.5rem"}
                    width={{ base: "100%", md: "60%" }}
                    border={"1px solid #C4C4C4"}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Box display={"block"} py={"1rem"}>
                      <Heading
                        color={"#333333"}
                        fontWeight={"600"}
                        fontSize={"1rem"}
                        py={"1rem"}
                      >
                        Terms & Conditions
                      </Heading>
                      <Checkbox
                        // colorScheme={"blue"}
                        // color={"#333333"}
                        // fontWeight={"500"}
                        // fontSize={"1rem"}
                        // onChange={(e) => setCheckedfirst(!first)}
                        name="terms"
                                  id="terms"
                                  value={formikProps.values.terms}
                                  onChange={formikProps.handleChange("terms")}
                                  onBlur={formikProps.handleBlur("terms")}
                                  error={
                                    formikProps.errors.terms &&
                                    formikProps.touched.terms
                                      ? true
                                      : false
                                  }
                      >
                        I have read and agree to the Terms & Conditions.
                      </Checkbox>
                      <div>
          {formikProps.errors.terms && formikProps.touched.terms && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

               {formikProps.errors.terms}
             </Alert>
                   
         )}


        </div>      

                      <Text
                        pt={2}
                        color={"#808080"}
                        fontWeight={"400"}
                        fontSize={"0.8rem"}
                      >
                        <Link>Download link</Link>
                      </Text>
                    </Box>

                    <Box isplay={"block"} py={"1rem"}>
                      <Heading
                        color={"#333333"}
                        fontWeight={"600"}
                        fontSize={"1rem"}
                        py={"1rem"}
                      >
                        Privacy Policy
                      </Heading>
                      <Checkbox
                        // color={"#333333"}
                        // fontWeight={"500"}
                        // fontSize={"1rem"}
                        // onChange={(e) => setCheckedSecond(!second)}
                        name="terms"
                                  id="privacy"
                                  value={formikProps.values.privacy}
                                  onChange={formikProps.handleChange("privacy")}
                                  onBlur={formikProps.handleBlur("privacy")}
                                  error={
                                    formikProps.errors.privacy &&
                                    formikProps.touched.privacy
                                      ? true
                                      : false
                                  }

                      >
                        I have read and agree to the privacy policy
                      </Checkbox>
                      <div>
          {formikProps.errors.privacy && formikProps.touched.privacy && (
               <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>
               {formikProps.errors.privacy}
             </Alert>
                   
         )}


        </div>  
                      <Text
                        pt={2}
                        color={"#808080"}
                        fontWeight={"400"}
                        fontSize={"0.8rem"}
                      >
                        <Link>Download link</Link>
                      </Text>
                    </Box>
                  </Box>
                </Flex>

                <Grid
                  marginTop="1rem"
                  templateColumns="repeat(1, 1fr)"
                  gap={6}
                  mb="auto"
                  name="form-name"
                >
                  <Box display="flex" mb={"3"}>
                    <Button
                      textAlign={"center"}
                      border="1px solid #C4C4C4"
                      bg="transparent"
                      color="#4D4D4D"

                      _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}

                      leftIcon={<ArrowBackIcon />}
                      marginLeft="auto"
                      onClick={navigateBack}
                    >
                      Back
                    </Button>
                    <Button
                      bg="#0048FF"
                      color="#fff"
                      _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                      rightIcon={<ArrowForwardIcon />}
                      marginLeft="1rem"
                      onClick={formikProps.handleSubmit}
                    >
                      Next
                    </Button>
                  </Box>
                </Grid>

                <Box></Box>
              </Box>
            </Container>
          </Box>
        </>
      )}
    </Formik>
  );
};
export default PaymentInfo;

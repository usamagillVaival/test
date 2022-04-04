import React,{useEffect} from 'react';
import {
    Box, Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    Checkbox, Text, Link
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router"

import ConfirmInformation from "./ConfirmInformation/ConfirmInformation";
import PaymentSteps from "./ConfirmInformation/PaymentStep";
import PaymentInfo from "./ConfirmInformation/PaymentInfo";
import {BioRymHeading} from '../../assets/StyledComponent/styeledComponent'
import server from '../../apis/server'
import {   useDispatch, useSelector} from 'react-redux'
// import { useHistory,Redirect,Link } from "react-router-dom";
import { Formik } from "formik"; 
import * as yup from "yup";
import { navigate } from '@reach/router';
import {setSteps,setAccount} from "../../redux/action/tradingBot"



    const GalleryProfile =({InvitationCode})=>{



      const [validInvitation, setValidInvitation] = React.useState(false);
      const [accountType, setAccountType] = React.useState('');
      const state = useSelector(state => state);
      const dispatch = useDispatch();

      const {steps,exchangeList,apiNames,selectedApi}  =   state?.TradingBot
      useEffect(() => {
        validateConfirmationCode() 
       },[]);
       const validateConfirmationCode =async() => {
           try  { 
           const {data} = await server.get(
               `users/createAccount/${InvitationCode}`,
               { 
                 headers: {
                   "Content-Type": "application/json",
                 },
               } 
             )
             console.log(data.user)
           //    alert(JSON.stringify(data))
             if(data){
               if(data?.user){
                 setValidInvitation(true)
                setEmail(data?.user?.email)
                setAccountType(data?.user?.account_type)
               }
               else{
                //  alert('Invalid Invitation Code')
                setValidInvitation(false)
               }
           
             }
            
         } catch (e) {
             alert(e.message)
           //  setIsLoading(false)
           // console.log(e); 
           // handleSnackBar(e.message);
           // alert("you have entered wrong email or password");
         }
   
     
     };

    const [show, setShow] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const handleClick = () => setShow(!show);

    let validationSchema = yup.object({ 
        name: yup.string().required(" Name is Required"),
        email: yup
          .string() 
         .required("Email is required"),
         password:yup.string().required("password is required"),
       });  
       

       const handleSignup =async(values, resetForm) => {

        if(accountType==='gallery'){
          dispatch(setSteps(steps+1))
          dispatch(setAccount(values))
  return
         }
        let dataa ={
            password:values.password,
            name: values?.name,
            email: values?.email,
            account_type:"artist",
        }
          try  { 
          const {data} = await server.post(
              "user/createGalleryAccount",
             dataa ,   
              { 
                headers: {
                  "Content-Type": "application/json",
                },
              } 
            )
             console.log(data)
            if(data){
              navigate("/Login")

              //   alert(JSON.stringify(data))
              //   setUserDetail(data?.data)
              //   setIsLoading(false)
                          // navigation.navigate("ChooseApp")
            }
            else 
            {
              //   setIsLoading(false)
              // //  alert(data.message) 
              // setShowSnack(true)
              // handleSnackBar(data.message);
            } 
          //   alert(JSON.stringify(data))
        } catch (e) {
            alert(e.message)
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





      //  const handleSignup =async(values, resetForm) => {
      //  if(accountType==='gallery'){
      //   dispatch(setSteps(steps+1))
      //   dispatch(setAccount(values))

      //  }
      //  else{



      //   navigate("/Login")
      //  }
         
      // };
     
    

    return(

         <>
           {!validInvitation &&
           <div>
             <h3>Invalid Invitation Code</h3>
           </div>
           }

         {validInvitation &&
        <Formik
        enableReinitialize={true} 
            initialValues={{ name: "",  email: email,password:"" ,role:"",auth:""}}
             validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values, resetForm);
            }} 
            > 
			   {(formikProps) => ( 
        <>
            <section className='Login'>
                <Flex py={3} >
                    <Container align='center' justifyContent='center' direction="column"  minHeight='100vh'>

                        <Box pt='5rem'>
                            <Icon width="200" height="30" viewBox="0 0 158 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.3009 9.53251C17.3009 14.2449 13.428 18.065 8.65047 18.065C3.87295 18.065 0 14.2449 0 9.53251C0 4.82013 3.87295 1 8.65047 1C13.428 1 17.3009 4.82013 17.3009 9.53251ZM18.0009 12.3607C18.4689 10.8532 18.5549 9.25548 18.2513 7.70759C19.523 8.27804 20.6356 9.14392 21.4939 10.2311C22.3522 11.3183 22.9307 12.5944 23.1798 13.9503C23.4289 15.3062 23.3413 16.7014 22.9243 18.0165C22.5074 19.3317 21.7736 20.5276 20.7858 21.502C19.798 22.4763 18.5855 23.2001 17.2522 23.6113C15.9189 24.0226 14.5044 24.109 13.1298 23.8633C11.7551 23.6176 10.4614 23.047 9.35914 22.2004C8.25692 21.3538 7.37907 20.2564 6.80072 19.002C8.37002 19.3015 9.98982 19.2167 11.5182 18.755C13.0465 18.2934 14.4367 17.4691 15.5669 16.3542C16.6972 15.2394 17.5329 13.8682 18.0009 12.3607Z" fill="#F1DE0E"/>
                                <path d="M36.168 20V1.90625H39.9648C41.7852 1.90625 43.2227 2.08594 44.2773 2.44531C45.4102 2.79688 46.4375 3.39453 47.3594 4.23828C49.2266 5.94141 50.1602 8.17969 50.1602 10.9531C50.1602 13.7344 49.1875 15.9844 47.2422 17.7031C46.2656 18.5625 45.2422 19.1602 44.1719 19.4961C43.1719 19.832 41.7539 20 39.918 20H36.168ZM38.8984 17.4336H40.1289C41.3555 17.4336 42.375 17.3047 43.1875 17.0469C44 16.7734 44.7344 16.3398 45.3906 15.7461C46.7344 14.5195 47.4062 12.9219 47.4062 10.9531C47.4062 8.96875 46.7422 7.35938 45.4141 6.125C44.2188 5.02344 42.457 4.47266 40.1289 4.47266H38.8984V17.4336ZM62.4756 8.58594H65.1241V20H62.4756V18.8047C61.3897 19.8203 60.2217 20.3281 58.9717 20.3281C57.3936 20.3281 56.0889 19.7578 55.0577 18.6172C54.0342 17.4531 53.5225 16 53.5225 14.2578C53.5225 12.5469 54.0342 11.1211 55.0577 9.98047C56.0811 8.83984 57.3623 8.26953 58.9014 8.26953C60.2295 8.26953 61.4209 8.81641 62.4756 9.91016V8.58594ZM56.2178 14.2578C56.2178 15.3516 56.5108 16.2422 57.0967 16.9297C57.6983 17.625 58.4561 17.9727 59.3702 17.9727C60.3467 17.9727 61.1358 17.6367 61.7373 16.9648C62.3389 16.2695 62.6397 15.3867 62.6397 14.3164C62.6397 13.2461 62.3389 12.3633 61.7373 11.668C61.1358 10.9883 60.3545 10.6484 59.3936 10.6484C58.4873 10.6484 57.7295 10.9922 57.1202 11.6797C56.5186 12.375 56.2178 13.2344 56.2178 14.2578ZM77.8262 0.207031H80.4747V20H77.8262V18.8047C76.7872 19.8203 75.6114 20.3281 74.2989 20.3281C72.7364 20.3281 71.4395 19.7578 70.4083 18.6172C69.3848 17.4531 68.8731 16 68.8731 14.2578C68.8731 12.5547 69.3848 11.1328 70.4083 9.99219C71.4239 8.84375 72.7012 8.26953 74.2403 8.26953C75.5762 8.26953 76.7716 8.81641 77.8262 9.91016V0.207031ZM71.5684 14.2578C71.5684 15.3516 71.8614 16.2422 72.4473 16.9297C73.0489 17.625 73.8067 17.9727 74.7208 17.9727C75.6973 17.9727 76.4864 17.6367 77.088 16.9648C77.6895 16.2695 77.9903 15.3867 77.9903 14.3164C77.9903 13.2461 77.6895 12.3633 77.088 11.668C76.4864 10.9883 75.7052 10.6484 74.7442 10.6484C73.838 10.6484 73.0802 10.9922 72.4708 11.6797C71.8692 12.375 71.5684 13.2344 71.5684 14.2578ZM93.1769 8.58594H95.8253V20H93.1769V18.8047C92.0909 19.8203 90.923 20.3281 89.673 20.3281C88.0948 20.3281 86.7902 19.7578 85.7589 18.6172C84.7355 17.4531 84.2238 16 84.2238 14.2578C84.2238 12.5469 84.7355 11.1211 85.7589 9.98047C86.7823 8.83984 88.0636 8.26953 89.6027 8.26953C90.9308 8.26953 92.1222 8.81641 93.1769 9.91016V8.58594ZM86.9191 14.2578C86.9191 15.3516 87.212 16.2422 87.798 16.9297C88.3995 17.625 89.1573 17.9727 90.0714 17.9727C91.048 17.9727 91.837 17.6367 92.4386 16.9648C93.0402 16.2695 93.3409 15.3867 93.3409 14.3164C93.3409 13.2461 93.0402 12.3633 92.4386 11.668C91.837 10.9883 91.0558 10.6484 90.0948 10.6484C89.1886 10.6484 88.4308 10.9922 87.8214 11.6797C87.2198 12.375 86.9191 13.2344 86.9191 14.2578ZM101.531 1.90625L106.535 14.4453L111.61 1.90625H114.598L106.477 21.3594L98.5431 1.90625H101.531ZM124.323 8.58594H126.972V20H124.323V18.8047C123.238 19.8203 122.07 20.3281 120.82 20.3281C119.241 20.3281 117.937 19.7578 116.905 18.6172C115.882 17.4531 115.37 16 115.37 14.2578C115.37 12.5469 115.882 11.1211 116.905 9.98047C117.929 8.83984 119.21 8.26953 120.749 8.26953C122.077 8.26953 123.269 8.81641 124.323 9.91016V8.58594ZM118.066 14.2578C118.066 15.3516 118.359 16.2422 118.945 16.9297C119.546 17.625 120.304 17.9727 121.218 17.9727C122.195 17.9727 122.984 17.6367 123.585 16.9648C124.187 16.2695 124.488 15.3867 124.488 14.3164C124.488 13.2461 124.187 12.3633 123.585 11.668C122.984 10.9883 122.202 10.6484 121.241 10.6484C120.335 10.6484 119.577 10.9922 118.968 11.6797C118.366 12.375 118.066 13.2344 118.066 14.2578ZM133.897 8.58594V15.1367C133.897 17.0273 134.643 17.9727 136.135 17.9727C137.627 17.9727 138.373 17.0273 138.373 15.1367V8.58594H141.01V15.1953C141.01 16.1094 140.897 16.8984 140.67 17.5625C140.451 18.1562 140.073 18.6914 139.533 19.168C138.643 19.9414 137.51 20.3281 136.135 20.3281C134.768 20.3281 133.639 19.9414 132.748 19.168C132.201 18.6914 131.815 18.1562 131.588 17.5625C131.369 17.0312 131.26 16.2422 131.26 15.1953V8.58594H133.897ZM147.935 0.207031V20H145.298V0.207031H147.935ZM154.953 11.0469V20H152.317V11.0469H151.192V8.58594H152.317V4.40234H154.953V8.58594H157.004V11.0469H154.953Z" fill="black"/>
                            </Icon>
                        </Box>
                        <Box className='sign-information'>
                            <BioRymHeading color="#000" fontSize='2.25rem' pt='1.5rem' mb='1rem' fontWeight='700' >Apply for  {accountType} </BioRymHeading>
                            <p color='#666'>Did you receive an invitation ?<a href='#' color='blue'> Sign up with your invite code</a></p>
                        </Box>
                        <Box className="Box-card" p='2rem' bg='#fff' borderRadius='0.5rem' >
                            <FormControl id="email">
                                <FormLabel  color='#4D4D4D' fontWeight='500'>Name</FormLabel>
              
             <Input
              mb={3}
               type="text"
              name="name"
              id ="name"
                 value={formikProps.values.name}
                  onChange={formikProps.handleChange("name")}
                  onBlur={formikProps.handleBlur("name")}
                  error={
                    formikProps.errors.name && formikProps.touched.name
                      ? true
                      : false
                  }
            />
            <div>
          {formikProps.errors.name && formikProps.touched.name && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.name}
                 </p>
         )}

            
        </div>


                                <FormLabel  color='#4D4D4D' fontWeight='500'>Email address</FormLabel>
                                <Input
              mb={3}
               type="text"
              name="email"
              id ="email"
                 value={formikProps.values.email}
                  onChange={formikProps.handleChange("email")}
            //      onBlur={formikProps.handleBlur("email")}
                  error={
                    formikProps.errors.email && formikProps.touched.email
                      ? true
                      : false
                  }
                  isDisabled
            />
            <div>
          {formikProps.errors.email && formikProps.touched.email && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.email}
                 </p>
         )}


        </div>
                                <Flex >
                                    <Box >
                                        <FormLabel color='#4D4D4D' fontWeight='500' >Password</FormLabel>

                                    </Box>
                                    <Spacer />

                                </Flex>

                                <InputGroup size="md" mb={3}>
                                

<Input
               pr="4.5rem"
               type={show ? "text" : "password"}
              name="password"
              id ="password"
                 value={formikProps.values.password}
                  onChange={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                  error={
                    formikProps.errors.password && formikProps.touched.password
                      ? true
                      : false
                  }
            />
            <div>
          {formikProps.errors.password && formikProps.touched.password && (
                    <p style={{ textAlign: "left", paddingLeft: 10, color: "red" }}>
                      {formikProps.errors.password}
                 </p>
         )}


        </div>
                                    <InputRightElement width="4.5rem">
                                        <Button _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                                bg='transparent' h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? <i className="fas fa-eye"></i>: <i className="fas fa-eye-slash"></i>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Flex >
                                    <Box >
                                        <FormLabel color='#4D4D4D' fontWeight='500' ><Checkbox colorScheme="blue"  color='#000000'>I’m not a robot</Checkbox></FormLabel>
                                    </Box>
                                    <Spacer />
                                    <Box  ml='auto'>
                                        <FormLabel color='#666666' fontWeight={700}>[captchat information]</FormLabel>
                                    </Box>
                                </Flex>
                                <Button  py='1.5rem' w='100%' my='1rem' bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                                         onClick={formikProps.handleSubmit}
                                > Continue</Button>
                            </FormControl>



                        </Box>
                        <Text my={'3rem'} mb='auto' color='#666' textAlign='center'>Have an account already ? <Link as={ReachLink} to='/Login' color='#0039CC' fontWeight={700}>Logged In</Link></Text>

                    </Container>


                </Flex>
            </section>


            {/* <ConfirmInformation path="/confirminfo" /> */}

            </>
			   )}
			   </Formik>
    }
         </>

    );
}
export default GalleryProfile;
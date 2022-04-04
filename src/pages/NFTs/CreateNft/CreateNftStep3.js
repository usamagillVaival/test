import React, { useState, useEffect } from "react";
import server from "../../../apis/server";
import { Box, Button, Flex, Grid, Heading, Input, InputGroup, Image, Divider, Text, Link, FormLabel, Textarea, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, } from "@chakra-ui/react";
import { navigate } from '@reach/router';
import { Alert, AlertIcon, } from '@chakra-ui/react'
import Select from 'react-select'
import { Formik } from "formik";
import * as yup from "yup";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux'
import { setMintSteps } from "../../../redux/action/tradingBot"
import { setNftDetails } from "../../../redux/action/tradingBot";
import CryptoJS from "crypto-js";
import { LoadingScreen } from "../../../components/index"
import { useToast, Spinner } from '@chakra-ui/react'
function CreateNftStep3(props) {
  const artworkEditDetail = props?.artworkEditdetail
  console.log(artworkEditDetail)
  const loadd = props?.load

  const toast = useToast()
  const [selectedArtist, setSelectedArtist] = useState(artworkEditDetail?.artistId ? artworkEditDetail?.artistId : "")
  const [selectedArtistName, setSelectedArtistName] = useState(artworkEditDetail?.artistName ? artworkEditDetail?.artistName : "")
  const [rangeSliderValue, setRangeSliderValue] = useState(40)
  const [options, setOption] = useState([]);
  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
  const [loader, setLoader] = useState(false)
  const userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  console.log(userType)
  const galleryContractAddress = userType?.gallery_contract_address
  const userID = userType?._id
  const galleryName = userType?.name



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #0C0B86!important' : '1px solid #D2D2D2',
    })
  }
  const galleryProfile = userType?.gallery_profile


  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    try {
      const { data } = await server.get(
        "users/artist_byGallery", {
        params: {
          invited_from: userID
        }
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (data) {
        if (data.data) {
          const mapData = data?.data
          const result = mapData?.map(person => ({ value: person?._id, label: person?.name }));
          result.push({ value: "inviteartist", label: "Invite Artist", style: { backgroundColor: 'red' } })

          setOption(result)
          //   setValidInvitation(true)
          //  setEmail(data?.user?.email)
          //  setAccountType(data?.user?.account_type)
        }
        else {
          //  alert('Invalid Invitation Code')
          //  setValidInvitation(false)
        }

      }

    } catch (e) {
      alert(e.message)
      //  setIsLoading(false)
      // console.log(e); 
      // handleSnackBar(e.message);
      // alert("you have entered wrong email or password");
    }

  }
  const state = useSelector(state => state);
  const { mintsteps, accountInfo, nftdetails, nftupload } = state?.TradingBot
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(setMintSteps(mintsteps + 1))
  };

  const { title, year, description, edition, price, tags } = nftdetails

  const { id, file } = nftupload
  let validationSchema = yup.object({
    title: yup.string().required('Required'),

    description: yup.string().max(400, 'Maximum 400 characters allowded').required('Required'),
  });


  const handleNext = async (values, resetForm) => {
    if (selectedArtist == null || selectedArtist == "") {
      toast({
        title: 'Error',
        description: `Please Select a artist`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        bg: '#fff',
        position: 'top-right', variant: 'top-accent',
      })
    }
    else {
      setLoader(true)
      let dataa = {
        title: values?.title,
        artistId: artworkEditDetail?.artistId ? artworkEditDetail?.artistId : selectedArtist,
        artistName: artworkEditDetail?.artistName ? artworkEditDetail?.artistName : selectedArtistName,
        description: values?.description,
        revenueSplit: Number(rangeSliderValue),
        status: 1,
        galleryName: galleryName,
        galleryId: userID,
        galleryContractAddress: galleryContractAddress,
        galleryProfile: galleryProfile,
        sendToArtistDate: new Date()
      }
      const { data } = await server.put(
        `/users/artist_profile/${userID}/${artworkEditDetail?._id ? artworkEditDetail?._id : id ? id : null}`,
        dataa
        ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (data) {
        console.log(data)
        let dataa1 = {
          userId: userID,
          artistId: artworkEditDetail?.artistId ? artworkEditDetail?.artistId : selectedArtist,
          artId: artworkEditDetail?._id ? artworkEditDetail?._id : id ? id : null,
        }

        const { data1 } = await server.post(
          '/users/artist_profile/send', dataa1
          ,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        if (dataa1) {

          setLoader(false)
          dataa.status = 2
          dispatch(setNftDetails(dataa))
          dispatch(setMintSteps(mintsteps + 1))
          toast({
            title: 'Success',
            description: `Artwork has been sent to the selected Artist for approval.`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top-right', variant: 'top-accent',
          })
        }

      }
    }
  }
  //  setOption(result)



  async function handleExit(values) {
    setLoader(true)
    let dataa = {
      title: values?.title,
      artistId: selectedArtist,
      artistName: selectedArtistName,
      description: values?.description,
      revenueSplit: Number(rangeSliderValue),
      status: 1,
      galleryName: galleryName,

      galleryContractAddress: galleryContractAddress
    }
    console.log(dataa)
    const { data } = await server.put(
      `/users/artist_profile/${userID}/${id ? id : artworkEditDetail?._id}`,
      dataa
      ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (data) {
      if (props?.dataaa) {
        props?.dataaa()
      }
      setLoader(false)
      dispatch(setMintSteps(0))
      toast({
        title: 'Success',
        description: `${data.message}`,
        status: 'success',
        duration: 4000,
        isClosable: true, variant: 'top-accent',
        position: 'top-right',
      })
    }


  }
  if (loader) {
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
    <Formik
      initialValues={{
        title: artworkEditDetail?.title ? artworkEditDetail?.title : '',
        description: artworkEditDetail?.description ? artworkEditDetail?.description : '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleNext(values, resetForm)

      }}
    >
      {(formikProps) => (
        <>
          <Box width={'100%'} maxW={'1152px'} m={'auto'} pt={'2rem'} mb={'auto'}>
            <Box>
              <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Add details</Heading>
              <Text fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>Add details about the NFT, then send to the artist for approval.</Text>
            </Box>
            <Grid templateColumns="repeat(1, 1fr)" gap={6} >
              <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Flex gap={12} width={'100%'} flexWrap={{base:'wrap',md:'inherit'}} justifyContent={{base:'center', md:'start'}}>
                  <Box width={{ base: "95%", sm: "85%", md: "75%", lg: "95%", xl: "33.33%" }} maxW={'100%'}>
                    <Box bg={'#F7F7F7'} p={6} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
                      <Image mx={'auto'} maxW={'320px'} src={`http://51.222.241.160:8001/api/users/artist_profile/${artworkEditDetail?.file ? artworkEditDetail?.file : file ? file : "Unspecified Image"}`} width={'100%'} maxH={'240px'} objectFit={'contain'}/>
                      <Box pt={6} width={'100%'}>
                        <Text fontSize={'18px'} fontWeight={'400'} color={'#636262'} textAlign={'left'}>{

                          selectedArtistName ? selectedArtistName : artworkEditDetail?.artistName ? artworkEditDetail?.artistName : "Unspecified artist"
                        }
                        </Text>
                        <Text fontSize={'18px'} textAlign={'left'} fontWeight={'500'} color={'#363535'}>
                          {formikProps.values.title ? formikProps.values.title : "Unspecified title"}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box width={{ base: "95%", sm: "85%", md: "75%", lg: "95%", xl: "66.66%" }} maxW={'100%'}>
                    <Box maxW={'100%'} >
                      <Text fontSize={'18px'} textAlign={'left'} fontWeight={'700'} color={'#363535'}>Artwork details</Text>
                      <Text fontSize={'14px'} textAlign={'left'} mb={8} fontWeight={'400'} color={'#797979'}>Describe the artwork. This is what collectors will see about it.</Text>

                      <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                        <FormLabel color='##636262' fontWeight='500' fontSize={'16px'} m={0}>Title</FormLabel>
                      </Box>
                      <Box display='flex' flexDirection={'column'} alignItems='start' justifyContent='center' mb={8}>
                        <Input type="text" mb={1} color={'#4D4D4D'} placeholder={'Enter title'}
                          name="title"
                          id="title"
                          borderRadius={'0px'}
                          value={formikProps.values.title}
                          onChange={formikProps.handleChange('title')}
                          //   onBlur={formikProps.handleBlur("email")}
                          error={
                            formikProps.errors.title && formikProps.touched.title
                              ? true
                              : false
                          }
                          borderColor={'#D2D2D2'}
                        />
                        <Box w={'100%'}>
                          {formikProps.errors.title && formikProps.touched.title && (
                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                              {formikProps.errors.title}
                            </Alert>

                          )}

                        </Box>
                      </Box>
                      <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                        <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Artist</FormLabel>
                      </Box>
                      <Box display='flex' flexDirection={'column'} alignItems='start' justifyContent='center' mb={8}>
                        <Box d="flex" alignItems={"center"} w={'100%'} >
                          <InputGroup w={'100%'} borderRadius={'0px'} borderColor={'#D2D2D2'} className={'react-select'} >
                            <Select
                              borderRadius={'0px'}
                              borderColor={'#D2D2D2'}
                              defaultValue={{ label: artworkEditDetail?.artistName ? artworkEditDetail?.artistName : "Select artist", value: artworkEditDetail?.artistName ? artworkEditDetail?.artistName : null }}

                              placeholder="Select artist"
                              w={'100%'} className={'customSelect'}
                              styles={customStyles} onChange={(e) => {

                                if (e.value === 'inviteartist') {
                                  navigate(`/Artists`, { state: { invite: true } })

                                }
                                setSelectedArtist(e.value)
                                setSelectedArtistName(e.label)
                              }

                              }
                              options={options}
                            />

                          </InputGroup>

                        </Box>
                        <Box w={'100%'}>
                          {formikProps.errors.year && formikProps.touched.year && (
                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                              {formikProps.errors.year}
                            </Alert>

                          )}
                        </Box>
                      </Box>
                      <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                        <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Description</FormLabel>
                      </Box>
                      <Box display='flex' flexDirection={'column'} alignItems='center' justifyContent='center' mb={3}>
                        <Textarea borderRadius={'0px'} mb={2} borderColor={'#D2D2D2'} color={'#4D4D4D'} placeholder="Enter description"
                          name="description"
                          id="description"
                          value={formikProps.values.description}
                          onChange={formikProps.handleChange("description")}
                          //   onBlur={formikProps.handleBlur("email")}
                          error={
                            formikProps.errors.description && formikProps.touched.description
                              ? true
                              : false
                          }
                        />
                        <Text fontSize={'14px'} mb={8} fontWeight={'400'} w={'100%'} textAlign={'left'} color={'#8F8F8F'}>Maximum 400 characters</Text>

                        <Box w={'100%'}>
                          {formikProps.errors.description && formikProps.touched.description && (
                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                              {formikProps.errors.description}
                            </Alert>

                          )}


                        </Box>
                      </Box>
                      <Box display='flex' alignItems='start' justifyContent='start' mb={8} flexDirection={'column'}>
                        <FormLabel color='#363535' fontWeight='700' fontSize={'18px'}  >Revenue split</FormLabel>
                        <Text fontSize={'14px'} textAlign={'left'} fontWeight={'400'} color={'#797979'}>Set the revenue split with your artist, then send the draft for their review and approval. You can mint the NFT once your artist approves it.</Text>

                      </Box>
                      <Box display='flex' alignItems='start' justifyContent='start' mb={8} flexDirection={'column'} maxW={'240px'}>
                        <FormLabel color='#636262' fontWeight='500' marginBottom={'13px'} fontSize={'16px'} mb={'13px'}>Revenue split ({rangeSliderValue}%)</FormLabel>
                        <RangeSlider aria-label={['min', 'max']} defaultValue={[40]}
                          onChange={(val) => setRangeSliderValue(val)}>

                          <RangeSliderTrack>
                            <RangeSliderFilledTrack bg={'#0F0EA7'} />
                          </RangeSliderTrack>
                          <RangeSliderThumb index={0} />

                        </RangeSlider>
                      </Box>
                      <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                        <Text fontSize={'14px'} textAlign={'left'} fontWeight={'400'} color={'#797979'}>
                          {rangeSliderValue == 0 ?
                            <Text> Revenue split (##%) </Text>
                            :

                            <Text>Your artist will receive <b>{rangeSliderValue} </b> % of the sale price.</Text>
                          }
                        </Text>
                        <Text fontSize={'14px'} textAlign={'left'} fontWeight={'400'} color={'#797979'}>
                          DadaVault’s unique Revenue Split is coded directly into the NFT itself. This means that no matter what the final sale price is, your Artist instantly and automatically receives their percentage with no effort required from the Gallery.
                        </Text>
                        <Link fontSize={'14px'} textAlign={'left'} mb={8} fontWeight={'500'} color={'#0F0EA7'}> Learn more about the Revenue Split</Link>

                      </Box>

                      {/* <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Tags</FormLabel>
                                        </Box>
                                        <Box display='flex'  flexDirection={'column'}   alignItems='start' justifyContent='center' mb={3}>
                                            <Input color={'#4D4D4D'}  mb={1} color={'#4D4D4D'} type="text" onKeyUp={handleKeyPress} placeholder={'Enter tags here'}
                                             name="tags"
                                             id ="tags"
                                                value={formikProps.values.tags}
                                                 onChange={formikProps.handleChange("tags")}
                                                //onChange={handleKeyPress}
                                               //   onBlur={formikProps.handleBlur("email")}
                                                 error={
                                                   formikProps.errors.tags && formikProps.touched.tags
                                                     ? true
                                                     : false
                                                 }
                                            />
                                              <Box w={'100%'}>
                                              {formikProps.errors.tags && formikProps.touched.tags && (
                                                  <Alert status='error'>
                                                  <AlertIcon />
                                                  {formikProps.errors.tags}
                                                </Alert>
                                                      
                                            )}


        </Box>
                                        </Box>
                                        <Box mb={3}>
                                            <Stack direction="row">
                                              {
                                                tagArr.map((val,i)=>{

                                                 return <Tag
                                                size={'lg'}
                                                
                                                borderRadius='full'
                                                variant='solid'
                                                bg='#F17A0E'
                                                color="#fff"
                                              > 
                                              <TagLabel>{val}</TagLabel>
                                              <TagCloseButton id={i} value={val} onClick={e=>closeTag(e,val)}/>
                                              </Tag>

                                                })

                                              }
                                            
                                               
                                            </Stack>
                                            
                                        </Box> */}

                      {/* <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Edition</FormLabel>
                                        </Box> */}
                      {/* <Box display='flex' flexDirection={'column'}   alignItems='center' justifyContent='center' mb={'2rem'}>
                                            <Input type="text" mb={1} color={'#4D4D4D'} placeholder={'Enter edition number'}
                                             name="edition"
                                             id ="edition"
                                                value={formikProps.values.edition}
                                                 onChange={formikProps.handleChange("edition")}
                                               //   onBlur={formikProps.handleBlur("email")}
                                                 error={
                                                   formikProps.errors.edition && formikProps.touched.edition
                                                     ? true
                                                     : false
                                                 }
                                            /> */}
                      {/* <Box w={'100%'}>
                                                  {formikProps.errors.edition && formikProps.touched.edition && (
                                                       <Alert status='error'>
                                                       <AlertIcon />
                                                       {formikProps.errors.edition}
                                                     </Alert>

                                                 )}
                                                </Box>
                                            </Box> */}

                      {/* <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Price</FormLabel>
                                        </Box> */}
                      {/* <Box display='flex'   flexDirection={'column'}  alignItems='center' justifyContent='center' mb={6}> */}
                      {/* <Input type="text"  mb={1} color={'#4D4D4D'} placeholder={'Enter USD'}
                                             name="price"
                                             id ="price"
                                                value={formikProps.values.price}
                                                 onChange={formikProps.handleChange("price")}
                                               //   onBlur={formikProps.handleBlur("price")}
                                                 error={
                                                   formikProps.errors.price && formikProps.touched.price
                                                     ? true
                                                     : false
                                                 }
                                            /> */}
                      {/* <Box w={'100%'}>
          {formikProps.errors.price && formikProps.touched.price && (
               <Alert status='error'>
               <AlertIcon />
               {formikProps.errors.price}
             </Alert>
                   
         )}


        </Box> */}
                      {/* </Box> */}
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Grid>
            <Box mt={'2.5rem'}>
            <Divider />
            <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6} mb='auto' name="form-name">
              <Box display= {{base:'block',sm:'flex', lg:'flex'}} mb={'3'} flexWrap={'wrap'}  >
                <Button width={{base:'100%' ,sm:'auto'}} mb={3} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }} borderRadius={'0px'} marginLeft='auto' onClick={() => { handleExit(formikProps.values) }}>Save & exit</Button>
                <Button width={{base:'100%' ,sm:'auto'}} marginLeft={{base:'0rem', sm:"1rem" ,md:'1rem'}} mb={3} bg='#0C0B86' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  rightIcon={<ArrowForwardIcon />} borderRadius={'0px'} onClick={formikProps.handleSubmit} >Send to Artist</Button>
              </Box>
            </Grid>
            </Box>
          </Box>
        </>
      )}
    </Formik>
  );
}

export default CreateNftStep3;

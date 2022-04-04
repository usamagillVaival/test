import React, { useState } from "react";
import {Box,Button,Flex,Grid,Heading,Input,Image,Divider,Text,Icon,CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import  {useCallback} from 'react'
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IoLogoFacebook , IoLogoGoogle,IoLogoTwitter,IoMdEyeOff ,IoIosCloudUpload} from 'react-icons/io'
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"
import { setNftUpload } from "../../../redux/action/tradingBot";
import { useToast } from '@chakra-ui/react'
import {useDropzone} from 'react-dropzone'
import server from "../../../apis/server";
import CryptoJS from 'crypto-js';
import {LoadingScreen} from "../../../components/index"
import { Spinner } from "@chakra-ui/react";
function CreateNftStep2(props) {
    const toast=useToast()
    const state = useSelector(state => state);
    const {mintsteps,nftmedium}  =   state?.TradingBot
    const User1 = JSON.parse(localStorage.getItem("User"))
    const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):"";
    const userType =bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):""
    const userID=userType?._id
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [nftImage,setNftImage]= useState(null)
    const [artworkId,setArtworkId]=useState('')  
    const [disabled, setDisabled] = React.useState(true); 
    const [loader,setLoader]=useState(false)

  function uploadImage(file, updateProgress) {

    let formData = new FormData()
    formData.append("file", file)
    formData.append("status", 1)
    formData.append("medium", nftmedium)
    formData.append("userId", userID)
    formData.append("artDraftingStatus", 2)
    server.post("users/artist_artwork/upload_artwork", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: data => {
        const {loaded, total} = data;
let percent = Math.floor((loaded * 100) / total)
    //  percentComplete = parseInt(percentComplete * 100);
     
          setProgress(percent)
     
      },
    })
    .then(response =>{

      setNftImage(response?.data?.artDetail?.file)
      setArtworkId(response?.data?.artDetail?._id)
      setDisabled(false)
      let dataa ={
        file: response?.data?.artDetail?.file,
        id: response?.data?.artDetail?._id, 
    }
    dispatch(setNftUpload(dataa))
    })
    };
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0])
    console.log(acceptedFiles[0])
    uploadImage(acceptedFiles[0], setProgress);
  }, [])
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop,multiple:false,accept: nftmedium=="Image"?'image/jpeg, image/png':nftmedium=="Video"?'video/mp4':""});
  
    
  const files = acceptedFiles.map(file => ( 

    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  function handleNext()
  {
    dispatch(setMintSteps(mintsteps+1))
  }
  function handleSaveAndExit()
  {
    if(nftImage )
    {
    if (props?.data)
    {  
    props?.data()
    
    toast({
           title: 'Success',
           description: `Draft has been saved successfully`,
           status: 'success',
           duration: 4000,
           isClosable: true, variant:'top-accent',
        position:'top-right',
         })
          dispatch(setMintSteps(0))
        }
        else
        {
          toast({
            title: 'Success',
            description: `Draft has been saved successfully`,
            status: 'success',
            duration: 4000, variant:'top-accent',
            isClosable: true,
              position:'top-right',
          })
           dispatch(setMintSteps(0))
        }
      }
    else
    {
      toast({
        title: 'Failed',
        description: `Please Upload file first`,
        status: 'error',
        duration: 4000,
        isClosable: true,
          position:'top-right', variant:'top-accent',
      }) 
    }    
  }
  async function handleDelete()
  {
    setLoader(true)
    const {data} = await server.delete(
      `/users/deleteArtWork/${artworkId}`,
     {

     } ,
      { 
        headers: {
          "Content-Type": "application/json",
        },
      } 
    )
    if (data)
    {
      setLoader(false)
      setDisabled(true)
    console.log("",data)  
    setFile(null)
    setNftImage(null)
    setProgress(0)
    toast({
      title: 'Success',
      description: `Artwork has been deleted successfully`,
      status: 'success',
      duration: 4000,
      isClosable: true,
        position:'top-right', variant:'top-accent',
    })
    }
  }
  if(loader)
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
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'} display={'flex'} flexDirection={'column'}>

                <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Upload media</Heading>
               
                <Text  fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>Add your media file.</Text>

                <Grid templateColumns="repeat(1, 1fr)" gap={6} >
                    <Box m={'auto'} bg={'#F7F7F7'} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}} minH={'304px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>

                    {
                      nftImage ?
                      <>
                      
                     
                      <Box position={'relative'}  width={'100%'} minH={'450px'} maxH={{base:'100%',md:'100%',lg:'450px'}}  display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                      
                        <Box width={'70%'} maxH={{base:'100%',lg:'86%'}} display={'flex'} flexDirection={'column'} alignItems={'center'} >
                            <Image maxH={'360px'} objectFit={'contain'} src={`http://51.222.241.160:8001/api/users/artist_profile/${nftImage}`} mb={'1rem'} mt={'1rem'} />
                            </Box>
                            <Divider width={'70%'}/>
                            <Flex mt={'1rem'}  width={'70%'} flexWrap={'wrap'}>

                                <Box mr={'auto'} mb={{base:2, lg:0}}>
                                    <Heading fontSize={'16px'} color={'#1a1a1a'} fontWeight={'600'} mb={'0.25rem'} wordBreak={'break-word'}> {nftImage}</Heading>
                                    <Text fontSize={'16px'} color={'#4D4D4D'} fontWeight={'400'} mb={'1rem'}>{file?.size *  0.0009765625 } </Text>
                                </Box>

                                <Box  onClick={handleDelete} cursor={'pointer'} mb={{base:2, lg:0}}>
                                    <Button borderRadius={'0px'} width={'40px'} height={'40px'}>
                                        <Icon width="32px" height="32px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.333 11.9997H22.6663V13.333H21.333V21.9997C21.333 22.1765 21.2628 22.3461 21.1377 22.4711C21.0127 22.5961 20.8432 22.6663 20.6663 22.6663H11.333C11.1562 22.6663 10.9866 22.5961 10.8616 22.4711C10.7366 22.3461 10.6663 22.1765 10.6663 21.9997V13.333H9.33301V11.9997H12.6663V9.99967C12.6663 9.82286 12.7366 9.65329 12.8616 9.52827C12.9866 9.40325 13.1562 9.33301 13.333 9.33301H18.6663C18.8432 9.33301 19.0127 9.40325 19.1377 9.52827C19.2628 9.65329 19.333 9.82286 19.333 9.99967V11.9997ZM13.9997 15.333V19.333H15.333V15.333H13.9997ZM16.6663 15.333V19.333H17.9997V15.333H16.6663ZM13.9997 10.6663V11.9997H17.9997V10.6663H13.9997Z" fill="#4D4D4D"/>
                                        </Icon>
                                    </Button>
                                </Box>
                            </Flex>
                    </Box>
                      
                   
                    
                    </>:
                      <Box as={'section'} {...getRootProps({className: 'dropzone'})} height={'100%'} width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}} className="container" py={'1rem'} cursor={'pointer'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
                     {progress?
                     <>
                        <CircularProgress value={progress} color='#0F0EA7' size={'120px'}>
                        <CircularProgressLabel>{progress}%</CircularProgressLabel>
                      </CircularProgress>
                      </>
                      :null
                      }

 {progress==0?
                                <> 
                          <Box cursor={'pointer'}  >
                              <Box display={'flex'}>
                               
                                  <Icon mx={'auto'}  width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="48" height="48" rx="24" fill="#F4EBCC"/>
                                  <path d="M32 34H16V32C16 30.6739 16.5268 29.4021 17.4645 28.4645C18.4021 27.5268 19.6739 27 21 27H27C28.3261 27 29.5979 27.5268 30.5355 28.4645C31.4732 29.4021 32 30.6739 32 32V34ZM24 25C23.2121 25 22.4319 24.8448 21.7039 24.5433C20.9759 24.2417 20.3145 23.7998 19.7574 23.2426C19.2002 22.6855 18.7583 22.0241 18.4567 21.2961C18.1552 20.5681 18 19.7879 18 19C18 18.2121 18.1552 17.4319 18.4567 16.7039C18.7583 15.9759 19.2002 15.3145 19.7574 14.7574C20.3145 14.2002 20.9759 13.7583 21.7039 13.4567C22.4319 13.1552 23.2121 13 24 13C25.5913 13 27.1174 13.6321 28.2426 14.7574C29.3679 15.8826 30 17.4087 30 19C30 20.5913 29.3679 22.1174 28.2426 23.2426C27.1174 24.3679 25.5913 25 24 25Z" fill="#795E00"/>
                              </Icon>
                              </Box>
                            <Input cursor={'pointer'} {...getInputProps()} />
                            <Text mt={4} fontWeight={'700'} color={'#363535'} fontSize={'16px'}>Click or drag your file to this area to upload</Text>
                              {
                              nftmedium=="Image"?
                              <Text  fontSize={'14px'} textAlign={'center'} mt={2} mb={6} fontWeight={'300'} color={'#8F8F8F'}>
                                JPG,PNG or WEBP
                                </Text>
                                :nftmedium=="Video"?
                                <Text  fontSize={'14px'} textAlign={'center'} mt={2} mb={6} fontWeight={'300'} color={'#8F8F8F'}>
                                MP4,MOV or WEBM
                                </Text>
                                : 
                                <Text  fontSize={'14px'} textAlign={'center'} mt={2} mb={6} fontWeight={'300'} color={'#8F8F8F'}>
                                OBJ or FBX
                                </Text>
                                }
                          </Box>
                          </>
                                :null
                              }
                        </Box> 
                      
                    }
                        {progress==0?
                            <Box {...getRootProps({className: 'dropzone'})}>
                                <Button bg='#0F0EA7' color='#fff' borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }} leftIcon={<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9516 4.60218C12.5688 4.31835 12.0985 4.10999 11.602 3.99761C11.5204 3.97926 11.4458 3.93811 11.3868 3.87894C11.3277 3.81978 11.2868 3.74504 11.2686 3.66347C11.0554 2.71327 10.5962 1.89843 9.92141 1.28101C9.13691 0.562139 8.09949 0.166748 7 0.166748C6.0334 0.166748 5.14062 0.469717 4.41957 1.04311C3.93089 1.43234 3.53753 1.92801 3.26949 2.49233C3.24043 2.55408 3.19733 2.60817 3.14363 2.65028C3.08993 2.6924 3.02713 2.72137 2.96023 2.73487C2.22879 2.88253 1.56844 3.19616 1.06422 3.6405C0.368047 4.25573 0 5.07358 0 6.00737C0 6.95128 0.396211 7.81206 1.11535 8.4344C1.80223 9.02749 2.72699 9.35425 3.71875 9.35425H6.5625V5.16054L5.55926 6.16378C5.51737 6.20566 5.46742 6.2386 5.41243 6.2606C5.35744 6.2826 5.29855 6.29321 5.23934 6.29178C5.18012 6.29035 5.12182 6.27691 5.06795 6.25227C5.01409 6.22764 4.96579 6.19232 4.92598 6.14847C4.76738 5.97429 4.7827 5.70276 4.94922 5.53624L6.69074 3.79499C6.77278 3.713 6.88402 3.66695 7 3.66695C7.11598 3.66695 7.22722 3.713 7.30926 3.79499L9.05078 5.53569C9.2225 5.70768 9.23234 5.9896 9.06145 6.16214C9.0209 6.20309 8.97267 6.23562 8.91951 6.25788C8.86636 6.28013 8.80933 6.29167 8.75171 6.29182C8.69408 6.29197 8.637 6.28074 8.58372 6.25877C8.53045 6.23679 8.48205 6.20451 8.44129 6.16378L7.4375 5.16054V9.35425H10.8281C11.6851 9.35425 12.4663 9.11362 13.0279 8.67694C13.6639 8.18202 14 7.47382 14 6.63081C14 5.81214 13.6374 5.11022 12.9516 4.60218Z" fill="white"/>
                                    <path d="M6.5625 11.1157C6.5625 11.2318 6.60859 11.343 6.69064 11.4251C6.77269 11.5071 6.88397 11.5532 7 11.5532C7.11603 11.5532 7.22731 11.5071 7.30936 11.4251C7.39141 11.343 7.4375 11.2318 7.4375 11.1157V9.35425H6.5625V11.1157Z" fill="white"/>
                                </svg>
                                } marginLeft='1rem' >Upload media</Button>
                            </Box>

                        :null
}
                       
                    </Box>
                </Grid>
                <Grid  templateColumns="repeat(1, 1fr)" gap={6}   mb='auto' m={'auto'}  width={{base:"95%",sm:"85%" ,md:"75%" ,lg:"95%",xl:"60%"}}  marginTop='2.5rem' name="form-name">

                    <Divider/>
                    <Box display= {{base:'block',lg:'flex'}} mb={'3'} flexWrap={'wrap'} >

                        <Button mb={3} width={{base:'100%' ,sm:'auto'}}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'  borderRadius={'0px'}  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                marginLeft={{base:0,sm:'auto'}} onClick={handleSaveAndExit}>Save & exit</Button>
                        <Button mb={3} bg='#0C0B86' color='#fff' width={{base:'100%' ,sm:'auto'}}   _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                borderRadius={'0px'} rightIcon={<ArrowForwardIcon />} marginLeft={{base:'0rem', sm:"1rem" ,md:'1rem'

                        }}   onClick={handleNext}
                                isDisabled={disabled}
                        >Continue</Button>
                    </Box>
                </Grid>
            </Box>

        </>

    );
}

export default CreateNftStep2;

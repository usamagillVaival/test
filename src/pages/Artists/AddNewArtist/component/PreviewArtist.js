import React, {useEffect} from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image, Select, Divider,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, FormLabel,Textarea ,
} from "@chakra-ui/react";

import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    BioRymHeading,
    BioRymHeadingNew,
    InterHeading
} from '../../../../assets/StyledComponent/styeledComponent';
import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import Preview from '../../../../assets/images/image1.png';
import { Link as ReachLink } from "@reach/router"
import {setPreviewInfo, setPreview} from "../../../../redux/action/tradingBot"
import server from '../../../../apis/server'


import { useToast } from '@chakra-ui/react'
import { navigate } from '@reach/router';

import {   useDispatch, useSelector} from 'react-redux'


function PreviewArtist(props) {
    const toast = useToast()

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {previewInfo}  =   state?.TradingBot

    useEffect(() => {
        load();
      },[]);

      const load = async() => {
      }

      const handleEdit= ()=>{
        dispatch(setPreview(false))
      }

      const handleSave=async ()=>{
      
            let bodyFormData = new FormData();
            bodyFormData.append('yearOfBirth', previewInfo?.year);
            bodyFormData.append('nationality', previewInfo?.country);
            bodyFormData.append('biography', previewInfo?.description);
            bodyFormData.append('networkCategory', previewInfo?.category);
            bodyFormData.append('links', previewInfo?.link);
            if(previewInfo?.cover!==undefined){
                bodyFormData.append('file', previewInfo?.cover);                
            }
            
            // console.log(previewInfo?.year)
            // console.log(previewInfo?.country)
            // console.log(previewInfo?.description)
            // console.log(previewInfo?.category)
            // console.log(previewInfo?.link)
            // let p = previewInfo.url!==""? previewInfo?.cover:previewInfo?.image
            console.log(previewInfo?.cover);

            const {data} = await server.put(
                `users/artist_profile/${previewInfo.artist_id}`, 
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
           
         
      }

    return (
        <>
                <Box width={{base:'100%', sm:'100%'}} m={'auto'} pt={'2rem'} pb={'2rem'}>
                    <BioRymHeading textAlign={'center'} >Preview</BioRymHeading>

                    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)'}} gap={6}  pt={'3rem'}>
                        <Box display={'flex'}>
                        {
                            previewInfo.url!==""?
                            <Image src={previewInfo.url} pr={4} width={'120px'} height={'86px'} />:
                            <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${previewInfo.image}`}  pr={4} width={'120px'} height={'86px'} />
                        }
 
                            <Box>
                                <Heading>{previewInfo.name}</Heading>
                                <Text fontSize={'1.5rem'} mb={'1rem'}>{`${previewInfo.country}, b. ${previewInfo.year}`}</Text>
                                <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}  marginLeft='auto' marginRight={'1rem'} >Follow</Button>
                            </Box>

                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <InterHeading fontWeight={'400'} fontSize={'17px'} pb={'2rem'}>
                                Bio
                            </InterHeading>
                            <InterHeading fontWeight={'400'} fontSize={'17px'}  pb={'2rem'}>
                                {previewInfo.description}                            </InterHeading>
                            <Text ml={'auto'}>

                                <Link onClick={handleEdit} color={'#0048FF'}>
                                    Edit
                                </Link>

                            </Text>

                        </Box>

                    </Grid>

                </Box>
                <Divider/>
                <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                    <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                        <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}  marginLeft='auto'  onClick={handleSave} >Save & exit</Button>
                        <Button bg='#0048FF' color='#fff' _focus={{ bg: "#0048FF", }}  _hover={{ bg: "#0048FF", }} _active={{ bg: "#0048FF", }} rightIcon={<ArrowForwardIcon />} marginLeft='1rem' >Continue</Button>
                    </Box>
                </Grid>



        </>

    );
}

export default PreviewArtist;

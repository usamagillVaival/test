import {
    Box,
    Text,
    Flex,
    Image,
    Heading,
    Icon,
    InputGroup,
    InputLeftElement,
    Button,
    Input,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Grid,
    Link,Avatar,useColorModeValue,HStack,VStack,
} from '@chakra-ui/react';
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
const storefrontUrl=process.env.REACT_APP_STOREFRONT
function SALEINFORMATION(props)
{
const data=props?.data
const Date6=new Date(data?.sold_date)
console.log(data)
 return (
     <>
      <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8} >
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               {data?.status==5?
                               <Text>Listing information</Text>
                               :
                               <Text>Sale information</Text>
}
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                           {data?.status==5?
                               <Text>This NFT is listed for sale on your storefront</Text>
                               :
                               <Text>This NFT was sold on {Date6?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Text>
}
                               
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
                           <Grid marginTop='1rem' templateColumns={{base:"repeat(1, 1fr)" ,md:"repeat(3, 1fr)"}} mx={'auto'} gap={6}   mb={8}>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                   {data?.status==5?
                               <Text>List price</Text>
                               :
                               <Text>Sale price</Text>
}
                                   </Text>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {data?.price} ETH
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                   {data?.status==5?
                               <Text>Payment options</Text>
                               :
                               <Text> Sale type</Text>
}
                                      
                                   </Text>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                       {    
                                           
                                           data?.nft_payment_method.length==2?
                                           <Text>Buy now,Make offer</Text>
                                           :data?.nft_payment_method[0]=="buy"?
                                           <Text>Buy now </Text>
                                           :<Text>Make offer</Text>
                                       }
                                   </Text>
                               </Box>
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                   {data?.status==5?
                               <Text>Currencies</Text>
                               :
                               <Text>  Collector</Text>
}
                                      
                                   </Text>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   Crypto (ETH)
                                   </Text>
                               </Box>
                               
                           </Grid>
                           {data?.status==5?
                               <Box>
                                   <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                                      Listing Page
                                   </Text>
                                   <Link wordBreak="break-word"  href={'/GalleryStoreFront/'+ data?.galleryProfile } isExternal color={'#0F0EA7'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                                   {storefrontUrl}/{data?.galleryProfile} <ExternalLinkIcon mx='2px' />
                                   </Link>
                               </Box>
                               :null}


                       </Box>

     </>
 ) 
}
export default SALEINFORMATION
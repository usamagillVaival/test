import {Box,Text,Grid} from '@chakra-ui/react';

function ARTWORKDETAILS(props)
{
    const nftDetail=props?.data
    console.log(nftDetail)
 return (
     <>
    <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
    <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
        Artwork details
    </Text>
    <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
         Drafted by {nftDetail?.galleryName?nftDetail?.galleryName:"Unspecified "}  
        {nftDetail?.status==1 || nftDetail?.status==2?
        " and not approved yet"
        : 
        `and approved by ${nftDetail?.artistName}`
      }
    </Text>
</Box>

<Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
    <Grid marginTop='1rem' templateColumns={{base:"repeat(2, 1fr)",md:"repeat(3, 1fr)"}} mx={'auto'} gap={6}   mb={8}>
        <Box>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                Title
            </Text>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                {nftDetail?.title?nftDetail?.title:"Unspecified Title"}
            </Text>
        </Box>
        <Box>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                Artist
           
            </Text>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
            {nftDetail?.artistName?nftDetail?.artistName:"Unspecified Artist"}
            </Text>
        </Box>
        <Box>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                Gallery
            </Text>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                {nftDetail?.galleryName}
            </Text>
        </Box>
    </Grid>
    <Box>
        <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
            Description
        </Text>
        <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
            {nftDetail?.description?nftDetail?.description:"Unspecified description"}
        </Text>
    </Box>
</Box>
</>
 )
}
export default ARTWORKDETAILS;
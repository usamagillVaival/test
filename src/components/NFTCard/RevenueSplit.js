import {Box,Text,Grid} from '@chakra-ui/react';

function REVENUESPLIT(props)
{
    const nftDetail=props?.data
    return(
        <>
        <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
        <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
            Revenue split
        </Text>
        <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
            Drafted by {nftDetail?.galleryName} and {(nftDetail?.status==2 || nftDetail?.status==1)? <Text>waiting for approval</Text> :<Text>  approved by { nftDetail?.artistName}</Text>}
        </Text> 
    </Box>
    <Box width={{base:'100%',sm:'100%',md:'65%'}} p={8}>
        <Box>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'400'} mb={2}>
                Revenue split
            </Text>
            <Text color={'#636262'} fontSize={'14px'} fontWeight={'500'} mb={2}>
                {nftDetail?.revenueSplit?nftDetail   ?.revenueSplit:"Undefined Split"} %                          </Text>
        </Box>
    </Box>
    </>
    )
}
export default REVENUESPLIT;
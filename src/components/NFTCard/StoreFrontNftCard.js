import {Box,Text,Grid,Icon,Image,Button} from '@chakra-ui/react';
import { NFTCARD } from '..';
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
} from '../../assets/StyledComponent/styeledComponent';
function StoreFrontNftCard(props)
{

    const nftData=props?.data
   
   
 return (
    <Card   cursor={'pointer'} border={'none'} boxShadow={'none'} p={'0px'} alignItems={'flex-start'} >
    <Box  display={'flex'} alignItems={'center'} justifyContent={'center'}  bg={'#E6E6E6'} mb={'20px'} maxH={'246px'} minH={"246px"} width={'100%'}>
                       <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${nftData?.file}`} maxW={'100%'} width={'100%'} height='100%'  objectFit={'cover'} />
                   </Box>
    <Text color={'#636262'} fontSize={'18px'} fontWeight={'400'} lineHeight={'28px'} mb={1} textAlign={'left'} >{nftData?.title}</Text>
    <Text  color={'#363535'} fontSize={'18px'} lineHeight={'28px'} fontWeight={'500'}  mb={1} textAlign={'left'} >
        {nftData?.price} ETH
    </Text>
    <Box  mb={6} display={'flex'} alignItems={'center'}>
        <Icon mr={'5px'} width="12px" height="12px" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1C5.0111 1 4.0444 1.29324 3.22215 1.84265C2.3999 2.39206 1.75904 3.17295 1.3806 4.08658C1.00217 5.00021 0.90315 6.00555 1.09608 6.97545C1.289 7.94536 1.76521 8.83627 2.46447 9.53553C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1573 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67439 10.4712 3.40352 9.53383 2.46617C8.59648 1.52882 7.32561 1.00154 6 1V1ZM8.88625 4.41667L6.03417 8.28708C6.0005 8.33176 5.95826 8.36928 5.90993 8.39745C5.8616 8.42563 5.80814 8.4439 5.75268 8.45119C5.69721 8.45848 5.64085 8.45465 5.58688 8.43993C5.53291 8.4252 5.48241 8.39987 5.43833 8.36542L3.40167 6.73708C3.35893 6.70288 3.32335 6.6606 3.29696 6.61266C3.27057 6.56471 3.25387 6.51203 3.24784 6.45763C3.23565 6.34776 3.2676 6.23756 3.33667 6.15125C3.40574 6.06494 3.50626 6.00961 3.61612 5.99742C3.72599 5.98523 3.8362 6.01718 3.9225 6.08625L5.62083 7.445L8.21542 3.92375C8.24665 3.87688 8.28707 3.83683 8.33422 3.80601C8.38137 3.7752 8.43428 3.75427 8.48975 3.74448C8.54522 3.7347 8.6021 3.73626 8.65694 3.74907C8.71179 3.76189 8.76348 3.78569 8.80887 3.81904C8.85426 3.85239 8.89241 3.8946 8.92103 3.94312C8.94965 3.99163 8.96813 4.04544 8.97536 4.1013C8.9826 4.15716 8.97843 4.21391 8.96311 4.26811C8.9478 4.32232 8.92165 4.37285 8.88625 4.41667Z" fill="#CA9C00"/>
        </Icon>
        <Text color={'#797979'} fontWeight={'400'} fontSize={'14px'} lineHeight={'19px'}> Certified authentic</Text>
    </Box>
    <Button mb={3} bg='#0C0B86' color='#fff'  borderRadius={'0px'}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
            width={'100%'} onClick={() =>
    {
       props?.state1(true)
       props?.state2(nftData)

    }}>View details</Button>

</Card>
 )
}
export default StoreFrontNftCard;
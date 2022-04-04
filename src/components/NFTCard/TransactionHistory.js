import {Box,Text,Grid} from '@chakra-ui/react';
import {
    
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
    Td,
    Tr,
    Table,
    Thead,
    Th,
    Tbody,
    
    Link,Avatar,useColorModeValue,HStack,VStack
} from '@chakra-ui/react';
const scanLink = process.env.REACT_APP_SCAN_LINK;
function TRANSACTIONHISTORY(props)
{
    const data=props?.data
    const Date1=new Date(data?.createdAt)
    
    const Date2=new Date(data?.sendToArtistDate)
    
    const Date3=new Date(data?.artistApprovalDate)
    const Date4=new Date(data?.mint_date)
    const Date5= new Date(data?.listed_Date)
    const Date6=new Date(data?.sold_date)

return (
    <>
    <Box width={{base:'100%',sm:'100%',md:'35%'}} p={8}>
                           <Text color={'#363535'} fontSize={'20px'} fontWeight={'700'} mb={2}>
                               Transaction history
                           </Text>
                           <Text color={'#797979'} fontSize={'14px'} fontWeight={'400'} mb={2} >
                               All transactions related to this NFT
                           </Text>
                       </Box>
                       <Box width={{base:'100%',sm:'100%',md:'65%'}} overflowX={'scroll'} p={8}>
                           <Table variant='striped' colorScheme='gray' border={'1px solid #E6E6E6'} borderCollapse={'separate'} borderSpacing={'12px'} cellPadding={0} minW={'600px'} p={3} borderRadius={'12px'}>
                               <Thead p={3} >
                                   <Tr>
                                       <Th color={'#201F1F'} fontSize={'12px'} fontWeight={'700'}>Action</Th>
                                       <Th color={'#201F1F'} fontSize={'12px'} fontWeight={'700'} color={'#201F1F'}>Date</Th>
                                       <Th color={'#201F1F'} fontSize={'12px'} fontWeight={'700'} color={'#201F1F'} textAlign={'end'}>Link</Th>
                                   </Tr>
                               </Thead>
                               <Tbody p={3} >
                                   
                                   {data?.status==6 ?
                                   <Tr>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Sold</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date6?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} ><Link  isExternal href={`${scanLink}tx/${data?.buying_hash}`} color={'#0F0EA7'} 
                                       >View on Etherscan</Link></Td>
                                   </Tr>
                                   :null}
                                   {data?.status==5 || data?.status==6?
                                   <Tr>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Listed</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date5?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} isNumeric><Link isExternal href={`${scanLink}tx/${data?.listing_hash}`} color={'#0F0EA7'}>View on Etherscan</Link></Td>
                                   </Tr>
                                   :null}
                                   {data?.status==5 || data?.status==6 ||data?.status==4 ?
                                   
                                   <Tr>
                                       <Td  color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Minted</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date4?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} isNumeric><Link isExternal href={`${scanLink}tx/${data?.mint_hash}`} color={'#0F0EA7'}>View on Etherscan</Link></Td>
                                   </Tr>
                                   :null}
                                   {data?.status==5 || data?.status==6 ||data?.status==4  || data?.status==3?
                                     <Tr>
                                       <Td  color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Approved</Td>

                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date3?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} isNumeric>-</Td>
                                       
                                   </Tr>
                                   :null}
                                   {data?.status==5 || data?.status==6 ||data?.status==4  || data?.status==3 || data?.status==2?
                                   <Tr>
                                       <Td  color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Sent to artist</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date2?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} isNumeric>-</Td>
                                   </Tr>
                                   :null}
                                   {(data?.status==5 || data?.status==6 ||data?.status==4  || data?.status==3 || data?.status==2 || data?.status==1) ?
                                   <Tr>
                                       <Td  color={'#201F1F'} fontSize={'12px'} fontWeight={'500'}>Drafted</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'400'}>{Date1?.toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})}</Td>
                                       <Td color={'#201F1F'} fontSize={'12px'} fontWeight={'500'} textAlign={'end'} isNumeric>-</Td>

                                        </Tr>
                                   :null}
                                   
                               </Tbody>
                           </Table>
                       </Box>
                       </>
)
}
export default TRANSACTIONHISTORY;
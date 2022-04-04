import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Heading,
    RadioGroup,
    Stack,
    Icon,
    Image,
    Spacer,
    FormLabel,
    FormControl ,
    RadioCard ,
    Box,
    Radio,
    Badge,
    ChakraProvider,
    Flex , Input , FormHelperText
    ,InputGroup ,InputRightElement ,  Button, Container , Grid, GridItem ,Text ,Link} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'




const TableComnponent=()=>{

    return(
        <>
            <Box overflowX={'scroll'}>
                <Table border={'1px solid #C4C4C4'} borderCollapse={'separate'} borderSpacing={'0'} cellPadding={0} cellPadding={0} p={0} borderRadius={'12px'}>
                    <Thead borderBottom={'1px solid #C4C4C4'}>
                        <Tr>
                            <Th fontSize={'1.12rem'} color={"#1A1A1A"} textTransform={'captilize'} width={'38%'}>Gallery Information</Th>
                            <Th textAlign={'right'}>
                                <Button  mr='auto' fontSize='1rem' px='1rem' border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   leftIcon={<svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.82867 11H0V8.17134L7.62333 0.548005C7.74835 0.423024 7.91789 0.352814 8.09467 0.352814C8.27144 0.352814 8.44098 0.423024 8.566 0.548005L10.452 2.434C10.577 2.55902 10.6472 2.72856 10.6472 2.90534C10.6472 3.08211 10.577 3.25165 10.452 3.37667L2.82867 11ZM0 12.3333H12V13.6667H0V12.3333Z" fill="#4D4D4D"/>
                                </svg>
                                } marginLeft='auto' >Edit</Button>
                            </Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr bg={'#F2F2F2'}>
                            <Td color={'#333333'} fontSize={'16px'}>Gallery Name</Td>
                            
                            <Td fontWeight={'600'}><Input placeholder='Enter' type='text' width={'100%'} border='none' bg={'transparent'} _focus={{'border':'none'}}/></Td>

                        </Tr>
                        <Tr>
                            <Td  color={'#333333'} fontSize={'16px'}>Address</Td>
                            <Td fontWeight={'600'}>318 Worth Ave, Palm Beach, FL 33480</Td>
                        </Tr>
                        <Tr  bg={'#F2F2F2'}>
                            <Td  color={'#333333'} fontSize={'16px'}>Phone Number</Td>
                            <Td fontWeight={'600'}>(561) 720-2079</Td>
                        </Tr>
                        <Tr>
                            <Td  color={'#333333'} fontSize={'16px'}>Email Address</Td>
                            <Td fontWeight={'600'}>info@adelsongalleries.com</Td>
                        </Tr>
                        <Tr  bg={'#F2F2F2'}>
                            <Td  color={'#333333'} fontSize={'16px'}>Website</Td>
                            <Td fontWeight={'600'}> https://www.adelsongalleries.com</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>

                        </Tr>
                    </Tfoot>
                </Table>


            </Box>
        </>
    )
}
export default TableComnponent;
import React , { useState }  from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider
} from "@chakra-ui/react";
import {ArrowForwardIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card,CardHeading,CustomBadge,StepsCircle,StepsProgress,StepsMain, RadioLabel , RadoInput,WrapperCS,ItemCS,RadioButtonLabelCS,RadioButtonCS,} from '../../../assets/StyledComponent/styeledComponent';
import Avatar from "../../../assets/images/cardIMG1.png";
// import Avatar from '../../assets/images/avatar.png';
import '../../../pages/Signup/SignUp.scss';
import ArtistStep2 from '../ArtistDashboard/ArtistSteps/ArtistStep2';
import ArtistStep4 from '../ArtistDashboard/ArtistSteps/ArtistStep4';


function ArtistDashboard(props) {

    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box backgroundColor="#F2F2F2" display={'flex'} justifyContent={'center'} alignItems={'center'} py={15} px={12} minH={'136'}>
                    <Flex w={'100%'}>
                        <Box mr={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="700" fontSize="30px">Artists</Heading>
                            <Text color={'#808080'} fontWeight={'400'} fontSize={'14px'}>Artists you manage through your Gallery</Text>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center">
                                <Button bg='#0048FF' color='#fff'>
                                   + New Artist
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
                <Box h={'100%'} px={'24px'}>
                    <Tabs>
                        <TabList px={12}  backgroundColor="#F2F2F2" >
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>All Artist</Tab>
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Invited Artists</Tab>
                            <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Manually Added By You</Tab>

                        </TabList>
                        <TabPanels px={12}  h={'100%'} mb={10}>
                            <TabPanel  m={5}  color={'#000'} h={'100%'} py={8}>
                               <Box display={'flex'} flexDirection='column'>
                                   <Box width={'80%'} m={'auto'}>
                                       <StepsMain>
                                           <StepsProgress width='0%'></StepsProgress>
                                           <StepsCircle  left='0%' bgBLue>1</StepsCircle>
                                           <StepsCircle left='33.33%'>2</StepsCircle>
                                           <StepsCircle left='66.66%'>3</StepsCircle>
                                           <StepsCircle left='98.99%'>4</StepsCircle>
                                       </StepsMain>
                                   </Box>
                                   <Box width={'100%'} m={'auto'} mb={10}>
                                       <Grid templateColumns="repeat(4, 1fr)" gap={10} >
                                           <Box textAlign={'center'}  position={'relative'} py={5}><Text position={'absolute'} left={'35%'} fontSize={'16px'} fontWeight={'600'} color={'#000'}>Select artist</Text></Box>
                                           <Box textAlign={'center'} position={'relative'} py={5}><Text position={'absolute'} left={'40%'} fontSize={'16px'} fontWeight={'600'} color={'#000'}>Enter details</Text></Box>
                                           <Box textAlign={'center'} position={'relative'} py={5}><Text position={'absolute'} left={'35%'} fontSize={'16px'} fontWeight={'600'} color={'#000'}>Upload image</Text></Box>
                                           <Box textAlign={'right'} position={'relative'} py={5}><Text position={'absolute'} left={'45%'} fontSize={'16px'} fontWeight={'600'} color={'#000'}>Mint as NFT</Text></Box>
                                       </Grid>
                                   </Box>
                                   <Box  width={'90%'} m={'auto'} mb={5}>
                                       <Text mt={4} mb={2} color={'#000000'} fontSize={'1.5rem'} fontWeight={'400'}>Search for the artist whose work you would like to mint as an NFT.</Text>
                                       <InputGroup mr={3} maxW={'300px'}>
                                           <InputLeftElement pointerEvents="none" children={<SearchIcon color="#969696" />} />
                                           <Input type="text" placeholder="Search" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />
                                       </InputGroup>
                                       <Box mt={5}>
                                           <Table border={'1px solid #E2E8F0'} borderCollapse={'separate'} borderSpacing={'0'} cellPadding={0} cellPadding={0} p={0} borderRadius={'12px'}>
                                               <Thead bg={'#F2F2F2'} borderBottom={'1px solid #C4C4C4'}>
                                                   <Tr bg={'#F8FAFC'}>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}>Artist</Th>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}>Title</Th>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}>NFT Minting</Th>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}>USD</Th>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}>ETH</Th>
                                                       <Th fontSize={'12px'} color={'#4A5568'} fontWeight={'700'}></Th>
                                                   </Tr>
                                               </Thead>
                                               <Tbody>

                                                   <Tr>
                                                       <Td  color={'#333333'} fontSize={'14px'} fontWeight={'500'} color={'#1A202C'}>
                                                           Steven Spazuk
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'} display={'flex'} alignItems={'center'} justifyContent={'start'}>
                                                           <Box   my={'auto'}>
                                                               <Text  fontWeight={'400'} fontSize={'14px'} color={'#1A202C'}  >Untitled No. 1</Text>
                                                           </Box>
                                                           <Box  pl={'1.5em'}>
                                                               <Image src={Avatar} maxW={'150px'}/>
                                                           </Box>
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'}>  <Badge ml="1" colorScheme="green" background={'#15A33610'}> PUBLISHED</Badge></Td>
                                                       <Td color={'#4D4D4D'}  >24</Td>
                                                       <Td color={'#0039CC'} ></Td>
                                                       <Td color={'#3182CE'} ><Link fontWeight={'600'}>Edit</Link></Td>                                                   </Tr>
                                                   <Tr>
                                                       <Td   color={'#333333'} fontSize={'14px'} fontWeight={'500'} color={'#1A202C'}>
                                                           Steven Spazuk
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'} display={'flex'} alignItems={'center'} justifyContent={'start'}>
                                                           <Box   my={'auto'}>
                                                               <Text fontWeight={'400'} fontSize={'14px'} color={'#1A202C'} >Untitled No. 1</Text>
                                                           </Box>
                                                           <Box  pl={'1.5em'}>
                                                               <Image src={Avatar} maxW={'150px'}/>
                                                           </Box>
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'}>
                                                           <Badge ml="1" colorScheme="green" background={'#15A33610'}> PUBLISHED</Badge>
                                                       </Td>
                                                       <Td color={'#1A202C'} fontWeight={'400'}  fontSize={'14px'}   >$13,000</Td>
                                                       <Td color={'#0039CC'} ></Td>
                                                       <Td color={'#3182CE'} ><Link fontWeight={'600'}>Edit</Link></Td>                                                   </Tr>
                                                   <Tr>
                                                       <Td   color={'#333333'} fontSize={'14px'} fontWeight={'500'} color={'#1A202C'}>
                                                           Steven Spazuk
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'} display={'flex'} alignItems={'center'} justifyContent={'start'}>
                                                           <Box my={'auto'}>
                                                               <Text  fontWeight={'400'} fontSize={'14px'} color={'#1A202C'}  >Untitled No. 1</Text>
                                                           </Box>
                                                           <Box  pl={'1.5em'}>
                                                               <Image src={Avatar} maxW={'150px'}/>
                                                           </Box>
                                                       </Td>

                                                       <Td  color={'#333333'} fontSize={'16px'}>  <Badge ml="1" color="#7B341E" background={'#FEEBC8'}> REVIEWING</Badge></Td>
                                                       <Td color={'#1A202C'} fontWeight={'400'}  fontSize={'14px'}  >$240,787</Td>
                                                       <Td color={'#0039CC'} ></Td>
                                                       <Td color={'#3182CE'} ><Link fontWeight={'600'}>Edit</Link></Td>
                                                   </Tr>
                                                   <Tr>

                                                       <Td   color={'#333333'} fontSize={'14px'} fontWeight={'500'} color={'#1A202C'}>
                                                           Steven Spazuk
                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'} display={'flex'} alignItems={'center'} justifyContent={'start'}>
                                                           <Box  my={'auto'}>
                                                               <Text  fontWeight={'400'} fontSize={'14px'} color={'#1A202C'}  >Untitled No. 1</Text>
                                                           </Box>
                                                           <Box  pl={'1.5em'}>
                                                               <Image src={Avatar} maxW={'150px'}/>
                                                           </Box>

                                                       </Td>
                                                       <Td  color={'#333333'} fontSize={'16px'}>  <Badge ml="1" color="#0048FF" background={'#E2E8F0'}> SUBMITTED</Badge></Td>
                                                       <Td color={'#1A202C'} fontWeight={'400'}  fontSize={'14px'} >$120,00</Td>
                                                       <Td color={'#0039CC'} ></Td>
                                                       <Td color={'#3182CE'} ><Link fontWeight={'600'}>Edit</Link></Td>                                                   </Tr>

                                               </Tbody>
                                               <Tfoot>
                                                   <Tr>

                                                   </Tr>
                                               </Tfoot>
                                           </Table>

                                       </Box>
                                   </Box>
                                   <Divider/>
                                   <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                       <Box display='flex' mb={'3'}>
                                           <Button ml={'auto'} bg='#0048FF' color='#fff' _focus={{ bg: "#0048FF", }}  _hover={{ bg: "#0048FF", }} _active={{ bg: "#0048FF", }} rightIcon={<ArrowForwardIcon />}  >Next</Button>
                                       </Box>
                                   </Grid>
                               </Box>
                                <Box  width={'90%'} m={'auto'} mb={5}>
                                    <ArtistStep2/>
                                    <ArtistStep4/>
                                </Box>


                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>three!</p>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                </Box>

            </Box>

        </>

    );
}

export default ArtistDashboard;

import React , { useState }  from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider
} from "@chakra-ui/react";
import {ArrowForwardIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {Card,CardHeading,CustomBadge,StepsCircle,StepsProgress,StepsMain, RadioLabel , RadoInput,WrapperCS,ItemCS,RadioButtonLabelCS,RadioButtonCS,} from '../../../../assets/StyledComponent/styeledComponent';
import Avatar from "../../../../assets/images/cardIMG1.png";
// import Avatar from '../../assets/images/avatar.png';
import '../../../Signup/SignUp.scss';


function ArtistStep4(props) {

    return (
        <>
            <Box display={'flex'} flexDirection='column'>
                <Box width={'80%'} m={'auto'}>
                    <StepsMain>
                        <StepsProgress width='99.99%'></StepsProgress>
                        <StepsCircle  left='0%' bgBLue>1</StepsCircle>
                        <StepsCircle left='33.33%' bgBLue>2</StepsCircle>
                        <StepsCircle left='66.66%' bgBLue>3</StepsCircle>
                        <StepsCircle left='98.99%' bgBLue>4</StepsCircle>
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

            </Box>
            <Box  width={'90%'} m={'auto'} mb={5}>
                <Box md={4}>
                    <Heading color={'#171923'} fontSize={'2rem'} mb={4}fontWeight={'700'}>Artwork information</Heading>
                    <Text color={'#4A5568'} fontSize={'1rem'} mb={4} fontWeight={'400'}>Tellus ipsum ridiculus tempor ultricies. Felis nec eget nisi malesuada fringilla. Sit id.</Text>
                    <Divider mb={4}/>
                </Box>
                <Box display={'flex'} pt={20}>
                    <Grid templateColumns="repeat(1, 1fr)" gap={6} width={'40%'}  m={'auto'}  >
                        <Box d={'flex'} alignItems={'center'} justifyContent={'center'}>
                            <Image src={Avatar} maxW={'200px'} />
                        </Box>
                        <Box>
                            <Flex templateColumns="repeat(2, 1fr)" gap={6}   m={'auto'}  >
                                <Box display={'flex'} alignItems={'center'} justifyContent={'end'} width={'70%'}>
                                    <Text>Steven Spazuk<br/>
                                        Tiger<br/>
                                        2020<br/>
                                        Animation<br/>
                                        size<br/>
                                        Ed. 1/1<br/>
                                        $6000<br/>
                                        3.3 ETH</Text>
                                </Box>
                                <Box width={'30%'}> <Box display='flex' mb={'3'}>
                                    <Button ml={'auto'} bg='#0048FF' color='#fff' _focus={{ bg: "#0048FF", }}  _hover={{ bg: "#0048FF", }} _active={{ bg: "#0048FF", }}  >Edit</Button>
                                </Box></Box>
                            </Flex>
                        </Box>
                        <Box pt={10}>
                            <Button w={'100%'} ml={'auto'} bg='#0048FF' color='#fff' _focus={{ bg: "#0048FF", }}  _hover={{ bg: "#0048FF", }} _active={{ bg: "#0048FF", }}   >Mint NFT</Button>
                        </Box>

                    </Grid>


                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} width={'90%'}  m={'auto'}  >
                    <Box>

                    </Box>
                    <Box>

                    </Box>

                </Grid>





            </Box>

        </>

    );
}

export default ArtistStep4;

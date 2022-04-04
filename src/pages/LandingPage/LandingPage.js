import React , { useState }  from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider , Container
} from "@chakra-ui/react";
import StoreFrontHeader from "../../components/StoreFrontHeader/LandingPageHeader";
import Footer from "../../components/Footer/Footer";
import {RobotoHeading } from '../../assets/StyledComponent/styeledComponent';
import Card1 from '../../assets/images/card1.jpg';
import Card2 from '../../assets/images/card2.png';
import Card3 from '../../assets/images/card3.png';
import SideImg  from '../../assets/images/sideImg.png';
import ArtistStoreFront from "../Artists/ArtistStoreFront";


function LandingPage(props) {

    return (
        <>
            <Box display={'flex'} flexDirection={'column'}>
                <Box width={'100%'} px={'2rem'}>
                   <StoreFrontHeader/>
                   <Divider borderBottomWidth={'12px'}/>
                    <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}} gap={12}  py={'3rem'}>
                        <Box py={'2rem'}>
                            <Box width={'80%'}>
                                <RobotoHeading fontWeight={'400'} fontSize={'36px'} color={'#000'} >Premium NFT minting, curation<br/> and sales for experienced<br/> galleries, art collectors, and<br/> museum-quality artists.
                                </RobotoHeading>
                                <Text mt={6} mb={4} color={'#000'} fontWeight={'400'} >  Create and sell fine crypto art with ease.</Text>
                                <Link mb={4} color={'#000'} fontWeight={'700'} >  LEARN MORE</Link>

                            </Box>

                        </Box>
                        <Box>
                            <Box width={'100%'} height={'100%'} bg={'#EBEBEB'} borderRadius={'0.5rem'}>

                            </Box>
                        </Box>
                    </Grid>
                    <Box>
                        <RobotoHeading fontWeight={'400'} fontSize={'3rem'} color={'#1A202C'} >Current exhibitions</RobotoHeading>
                    </Box>
                    <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)" }} gap={12}  py={'3rem'}>
                        <Box py={'2rem'}>
                            <Image src={Card1} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>CUBE ART</Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                            <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #000' bg='#fff' color='#000' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}  marginLeft='auto' marginRight={'1rem'} fontWeight={'700'} fontSize={'16px'}>VIEW EXHIBITION</Button>
                        </Box>
                        <Box py={'2rem'}>
                            <Image src={Card2} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>RAINDROPS </Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                            <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #000' bg='#fff' color='#000' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}  marginLeft='auto' marginRight={'1rem'} fontWeight={'700'} fontSize={'16px'}>VIEW EXHIBITION</Button>
                        </Box>
                        <Box py={'2rem'}>
                            <Image src={Card3} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>PROFILE ART</Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                            <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #000' bg='#fff' color='#000' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}  marginLeft='auto' marginRight={'1rem'} fontWeight={'700'} fontSize={'16px'}>VIEW EXHIBITION</Button>
                        </Box>

                    </Grid>
                    <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(1, 1fr)", lg:"repeat(2, 1fr)"  }} gap={0}  py={'3rem'}>
                        <Box bg={'#EBEBEB'} py={'3rem'} pl={'3em'} pr={'1.5em'} display={'flex'} alignItems={'start'} justifyContent={'center'} flexDirection={'column'}>
                            <Heading  marginY={'1rem'}>Create Fine Crypto Art<br/>
                                with DadaVault</Heading>
                            <Button borderRadius={'0px'} textAlign={'center'} border='1px solid #000' bg='transparent' color='#000' _focus={{ bg: "transparent", }}  _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }}   marginRight={'1rem'} fontWeight={'700'} fontSize={'16px'}>VIEW EXHIBITION</Button>


                        </Box>
                        <Box>
                            <Image src={SideImg} h={'100%'}  width={'100%'}/>
                        </Box>

                    </Grid>
                    <Box>
                        <RobotoHeading fontWeight={'400'} fontSize={'3rem'} color={'#1A202C'} >Featured artists</RobotoHeading>
                    </Box>
                    <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)" }} gap={12}  py={'3rem'}>
                        <Box py={'2rem'}>
                            <Image src={Card1} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>CUBE ART</Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </Box>
                        <Box py={'2rem'}>
                            <Image src={Card2} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>RAINDROPS </Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </Box>
                        <Box py={'2rem'}>
                            <Image src={Card3} w={'100%'}/>
                            <Heading marginY={'1rem'}  color={'#000'} fontWeight={'700'} fontSize={'20px'}>PROFILE ART</Heading>
                            <Text  marginY={'1rem'}  color={'#000'} fontWeight={'400'} fontSize={'18px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
                        </Box>

                    </Grid>
                    <Box>
                        <RobotoHeading fontWeight={'400'} fontSize={'3rem'} color={'#1A202C'} >Featured categories</RobotoHeading>
                    </Box>
                    <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)", lg:"repeat(3, 1fr)" }} gap={12}  py={'3rem'}>
                        <Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                        </Box> <Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                        </Box> <Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                            <Box width={'100%'} h={'157px'} bg={'#C4C4C4'} my={2}> </Box>
                        </Box>
                    </Grid>


                </Box>
                <Box  py={'4rem'} px={'2rem'} bg={'#F8FAFC'}>
                <Footer/>
            </Box>
            </Box>

        </>

    );
}

export default LandingPage;

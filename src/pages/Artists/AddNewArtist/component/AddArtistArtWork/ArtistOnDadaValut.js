import React from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image, Select, Divider,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, FormLabel,Textarea ,
} from "@chakra-ui/react";
import image1 from '../../../../../assets/images/image1.png';
import image12 from '../../../../../assets/images/managNFT.png';
import Slider from "react-slick";

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import {BioRymHeading} from "../../../../../assets/StyledComponent/styeledComponent";
import Preview from "../../../../../assets/images/image1.png";
import {NFTCARD} from "../../../../../components";


function ArtistOnDadaValut(props) {
    const setting = {
        position:'relative',
        dots: false,
        arrows:true,
        speed: 500,
        autoplay:false,
        centerMode: false,
        slidesToShow: 4,
        nextArrow: <MainNextArrow />,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
        {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    autoplay:true,
                    slidesToScroll: 1,

                }
            },


        ]
    };

    function MainNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className='mainslider_nextarrow' onClick={onClick}
            >

                <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.69739 12.5L0.416138 3.21876L3.06739 0.567505L14.9999 12.5L3.06739 24.4325L0.416138 21.7813L9.69739 12.5Z" fill="#4D4D4D"/>
                </svg>

            </div>
        );
    }
    function MainPrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className='mainslider_prevarrow' onClick={onClick} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12.5" viewBox="0 0 20 12.5">
                    <g transform="translate(0)">
                        <g transform="translate(0 0)">
                            <path fill='#3e4559'
                                  d="M.283,5.458c-.012.015-.022.03-.034.045s-.027.035-.039.054-.022.036-.033.055-.02.033-.03.05S.129,5.7.12,5.718.1,5.753.1,5.772s-.014.037-.021.056-.015.039-.021.059-.01.038-.015.057-.011.041-.015.062-.007.044-.01.066-.006.036-.008.055a1.253,1.253,0,0,0,0,.247c0,.019.005.036.008.055s.006.044.01.066.01.041.015.062.009.038.015.057.014.04.021.059.013.038.021.056.017.036.025.054.017.038.027.057.02.033.03.05.021.037.033.055S.236,6.98.25,7s.022.03.034.045q.038.047.081.09h0l5,5a1.25,1.25,0,1,0,1.768-1.768L4.268,7.5H18.75a1.25,1.25,0,1,0,0-2.5H4.268L7.134,2.134A1.25,1.25,0,0,0,5.366.366l-5,5h0Q.322,5.411.283,5.458Z"
                                  transform="translate(0 0)"/>
                        </g>
                    </g>
                </svg>

            </div>
        );
    }

    return (
        <>
            <Box width={'95%'} pt={'2rem'} pb={'2rem'} m={'auto'}>
                <Box display={{base:'block',md:'flex'}}>
                    <Heading fontSize={'1.5rem'} fontWeight={'400'} color={'#000'}>
                        Browse our database
                    </Heading>
                    <FormLabel ml={'auto'} fontSize={'1.5rem'} fontWeight={'400'} color={'#C4C4C4'}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</FormLabel>

                </Box>
                <Flex flexWrap={'wrap'}>
                    <Box width={{base:'100%',md:'40%'}} px={6} pl={0} pe={{base:0,md:6}}>
                        <Grid templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:'repeat(1, 1fr)'}} gap={8}  pt={'3rem'} color={'#000'}>
                            <Box>
                                <Image src={image12}  w={'100%'} maxW={'100%'} />
                            </Box>
                            <Box>
                                <Image src={image12}  w={'100%'} maxW={'100%'} />
                            </Box>

                        </Grid>
                    </Box>
                    <Box width={{base:'100%',md:'60%'}}  px={6}  pe={0} pl={{base:0,md:6}}>
                        <Grid templateColumns={{base:"repeat(1, 1fr)",sm:"repeat(2, 1fr)"}} gap={8}  pt={'3rem'} color={'#000'}>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box> <Box>
                            <Image src={image1} w={'100%'} maxW={'100%'} />
                        </Box>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box> <Box>
                            <Image src={image1} w={'100%'} maxW={'100%'} />
                        </Box>
                            <Box>
                                <Image src={image1} w={'100%'} maxW={'100%'} />
                            </Box>

                        </Grid>
                    </Box>
                </Flex>
            </Box>

            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'2rem'}>
                <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(2, 1fr)'}} gap={6}  pt={'3rem'}>
                    <Box display={{base:'block', md:'flex',lg:'block ' , xl:'flex' }}>
                        <Image src={Preview} pr={4} width={'120px'} height={'86px'} />
                        <Box>
                            <Heading wordBreak={'break-word'}>Magdalena Murua</Heading>
                            <Text fontSize={'1.5rem'} mb={'1rem'}>Argentinian, b. 1975</Text>
                            <Button mb={2}  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                    marginLeft='auto' marginRight={'1rem'} >Follow</Button>
                            <Button mb={2} bg='#0048FF' color='#fff'_focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                    fontWeight={'600'} fontSize={'16px'}>
                                <Icon width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.3332 14.6665H0.666504V13.3332C0.666504 12.4491 1.01769 11.6013 1.64281 10.9761C2.26794 10.351 3.11578 9.99984 3.99984 9.99984H7.99984C8.88389 9.99984 9.73174 10.351 10.3569 10.9761C10.982 11.6013 11.3332 12.4491 11.3332 13.3332V14.6665ZM5.99984 8.6665C5.47455 8.6665 4.95441 8.56304 4.4691 8.36202C3.9838 8.161 3.54284 7.86637 3.17141 7.49493C2.79998 7.1235 2.50534 6.68254 2.30432 6.19724C2.1033 5.71194 1.99984 5.19179 1.99984 4.6665C1.99984 4.14122 2.1033 3.62107 2.30432 3.13577C2.50534 2.65047 2.79998 2.20951 3.17141 1.83808C3.54284 1.46664 3.9838 1.172 4.4691 0.970986C4.95441 0.769967 5.47455 0.666504 5.99984 0.666504C7.0607 0.666504 8.07812 1.08793 8.82826 1.83808C9.57841 2.58822 9.99984 3.60564 9.99984 4.6665C9.99984 5.72737 9.57841 6.74479 8.82826 7.49493C8.07812 8.24508 7.0607 8.6665 5.99984 8.6665Z" fill="white"/>
                                </Icon>
                                Invite Artist
                            </Button>
                        </Box>

                    </Box>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Text pb={'2rem'}>
                            Bio
                        </Text>
                        <Text pb={'2rem'}>
                            Magdalena Murúa was born in Buenos Aires, Argentina, where she lives and works. She studied at the Argentina School of Photography and has worked with painters like Roberto Scafidi, Roberto Fernández and Paula Socolovsky. Murúa works in a collage style, using pop-culture media, often comic …
                        </Text>


                    </Box>

                </Grid>


            </Box>
            <Box>
                <Tabs>
                    <TabList px={{base: '1', sm:'4', md: '6', lg: '12' }}   backgroundColor="#fff" >
                        <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Overview</Tab>
                        <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>For sale  9</Tab>
                        <Tab color={'#666666'} fontSize={'16px'} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Sales results</Tab>

                    </TabList>
                    <TabPanels px={{base: '1', sm:'4', md: '6', lg: '12' }}  h={'100%'} mb={10}>
                        <TabPanel m={5}  color={'#000'} h={'100%'} py={8} borderRadius={'1rem'}>
                            <p>hello1</p>
                        </TabPanel>
                        <TabPanel m={5}  color={'#000'} h={'100%'} py={8} borderRadius={'1rem'}>

                            <Slider {...setting}>
                                <Box p={2}>
                                    <NFTCARD/>
                                </Box>
                                <Box p={2}>
                                    <NFTCARD/>
                                </Box>
                                <Box p={2}>
                                    <NFTCARD/>
                                </Box>
                                <Box p={2}>
                                    <NFTCARD/>
                                </Box>
                                <Box p={2}>
                                    <NFTCARD/>
                                </Box>
                            </Slider>



                        </TabPanel>
                        <TabPanel m={5}  color={'#000'} h={'100%'} py={8} borderRadius={'1rem'}>
                            <p>hello3</p>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </>

    );
}

export default ArtistOnDadaValut;

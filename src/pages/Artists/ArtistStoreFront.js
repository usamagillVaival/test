import React , { useState }  from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider , Container
} from "@chakra-ui/react";
import ArtistLogo from '../../assets/images/AstistLogo.png';
import ImgSLider from '../../assets/images/imgSlider.png';
import {BioRymHeading,NFTCustomCard} from '../../assets/StyledComponent/styeledComponent';
import cardImge from "../../assets/images/cardimg.png";

import {Link as ReachLink} from "@reach/router";
function ArtistStoreFront(props) {

    return (
        <>
            <Box display={'flex'} flexDirection={'column'} py={'1.5rem'} px={'2rem'} width={'100%'}>
                <Box>
                    <Link>
                        <Image src={ArtistLogo} />
                    </Link>
                </Box>
                <Flex px={{base:'1rem',md:'4rem'}} flexWrap={'wrap'} my={4}>
                    <Box width={{base:'100%',md:'50%'}} px={'1rem'} display={'flex'} >
                        <Box display={'flex'} alignItems={'start'} m={'auto'} justifyContent={'start'} flexDirection={'column'}>
                            <Heading fontWeight={'700'} fontSize={'2.25rem'} color={'#4D4D4D'} mb={'1rem'}>ADELSON GALLERIES</Heading>
                            <Heading fontWeight={'700'} fontSize={'1.80rem'} color={'#4D4D4D'} mb={'1rem'}>Fine Art NFTs</Heading>

                        </Box>
                    </Box>
                    <Box width={{base:'100%',md:'50%'}}>
                        <Image src={ImgSLider}/>
                    </Box>
                </Flex>

                <Container maxW="container.xl">
                    <BioRymHeading  px={'4rem'} mb={'1rem'} textAlign={'left'}>Current Exhibitions</BioRymHeading>
                    <Container maxW="container.lg">
                        <Grid  templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(3, 1fr)" }} gap={12}  py={'3rem'} width={'90%'}>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                        </Grid>


                    </Container>
                </Container>
                <Container maxW="container.xl" mb={'8rem'}>
                    <BioRymHeading  px={'4rem'} mb={'1rem'} textAlign={'left'}>Explore</BioRymHeading>
                    <Container maxW="container.lg">
                        <Grid  templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(3, 1fr)" }} gap={12}  py={'3rem'} width={'90%'}>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                            <NFTCustomCard>
                                <Image src={cardImge}/>
                                <Heading fontSize={'16px'} mb={3} fontWeight={'700'} color={'#333'} textAlign={'center'}> Activistes</Heading>
                                <Text mb={3}  fontSize={'14px'} fontWeight={'400'} color={'#666666'} textAlign={'center'}>Steven Spazuk
                                    <Icon ml={2} width={"11px"} height={"10"} viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 10C2.7385 10 0.5 7.7615 0.5 5C0.5 2.2385 2.7385 0 5.5 0C8.2615 0 10.5 2.2385 10.5 5C10.5 7.7615 8.2615 10 5.5 10ZM5.0015 7L8.5365 3.4645L7.8295 2.7575L5.0015 5.586L3.587 4.1715L2.88 4.8785L5.0015 7Z" fill="#2E69FF"/>
                                    </Icon>
                                </Text>
                                <Text mb={3} > <Icon width={"19"} height={"19"} mr={2} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.58329 0.75L16.8325 1.92917L18.0108 10.1792L10.3508 17.8392C10.1945 17.9954 9.98259 18.0832 9.76162 18.0832C9.54065 18.0832 9.32873 17.9954 9.17246 17.8392L0.922456 9.58917C0.76623 9.43289 0.678467 9.22097 0.678467 9C0.678467 8.77903 0.76623 8.56711 0.922456 8.41083L8.58329 0.75ZM10.94 7.82167C11.0948 7.97641 11.2785 8.09914 11.4807 8.18287C11.683 8.26659 11.8997 8.30967 12.1186 8.30963C12.3375 8.30959 12.5542 8.26644 12.7564 8.18264C12.9586 8.09885 13.1423 7.97605 13.297 7.82125C13.4518 7.66645 13.5745 7.4827 13.6582 7.28047C13.742 7.07824 13.785 6.8615 13.785 6.64262C13.785 6.42375 13.7418 6.20702 13.658 6.00482C13.5742 5.80262 13.4514 5.61891 13.2966 5.46417C13.1418 5.30943 12.9581 5.18669 12.7558 5.10296C12.5536 5.01924 12.3369 4.97617 12.118 4.97621C11.676 4.97629 11.2521 5.15196 10.9395 5.46458C10.627 5.77721 10.4515 6.20117 10.4516 6.64321C10.4517 7.08525 10.6273 7.50915 10.94 7.82167Z" fill="#666666"/>
                                </Icon>

                                    $4,500
                                </Text>
                                <Button  mb={3}  variant="outline" borderRadius={'2rem'} minW={'170px'} borderColor={'#0039CC'} color={'#0039CC'}><Link  as={ReachLink} to='/NFTdetail'>View NFT</Link></Button>
                            </NFTCustomCard>
                        </Grid>


                    </Container>
                </Container>
                <Flex  px={'4rem'}>
                    <Text color={'#000'} fontWeight={'1rem'} fontWeight={'500'} ><Icon width="24px" height="23px" mr={'1rem'} viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3009 8.53251C17.3009 13.2449 13.428 17.065 8.65047 17.065C3.87295 17.065 0 13.2449 0 8.53251C0 3.82013 3.87295 0 8.65047 0C13.428 0 17.3009 3.82013 17.3009 8.53251ZM18.0009 11.3607C18.4689 9.85319 18.5549 8.25548 18.2513 6.70759C19.523 7.27804 20.6356 8.14392 21.4939 9.23111C22.3522 10.3183 22.9307 11.5944 23.1798 12.9503C23.4289 14.3062 23.3412 15.7014 22.9243 17.0165C22.5074 18.3317 21.7736 19.5276 20.7858 20.502C19.798 21.4763 18.5855 22.2001 17.2522 22.6113C15.9189 23.0226 14.5044 23.109 13.1297 22.8633C11.7551 22.6176 10.4614 22.047 9.35913 21.2004C8.25691 20.3538 7.37906 19.2564 6.80072 18.002C8.37001 18.3015 9.98981 18.2167 11.5181 17.755C13.0465 17.2934 14.4367 16.4691 15.5669 15.3542C16.6972 14.2394 17.5329 12.8682 18.0009 11.3607Z" fill="#F1DE0E"/>
                    </Icon>
                        Supported by DadaVault
                    </Text>
                </Flex>
            </Box>





        </>

    );
}

export default ArtistStoreFront;

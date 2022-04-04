import React from "react";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"

import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image, Select, Divider,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, FormLabel
} from "@chakra-ui/react";
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard
} from '../../../assets/StyledComponent/styeledComponent';


import {NFTCARD} from '../../../components/index'

import cardImge from "../../../assets/images/cardimg.png";
import {Link as ReachLink} from "@reach/router";

function CreateFirst(props) {
    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const handleClick =async() => {
            dispatch(setMintSteps(mintsteps+1))
          };

    return (
        <>
        <Box height={'100vh'} overflowY={'scroll'}>
                <Box backgroundColor="#F2F2F2" display={'flex'} justifyContent={'center'} alignItems={'center'} py={15} px={{base: '2', sm:'4', md: '6', lg: '12' }} minH={'136'}>
                    <Flex w={'100%'}  display={{base: "block", sm:"flex", md: "flex", lg: "flex"}}>
                        <Box mr={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="700" fontSize="30px">NFTS</Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <InputGroup mr={3}>
                                <InputLeftElement pointerEvents="none" children={<SearchIcon color="#969696" />} />
                                <Input type="text" placeholder="Search" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />
                            </InputGroup>
                            <Stack spacing={3} direction="row" align="center">

                                <Button  bg='#0048FF' color='#fff' _hover={{color: "#fff"}}  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }} >
                                   + Create NFT
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
                <Box h={'100%'}>
                    <Tabs>
                        <TabList  px={{base: '1', sm:'4', md: '6', lg: '12' }}  backgroundColor="#F2F2F2" >
                            <Tab color={'#666666'} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Drafts</Tab>
                            <Tab color={'#666666'} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Awaiting Approval</Tab>
                            <Tab color={'#666666'} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Minted</Tab>
                            <Tab color={'#666666'} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Listed</Tab>
                            <Tab color={'#666666'} fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight={'600'} _hover={{color: "#0039CC"}} _focus={{boxShadow: "none"}}>Unlisted</Tab>

                        </TabList>
                        <TabPanels px={{base: '2', sm:'4', md: '6', lg: '12' }}  h={'100%'} mb={10}>
                            <TabPanel  m={5}  color={'#000'} h={'100%'} py={8}>
                              <Box minH={'500px'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                  <CardHeading >Create your first NFT</CardHeading>
                                  <Text color={'#666666'} fontWeight={'400'} mb={'1rem'}>It takes only a few minutes to configure, mint, and list.</Text>

                                  <Button bg='#0048FF' onClick={handleClick} color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }} >
                                      <Icon mr={2} width={"17px"} height={"16px"} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M8.5 9.12489C8.20163 9.12489 7.91548 9.00636 7.7045 8.79538C7.49353 8.5844 7.375 8.29826 7.375 7.99989C7.375 7.70152 7.49353 7.41537 7.7045 7.20439C7.91548 6.99341 8.20163 6.87489 8.5 6.87489C8.79837 6.87489 9.08452 6.99341 9.2955 7.20439C9.50647 7.41537 9.625 7.70152 9.625 7.99989C9.625 8.29826 9.50647 8.5844 9.2955 8.79538C9.08452 9.00636 8.79837 9.12489 8.5 9.12489ZM8.104 11.3704C8.23525 11.5279 8.36725 11.6809 8.5 11.8271C8.63275 11.6809 8.76475 11.5286 8.896 11.3704C8.63203 11.376 8.36797 11.376 8.104 11.3704ZM6.60775 11.2766C6.0318 11.2167 5.45965 11.1246 4.894 11.0006C4.83775 11.2631 4.795 11.5181 4.7665 11.7626C4.624 12.9499 4.82275 13.6714 5.125 13.8454C5.42725 14.0201 6.151 13.8311 7.10875 13.1149C7.306 12.9671 7.50475 12.8029 7.70425 12.6236C7.31387 12.1955 6.9478 11.7458 6.60775 11.2766ZM12.106 11.0006C11.5683 11.1206 10.9937 11.2136 10.3923 11.2766C10.0522 11.7458 9.68613 12.1955 9.29575 12.6236C9.49525 12.8036 9.694 12.9671 9.89125 13.1149C10.849 13.8311 11.5728 14.0201 11.875 13.8454C12.1772 13.6714 12.3752 12.9499 12.2343 11.7626C12.2033 11.5068 12.1608 11.2526 12.1068 11.0006H12.106ZM13.1935 10.7104C13.6262 12.6896 13.399 14.2654 12.4375 14.8204C11.476 15.3754 9.99775 14.7844 8.5 13.4201C7.00225 14.7844 5.524 15.3746 4.5625 14.8196C3.601 14.2646 3.37375 12.6896 3.80575 10.7096C1.87525 10.0954 0.625 9.10989 0.625 7.99989C0.625 6.88989 1.87525 5.90514 3.80575 5.28939C3.37375 3.31014 3.601 1.73439 4.5625 1.17939C5.524 0.624387 7.00225 1.21539 8.5 2.57964C9.99775 1.21539 11.476 0.625137 12.4375 1.18014C13.399 1.73514 13.6263 3.31014 13.1943 5.29014C15.1248 5.90439 16.375 6.88989 16.375 7.99989C16.375 9.10989 15.1248 10.0946 13.1943 10.7104H13.1935ZM7.7035 3.37614C7.51277 3.20349 7.31432 3.03957 7.10875 2.88489C6.151 2.16864 5.42725 1.97964 5.125 2.15439C4.82275 2.32839 4.62475 3.04989 4.76575 4.23714C4.79575 4.48239 4.83775 4.73664 4.89325 4.99914C5.45915 4.87519 6.03154 4.78304 6.60775 4.72314C6.964 4.23339 7.3315 3.78264 7.70425 3.37614H7.7035ZM10.3923 4.72314C10.9937 4.78614 11.5683 4.87989 12.106 4.99914C12.1623 4.73664 12.205 4.48164 12.2335 4.23714C12.376 3.04989 12.1772 2.32839 11.875 2.15439C11.5728 1.97964 10.849 2.16864 9.89125 2.88489C9.68543 3.03956 9.48673 3.20347 9.29575 3.37614C9.6685 3.78264 10.036 4.23339 10.3923 4.72314ZM8.896 4.62939C8.76475 4.47189 8.63275 4.31889 8.5 4.17264C8.36725 4.31889 8.23525 4.47114 8.104 4.62939C8.36797 4.62378 8.63203 4.62378 8.896 4.62939ZM5.779 10.0279C5.64217 9.80221 5.51014 9.57366 5.383 9.34239C5.31175 9.53514 5.24575 9.72489 5.18575 9.91314C5.3785 9.95514 5.5765 9.99339 5.77825 10.0279H5.779ZM7.228 10.2034C8.07483 10.2663 8.92517 10.2663 9.772 10.2034C10.2499 9.50135 10.6751 8.76483 11.044 7.99989C10.6751 7.23495 10.2499 6.49842 9.772 5.79639C8.92517 5.73349 8.07483 5.73349 7.228 5.79639C6.7501 6.49842 6.32493 7.23495 5.956 7.99989C6.32493 8.76483 6.7501 9.50135 7.228 10.2034ZM11.617 6.65739C11.6883 6.46464 11.7543 6.27489 11.8143 6.08664C11.6176 6.04397 11.4201 6.00571 11.2218 5.97189C11.3583 6.19757 11.4901 6.42612 11.617 6.65739ZM4.0975 6.37764C3.8425 6.46014 3.601 6.55014 3.3745 6.64764C2.27575 7.11864 1.75 7.65114 1.75 7.99989C1.75 8.34864 2.275 8.88114 3.3745 9.35214C3.601 9.44964 3.8425 9.53964 4.0975 9.62214C4.264 9.09714 4.47025 8.55264 4.71625 7.99989C4.47987 7.47112 4.27329 6.92952 4.0975 6.37764ZM5.185 6.08664C5.24575 6.27414 5.31175 6.46464 5.383 6.65664C5.51015 6.42561 5.64218 6.19731 5.779 5.97189C5.5765 6.00639 5.3785 6.04464 5.18575 6.08664H5.185ZM12.9025 9.62214C13.1575 9.53964 13.399 9.44964 13.6255 9.35214C14.7242 8.88114 15.25 8.34864 15.25 7.99989C15.25 7.65114 14.725 7.11864 13.6255 6.64764C13.3887 6.54676 13.1475 6.45667 12.9025 6.37764C12.736 6.90264 12.5297 7.44714 12.2838 7.99989C12.5297 8.55264 12.736 9.09639 12.9025 9.62214ZM11.815 9.91314C11.7543 9.72564 11.6883 9.53514 11.617 9.34314C11.4899 9.57416 11.3578 9.80246 11.221 10.0279C11.4235 9.99339 11.6215 9.95514 11.8143 9.91314H11.815Z" fill="white"/>
                                      </Icon>
                                      Create NFT
                                  </Button>

                              </Box>
                              
                                

                            </TabPanel>
                            <TabPanel>
                                <Box color={'#666666'}>
                                    <Flex mb={5}>

                                        <Box d={{base: 'block', sm:'flex', md: 'flex', lg: 'flex' }} alignItems={"center"} ml={'auto'}>
                                            <Select mr={3} placeholder="Sort Newest to Oldest" mb={{ base:'1rem', sm:'0'}} color={'#969696'} minW={'320px'}>
                                                <option value="option1">Option 1</option>
                                                <option value="option2">Option 2</option>
                                                <option value="option3">Option 3</option>
                                            </Select>
                                            <Stack spacing={3} direction="row" align="center">
                                                <Button bg={'transparent'} border="1px" borderColor='#C4C4C4' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                                >
                                                    <Icon width="17px" height="15px" viewBox="0 0 14 14" fill="red">
                                                        <path d="M7 7.99979C6.73478 7.99979 6.48043 7.89443 6.29289 7.7069C6.10536 7.51936 6 7.26501 6 6.99979C6 6.73458 6.10536 6.48022 6.29289 6.29268C6.48043 6.10515 6.73478 5.99979 7 5.99979C7.26522 5.99979 7.51957 6.10515 7.70711 6.29268C7.89464 6.48022 8 6.73458 8 6.99979C8 7.26501 7.89464 7.51936 7.70711 7.7069C7.51957 7.89443 7.26522 7.99979 7 7.99979ZM6.648 9.99579C6.76467 10.1358 6.882 10.2718 7 10.4018C7.118 10.2718 7.23533 10.1365 7.352 9.99579C7.11736 10.0008 6.88264 10.0008 6.648 9.99579ZM5.318 9.91246C4.80604 9.85918 4.29747 9.77728 3.79467 9.66712C3.74467 9.90046 3.70667 10.1271 3.68133 10.3445C3.55467 11.3998 3.73133 12.0411 4 12.1958C4.26867 12.3511 4.912 12.1831 5.76333 11.5465C5.93867 11.4151 6.11533 11.2691 6.29267 11.1098C5.94567 10.7292 5.62027 10.3295 5.318 9.91246ZM10.2053 9.66712C9.72733 9.77379 9.21667 9.85646 8.682 9.91246C8.37973 10.3295 8.05433 10.7292 7.70733 11.1098C7.88467 11.2698 8.06133 11.4151 8.23667 11.5465C9.088 12.1831 9.73133 12.3511 10 12.1958C10.2687 12.0411 10.4447 11.3998 10.3193 10.3445C10.2918 10.1171 10.254 9.89107 10.206 9.66712H10.2053ZM11.172 9.40913C11.5567 11.1685 11.3547 12.5691 10.5 13.0625C9.64533 13.5558 8.33133 13.0305 7 11.8178C5.66867 13.0305 4.35467 13.5551 3.5 13.0618C2.64533 12.5685 2.44333 11.1685 2.82733 9.40846C1.11133 8.86246 0 7.98646 0 6.99979C0 6.01312 1.11133 5.13779 2.82733 4.59046C2.44333 2.83112 2.64533 1.43046 3.5 0.937125C4.35467 0.443791 5.66867 0.969124 7 2.18179C8.33133 0.969124 9.64533 0.444458 10.5 0.937791C11.3547 1.43112 11.5567 2.83112 11.1727 4.59112C12.8887 5.13712 14 6.01312 14 6.99979C14 7.98646 12.8887 8.86179 11.1727 9.40913H11.172ZM6.292 2.88979C6.12246 2.73633 5.94606 2.59062 5.76333 2.45312C4.912 1.81646 4.26867 1.64846 4 1.80379C3.73133 1.95846 3.55533 2.59979 3.68067 3.65512C3.70733 3.87312 3.74467 4.09912 3.794 4.33246C4.29702 4.22228 4.80582 4.14037 5.318 4.08712C5.63467 3.65179 5.96133 3.25112 6.29267 2.88979H6.292ZM8.682 4.08712C9.21667 4.14312 9.72733 4.22646 10.2053 4.33246C10.2553 4.09912 10.2933 3.87246 10.3187 3.65512C10.4453 2.59979 10.2687 1.95846 10 1.80379C9.73133 1.64846 9.088 1.81646 8.23667 2.45312C8.05371 2.59061 7.87709 2.73631 7.70733 2.88979C8.03867 3.25112 8.36533 3.65179 8.682 4.08712ZM7.352 4.00379C7.23533 3.86379 7.118 3.72779 7 3.59779C6.882 3.72779 6.76467 3.86312 6.648 4.00379C6.88264 3.99881 7.11736 3.99881 7.352 4.00379ZM4.58133 8.80246C4.4597 8.60186 4.34235 8.3987 4.22933 8.19312C4.166 8.36446 4.10733 8.53312 4.054 8.70046C4.22533 8.73779 4.40133 8.77179 4.58067 8.80246H4.58133ZM5.86933 8.95846C6.62207 9.01437 7.37793 9.01437 8.13067 8.95846C8.55547 8.33443 8.9334 7.67974 9.26133 6.99979C8.9334 6.31984 8.55547 5.66516 8.13067 5.04112C7.37793 4.98522 6.62207 4.98522 5.86933 5.04112C5.44453 5.66516 5.06661 6.31984 4.73867 6.99979C5.06661 7.67974 5.44453 8.33443 5.86933 8.95846ZM9.77067 5.80646C9.834 5.63512 9.89267 5.46646 9.946 5.29912C9.77123 5.2612 9.59563 5.22719 9.41933 5.19712C9.54074 5.39773 9.65788 5.60089 9.77067 5.80646ZM3.08667 5.55779C2.86 5.63112 2.64533 5.71112 2.444 5.79779C1.46733 6.21646 1 6.68979 1 6.99979C1 7.30979 1.46667 7.78313 2.444 8.20179C2.64533 8.28846 2.86 8.36846 3.08667 8.44179C3.23467 7.97513 3.418 7.49113 3.63667 6.99979C3.42655 6.52977 3.24293 6.04835 3.08667 5.55779ZM4.05333 5.29912C4.10733 5.46579 4.166 5.63512 4.22933 5.80579C4.34235 5.60044 4.45971 5.3975 4.58133 5.19712C4.40133 5.22779 4.22533 5.26179 4.054 5.29912H4.05333ZM10.9133 8.44179C11.14 8.36846 11.3547 8.28846 11.556 8.20179C12.5327 7.78313 13 7.30979 13 6.99979C13 6.68979 12.5333 6.21646 11.556 5.79779C11.3455 5.70812 11.1311 5.62804 10.9133 5.55779C10.7653 6.02446 10.582 6.50846 10.3633 6.99979C10.582 7.49113 10.7653 7.97446 10.9133 8.44179ZM9.94667 8.70046C9.89267 8.53379 9.834 8.36446 9.77067 8.19379C9.65765 8.39914 9.54029 8.60208 9.41867 8.80246C9.59867 8.77179 9.77467 8.73779 9.946 8.70046H9.94667Z" fill="currentcolor" fillOpacity="0.8"/>
                                                    </Icon>
                                                </Button>
                                                <Button bg={'transparent'} border="1px" borderColor='#C4C4C4' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                                                >
                                                    <Icon width="17px" height="15px" viewBox="0 0 14 14" fill="red">
                                                        <path d="M7 7.99979C6.73478 7.99979 6.48043 7.89443 6.29289 7.7069C6.10536 7.51936 6 7.26501 6 6.99979C6 6.73458 6.10536 6.48022 6.29289 6.29268C6.48043 6.10515 6.73478 5.99979 7 5.99979C7.26522 5.99979 7.51957 6.10515 7.70711 6.29268C7.89464 6.48022 8 6.73458 8 6.99979C8 7.26501 7.89464 7.51936 7.70711 7.7069C7.51957 7.89443 7.26522 7.99979 7 7.99979ZM6.648 9.99579C6.76467 10.1358 6.882 10.2718 7 10.4018C7.118 10.2718 7.23533 10.1365 7.352 9.99579C7.11736 10.0008 6.88264 10.0008 6.648 9.99579ZM5.318 9.91246C4.80604 9.85918 4.29747 9.77728 3.79467 9.66712C3.74467 9.90046 3.70667 10.1271 3.68133 10.3445C3.55467 11.3998 3.73133 12.0411 4 12.1958C4.26867 12.3511 4.912 12.1831 5.76333 11.5465C5.93867 11.4151 6.11533 11.2691 6.29267 11.1098C5.94567 10.7292 5.62027 10.3295 5.318 9.91246ZM10.2053 9.66712C9.72733 9.77379 9.21667 9.85646 8.682 9.91246C8.37973 10.3295 8.05433 10.7292 7.70733 11.1098C7.88467 11.2698 8.06133 11.4151 8.23667 11.5465C9.088 12.1831 9.73133 12.3511 10 12.1958C10.2687 12.0411 10.4447 11.3998 10.3193 10.3445C10.2918 10.1171 10.254 9.89107 10.206 9.66712H10.2053ZM11.172 9.40913C11.5567 11.1685 11.3547 12.5691 10.5 13.0625C9.64533 13.5558 8.33133 13.0305 7 11.8178C5.66867 13.0305 4.35467 13.5551 3.5 13.0618C2.64533 12.5685 2.44333 11.1685 2.82733 9.40846C1.11133 8.86246 0 7.98646 0 6.99979C0 6.01312 1.11133 5.13779 2.82733 4.59046C2.44333 2.83112 2.64533 1.43046 3.5 0.937125C4.35467 0.443791 5.66867 0.969124 7 2.18179C8.33133 0.969124 9.64533 0.444458 10.5 0.937791C11.3547 1.43112 11.5567 2.83112 11.1727 4.59112C12.8887 5.13712 14 6.01312 14 6.99979C14 7.98646 12.8887 8.86179 11.1727 9.40913H11.172ZM6.292 2.88979C6.12246 2.73633 5.94606 2.59062 5.76333 2.45312C4.912 1.81646 4.26867 1.64846 4 1.80379C3.73133 1.95846 3.55533 2.59979 3.68067 3.65512C3.70733 3.87312 3.74467 4.09912 3.794 4.33246C4.29702 4.22228 4.80582 4.14037 5.318 4.08712C5.63467 3.65179 5.96133 3.25112 6.29267 2.88979H6.292ZM8.682 4.08712C9.21667 4.14312 9.72733 4.22646 10.2053 4.33246C10.2553 4.09912 10.2933 3.87246 10.3187 3.65512C10.4453 2.59979 10.2687 1.95846 10 1.80379C9.73133 1.64846 9.088 1.81646 8.23667 2.45312C8.05371 2.59061 7.87709 2.73631 7.70733 2.88979C8.03867 3.25112 8.36533 3.65179 8.682 4.08712ZM7.352 4.00379C7.23533 3.86379 7.118 3.72779 7 3.59779C6.882 3.72779 6.76467 3.86312 6.648 4.00379C6.88264 3.99881 7.11736 3.99881 7.352 4.00379ZM4.58133 8.80246C4.4597 8.60186 4.34235 8.3987 4.22933 8.19312C4.166 8.36446 4.10733 8.53312 4.054 8.70046C4.22533 8.73779 4.40133 8.77179 4.58067 8.80246H4.58133ZM5.86933 8.95846C6.62207 9.01437 7.37793 9.01437 8.13067 8.95846C8.55547 8.33443 8.9334 7.67974 9.26133 6.99979C8.9334 6.31984 8.55547 5.66516 8.13067 5.04112C7.37793 4.98522 6.62207 4.98522 5.86933 5.04112C5.44453 5.66516 5.06661 6.31984 4.73867 6.99979C5.06661 7.67974 5.44453 8.33443 5.86933 8.95846ZM9.77067 5.80646C9.834 5.63512 9.89267 5.46646 9.946 5.29912C9.77123 5.2612 9.59563 5.22719 9.41933 5.19712C9.54074 5.39773 9.65788 5.60089 9.77067 5.80646ZM3.08667 5.55779C2.86 5.63112 2.64533 5.71112 2.444 5.79779C1.46733 6.21646 1 6.68979 1 6.99979C1 7.30979 1.46667 7.78313 2.444 8.20179C2.64533 8.28846 2.86 8.36846 3.08667 8.44179C3.23467 7.97513 3.418 7.49113 3.63667 6.99979C3.42655 6.52977 3.24293 6.04835 3.08667 5.55779ZM4.05333 5.29912C4.10733 5.46579 4.166 5.63512 4.22933 5.80579C4.34235 5.60044 4.45971 5.3975 4.58133 5.19712C4.40133 5.22779 4.22533 5.26179 4.054 5.29912H4.05333ZM10.9133 8.44179C11.14 8.36846 11.3547 8.28846 11.556 8.20179C12.5327 7.78313 13 7.30979 13 6.99979C13 6.68979 12.5333 6.21646 11.556 5.79779C11.3455 5.70812 11.1311 5.62804 10.9133 5.55779C10.7653 6.02446 10.582 6.50846 10.3633 6.99979C10.582 7.49113 10.7653 7.97446 10.9133 8.44179ZM9.94667 8.70046C9.89267 8.53379 9.834 8.36446 9.77067 8.19379C9.65765 8.39914 9.54029 8.60208 9.41867 8.80246C9.59867 8.77179 9.77467 8.73779 9.946 8.70046H9.94667Z" fill="currentcolor" fillOpacity="0.8"/>
                                                    </Icon>
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Flex>
                                    <Divider />
                                    <Box mt={5}>
                                        <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(4, 1fr)" }} gap={6}>
                                            <NFTCARD/>
                                            <NFTCARD/>
                                            <NFTCARD/>
                                        </Grid>
                                    </Box>
                                </Box>

                            </TabPanel>
                            <TabPanel>
                                <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(2, 1fr)"}} gap={6}  pt={'3rem'}>
                                    <Box>
                                        <FormLabel color='#000' fontWeight='400' mb={4} fontSize={'16px'} m={0}>Filters</FormLabel>
                                        <Box>
                                            <Stack direction={{base:'column', md:'row'}}>
                                                <Select placeholder="Price" color='#000' borderColor={'#000'} _hover={{ borderColor:'#000' }}>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </Select>
                                                <Select placeholder="Availability" color='#000' borderColor={'#000'} _hover={{ borderColor:'#000' }}>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </Select>
                                                <Select placeholder="Minting status" color='#000' borderColor={'#000'} _hover={{ borderColor:'#000' }}>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </Select>
                                                <Select placeholder="Medium" color='#000' borderColor={'#000'} _hover={{ borderColor:'#000' }}>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </Select>
                                            </Stack>
                                        </Box>
                                    </Box>
                                    <Box display={'flex'} alignItems={{base:'start' , md:'end'}} justifyContent={{base:'start' , md:'end'}} flexDirection={'column'}>
                                        <Box  w={{base:'100%',md:'auto'}}>
                                            <FormLabel color='#000' fontWeight='400' mb={4} fontSize={'16px'} m={0}>Sort</FormLabel>

                                            <Stack direction="row" >
                                                <Select placeholder="Date Added" color='#000' borderColor={'#000'} _hover={{ borderColor:'#000' }}>
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </Select>
                                            </Stack>
                                        </Box>

                                    </Box>
                                </Grid>
                                <Grid templateColumns={{base: "repeat(1 , 1fr)" , sm:"repeat(2, 1fr)" , md :"repeat(3, 1fr)" , lg:"repeat(4, 1fr)" }} gap={6}  pt={'3rem'}>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>
                                    <NFTCustomCard alignItems={'flex-start'}>
                                        <Image src={cardImge}/>
                                        <Heading mt={3} px={'1.5rem'} fontSize={'12px'} mb={3} fontWeight={'600'} color={'#808080'} textAlign={'left'}> For Sale </Heading>
                                        <Text px={'1.5rem'} mb={3}  fontSize={'16px'} fontWeight={'600'} color={'#333333'} textAlign={'left'}>Study For Banjo</Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            Jacob Collins
                                        </Text>
                                        <Text px={'1.5rem'} mb={3} color={'#666666'} fontWeight={'400'}>
                                            $4,500
                                        </Text>
                                        <Link px={'1.5rem'}  mb={3} fontSize={'14px'} fontWeight={'700'}  color={'#002B99'}>Manage</Link>
                                    </NFTCustomCard>

                                </Grid>


                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>
                    
                </Box>

            </Box>        </>

);
}

export default CreateFirst;
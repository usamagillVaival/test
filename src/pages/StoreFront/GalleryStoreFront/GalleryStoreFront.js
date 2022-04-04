import React, { useState } from "react";
import { StoreFrontNftCard } from "../../../components/index"
import {
    Box,
    Button,
    Flex,
    Grid,
    Badge,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Td,
    Image,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Link,
    Stack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Radio,
    Divider,
    Container,
    Wrap,
    WrapItem,
    InputRightElement,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,
    FormControl, FormLabel, Textarea, useDisclosure
} from "@chakra-ui/react";
import Select from 'react-select'
import FilterResults from 'react-filter-search';
import StoreFrontHeader from "../../../components/StoreFrontHeader/LandingPageHeader";

import { Card, RobotoHeading } from '../../../assets/StyledComponent/styeledComponent';
import Card1 from '../../../assets/images/card1.jpg';
import Card2 from '../../../assets/images/card2.png';
import Card3 from '../../../assets/images/card3.png';
import SideImg from '../../../assets/images/sideImg.png';
import ArtistStoreFront from "../../Artists/ArtistStoreFront";
import DVLogo from "../../../assets/images/DVlOGO.png";
import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import GlryLogo from '../../../assets/images/logo1.png'
import img1 from '../../../assets/images/1.png'
import img2 from '../../../assets/images/2.png'
import img3 from '../../../assets/images/3.png'
import img4 from '../../../assets/images/4.png'
import { IoIosLock } from "react-icons/io";
import CreateNFTStep1 from "../../NFTs/CreateNft/CreateNftStep1";
import CreateNFTStep2 from "../../NFTs/CreateNft/CreateNftStep2";
import CreateNFTStep3 from "../../NFTs/CreateNft/CreateNftStep3";
import CreateNFTStep4 from "../../NFTs/CreateNft/CreateNftStep4";
import Web3 from "web3";
import { StoreFrontNftDetailCard } from "../../../components/index";
import DV from "../../../abis/DadaVault.json";
import Web3Modal from "web3modal";
import { useToast, Spinner } from '@chakra-ui/react'
import CryptoJS from 'crypto-js';
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useEffect } from "react";
import { navigate } from '@reach/router';
import server from "../../../apis/server";
import { NFTs } from "../..";
import { LoadingScreen } from "../../../components";
import { recentlyadded, priceLowToHigh, priceHighToLow, assendingSorting, descendingSorting } from "./FilterFunctions"
import Error404 from "../../ErrorPage/Error404";
import { IoNavigate } from "react-icons/io5";

const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;

function GalleryStoreFront(props) {
    const galleryName = props.id
    const { isOpen: isInquiryNftOpen, onOpen: onInquiryNftOpen, onClose: onInquiryNftClose } = useDisclosure()
    const [options, setOption] = useState([]);
    const [listingGalleryData, setListingGalleryData] = useState([])
    const [selectedArtist, setSelectedArtist] = useState(null)
    const [selectedArtistName, setSelectedArtistName] = useState(null)
    const [artworkDetail, setArtworkDetail] = useState([])
    const [artworkDetailFlag, setArtworkDetailFlag] = useState(false)
    const [searchArtworks, setSearchArtworks] = useState('')
    const [loader, setLoader] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [selectedSorting, setSelectedSorting] = useState(null)
    const toast = useToast()
    const [publishStatus, setPublishStatus] = useState(true)
    const [gallerynameee, setGallerynameee] = useState("")
    const [galleryLogo, setGalleryLogo] = useState("")
    const [galleryStatus, setGalleryStatus] = useState(false)
    const User1 = JSON.parse(localStorage.getItem("User"))
    const [priceRange, setPriceRange] = useState(null)
    const [priceRangeLabel, setPriceRangeLabel] = useState(null)
    const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
    const userType = User1 ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
    const userAccount = userType?.account_type
    const galName = userType?.name
    useEffect(() => {
        loadGalleriesData();
    }, []);

    const options1 = [
        { value: null, label: 'Recently added' },
        { value: 'nfttitleaz', label: 'NFT Title A–Z' },
        { value: 'nfttitleza', label: 'NFT Title Z–A' },
        { value: 'artisttitleaz', Flabel: 'Artist Title A–Z' },
        { value: 'artisttitleza', label: 'Artist Title Z–A' },
        { value: 'pricelh', label: ' Price Low – High' },
        { value: 'pricehl', label: 'Price High – Low' },


    ];
    const priceRangee = [
        { value: null, label: 'All' },

        { value: 'priceR0to1', label: '0.00 – 1.00 ETH' },
        { value: 'priceR1to2', label: '1.00 – 2.00 ETH' },
        { value: 'priceR2to3', label: '2.00 – 3.00 ETH' },
        { value: 'priceR3to5', label: '3.00 – 5.00 ETH' },
        { value: 'priceR5to8', label: '5.00 – 8.00 ETH' },
        { value: 'priceR8to', label: '8.00 ETH+' },

    ]




    async function loadGalleriesData() {
        try {
            setLoader(true)
            const { data } = await server.post(`/store/getStoreFrontByGallery`, {
                headers: {
                    "Content-Type": "application/json",
                },
                "gallery_profile": galleryName
            });

            if (data) {

                if (data?.error) {

                    setLoader(false)
                    setGalleryStatus(true)
                }
                else {
                    setLoader(false)
                    setGallerynameee(data?.GalleryName)
                    setGalleryLogo(data?.GalleryLogo)
                    if (!data?.PublishStatus) {
                        setPublishStatus(false)
                    }
                    const bytes = data?.NFTs ? CryptoJS.AES.decrypt(data?.NFTs, 'dvault@123') : '';
                    const data1 = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : ''
                    const unique = [...new Set(data1.map(item => ({ value: item.artistId, label: item.artistName })))]
                    function getUniqueArtistList(unique, key) {
                        return [...new Map(unique.map(item => [item[key], item])).values()]

                    }

                    const artistList = getUniqueArtistList(unique, 'value')
                    artistList.unshift({ value: null, label: "All" })
                    setOption(artistList)
                    setListingGalleryData(data1.sort(recentlyadded))
                }




            }
        }
        catch (e) {
            toast({
                title: 'Failed',
                description: `${e}`,
                status: 'error',
                duration: 4000, variant: 'top-accent',
                isClosable: true,
                position: 'top-right',
            })
        }

    }
    function check() {

    }
    function handleBack() {
        setArtworkDetailFlag(false)
    }

    function handleChange(e) {
        setSearchArtworks(e.target.value)
    }







    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #0C0B86!important' : '1px solid #D2D2D2',
        })
    }



    const handleArtistChange = async (e) => {
        setSelectedArtistName(e.label)
        setSelectedArtist(e.value)
    }
    const handlePriceChange = async (e) => {
        setPriceRangeLabel(e.label)
        setPriceRange(e.value)
    }


    if (galleryStatus) {
        navigate("/error404")
    }
    if (!publishStatus) {
        navigate("/error404")
    }
    if (loader) {
        return (
            <Box height='100vh' display='flex'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#0C0B86'
                    size='xl'
                    margin='auto'

                /></Box>
        )
    }
    return (
        <>
            <Box display={'flex'} flexDirection={'column'}>
                <Flex width={'100%'} px={{ base: '20px', md: '30px', xl: '55px' }} py={'20px'} flexWrap={'wrap'} flexDirection={{ base: 'column', md: 'row' }}>
                    {/* <Box mr={'70px'}> */}
                    {/* <Image src={GlryLogo} maxW={'220px'}/> */}
                    {/* <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${galleryLogo}`} maxW={'120px'}/>
                         <Text>{galleryname}</Text> */}
                    <Box mr={{ base: 'auto', md: 'auto', lg: '70px' }} ml={{ base: 'auto', md: 'none' }} mb={{ base: 4, md: 0 }} display={'flex'} alignItems={'center'} justifyContent={'center'}>

                        <Text color={'#797979'} fontWeight={'400'} fontSize={'18px'} lineHeight={'20px'} textTransform={'uppercase'} pl={1}>{gallerynameee} </Text>
                        <Image src={`http://51.222.241.160:8001/api/users/artist_profile/${galleryLogo}`} maxH={'32px'} objectFit={'contain'} px={2} />
                        <Text color={'#797979'} fontWeight={'400'} fontSize={'18px'} lineHeight={'20px'} textTransform={'uppercase'} >GALLERIES</Text>
                    </Box>
                    {/* </Box> */}
                    <Box mx={{ base: 'none', md: 'auto' }} mb={{ base: 4, md: 0 }}>
                        <InputGroup minWidth={{ base: '100%', md: '300px', xl: '588px' }} bg={'#E6E6E6'} borderRadius={'0px'} border={'none'}>
                            <InputLeftElement pointerEvents="none" children={<Icon width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0258 13.8473L18.595 17.4157L17.4158 18.5948L13.8475 15.0257C12.5197 16.09 10.8683 16.6689 9.16663 16.6665C5.02663 16.6665 1.66663 13.3065 1.66663 9.1665C1.66663 5.0265 5.02663 1.6665 9.16663 1.6665C13.3066 1.6665 16.6666 5.0265 16.6666 9.1665C16.669 10.8682 16.0901 12.5196 15.0258 13.8473ZM13.3541 13.229C14.4117 12.1414 15.0023 10.6835 15 9.1665C15 5.94317 12.3891 3.33317 9.16663 3.33317C5.94329 3.33317 3.33329 5.94317 3.33329 9.1665C3.33329 12.389 5.94329 14.9998 9.16663 14.9998C10.6837 15.0022 12.1415 14.4116 13.2291 13.354L13.3541 13.229Z" fill="#B3B3B3" />
                            </Icon>
                            } />
                            <Input type="text" placeholder="Search NFTs" bg={'#E6E6E6'} color={'#000'} border="none" borderRadius={'0px'} _placeholder={{ color: '#B3B3B3' }} _focus={{ bg: '#fff', border: '2px solid #0F0EA7' }} value={searchArtworks} onChange={handleChange} />
                        </InputGroup>
                    </Box>
                    <Box display={'flex'} ml={{ base: "auto", md: 'auto' }} mr={{ base: 'auto', md: 'none' }} mb={{ base: 4, md: 0 }}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} minH={'20px'}   >
                            <Link border={'none'} textDecoration={'none'} display={'flex'} alignItems={'center'} justifyContent={'center'} _hover={{ textDecoration: 'none' }}>
                                <Text pr={2} color={'#797979'} fontWeight={'600'} fontSize={'14px'} lineHeight={'20px'} onClick={() => {
                                    if (!userAccount) {
                                        navigate("/Login")
                                    }
                                    else if (userAccount == "collector") {
                                        navigate("/collector/Dashboard")
                                    }
                                    else if (userAccount == "gallery") {
                                        navigate("gallery/Dashboard")
                                    }
                                    else if (userAccount == "artist") {
                                        navigate("/ArtistDashboardNew")
                                    }
                                    else if (userAccount == "admin") {
                                        navigate("/admin/Dashboard")

                                    }
                                }
                                }>
                                    {!userAccount ?
                                        <Text>
                                            Sign In
                                        </Text>
                                        :
                                        <Text>
                                            Dashboard
                                        </Text>
                                    }

                                </Text>
                                <Icon width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 17.4998C2.5 13.7341 5.5525 10.6816 9.31818 10.6816H10.6818C14.4475 10.6816 17.5 13.7341 17.5 17.4998" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square" />
                                    <path d="M10.0001 10.6818C12.2594 10.6818 14.091 8.85026 14.091 6.59091C14.091 4.33156 12.2594 2.5 10.0001 2.5C7.74074 2.5 5.90918 4.33156 5.90918 6.59091C5.90918 8.85026 7.74074 10.6818 10.0001 10.6818Z" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square" />
                                </Icon>

                            </Link>
                            {/* <Link border={'none'} textDecoration={'none'}  display={'flex'} alignItems={'center'} justifyContent={'center'} _hover={{textDecoration:'none'}}>
                                <Text pr={2}color={'#797979'} fontWeight={'600'} fontSize={'14px'} lineHeight={'20px'}>Sign Out</Text>

                                <Icon width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 17.4998C2.5 13.7341 5.5525 10.6816 9.31818 10.6816H10.6818C14.4475 10.6816 17.5 13.7341 17.5 17.4998" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/>
                                    <path d="M10.0001 10.6818C12.2594 10.6818 14.091 8.85026 14.091 6.59091C14.091 4.33156 12.2594 2.5 10.0001 2.5C7.74074 2.5 5.90918 4.33156 5.90918 6.59091C5.90918 8.85026 7.74074 10.6818 10.0001 10.6818Z" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/>
                                </Icon>

                            </Link> */}

                        </Box>

                        {/*<Button>*/}
                        {/*    Sign In*/}
                        {/*</Button>*/}

                    </Box>
                </Flex>
                <Box width={'100%'}>
                    <Tabs >
                        <TabList px={'29px'} border={'1px solid transparent'} borderTopColor={'#D2D2D2'} borderBottomColor={'#D2D2D2'} py={'14px'} display={'flex'} flexWrap={'wrap'}>
                            <Tab color={'#636262'} lineHeight={'20px'} _selected={{ color: '#0C0B86' }} fontSize={{ base: '12px', sm: '12px', md: '14', lg: '14px' }} fontWeight={'600'} _hover={{ color: "#0C0B86" }} _focus={{ boxShadow: "none" }} px={'24px'} onClick={() => {
                                setArtworkDetailFlag(false)
                            }} >All NFTs</Tab>
                            <Tab color={'#636262'} _selected={{ color: '#0C0B86' }} fontSize={{ base: '12px', sm: '12px', md: '14', lg: '14px' }} fontWeight={'600'} _hover={{ color: "#0C0B86" }} _focus={{ boxShadow: "none" }} px={'24px'}
                                onClick={
                                    () => {
                                        setArtworkDetailFlag(false)
                                    }
                                }
                            >Image</Tab>
                            <Tab color={'#636262'} _selected={{ color: '#0C0B86' }} fontSize={{ base: '12px', sm: '12px', md: '14', lg: '14px' }} fontWeight={'600'} _hover={{ color: "#0C0B86" }} _focus={{ boxShadow: "none" }} px={'24px'}
                                onClick={
                                    () => {
                                        setArtworkDetailFlag(false)
                                    }
                                }
                            >Video</Tab>
                            <Tab color={'#636262'} _selected={{ color: '#0C0B86' }} fontSize={{ base: '12px', sm: '12px', md: '14', lg: '14px' }} fontWeight={'600'} _hover={{ color: "#0C0B86" }} _focus={{ boxShadow: "none" }} px={'24px'}
                                onClick={
                                    () => {
                                        setArtworkDetailFlag(false)
                                    }
                                }
                            >Augmented Reality</Tab>
                        </TabList>
                        <TabPanels px={{ base: '2', sm: '4', md: '6', lg: '55px' }} h={'100%'} mb={10}>
                            <TabPanel h={'100%'} px={'23px'} py={'40px'}>
                                {!artworkDetailFlag ?
                                    <>
                                        {!searchArtworks ?
                                            <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >All NFTs</Heading>
                                            :
                                            <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >Results for `{searchArtworks}`</Heading>
                                        }
                                        <Flex flexWrap={'wrap'}>
                                            <Box display={'flex'} mb={{ base: 4, md: '0px' }} justifyContent={{ base: 'start', md: 'center' }} alignItems={'center'} gap={3} flexWrap={'wrap'}>

                                                <Text my={'auto'} mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}>Filter by</Text>
                                                <Box >

                                                    <Select


                                                        placeholder={
                                                            selectedArtist ?
                                                                selectedArtistName
                                                                : "Artist"

                                                        } border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}
                                                        value={selectedArtist}
                                                        onChange={(e) => {
                                                            handleArtistChange(e)
                                                        }
                                                        }
                                                        className={'customSelect'}
                                                        options={options}
                                                        styles={customStyles}
                                                    />



                                                </Box>

                                                <Box>

                                                    <Select styles={customStyles}
                                                        placeholder={
                                                            priceRange ?
                                                                priceRangeLabel
                                                                : "Price range"}
                                                        border={'1px solid #E6E6E6'} className={'customSelect'} color={'#636262'} borderRadius={'0px'}
                                                        //   className={'customSelect'}
                                                        value={priceRange}
                                                        onChange={(e) => {
                                                            handlePriceChange(e)
                                                        }
                                                        }
                                                        options={priceRangee}

                                                    />


                                                </Box>
                                            </Box>
                                            <Box ml={{ base: 'none', md: 'auto' }} mb={{ base: 4, md: '0px' }}>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Text color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} minW={'67px'}>Sort by</Text>
                                                    <Select styles={customStyles} placeholder="Recently added" border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}
                                                        defaultValue={selectedSorting}
                                                        className={'customSelect'}
                                                        onChange={(e) =>
                                                            setSelectedSorting(e.value)
                                                        }
                                                        options={options1}
                                                    />
                                                </Box>
                                            </Box>
                                        </Flex>
                                        {!searchArtworks ?
                                            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4,1fr)" }} gap={12} py={'3rem'}>
                                                {
                                                    selectedSorting == "nfttitleaz" ?
                                                        listingGalleryData?.filter(status => status.status == 5).sort(assendingSorting).map((data) => {
                                                            return (
                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                            )
                                                        })

                                                        :
                                                        selectedSorting == "nfttitleza" ?
                                                            listingGalleryData?.filter(status => status.status == 5).sort(descendingSorting).map((data) => {
                                                                return (
                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                )
                                                            })
                                                            :
                                                            selectedSorting == "pricelh" ?
                                                                listingGalleryData?.filter(status => status.status == 5).sort(priceLowToHigh).map((data) => {
                                                                    return (
                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                    )
                                                                })
                                                                :
                                                                selectedSorting == "pricehl" ?
                                                                    listingGalleryData?.filter(status => status.status == 5).sort(priceHighToLow).map((data) => {
                                                                        return (
                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                        )
                                                                    })
                                                                    :
                                                                    selectedArtist ?
                                                                        listingGalleryData?.filter(artistId => (selectedArtist == artistId.artistId)).map((data) => {
                                                                            return (
                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                            )
                                                                        }
                                                                        )



                                                                        :
                                                                        priceRange == "priceR0to1" ?
                                                                            listingGalleryData?.filter(price => (price.price >= 0 && price.price <= 1)).map((data) => {
                                                                                return (
                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                )
                                                                            }
                                                                            )
                                                                            : priceRange == "priceR1to2" ?
                                                                                listingGalleryData?.filter(price => (price.price > 1 && price.price <= 2)).map((data) => {
                                                                                    return (
                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                    )
                                                                                }
                                                                                )
                                                                                : priceRange == "priceR2to3" ?
                                                                                    listingGalleryData?.filter(price => (price.price > 2 && price.price <= 3)).map((data) => {
                                                                                        return (
                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                        )
                                                                                    }
                                                                                    )
                                                                                    : priceRange == "priceR3to5" ?
                                                                                        listingGalleryData?.filter(price => (price.price > 3 && price.price <= 5)).map((data) => {
                                                                                            return (
                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                            )
                                                                                        }
                                                                                        )
                                                                                        : priceRange == "priceR5to8" ?
                                                                                            listingGalleryData?.filter(price => (price.price > 5 && price.price <= 8)).map((data) => {
                                                                                                return (
                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                )
                                                                                            }
                                                                                            )
                                                                                            : priceRange == "priceR8to" ?
                                                                                                listingGalleryData?.filter(price => (price.price > 8)).map((data) => {
                                                                                                    return (
                                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                    )
                                                                                                }
                                                                                                )

                                                                                                :

                                                                                                listingGalleryData?.map((data) => {
                                                                                                    return (
                                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                    )
                                                                                                }
                                                                                                )
                                                }




                                            </Grid>
                                            :
                                            <FilterResults
                                                value={searchArtworks}
                                                data={listingGalleryData}
                                                pick={['title']}
                                                renderResults={results => (
                                                    !results.length ?
                                                        <Text>No results found for `{searchArtworks}`</Text>
                                                        :

                                                        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4,1fr)" }} gap={12} py={'3rem'}>
                                                            {selectedSorting == "nfttitleaz" ?
                                                                results?.filter(status => status.status == 5).sort(assendingSorting).map((data) => {
                                                                    return (
                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                    )
                                                                })
                                                                : selectedSorting == "nfttitleza" ?
                                                                    results?.filter(status => status.status == 5).sort(descendingSorting).map((data) => {
                                                                        return (
                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                        )
                                                                    })
                                                                    : selectedSorting == "pricelh" ?
                                                                        results?.filter(status => status.status == 5).sort(priceLowToHigh).map((data) => {
                                                                            return (
                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                            )
                                                                        })

                                                                        : selectedSorting == "pricehl" ?
                                                                            results?.filter(status => status.status == 5).sort(priceHighToLow).map((data) => {
                                                                                return (
                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                )
                                                                            })

                                                                            : selectedArtist ?
                                                                                results?.filter(artistId => (selectedArtist == artistId.artistId)).map((data) => {
                                                                                    return (
                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                    )
                                                                                })
                                                                                :
                                                                                priceRange == "priceR0to1" ?
                                                                                    results?.filter(price => (price.price >= 0 && price.price <= 1)).map((data) => {
                                                                                        return (
                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                        )
                                                                                    }
                                                                                    )
                                                                                    : priceRange == "priceR1to2" ?
                                                                                        results?.filter(price => (price.price > 1 && price.price <= 2)).map((data) => {
                                                                                            return (
                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                            )
                                                                                        }
                                                                                        )
                                                                                        : priceRange == "priceR2to3" ?
                                                                                            results?.filter(price => (price.price > 2 && price.price <= 3)).map((data) => {
                                                                                                return (
                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                )
                                                                                            }
                                                                                            )
                                                                                            : priceRange == "priceR3to5" ?
                                                                                                results?.filter(price => (price.price > 3 && price.price <= 5)).map((data) => {
                                                                                                    return (
                                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                    )
                                                                                                }
                                                                                                )
                                                                                                : priceRange == "priceR5to8" ?
                                                                                                    results?.filter(price => (price.price > 5 && price.price <= 8)).map((data) => {
                                                                                                        return (
                                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                        )
                                                                                                    }
                                                                                                    )
                                                                                                    : priceRange == "priceR8to" ?
                                                                                                        results?.filter(price => (price.price > 8)).map((data) => {
                                                                                                            return (
                                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                            )
                                                                                                        }
                                                                                                        ) :
                                                                                                        results.map(dataa => (
                                                                                                            <StoreFrontNftCard data={dataa} state1={setArtworkDetailFlag} state2={setArtworkDetail} />

                                                                                                        ))
                                                            }
                                                        </Grid>

                                                )}
                                            />
                                        }
                                    </>
                                    : artworkDetailFlag ?
                                        <>
                                            <StoreFrontNftDetailCard data={artworkDetail} func={handleBack} state={setDisabled} state1={setLoader} state2={setArtworkDetailFlag} state3={loadGalleriesData} state4={disabled} info="allnfts" profile={galleryName} />



                                        </>
                                        : null

                                }

                            </TabPanel>








                            <TabPanel h={'100%'} px={'23px'} py={'40px'}>
                                {!artworkDetailFlag ?
                                    <>
                                        {!searchArtworks ?
                                            <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >Image NFTs</Heading>
                                            :
                                            <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >Results for `{searchArtworks}`</Heading>
                                        }
                                        <Flex>
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>

                                                <Text my={'auto'} mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}>Filter by</Text>
                                                <Box>

                                                    <Select



                                                        placeholder={
                                                            selectedArtist ?
                                                                selectedArtistName
                                                                : "Artist"
                                                        } border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}
                                                        value={selectedArtist}
                                                        onChange={e => {
                                                            handleArtistChange(e)
                                                        }
                                                        }
                                                        options={options}
                                                    />



                                                </Box>

                                                <Box>
                                                    <Select
                                                        placeholder={
                                                            priceRange ?
                                                                priceRangeLabel
                                                                : "Price range"}
                                                        border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}
                                                        value={priceRange}
                                                        onChange={(e) => {
                                                            handlePriceChange(e)
                                                        }
                                                        }
                                                        options={priceRangee}

                                                    />
                                                </Box>
                                            </Box>
                                            <Box ml={'auto'} display={'flex'} alignItems={'center'} >
                                                <Text color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} pr={4}>Sort BY</Text>
                                                <Select placeholder="Recently added" border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}
                                                    defaultValue={selectedSorting}

                                                    onChange={(e) =>
                                                        setSelectedSorting(e.value)

                                                    }
                                                    options={options1}

                                                />


                                            </Box>
                                        </Flex>
                                        {!searchArtworks ?
                                            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4,1fr)" }} gap={12} py={'3rem'}>
                                                {selectedSorting == "nfttitleaz" ?
                                                    listingGalleryData?.filter(medium => medium.medium == "Image").sort(assendingSorting).map((data) => {
                                                        return (
                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                        )
                                                    })

                                                    :
                                                    selectedSorting == "nfttitleza" ?
                                                        listingGalleryData?.filter(medium => medium.medium == "Image").sort(descendingSorting).map((data) => {
                                                            return (
                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                            )
                                                        })
                                                        :
                                                        selectedSorting == "pricelh" ?
                                                            listingGalleryData?.filter(medium => medium.medium == "Image").sort(priceLowToHigh).filter(medium => medium.medium == "Image").map((data) => {
                                                                return (
                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                )
                                                            })
                                                            :
                                                            selectedSorting == "pricehl" ?
                                                                listingGalleryData?.filter(medium => medium.medium == "Image").sort(priceHighToLow)?.filter(medium => medium.medium == "Image").map((data) => {
                                                                    return (
                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                    )
                                                                })
                                                                :
                                                                selectedArtist ?
                                                                    listingGalleryData?.filter(function (data) {
                                                                        return data.medium == "Image" && data.artistId == selectedArtist
                                                                    }
                                                                    ).map((data) => {
                                                                        return (
                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                        )
                                                                    }
                                                                    )
                                                                    : priceRange == "priceR0to1" ?
                                                                        listingGalleryData?.filter(function (data) {
                                                                            return data.medium == "Image" && (data.price >= 0 && data.price <= 1)
                                                                        }
                                                                        ).map((data) => {
                                                                            return (
                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                            )
                                                                        }
                                                                        )
                                                                        : priceRange == "priceR1to2" ?
                                                                            listingGalleryData?.filter(function (data) {
                                                                                return data.medium == "Image" && (data.price > 1 && data.price <= 2)
                                                                            }
                                                                            ).map((data) => {
                                                                                return (
                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                )
                                                                            }
                                                                            )

                                                                            : priceRange == "priceR2to3" ?
                                                                                listingGalleryData?.filter(function (data) {
                                                                                    return data.medium == "Image" && (data.price > 2 && data.price <= 3)
                                                                                }
                                                                                ).map((data) => {
                                                                                    return (
                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                    )
                                                                                }
                                                                                )
                                                                                : priceRange == "priceR3to5" ?
                                                                                    listingGalleryData?.filter(function (data) {
                                                                                        return data.medium == "Image" && (data.price > 3 && data.price <= 5)
                                                                                    }
                                                                                    ).map((data) => {
                                                                                        return (
                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                        )
                                                                                    }
                                                                                    )
                                                                                    : priceRange == "priceR5to8" ?
                                                                                        listingGalleryData?.filter(function (data) {
                                                                                            return data.medium == "Image" && (data.price > 5 && data.price <= 8)
                                                                                        }
                                                                                        ).map((data) => {
                                                                                            return (
                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                            )
                                                                                        }
                                                                                        )
                                                                                        : priceRange == "priceR8to" ?
                                                                                            listingGalleryData?.filter(function (data) {
                                                                                                return data.medium == "Image" && (data.price > 8)
                                                                                            }
                                                                                            ).map((data) => {
                                                                                                return (
                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                )
                                                                                            }
                                                                                            )


                                                                                            :
                                                                                            listingGalleryData?.filter(medium => medium.medium == "Image").map((data) => {
                                                                                                return (
                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                )
                                                                                            }
                                                                                            )}
                                                :


                                            </Grid>
                                            :
                                            <FilterResults
                                                value={searchArtworks}
                                                data={listingGalleryData.filter(medium => medium.medium == "Image")}
                                                pick={['title']}
                                                renderResults={results => (
                                                    !results.length ?
                                                        <Text>No results found for `{searchArtworks}`</Text>
                                                        :

                                                        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4,1fr)" }} gap={12} py={'3rem'}>


                                                            {
                                                                selectedSorting == "nfttitleaz" ?
                                                                    results?.filter(status => status.status == 5).sort(assendingSorting).map((data) => {
                                                                        return (
                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                        )
                                                                    })
                                                                    :
                                                                    selectedSorting == "nfttitleza" ?
                                                                        results?.filter(status => status.status == 5).sort(descendingSorting).map((data) => {
                                                                            return (
                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                            )
                                                                        })
                                                                        :
                                                                        selectedSorting == "pricelh" ?
                                                                            results?.filter(status => status.status == 5).sort(priceLowToHigh).map((data) => {
                                                                                return (
                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                )
                                                                            })
                                                                            :
                                                                            selectedSorting == "pricehl" ?
                                                                                results?.filter(status => status.status == 5).sort(priceHighToLow).map((data) => {
                                                                                    return (
                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                    )
                                                                                })
                                                                                : selectedArtist ?
                                                                                    results?.filter(artistId => (selectedArtist == artistId.artistId)).map((data) => {
                                                                                        return (
                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                        )
                                                                                    })
                                                                                    : priceRange == "priceR0to1" ?
                                                                                        results?.filter(function (data) {
                                                                                            return data.medium == "Image" && (data.price >= 0 && data.price <= 1)
                                                                                        }
                                                                                        ).map((data) => {
                                                                                            return (
                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                            )
                                                                                        }
                                                                                        )
                                                                                        : priceRange == "priceR1to2" ?
                                                                                            results?.filter(function (data) {
                                                                                                return data.medium == "Image" && (data.price > 1 && data.price <= 2)
                                                                                            }
                                                                                            ).map((data) => {
                                                                                                return (
                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                )
                                                                                            }
                                                                                            )

                                                                                            : priceRange == "priceR2to3" ?
                                                                                                results?.filter(function (data) {
                                                                                                    return data.medium == "Image" && (data.price > 2 && data.price <= 3)
                                                                                                }
                                                                                                ).map((data) => {
                                                                                                    return (
                                                                                                        <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                    )
                                                                                                }
                                                                                                )
                                                                                                : priceRange == "priceR3to5" ?
                                                                                                    results?.filter(function (data) {
                                                                                                        return data.medium == "Image" && (data.price > 3 && data.price <= 5)
                                                                                                    }
                                                                                                    ).map((data) => {
                                                                                                        return (
                                                                                                            <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                        )
                                                                                                    }
                                                                                                    )
                                                                                                    : priceRange == "priceR5to8" ?
                                                                                                        results?.filter(function (data) {
                                                                                                            return data.medium == "Image" && (data.price > 5 && data.price <= 8)
                                                                                                        }
                                                                                                        ).map((data) => {
                                                                                                            return (
                                                                                                                <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                            )
                                                                                                        }
                                                                                                        )
                                                                                                        : priceRange == "priceR8to" ?
                                                                                                            results?.filter(function (data) {
                                                                                                                return data.medium == "Image" && (data.price > 8)
                                                                                                            }
                                                                                                            ).map((data) => {
                                                                                                                return (
                                                                                                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                                                                                                )
                                                                                                            }
                                                                                                            )

                                                                                                            : results.map(dataa => (
                                                                                                                <StoreFrontNftCard data={dataa} state1={setArtworkDetailFlag} state2={setArtworkDetail} />

                                                                                                            ))
                                                            }
                                                        </Grid>

                                                )}
                                            />
                                        }
                                    </>
                                    : artworkDetailFlag ?
                                        <>
                                            <StoreFrontNftDetailCard data={artworkDetail} func={handleBack} state={setDisabled} state1={setLoader} state2={setArtworkDetailFlag} state3={loadGalleriesData} state4={disabled} info="imagenfts" profile={galleryName} />



                                        </>
                                        : null

                                }

                            </TabPanel>



















                            //Video
                            <TabPanel>
                                <Text>
                                    Not functional yet
                                </Text>
                                {/* {!artworkDetailFlag?
                                <>
                                {!searchArtworks?
                                <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >Video NFTs</Heading>
                               :
                               <Heading fontWeight={'700'} fontSize={'30px'} mb={'2rem'} color={'#201F1F'} lineHeight={'36px'} >Results for `{searchArtworks}`</Heading>
                                }
                                <Flex>
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
                                        
                                        <Text my={'auto'} mr={'1.5rem'} color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'}>Filter by</Text>
                                       <Box>
                                           
                                           <Select
                                           
                                           
                                           placeholder="Artist" border={'1px solid #E6E6E6'}  color={'#636262'} borderRadius={'0px'}
                                           onChange={e =>
                                               setSelectedArtist(e.label)
                                           }
                                           options={options}
                                           />
                                           
                                          
                                           
                                       </Box>
                                        <Box>
                                           <Select placeholder="Currency accepted · 2"  border={'1px solid #E6E6E6'} color={'#636262'} borderRadius={'0px'}>
                                               <option value="option1">Option 1</option>
                                               <option value="option2">Option 2</option>
                                               <option value="option3">Option 3</option>
                                            
                                               
                                           </Select>
                                       </Box>
                                        <Box>
                                           <Select placeholder="Price range"  border={'1px solid #E6E6E6'}  color={'#636262'} borderRadius={'0px'}>
                                               <option value="option1">Option 1</option>
                                               <option value="option2">Option 2</option>
                                               <option value="option3">Option 3</option>
                                              
                                           </Select>
                                       </Box>
                                    </Box>
                                    <Box ml={'auto'} display={'flex'} alignItems={'center'} >
                                        <Text color={'#8F8F8F'} fontSize={'16px'} fontWeight={'500'} pr={4}>Sort BY</Text>
                                        <Select placeholder="Sort"  border={'1px solid #E6E6E6'}  color={'#636262'} borderRadius={'0px'}
                                        options={options1}
                                        />

                                        
                                    </Box>
                                </Flex>
                                {!searchArtworks?
                                <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)",xl:"repeat(4,1fr)"}} gap={12}  py={'3rem'}>
                                
                                {listingGalleryData?.filter(medium => medium.medium=="video").map((data) => {
                                    return (
                                    <StoreFrontNftCard data={data} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                                    )}
                                )} 
                                :
                                   

                                </Grid>
                                :
                                <FilterResults
          value={searchArtworks}
          data={listingGalleryData.filter(medium =>medium.medium=="video")}
          pick={['title']}
          renderResults={results => (
              !results.length?
              <Text>No results found for `{searchArtworks}`</Text>
            :
             
            <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)",xl:"repeat(4,1fr)"}} gap={12}  py={'3rem'}>

                                
              {results.map(dataa => (
                  <StoreFrontNftCard data={dataa} state1={setArtworkDetailFlag} state2={setArtworkDetail} />
                
              ))}
                                </Grid>
          
          )}
        />
                                }
                                </>  
                                  :artworkDetailFlag?
                                  <>
                                  <StoreFrontNftDetailCard data={artworkDetail} func={handleBack} state={setDisabled} state1={setLoader} state2={setArtworkDetailFlag} state3={loadGalleriesData} state4={disabled}/>
                             
                                      
                             
                                  </>
                                  :null
                                
                                } */}
                            </TabPanel>
                            <TabPanel>
                                <Text>Not functional yet</Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Box>

            </Box>








        </>

    );
}

export default GalleryStoreFront;

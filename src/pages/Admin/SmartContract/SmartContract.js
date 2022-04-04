import React, { useEffect, useState } from "react";
import {
    Alert,
    AlertIcon,
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
    Select,
    Divider,
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
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Avatar,
    Container,
    FormControl,
    Checkbox, Square,
    HStack, VStack, useColorModeValue, StackProps, useId,
    useRadio,
    UseRadioProps,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon } from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    BioRymHeading,
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard
} from '../../../assets/StyledComponent/styeledComponent';
import ReactPaginate from 'react-paginate';
import cardImge from "../../../assets/images/cardimg.png";
import Dummy from "../../../assets/images/dummy.png";
import { Link as ReachLink } from "@reach/router";
import { useDispatch, useSelector } from 'react-redux'
import { setMintSteps } from "../../../redux/action/tradingBot"
import { setNFTMedium } from "../../../redux/action/tradingBot";
import { ArtistInvite } from "../../index";
import PreviewImg from "../../../assets/images/image2.png";
import CryptoJS from 'crypto-js';
import server from "../../../apis/server"
import { CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { NFTCARD } from "../../../components/index";
import { FaSlash } from "react-icons/fa";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";
import Web3 from "web3";
import DV from "../../../abis/DadaVault.json";
import { descendingDate } from "../../StoreFront/GalleryStoreFront/FilterFunctions";
import { SmartContractGalleryList } from "../../../components/index";
import { LoadingScreen } from "../../../components";
import { useToast, Spinner } from '@chakra-ui/react'
import { navigate } from "@reach/router";
import { SizeContextProvider } from "antd/lib/config-provider/SizeContext";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import {
    Previous,
    Paginator,
    PageGroup,
    Page,
    Next,
    generatePages
} from 'chakra-paginator';

const InfuraId = process.env.REACT_APP_INFURA_ID;
const chain = process.env.REACT_APP_CHAIN_ID
const network = process.env.REACT_APP_NETWORK
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;

function SmartContract(props) {
    const infuraId = InfuraId
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: infuraId, // required
            },
        },
    }

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [deployStep, setDeployStep] = useState(0);
    const [gallery, setGallery] = React.useState([]);

    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loader, setLoader] = useState(true);
    const [disable, setDisable] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [account, setAccount] = useState(null);
    const [connectDisable, setConnectDisable] = useState(true);

    //     const itemLimit = 3;
    //   const [pagesQuantity, setPagesQuantity] = useState(0);
    //   const [curPage, setCurPage] = useState(0);
    const itemsPerPage=8
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [galleryName,setGalleyName]=useState("")
    const web3Modal = new Web3Modal(
        {
            providerOptions,
            cacheProvider: true,
            // theme:{
            //    background:"red" 
            // }
        }

    );


    const toast = useToast()

    useEffect(async () => {
        if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER"))
            await handlewalletconnect()
        loadGalleryList();
    }, [deployStep,itemOffset, itemsPerPage]);

    const { isOpen: isInviteArtistOpen, onOpen: onInviteArtistOpen, onClose: onInviteArtistClose
    } = useDisclosure();

    const { isOpen: isWalletConnectOpen, onOpen: onWalletConnectOpen, onClose: onWalletConnectClose
    } = useDisclosure();

    // const onInviteArtistClose =()=> {
    //     setDeployStep(0);
    // }
    // const handlePageChange = (page) => {
    //     page=page
    //     setCurPage(page);
    //   };
    const loadGalleryList = async () => {
        try {
            const { data } = await server.post(
                "users/approved_gallery",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (data) {
                if (data?.data) {
                    console.log(data?.data)
                    setGallery(data?.data.sort(descendingDate))
                    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data?.data.sort(descendingDate).slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data?.data.length / itemsPerPage));
                    //   setValidInvitation(true)
                    //  setEmail(data?.user?.email)
                    //  setAccountType(data?.user?.account_type)
                }
                else {
                    //  alert('Invalid Invitation Code')
                    //  setValidInvitation(false)
                }

            }

        } catch (e) {
            alert(e.message)
            //  setIsLoading(false)
            // console.log(e); 
            // handleSnackBar(e.message);
            // alert("you have entered wrong email or password");
        }
        setLoader(false);
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % gallery.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

    async function handlewalletconnect() {

        await web3Modal.connect().
            then(async (r) => {
                r.on("accountsChanged", (code, reason) => {

                    const accountSwitch = code[0];
                    if (accountSwitch) {
                        if (accountSwitch) {

                            setAccount(accountSwitch);
                        }
                    } else {
                        web3Modal.clearCachedProvider();
                        window.localStorage.removeItem('walletconnect');
                        setWeb3(null);
                        setChainId(null);
                        setAccount(null);
                        setConnectDisable(true);
                    }
                });

                r.on("chainChanged", (chainId) => {

                    setChainId(chainId)
                });


                const webb3 = new Web3(r);
                setWeb3(webb3)
                setChainId(await webb3.eth.getChainId());
                let accounts = await webb3.eth.getAccounts();
                setAccount(accounts[0]);
                setConnectDisable(false);
            }).catch(e => console.log(e))
    }
    const disconnect = async () => {
        web3Modal.clearCachedProvider();
        window.localStorage.removeItem('walletconnect');
        setWeb3(null);
        setChainId(null);
        setAccount(null);
        setConnectDisable(true);
    }

    let validationSchema = yup.object({
        name: yup.string().required('Required'),
        symbol: yup.string().required('Required'),
    });

    const deploy = async (values, resetForm) => {
        const name = values?.name;
        const symbol = values?.symbol;
        try {
            const { data } = await server.post(
                "users/approved_gallery",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (data) {
                if (data?.data) {
                    console.log(data?.data)
                    setGallery(data?.data)

                }
            }

        } catch (e) {
            console.log(e)
        }
        const deployStatus = gallery.filter(i => i.name == name)[0]?.gallery_deploy_status;
        console.log("status: ", deployStatus);
        if (deployStatus == "deployed") {
            toast({
                title: 'Failed',
                description: `Contract is already deployed`,
                status: 'error', variant: 'top-accent',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
            })
        } else {

            setDisable(true);
            const galleryAccount = gallery.filter(i => i.name == name)[0]?.gallery_matamask_puplic_key;
            if (web3 === null) {
                toast({
                    title: 'Failed',
                    description: `Please Connect your wallet`,
                    status: 'error', variant: 'top-accent',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                })
            } else {
                const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
                const owner = await dv.methods.owner().call()
                const wallet = account;
                if (owner.toLowerCase() != wallet.toLowerCase()) {
                    web3Modal.clearCachedProvider();
                    window.localStorage.removeItem('walletconnect');
                    toast({
                        title: 'Failed',
                        description: `Please connect with admin wallet`,
                        status: 'error', variant: 'top-accent',
                        duration: 4000,
                        isClosable: true,
                        position: 'top-right',
                    })
                } else {
                    await dv.methods
                        .deploy(name, symbol, galleryAccount)
                        .send({ from: account })
                        .on("transactionHash", async function (hash) {
                            toast({
                                title: 'Success',
                                description: `Transaction submitted. Please wait for confirmation`,
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                                position: 'top-right',
                                variant: 'top-accent',
                            })
                            let data = {
                                name,
                                hash,
                                symbol
                            };
                            let ciphertext = CryptoJS.AES.encrypt(
                                JSON.stringify(data),
                                "dvault@123"
                            ).toString();
                            await server
                                .post(
                                    "/users/InsertHash",
                                    {
                                        payload: ciphertext,
                                    },
                                    {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    }
                                )
                                .then((result) => console.log(result))
                                .catch((e) => console.log(e));
                            setDisable(false)
                        })
                        .then(result => {
                            setGalleyName(values?.name)
                            toast({
                                title: 'Success',
                                description: `Gallery smart contract deployed`,
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                                position: 'top-right', variant: 'top-accent',
                            })
                            setDeployStep(1);
                        })

                        .catch((e) => {

                            setDeployStep(2)
                            setDisable(false);
                        }
                        );
                }
            }
        }

    }

    const openDeployModal = async () => {
        if (chainId != chain) {
            toast({
                title: 'Fail',
                description: `Please Switch to ${network} Network`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right', variant: 'top-accent',
            })
        } else {
            const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
            const owner = await dv.methods.owner().call()
            const wallet = account;
            if (owner.toLowerCase() != wallet.toLowerCase()) {
                toast({
                    title: 'Failed',
                    description: `Please connect with admin wallet`,
                    status: 'error', variant: 'top-accent',
                    duration: 4000,
                    isClosable: true,
                    position: 'top-right',
                })
            }
            else {
                setDeployStep(0)
                onInviteArtistOpen()
            }
        }
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

                />

            </Box>

        )
    }
    const normalStyles = {
        bg: 'white'
    };

    const activeStyles = {
        bg: 'blue.300'
    };

    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'} background={'#fff'}>
                <Box display={'flex'} flexDirection={'column'} marginBottom={'2rem'} alignItems={'start'} p={{ base: '2', sm: '4', md: '6', lg: '6' }} minH={'136'} bg={'#fff'}>
                    <Flex w={'100%'} display={{ base: "block", sm: "flex", md: "flex", lg: "flex" }}>
                        <Box mr={'auto'} my={{base:'1rem', md:'auto'}} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="400" fontSize="14px">Smart Contracts</Heading>
                        </Box>
                        <Box d="flex" alignItems={"center"}  my={{base:'1rem', md:'auto'}}>
                            <Stack spacing={3} direction="row" align="center">
                                {chainId == 3 ? <Badge px={1} py={'1px'} color={'#fff'} bg={'#D7568C'} fontWeight={'700'} fontSize={'12px'} lineHeight={'16px'}>ROPSTEN</Badge> : null}
                                {chainId == 42 ? <Badge px={1} py={'1px'} color={'#fff'} bg={'#973EEF'} fontWeight={'700'} fontSize={'12px'} lineHeight={'16px'}>KOVAN</Badge> : null}
                                {chainId == 4 ? <Badge px={1} py={'1px'} bg={'#D5B033'} color={'#fff'} fontWeight={'700'} fontSize={'12px'} lineHeight={'16px'}>RINKEBY</Badge> : null}
                                {chainId == 5 ? <Badge px={1} py={'1px'} bg={'#4BB6E2'} fontWeight={'700'} color={'#fff'} fontSize={'12px'} lineHeight={'16px'}>GOERLI</Badge> : null}
                                <Text fontWeight={'400'} fontSize={'14px'} textAlign={'left'} color={'#636262'} >{account ? account.slice(0, 6) + "..." + account.slice(38, 43) : null}</Text>
                                <Box position={'relative'} >
                                    <Menu placement={'bottom'}>
                                        <MenuButton onClick={connectDisable ? handlewalletconnect : null} as={Button} position={'relative'} bg='transparent' borderRadius={'0px'} padding={2} color='#fff' _hover={{ color: "#fff" }} border={'1px solid #D2D2D2'} >
                                            <Icon width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">


                                                <path d="M2.98422 3.25048H12.9842C13.101 3.25043 13.2177 3.25784 13.3336 3.27267C13.2943 2.99697 13.1996 2.73208 13.0552 2.49398C12.9108 2.25587 12.7197 2.04947 12.4933 1.88723C12.267 1.72499 12.0101 1.61027 11.7383 1.54997C11.4664 1.48968 11.1851 1.48507 10.9114 1.53642L2.68734 2.94048H2.67797C2.16174 3.0392 1.70268 3.33127 1.39453 3.75704C1.85878 3.42683 2.41451 3.24974 2.98422 3.25048Z" fill="#636262" />
                                                <path d="M12.9844 4H2.98438C2.45412 4.00058 1.94575 4.21148 1.5708 4.58643C1.19585 4.96137 0.984954 5.46974 0.984375 6V12C0.984954 12.5303 1.19585 13.0386 1.5708 13.4136C1.94575 13.7885 2.45412 13.9994 2.98438 14H12.9844C13.5146 13.9994 14.023 13.7885 14.3979 13.4136C14.7729 13.0386 14.9838 12.5303 14.9844 12V6C14.9838 5.46974 14.7729 4.96137 14.3979 4.58643C14.023 4.21148 13.5146 4.00058 12.9844 4ZM11.5 10C11.3022 10 11.1089 9.94135 10.9444 9.83147C10.78 9.72159 10.6518 9.56541 10.5761 9.38268C10.5004 9.19996 10.4806 8.99889 10.5192 8.80491C10.5578 8.61093 10.653 8.43275 10.7929 8.29289C10.9327 8.15304 11.1109 8.0578 11.3049 8.01921C11.4989 7.98063 11.7 8.00043 11.8827 8.07612C12.0654 8.15181 12.2216 8.27998 12.3315 8.44443C12.4414 8.60888 12.5 8.80222 12.5 9C12.5 9.26522 12.3946 9.51957 12.2071 9.70711C12.0196 9.89464 11.7652 10 11.5 10Z" fill="#636262" />
                                                <path d="M1 8.10938V5C1 4.32281 1.375 3.1875 2.67656 2.94156C3.78125 2.73437 4.875 2.73438 4.875 2.73438C4.875 2.73438 5.59375 3.23438 5 3.23438C4.40625 3.23438 4.42188 4 5 4C5.57812 4 5 4.73438 5 4.73438L2.67188 7.375L1 8.10938Z" fill="#636262" />
                                            </Icon>
                                            {
                                                !connectDisable ?
                                                    <Icon position={'absolute'} top={'-7px'} right={'-9px'} width="18px" height="18px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="#33A152" />
                                                    </Icon> :
                                                    null
                                            }
                                        </MenuButton>
                                        {!connectDisable ?
                                            <MenuList >
                                                <MenuItem onClick={disconnect}>
                                                    <Text>Disconnect wallet</Text>
                                                    <Icon ml={'auto'} width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H15V6.375C15 4.875 13.4161 3.75 12 3.75H4.875C4.17904 3.75074 3.51179 4.02755 3.01967 4.51967C2.52755 5.01179 2.25074 5.67904 2.25 6.375V17.625C2.25074 18.321 2.52755 18.9882 3.01967 19.4803C3.51179 19.9725 4.17904 20.2493 4.875 20.25H12.375C13.071 20.2493 13.7382 19.9725 14.2303 19.4803C14.7225 18.9882 14.9993 18.321 15 17.625V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12Z" fill="#636262" />
                                                        <path d="M21.5302 11.4694L17.7802 7.71945C17.6384 7.58473 17.4495 7.51074 17.254 7.51325C17.0584 7.51575 16.8715 7.59455 16.7332 7.73285C16.5949 7.87115 16.5161 8.05801 16.5136 8.25358C16.5111 8.44915 16.5851 8.63796 16.7198 8.77976L19.1892 11.2496H15V12.7496H19.1892L16.7198 15.2194C16.6473 15.2884 16.5892 15.3712 16.5492 15.4629C16.5091 15.5546 16.4878 15.6535 16.4865 15.7536C16.4852 15.8537 16.504 15.953 16.5417 16.0457C16.5794 16.1385 16.6353 16.2227 16.7061 16.2935C16.7769 16.3643 16.8611 16.4202 16.9539 16.4579C17.0466 16.4956 17.1459 16.5144 17.246 16.5131C17.3461 16.5118 17.445 16.4905 17.5367 16.4504C17.6284 16.4104 17.7112 16.3523 17.7802 16.2797L21.5302 12.5298C21.6707 12.3891 21.7497 12.1984 21.7497 11.9996C21.7497 11.8008 21.6707 11.6101 21.5302 11.4694Z" fill="#636262" />
                                                    </Icon>
                                                </MenuItem>

                                            </MenuList> :
                                            null
                                        }
                                    </Menu>

                                </Box>
                                <Button  onClick={openDeployModal} disabled={connectDisable} bg='#0F0EA7' borderRadius={'0px'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                >
                                    + Deploy contract
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                    <Heading mt={'40px'} color={'#4D4D4D'} fontWeight="800" fontSize="20px" textAlign={'left'}>Smart Contracts on DadaVault</Heading>
                </Box>
                <Box px={{ base: '2', sm: '4', md: '6', lg: '6' }}>
                    <Box p={0} color={'#000'} h={'100%'} py={8}>
                        <Box overflowX={"auto"}>
                            <Table
                                borderWidth="1px"
                                borderCollapse={"separate"}
                                borderSpacing={"0"}
                                p={0}
                                mb={'40px'}
                                    minW={'992px'}
                            >
                                <Thead bg={'#F7F7F7'}>
                                    <Tr >
                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'22.5%'}>GALLERY</Th>
                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'20%'}>CONTRACT CREATOR</Th>
                                        <Th color={'#797979'} fontWeight={"700"} TextTransform={'capitalize'} fontSize={'12px'} width={'22.5%'}>EMAIL</Th>
                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'22.5%%'}>STATUS</Th>
                                        <Th color={'#797979'} fontWeight={"700"} fontSize={'12px'} width={'12.5%'}></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/* <ItemList items={gallery} curPage={curPage} itemLimit={itemLimit} /> */}
                                    {currentItems?.map((glry, i) => (
                                        <Tr mb="0" borderWidth="1px">
                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                <Flex alignItems={'center'}>
                                                    <Image src={glry?.gallery_logo ? `http://51.222.241.160:8001/api/users/artist_profile/${glry?.gallery_logo}` : Dummy} width={'48px'} height={'48px'} borderRadius={'50px'} />
                                                    <Box pl={'1rem'}>
                                                        <Text fontWeight={'500'} fontSize={'14px'} textAlign={'left'} color={'#4D4C4C'} >{glry?.name}</Text>
                                                        <Text fontWeight={'400'} fontSize={'12px'} textAlign={'left'} color={'#797979'}  >{glry?.gallery_email}</Text>
                                                    </Box>
                                                </Flex>
                                            </Td>

                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"} >
                                                DadaVault
                                            </Td>
                                            <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                {glry?.email}
                                            </Td>
                                            {glry?.gallery_deploy_status == "deployed" ?
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                    <Box bg={'#008A27'} color={'#fff'} py={'2px'} px={2} lineHeight={'20px'} width={'fit-content'}>
                                                        Deployed
                                                    </Box>
                                                </Td>
                                                
                                                :
                                                <Td color={"#636262"} border={"none"} fontSize={'14px'} fontWeight={"400"}>
                                                    <Box bg={'#24A6DB'} color={'#fff'} py={'2px'} px={2} width={'fit-content'} fontSize={'14px'} fontWeight={'500'}>
                                                        Not Deployed
                                                    </Box>
                                                </Td>
                                            }

                                            <Td textAlign={'end'}>
                                                <Link color={"#0C0B86"} border={"none"} fontSize={'16px'} fontWeight={"600"} onClick={() => navigate("/admin/SmartContractDetails", { state: { glry, gallery } })} >View details</Link>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} mt={2} >
                            <Text color={'#8F8F8F'}>{gallery.length} galleries</Text>
                            <Box ml={'auto'} className={'newPaginations'}>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="Next"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="Previous"
                                pageClassName="Mypage-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"

                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                />

                                {/* <Button color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'} mr={2} >Previous</Button>


                                <Button color={"#8F8F8F"} background={'none'} fontSize={'16px'} borderRadius={'0px'} fontWeight={"600"} border={'1px solid #D2D2D2'}>Next</Button> */}
                                {/* <p>quantity is {pagesQuantity}</p>
                            <p>current page {curPage}</p>
                            <Paginator
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity-1 }>
          <Previous bg="white">
            <CgChevronLeft />
          </Previous>
          <PageGroup>
            {generatePages(pagesQuantity)?.map((page) => (
              <Page
                key={`paginator_page_${page}`}
                page={page}
                normalStyles={normalStyles}
                activeStyles={activeStyles}
              />
            ))}
          </PageGroup>
          <Next bg="white">
            <CgChevronRight />
          </Next>
        </Paginator> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Modal
                onClose={() => {
                    setDeployStep(0);
                    onInviteArtistClose();
                }

                }
                isOpen={isInviteArtistOpen}
                size={'full'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        {deployStep == 0 && (
                            <Formik
                                initialValues={{ name: "", symbol: "" }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    deploy(values, resetForm);
                                }}
                            >
                                {(formikProps) => (
                                    <>

                                        <Box width={'90%'} m={'auto'} pt={'12.5rem'} pb={6} mb={'auto'} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                                            <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Deploy smart contract</Heading>
                                            <Text fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>The gallery can subscribe to DadaVault and start minting and selling NFTs.</Text>


                                            <Box px={6} py={6} bg={'#F7F7F7'} gap={6} width={{ base: "95%", sm: "85%", md: "75%", lg: "95%", xl: "60%" }} m={'auto'}  >
                                                <Box maxW={'400px'} mx={'auto'}>
                                                    <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                        <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}
                                                        >Gallery Name</FormLabel>
                                                    </Box>
                                                    <Box display='flex' flexDirection={'column'} alignItems='start' justifyContent='center' mb={8}>
                                                        <Select placeholder='Select Gallery'
                                                            border={'1px solid #D2D2D2'}
                                                            borderRadius={'0px'}
                                                            bg={'#FFFFFF'}
                                                            color={'#636262'}
                                                            name="name"
                                                            id="name"
                                                            value={formikProps.values.name}
                                                            onChange={formikProps.handleChange("name")}
                                                            onBlur={formikProps.handleBlur("name")}
                                                            error={
                                                                formikProps.errors.name && formikProps.touched.name
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {gallery?.filter(i => i.gallery_deploy_status != "deployed" && i.gallery_deploy_status != "pending")?.map((g, i) => (
                                                                <option value={g.name}>{g?.name}</option>
                                                            ))}
                                                        </Select>
                                                        {formikProps.errors.name && formikProps.touched.name && (
                                                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                                {formikProps.errors.name}
                                                            </Alert>

                                                        )}
                                                    </Box>
                                                    <Box display='flex' alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                                        <FormLabel color='#636262' fontWeight='500' fontSize={'16px'} m={0}>Token Symbol</FormLabel>
                                                    </Box>
                                                    <Box display='flex' flexDirection={'column'} alignItems='start' justifyContent='center' mb={2}>
                                                        <Input type="text" mb={1} color={'#4D4D4D'}
                                                            border={'1px solid #D2D2D2'}
                                                            borderRadius={'0px'}
                                                            bg={'#FFFFFF'}
                                                            name="symbol"
                                                            id="symbol"
                                                            value={formikProps.values.symbol}
                                                            onChange={formikProps.handleChange("symbol")}
                                                            onBlur={formikProps.handleBlur("symbol")}
                                                            error={
                                                                formikProps.errors.symbol && formikProps.touched.symbol
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {formikProps.errors.symbol && formikProps.touched.symbol && (
                                                            <Alert status='error' color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                                                {formikProps.errors.symbol}
                                                            </Alert>

                                                        )}
                                                    </Box>
                                                    <FormLabel color='#8F8F8F' fontWeight='400' fontSize={'14px'} lineHeight={'20px'} mb={6}
                                                    >Example: ADLSN</FormLabel>
                                                </Box>
                                            </Box>
                                            <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" mx={'auto'} width={{ base: "95%", sm: "85%", md: "75%", lg: "95%", xl: "60%" }} gap={6} mb='auto' name="form-name">
                                                <Divider />
                                                <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                                    <Button
                                                        onClick={formikProps.handleSubmit} mb={3} bg='#0C0B86' color='#fff'  ml={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                                        rightIcon={<ArrowForwardIcon />} isDisabled={disable} >Deploy contract</Button>
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </>
                                )}
                            </Formik>
                        )}

                        {deployStep == 1 && (
                            <Box px={6} pb={6} pt={0} bg={'#fff'} gap={6} width={{ base: "95%", sm: "85%", md: "75%", lg: "95%", xl: "60%" }} m={'auto'}  >
                                <Text mb={4} fontWeight={'600'} color={'#008A27'} fontSize={'1rem'} textAlign={'center'}>SUCCESS!</Text>
                                <BioRymHeading color="#363535" fontSize='60px' pt='1.5rem' mb='1rem' lineHeight={'60px'} fontWeight='700' textAlign={'center'} >You’ve deployed {galleryName} smart contract</BioRymHeading>
                                <Text mb={10} fontWeight={'400'} color={'#797979'} fontSize={'18PX'} textAlign={'center'}>{galleryName} can mint NFTs on DadaVault now.</Text>
                                <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                                    <Button mb={3} bg='#0C0B86' color='#fff'  mx={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                            onClick={() => {
                                        setDeployStep(0);
                                        onInviteArtistClose();
                                    }}>Close window</Button>
                                </Box>
                            </Box>
                        )}

                        {deployStep == 2 && (
                            <Box px={6} py={6} bg={'#F7F7F7'} width={{ base: "80%", sm: "70%", md: "60%", lg: "45%", xl: "35%" }} m={'auto'} display={'flex'} flexDirection={'column'}  >

                                <Icon mx={'auto'} mb={'20px'} width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="#FCEAE9" />
                                    <path d="M33.7988 30.675L25.5616 14.9444C25.4123 14.6596 25.1879 14.421 24.9127 14.2545C24.6376 14.088 24.3221 14 24.0004 14C23.6788 14 23.3633 14.088 23.0881 14.2545C22.813 14.421 22.5886 14.6596 22.4393 14.9444L14.2012 30.675C14.0605 30.9437 13.9915 31.2441 14.0008 31.5472C14.0102 31.8503 14.0976 32.1459 14.2546 32.4054C14.4117 32.6648 14.633 32.8794 14.8972 33.0283C15.1614 33.1772 15.4595 33.2554 15.7628 33.2553H32.2372C32.5405 33.2554 32.8386 33.1772 33.1028 33.0283C33.367 32.8794 33.5883 32.6648 33.7454 32.4054C33.9024 32.1459 33.9898 31.8503 33.9992 31.5472C34.0085 31.2441 33.9395 30.9437 33.7988 30.675ZM23.1187 20.4726C23.1187 20.2389 23.2116 20.0147 23.3769 19.8495C23.5421 19.6842 23.7663 19.5913 24 19.5913C24.2337 19.5913 24.4579 19.6842 24.6231 19.8495C24.7884 20.0147 24.8813 20.2389 24.8813 20.4726V25.7602C24.8813 25.9939 24.7884 26.2181 24.6231 26.3833C24.4579 26.5486 24.2337 26.6415 24 26.6415C23.7663 26.6415 23.5421 26.5486 23.3769 26.3833C23.2116 26.2181 23.1187 25.9939 23.1187 25.7602V20.4726ZM24.0441 30.616H24.0194C23.6719 30.6148 23.3382 30.4794 23.0882 30.238C22.8382 29.9965 22.6913 29.6678 22.6781 29.3205C22.6718 29.1478 22.6999 28.9755 22.7609 28.8138C22.8218 28.6521 22.9144 28.5041 23.0332 28.3786C23.152 28.2531 23.2947 28.1525 23.4528 28.0827C23.6109 28.0129 23.7814 27.9753 23.9542 27.9722H23.9789C24.3263 27.9726 24.6602 28.1074 24.9105 28.3483C25.1608 28.5893 25.3082 28.9178 25.3219 29.265C25.3287 29.4381 25.3009 29.6108 25.24 29.773C25.1791 29.9352 25.0864 30.0836 24.9674 30.2095C24.8483 30.3354 24.7053 30.4361 24.5468 30.506C24.3882 30.5758 24.2173 30.6132 24.0441 30.616Z" fill="#DD2922" />
                                </Icon>
                                <Text mb={2} fontWeight={'500'} color={'#363535'} fontSize={'18PX'} textAlign={'center'} lineHeight={'28px'}>Something went wrong.</Text>
                                <Text mb={6} fontWeight={'400'} color={'#8F8F8F'} fontSize={'14PX'} textAlign={'center'} lineHeight={'28px'}>Please re-enter your gallery and token details and submit again. </Text>
                                <Button bg='#0C0B86' color='#fff' mx={'auto'} borderRadius={'0px'} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        leftIcon={<ArrowBackIcon />} minW={'99px'} onClick={() => { setDeployStep(0) }}>Go Back</Button>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isWalletConnectOpen}
                onClose={onWalletConnectClose}
            >
                <ModalOverlay />

                <ModalContent borderRadius={'0px'}>
                    <ModalCloseButton />
                    <ModalBody p={10} pl={6} pr={6} >
                        <Heading as={'h2'} mt={'1rem'} color={'#363535'} fontSize={'1.5rem'} fontWeight={'600'} textAlign={'center'}>Connect Your Preferred Wallet</Heading>
                      <Box display={'flex'} justifyContent={'space-between'}
                      pt={'1.5rem'}>
                          <Button onClick={handleMetamaskConnect}  display={'flex'} leftIcon={
                              <Icon width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16.3779 1.6875L10.1094 6.32578L11.2751 3.59229L16.3779 1.6875Z" fill="#201F1F" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M1.91943 1.6875L8.13217 6.36907L7.02232 3.59229L1.91943 1.6875Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M14.121 12.4421L12.4531 14.99L16.0245 15.9734L17.0476 12.4978L14.121 12.4421Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M1.25586 12.4978L2.27271 15.9734L5.83791 14.99L4.17621 12.4421L1.25586 12.4978Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5.64584 8.13778L4.65381 9.63441L8.18799 9.79521L8.0702 5.99182L5.64584 8.13778Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M12.6515 8.13781L10.19 5.94855L10.1094 9.79523L13.6435 9.63444L12.6515 8.13781Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5.83789 14.99L7.97698 13.9572L6.13552 12.5225L5.83789 14.99Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.3203 13.9572L12.4532 14.99L12.1618 12.5225L10.3203 13.9572Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M12.4532 14.9902L10.3203 13.9574L10.4939 15.3427L10.4753 15.9302L12.4532 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5.83789 14.9902L7.82201 15.9302L7.8096 15.3427L7.97698 13.9574L5.83789 14.9902Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M7.85876 11.6073L6.08545 11.0878L7.33791 10.5126L7.85876 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.438 11.6073L10.9588 10.5126L12.2175 11.0878L10.438 11.6073Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5.83745 14.99L6.14749 12.4421L4.17578 12.4978L5.83745 14.99Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M12.1499 12.4421L12.4537 14.99L14.1216 12.4978L12.1499 12.4421Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M13.6435 9.6344L10.1094 9.79519L10.438 11.6073L10.9588 10.5126L12.2175 11.0877L13.6435 9.6344Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M6.08608 11.0877L7.33854 10.5126L7.85939 11.6073L8.18799 9.79519L4.65381 9.6344L6.08608 11.0877Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M4.65381 9.6344L6.1357 12.5225L6.08606 11.0877L4.65381 9.6344Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M12.2179 11.0877L12.1621 12.5225L13.644 9.6344L12.2179 11.0877Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M8.18803 9.79517L7.85938 11.6072L8.27479 13.747L8.36782 10.9269L8.18803 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.1097 9.79517L9.93604 10.9208L10.0229 13.747L10.4383 11.6072L10.1097 9.79517Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.4384 11.6073L10.0229 13.747L10.3206 13.9573L12.1621 12.5225L12.2179 11.0878L10.4384 11.6073Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M6.08545 11.0878L6.13509 12.5225L7.97655 13.9573L8.27417 13.747L7.85876 11.6073L6.08545 11.0878Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.4757 15.9301L10.4943 15.3426L10.3331 15.2066H7.96462L7.8096 15.3426L7.82201 15.9301L5.83789 14.9901L6.53232 15.5591L7.9398 16.53H10.3517L11.7654 15.5591L12.4536 14.9901L10.4757 15.9301Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.3202 13.9572L10.0226 13.747H8.27409L7.97651 13.9572L7.80908 15.3426L7.9641 15.2065H10.3326L10.4938 15.3426L10.3202 13.9572Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M16.6446 6.6288L17.1717 4.06848L16.378 1.6875L10.3203 6.17119L12.6516 8.13779L15.944 9.0964L16.6694 8.24914L16.3532 8.02029L16.8554 7.56268L16.471 7.26582L16.9733 6.88238L16.6446 6.6288Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M1.125 4.06848L1.65823 6.6288L1.31721 6.88238L1.82564 7.26582L1.44122 7.56268L1.94344 8.02029L1.62722 8.24914L2.35266 9.0964L5.64506 8.13779L7.97635 6.17119L1.91864 1.6875L1.125 4.06848Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M15.9443 9.09631L12.6519 8.13776L13.644 9.63439L12.1621 12.5225L14.1214 12.4977H17.048L15.9443 9.09631Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M5.64567 8.13776L2.35331 9.09631L1.25586 12.4977H4.17621L6.13549 12.5225L4.65364 9.63439L5.64567 8.13776Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M10.1102 9.79522L10.321 6.17115L11.2759 3.59229H7.02246L7.97729 6.17115L8.1881 9.79522L8.26872 10.9331L8.27492 13.747H10.0234L10.0296 10.9331L10.1102 9.79522Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"/>
                              </Icon>
                          }  maxW={'194px'}  minW={'194px'} py='1.5rem' border={'1px solid #D2D2D2'} w='100%' mt='1rem' borderRadius={'0px'} bg='#fff' color='#201F1F' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}

                          > MetaMask  </Button>
                          <Button onClick={handlewalletconnect}  display={'flex'} leftIcon={
                              <Icon width="20px" height="auto" viewBox="0 0 300 185" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                  <title>WalletConnect</title>
                                  <desc>Created with Sketch.</desc>
                                  <defs></defs>
                                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                      <g id="walletconnect-logo-alt" fill="#3B99FC" fillRule="nonzero">
                                          <path d="M61.4385429,36.2562612 C110.349767,-11.6319051 189.65053,-11.6319051 238.561752,36.2562612 L244.448297,42.0196786 C246.893858,44.4140867 246.893858,48.2961898 244.448297,50.690599 L224.311602,70.406102 C223.088821,71.6033071 221.106302,71.6033071 219.883521,70.406102 L211.782937,62.4749541 C177.661245,29.0669724 122.339051,29.0669724 88.2173582,62.4749541 L79.542302,70.9685592 C78.3195204,72.1657633 76.337001,72.1657633 75.1142214,70.9685592 L54.9775265,51.2530561 C52.5319653,48.8586469 52.5319653,44.9765439 54.9775265,42.5821357 L61.4385429,36.2562612 Z M280.206339,77.0300061 L298.128036,94.5769031 C300.573585,96.9713 300.573599,100.85338 298.128067,103.247793 L217.317896,182.368927 C214.872352,184.763353 210.907314,184.76338 208.461736,182.368989 C208.461726,182.368979 208.461714,182.368967 208.461704,182.368957 L151.107561,126.214385 C150.496171,125.615783 149.504911,125.615783 148.893521,126.214385 C148.893517,126.214389 148.893514,126.214393 148.89351,126.214396 L91.5405888,182.368927 C89.095052,184.763359 85.1300133,184.763399 82.6844276,182.369014 C82.6844133,182.369 82.684398,182.368986 82.6843827,182.36897 L1.87196327,103.246785 C-0.573596939,100.852377 -0.573596939,96.9702735 1.87196327,94.5758653 L19.7936929,77.028998 C22.2392531,74.6345898 26.2042918,74.6345898 28.6498531,77.028998 L86.0048306,133.184355 C86.6162214,133.782957 87.6074796,133.782957 88.2188704,133.184355 C88.2188796,133.184346 88.2188878,133.184338 88.2188969,133.184331 L145.571,77.028998 C148.016505,74.6345347 151.981544,74.6344449 154.427161,77.028798 C154.427195,77.0288316 154.427229,77.0288653 154.427262,77.028899 L211.782164,133.184331 C212.393554,133.782932 213.384814,133.782932 213.996204,133.184331 L271.350179,77.0300061 C273.79574,74.6355969 277.760778,74.6355969 280.206339,77.0300061 Z" id="WalletConnect"></path>
                                      </g>
                                  </g>
                              </Icon>                          }  maxW={'194px'}  minW={'194px'} py='1.5rem' border={'1px solid #D2D2D2'} w='100%' mt='1rem' borderRadius={'0px'} bg='#fff' color='#201F1F' _focus={{ bg: "#fff", }}  _hover={{ bg: "#fff", }} _active={{ bg: "#fff", }}

                          > WalletConnect  </Button>
                      </Box>
                    </ModalBody>

                </ModalContent>
            </Modal> */}

        </>
    );
}

export default SmartContract;

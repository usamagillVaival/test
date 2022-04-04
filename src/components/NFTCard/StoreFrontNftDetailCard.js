import {
  Box,
  Text,
  Grid,
  Icon,
  Image,
  Button,
  useToast,
  Heading,
  Flex,
  Link,
  useDisclosure,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  Link as ReachLink,
  navigate,
  Redirect,
  redirectTo,
} from "@reach/router";
import { SwapWidget } from "@uniswap/widgets";

import { useState } from "react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import server from "../../apis/server";

import Web3 from "web3";
import Web3Modal from "web3modal";

import DV from "../../abis/DadaVault.json";
import WETH from "../../abis/weth.json";
import Wether from "../../assets/images/Wether.svg";
import CryptoJS from "crypto-js";
import { IoArrowBackSharp } from "react-icons/io5";

import { Formik } from "formik";
import * as yup from "yup";

import WalletConnectProvider from "@walletconnect/web3-provider";
const chain = process.env.REACT_APP_CHAIN_ID;
const InfuraId = process.env.REACT_APP_INFURA_ID;
const infuraLink = process.env.REACT_APP_INFURA_LINK;
const WETHaddress = process.env.REACT_APP_WETH_ADDRESS;
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;
const network = process.env.REACT_APP_NETWORK;
const moonPayApiKey = process.env.REACT_APP_MOONPAY_APIKEY;
function StoreFrontNftDetailCard(props) {
  const infuraId = InfuraId;
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: infuraId, // required
      },
    },
  };
  const toast = useToast();
  
  const nftData = props?.data;

  const galleryProfile = props?.profile;
  const {
    isOpen: isInquiryNftOpen,
    onOpen: onInquiryNftOpen,
    onClose: onInquiryNftClose,
  } = useDisclosure();
  const {
    isOpen: isMakeOfferOpen,
    onOpen: onMakeOfferOpen,
    onClose: onMakeOfferClose,
  } = useDisclosure();
  const {
    isOpen: isLowEthBalanceOpen,
    onOpen: onLowEthBalanceOpen,
    onClose: onLowEthBalanceClose,
  } = useDisclosure();

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [convertEthr, setconvertEthr] = useState(false);
  const [provider, setProvider] = useState(null);
  const {
    isOpen: isMoonpayOpen,
    onOpen: onMoonpayOpen,
    onClose: onMoonpayClose,
  } = useDisclosure();

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [moonPaybtn, setMoonPaybtn] = useState(true);

  const User1 = JSON.parse(localStorage.getItem("User"));
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
  const userType = User1 ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
  const userID = userType?._id;
  const userAccount = userType?.account_type;
  console.log(userAccount)
  const [walletBalance, setWalletBalance] = useState("");

  let validationSchema = yup.object({
    price: yup.string().required("Required"),
  });

  const convertether = () => {
    setconvertEthr(true);
  };
  const revertEther = () => {
    setconvertEthr(false);
  };
  function handleBack() {
    props?.func();
  }

  const buyNow = async (art) => {
    if (userAccount == "collector") {
      const { data } = await server.post(
        "users/artDetail",
        {
          artId: art?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.art[0]?.buying_status == "pending") {
        toast({
          title: "Failed",
          description: "buy transaction is already exist",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
      } else if (data?.art[0]?.buying_status == "sold") {
        toast({
          title: "Failed",
          description: "Art not available",
          status: "error",
          duration: 4000,
          variant: "top-accent",
          isClosable: true,
          position: "top-right",
        });
      } else {
        /////
        const price = art?.price;
        const token_id = art?.token_id;
        const contractAddress = art?.galleryContractAddress;
        const web3Modal = new Web3Modal({
          providerOptions,
        });
        await web3Modal.connect().then(async (r) => {
        
          if (r?.chainId != "0x4") {
            //  setLoader(false)
            localStorage.removeItem("walletconnect");
            toast({
              title: "Error",
              description: `Please Switch to ${network} Network`,
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top-right",
              variant: "top-accent",
            });
          } else {
            const web3 = new Web3(r);
            const weiPrice = web3.utils.toWei(price.toString(), "ether");
            
            const accounts = await web3.eth.getAccounts();
            const collectorWalletAddress =
              userType?.collector_wallet_public_key;
            const collectorBalance = await web3.eth.getBalance(
              collectorWalletAddress
            );
            const balanceInEther = web3.utils.fromWei(
              collectorBalance,
              "ether"
            );
          
            setWalletBalance(balanceInEther);

            console.log("coll: ", collectorWalletAddress);

            if (
              collectorWalletAddress.toLowerCase() == accounts[0].toLowerCase()
            ) {
              
              if (Number(collectorBalance) < Number(weiPrice)) {

                onLowEthBalanceOpen();
              } 
              else {
                const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
                dv.methods
                  .buy(contractAddress, token_id)
                  .send({ from: accounts[0], value: weiPrice })
                  .on("transactionHash", async function (hash) {
                    props?.state1(false);
                    props?.state(true);
                    toast({
                      title: "Transaction submitted",
                      description: `Please wait a  few minutes for confirmation`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "top-right",
                      variant: "top-accent",
                    });
                    let data = {
                      artId: art?._id,
                      hash,
                      collector_Wallet_address: accounts[0],
                    };
                    let ciphertext = CryptoJS.AES.encrypt(
                      JSON.stringify(data),
                      "dvault@123"
                    ).toString();
                    await server
                      .post(
                        "/users/InsertBuyingHash",
                        {
                          payload: ciphertext,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then(() => {
                        // api call then
                      })
                      .catch((e) => console.log(e));
                    ///////////////
                    let data1 = {
                      purchase_option: "buy",
                      sale_price: art?.price,
                      userId: userID,
                      artworkId: art?._id,
                      galleryProfile: galleryProfile,
                      sale_status: "pending",
                    };
                    let ciphertext1 = CryptoJS.AES.encrypt(
                      JSON.stringify(data1),
                      "dvault@123"
                    ).toString();
                    await server

                      .post(
                        "/nft/Buy",
                        {
                          payload: ciphertext1,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then(() => {
                        // api call then
                      })
                      .catch((e) => console.log(e));
                  })
                  .then((result) => {
                    props?.state2(false);
                    props?.state3();
                    props?.state(false);
                    toast({
                      title: "Purchase complete",
                      description: `Your NFT purchase is completed. The NFT has been transferred to your wallet.`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "top-right",
                      variant: "top-accent",
                    });
                  })
                  .catch((e) => {
                    props?.state(false);
                    props?.state1(false);
                    console.log(e);
                    toast({
                      title: "Failed",
                      description: `${e.message}`,
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                      position: "top-right",
                      variant: "top-accent",
                    });
                  });
              }
            } else {
              toast({
                title: "Failed",
                description: "Please Select Your Onboarding Wallet to continue",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
                variant: "top-accent",
              });
            }
          }
        });
      }
    } else {
      toast({
        title: "Log in to buy NFTs",
        description: `Please create or sign into your account to purchase this NFT.`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    }
  };

  const makeOfferModal = async () => {
  
    if (userAccount == "collector") {
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      await web3Modal.connect().then(async (r) => {
        const web3 = new Web3(r);

        setProvider(r);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const collectorWalletAddress = userType?.collector_wallet_public_key;
        if (collectorWalletAddress == accounts[0]) {
          const weth = new web3.eth.Contract(WETH.abi, WETHaddress);
          let balance = await weth.methods.balanceOf(accounts[0]).call();
          const collectorBalance = await web3.eth.getBalance(
            collectorWalletAddress
          );
          const balanceInEther = web3.utils.fromWei(collectorBalance, "ether");
          // if( (balance<nftData)   )
          setWalletBalance(balanceInEther);
          balance = web3.utils.fromWei(balance.toString());
          setBalance(balance);
          onMakeOfferOpen();
        } else {
          toast({
            title: "Failed",
            description: "Please Select Your Onboarding Wallet to continue",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
            variant: "top-accent",
            color: "red",
          });
        }
      });
    } else {
      toast({
        title: "Log in to buy NFTs",
        description: `Please create or sign into your account to purchase this NFT.`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    }
  };

  const makeOffer = async (values, resetForm) => {
    if (userAccount == "collector") {
      if (values.price > balance) {
        if ((walletBalance+balance)<values?.price)
        {
          onLowEthBalanceOpen()
        onMakeOfferClose()
          
        }
        else
        {
          convertether()
        }
      } else {
        const web3 = new Web3(provider);
        const weth = new web3.eth.Contract(WETH.abi, WETHaddress);
        const accounts = await web3.eth.getAccounts();
        const intPrice = Number(values?.price);
        const weiPrice = web3.utils.toWei(intPrice.toString(), "ether");
        const hash = web3.utils.soliditySha3(
          nftData?.galleryContractAddress,
          nftData?.token_id,
          weiPrice
        );

        await web3.eth.personal
          .sign(hash, accounts[0], console.log)
          .then(async (sig) => {
          
            const allowed = await weth.methods
              .allowance(accounts[0], dadaVaultAddress)
              .call();
            const reqAllowance = Number(allowed) + Number(weiPrice);
            await weth.methods
              .approve(dadaVaultAddress, reqAllowance.toString())
              .send({ from: accounts[0] })
              .on("transactionHash", async function (hash) {
                let data1 = {
                  purchase_option: "offer",
                  sale_price: nftData?.price,
                  offered_price: values?.price,
                  offered_status: 0,
                  userId: userID,
                  artworkId: nftData?._id,
                  galleryProfile: galleryProfile,
                  collector_offer_account: accounts[0],
                  offered_signature: sig,
                  hash: hash,
                };
                let ciphertext1 = CryptoJS.AES.encrypt(
                  JSON.stringify(data1),
                  "dvault@123"
                ).toString();
                await server

                  .post(
                    "/nft/MakeOffer",
                    {
                      payload: ciphertext1,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  )
                  .then(() => {
                    onMakeOfferClose();
                  })
                  .catch((e) => console.log(e));
                toast({
                  title: "Success",
                  description: `Your transaction is submitted please wait for confirmation`,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                  variant: "top-accent",
                });
              })
              .then(() => {
                toast({
                  title: "Offer submitted",
                  description: `You've successfully submitted your offer to ${nftData?.galleryName}`,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                  variant: "top-accent",
                });
              });
          });
      }
    } else {
      toast({
        title: "Log in to buy NFTs",
        description: `Please create or sign into your account to purchase this NFT.`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    }
  };

  const sendMessageOnClick = async () => {
    const { data } = await server.post(
      "users/conversations",
      {
        senderId: userID,
        nftId: props?.data?._id,
        subject: inquiryName?.target?.value,
        textMessage: inquiryMessage?.target?.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      if (data.message) {
        onInquiryNftClose();

        toast({
          title: `You sent a message to ${nftData?.galleryName}.`,
          // description: `Offer is created`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
          variant: "top-accent",
        });
        //  toast(data.message)
      } else {
        // toast(data.error)
      }
      
    }
  };

  return (
    <>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        mb={"2.5rem"}
      >
        <Text
          fontWeight={"500"}
          fontSize={"14px"}
          color={"#4D4C4C"}
          lineHeight={"20px"}
        >
          <Link
            textDecoration={"none!important"}
            onClick={() => {
              if (userAccount == "admin") {
                navigate("/admin/Dashboard");
              } else if (userAccount == "gallery") {
                navigate("/gallery/Dashboard");
              } else if (userAccount == "artist") {
                navigate("/ArtistDashboardNew");
              } else if (userAccount == "collector") {
                navigate("/collector/Dashboard");
              }
            }}
          >
            Home
          </Link>
        </Text>
        <Icon
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.7812 7.99999L5.4812 4.69999L6.42387 3.75732L10.6665 7.99999L6.42387 12.2427L5.4812 11.3L8.7812 7.99999Z"
            fill="#4D4C4C"
          />
        </Icon>
        <Text
          fontWeight={"500"}
          fontSize={"14px"}
          color={"#4D4C4C"}
          lineHeight={"20px"}
          onClick={handleBack}
        >
          <Link textDecoration={"none!important"}>
            {props?.info == "imagenfts" ? (
              <Text>Image</Text>
            ) : (
              <Text>All NFTs</Text>
            )}
          </Link>
        </Text>
        <Icon
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.7812 7.99999L5.4812 4.69999L6.42387 3.75732L10.6665 7.99999L6.42387 12.2427L5.4812 11.3L8.7812 7.99999Z"
            fill="#4D4C4C"
          />
        </Icon>
        <Text
          fontWeight={"500"}
          fontSize={"14px"}
          color={"#8F8F8F"}
          lineHeight={"20px"}
        >
          {nftData?.title}
        </Text>
      </Flex>
      <Flex gap={{base:0,md:6,lg:16}} flexWrap={{base:'wrap',md:'nowrap'}}>
        <Box  mb={{base:4,md:0}} order={{base:2,md:1,lg:1}}  width={{base:'100%',md:"50%",lg:'33.33%'}}>
          <Heading
            fontWeight={"500"}
            fontSize={"30px"}
            mb={"1rem"}
            color={"#201F1F"}
            lineHeight={"36px"}
          >
            {nftData?.title}{" "}
          </Heading>

          <Text
            color={"#363535"}
            fontSize={"18px"}
            lineHeight={"28px"}
            fontWeight={"500"}
            mb={1}
            textAlign={"left"}
          >
            {nftData?.price} ETH
          </Text>
          <Text
            color={"#797979"}
            fontWeight={"400"}
            fontSize={"14px"}
            lineHeight={"20px"}
            mb={4}
          >
            <Icon
              mr={"5px"}
              width="12px"
              height="12px"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1C5.0111 1 4.0444 1.29324 3.22215 1.84265C2.3999 2.39206 1.75904 3.17295 1.3806 4.08658C1.00217 5.00021 0.90315 6.00555 1.09608 6.97545C1.289 7.94536 1.76521 8.83627 2.46447 9.53553C3.16373 10.2348 4.05465 10.711 5.02455 10.9039C5.99446 11.0969 6.99979 10.9978 7.91342 10.6194C8.82705 10.241 9.60794 9.6001 10.1573 8.77785C10.7068 7.95561 11 6.98891 11 6C10.9985 4.67439 10.4712 3.40352 9.53383 2.46617C8.59648 1.52882 7.32561 1.00154 6 1V1ZM8.88625 4.41667L6.03417 8.28708C6.0005 8.33176 5.95826 8.36928 5.90993 8.39745C5.8616 8.42563 5.80814 8.4439 5.75268 8.45119C5.69721 8.45848 5.64085 8.45465 5.58688 8.43993C5.53291 8.4252 5.48241 8.39987 5.43833 8.36542L3.40167 6.73708C3.35893 6.70288 3.32335 6.6606 3.29696 6.61266C3.27057 6.56471 3.25387 6.51203 3.24784 6.45763C3.23565 6.34776 3.2676 6.23756 3.33667 6.15125C3.40574 6.06494 3.50626 6.00961 3.61612 5.99742C3.72599 5.98523 3.8362 6.01718 3.9225 6.08625L5.62083 7.445L8.21542 3.92375C8.24665 3.87688 8.28707 3.83683 8.33422 3.80601C8.38137 3.7752 8.43428 3.75427 8.48975 3.74448C8.54522 3.7347 8.6021 3.73626 8.65694 3.74907C8.71179 3.76189 8.76348 3.78569 8.80887 3.81904C8.85426 3.85239 8.89241 3.8946 8.92103 3.94312C8.94965 3.99163 8.96813 4.04544 8.97536 4.1013C8.9826 4.15716 8.97843 4.21391 8.96311 4.26811C8.9478 4.32232 8.92165 4.37285 8.88625 4.41667Z"
                fill="#CA9C00"
              />
            </Icon>
            Certified authentic
          </Text>
          <Text
            color={"#797979"}
            fontSize={"16px"}
            lineHeight={"24px"}
            fontWeight={"400"}
            mb={8}
            textAlign={"left"}
          >
            {nftData?.description}
          </Text>

          {nftData?.nft_payment_method.includes("buy") ? (
            <Button
              mb={3}
              bg="#0C0B86"
              color="#fff"

              borderRadius={"0px"}
              _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

              width={"100%"}
              onClick={() => {
                buyNow(nftData);
              }}
              
            >
              Buy now
            </Button>
          ) : null}
          {nftData?.nft_payment_method.includes("offer") ? (
            <Button
              onClick={() => {
                setconvertEthr(false);
                makeOfferModal();
              }}
              isDisabled={props?.state4}
              mb={"2rem"}
              color={"#201F1F"}
              textAlign={"center"}
              border="1px solid #C4C4C4"
              borderRadius={"0px"}
              bg="transparent"

              _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
              marginLeft="auto"
              marginRight={"1rem"}
              width={"100%"}
            >
              Make offer
            </Button>
          ) : null}
        
          <Box p={6} bg={"#F7F7F7"}>
            <Text
              color={"#797979"}
              fontSize={"14px"}
              lineHeight={"20px"}
              fontWeight={"400"}
              mb={4}
              textAlign={"left"}
            >
              Artist: {nftData?.artistName}
            </Text>
            <Text
              color={"#797979"}
              fontSize={"14px"}
              lineHeight={"20px"}
              fontWeight={"400"}
              mb={4}
              textAlign={"left"}
            >
              Gallery: {nftData?.galleryName}
            </Text>
            {userAccount === "collector" && (
              <Text
                color={"#0F0EA7"}
                fontSize={"14px"}
                lineHeight={"20px"}
                fontWeight={"500"}
                textAlign={"left"}
                onClick={onInquiryNftOpen}
              >
                <Link textDecoration={"none!important"}>
                  Make an inquiry about this NFT
                </Link>
              </Text>
            )}
          </Box>
        </Box>
        <Box mb={{base:4,md:0}} order={{base:1,md:2,lg:2}} width={{base:'100%',md:"50%",lg:'66.66%'}}>
          <Image
            src={`http://51.222.241.160:8001/api/users/artist_profile/${nftData?.file}`}
            width={"100%"}
            height={'100%'}
            objectFit={'cover'}
          />
        </Box>
      </Flex>
      <Modal onClose={onInquiryNftClose} isOpen={isInquiryNftOpen}>
        <ModalOverlay />
        <ModalContent minW={"fit-content"}>
          <ModalHeader
            borderBottom={"1px solid #D2D2D2"}
            color={"#363535"}
            px={6}
            py={5}
            lineHeight={"28px"}
            fontSize={"18px"}
          >{`Make an inquiry about ${nftData?.title}`}</ModalHeader>
          <ModalBody p={6}>
            <Box
              className="Box-card"
              maxW="3xl"
              mx="auto"
              bg="#fff"
              borderRadius="0.5rem"
              width={"100%"}
              minW={{
                base: "98%",
                sm: "98%",
                md: "98%",
                lg: "720px",
                xl: "720px",
              }}
            >
              <Box mb={4}>
                <FormLabel
                  color="#636262"
                  fontWeight="500"
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  mb={2}
                >
                  Name
                </FormLabel>
                <Input
                  color={"#363535"}
                  type="text"
                  bg={"#fff"}
                  borderRadius={"0"}
                  borderColor={"#D2D2D2"}
                  onChange={(e) => setInquiryName(e)}
                />
              </Box>
              <Box mb={4}>
                <FormLabel
                  color="#636262"
                  fontWeight="500"
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  mb={2}
                >
                  Email Address
                </FormLabel>
                <Input
                  color={"#363535"}
                  type="email"
                  bg={"#fff"}
                  borderRadius={"0"}
                  borderColor={"#D2D2D2"}
                />
              </Box>
              <Box mb={4}>
                <FormLabel
                  color="#636262"
                  fontWeight="500"
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  mb={2}
                >
                  Message
                </FormLabel>
                <Textarea
                  color={"#363535"}
                  type="email"
                  bg={"#fff"}
                  borderRadius={"0"}
                  borderColor={"#D2D2D2"}
                  onChange={(e) => setInquiryMessage(e)}
                />
              </Box>
              <Box display="flex" flexWrap={"wrap"}>
                <Button
                  textAlign={"center"}
                  border="1px solid #C4C4C4"
                  borderRadius={"0px"}
                  bg="transparent"
                  color="#4D4D4D"
                  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                  marginRight={"0.75rem"}
                  onClick={onInquiryNftClose}
                >
                  Cancel
                </Button>
                <Button
                  bg="#0C0B86"
                  color="#fff"
                  rightIcon={<ArrowForwardIcon />}
                  borderRadius={"0px"}
                  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                  marginLeft={{ base: "0rem", sm: "1rem", md: "0.75rem" }}
                  onClick={sendMessageOnClick}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        size={"lg"}
        onClose={onLowEthBalanceClose}
        isOpen={isLowEthBalanceOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={6}>
            <Box
              className="Box-card"
              maxW="3xl"
              mx="auto"
              bg="#fff"
              borderRadius="0.5rem"
              width={"100%"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Icon
                  mt={5}
                  mb={3}
                  width="48px"
                  height="48px"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="24" fill="#CFCFED" />
                  <path
                    d="M23.986 14.0022C21.3143 14.046 18.7671 15.1394 16.8951 17.0461C15.9585 17.9786 15.2194 19.0904 14.7222 20.3151C14.225 21.5397 13.9798 22.852 14.0013 24.1736C13.9998 25.4649 14.2531 26.7439 14.7467 27.9372C15.2404 29.1304 15.9646 30.2145 16.878 31.1274C17.7914 32.0402 18.876 32.7639 20.0695 33.2568C21.2631 33.7497 22.5422 34.0023 23.8335 34H24.0118C26.6843 33.9725 29.2368 32.8859 31.1092 30.9788C32.9815 29.0716 34.0208 26.4995 33.9991 23.827C34.0021 22.52 33.7438 21.2255 33.2393 20.0198C32.7349 18.8141 31.9944 17.7214 31.0615 16.806C30.1285 15.8906 29.022 15.171 27.8069 14.6895C26.5918 14.208 25.2927 13.9743 23.986 14.0022ZM22.7503 27.7857C22.7443 27.6223 22.7709 27.4594 22.8286 27.3064C22.8863 27.1534 22.974 27.0135 23.0864 26.8948C23.1988 26.7761 23.3338 26.681 23.4834 26.6151C23.633 26.5491 23.7942 26.5137 23.9577 26.5108H23.9802C24.309 26.5115 24.6248 26.6394 24.8614 26.8677C25.0979 27.096 25.2369 27.4071 25.2492 27.7357C25.2553 27.8991 25.2288 28.0621 25.1711 28.2151C25.1134 28.3681 25.0258 28.5081 24.9134 28.6268C24.8009 28.7455 24.6659 28.8406 24.5163 28.9065C24.3666 28.9724 24.2053 29.0078 24.0418 29.0105H24.0193C23.6907 29.0095 23.3751 28.8815 23.1386 28.6532C22.9021 28.4249 22.763 28.1141 22.7503 27.7857ZM23.1669 24.4177V19.4183C23.1669 19.1973 23.2547 18.9854 23.411 18.8291C23.5672 18.6728 23.7792 18.5851 24.0002 18.5851C24.2212 18.5851 24.4331 18.6728 24.5894 18.8291C24.7456 18.9854 24.8334 19.1973 24.8334 19.4183V24.4177C24.8334 24.6387 24.7456 24.8507 24.5894 25.0069C24.4331 25.1632 24.2212 25.251 24.0002 25.251C23.7792 25.251 23.5672 25.1632 23.411 25.0069C23.2547 24.8507 23.1669 24.6387 23.1669 24.4177Z"
                    fill="#0C0B86"
                  />
                </Icon>
                <Text
                  my={2}
                  fontSize={"18px"}
                  fontWeight={"500"}
                  LineHeight={"28px"}
                  color={"#363535"}
                >
                  Low ETH balance
                </Text>
                <Text
                  textAlign={"center"}
                  my={2}
                  fontSize={"14px"}
                  fontWeight={"400"}
                  LineHeight={"20px"}
                  color={"#8F8F8F"}
                >
                  The wallet you have connected does not contain enough ETH for
                  this transaction. Please purchase more ETH and try again.
                </Text>
              </Box>

              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Button
                  width={"100%"}
                  textAlign={"center"}
                  border="1px solid #C4C4C4"
                  borderRadius={"0px"}
                  bg="transparent"
                  color="#4D4D4D"
                  _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                  onClick={onLowEthBalanceClose}
                >
                  Cancel
                </Button>
                <Button
                  width={"100%"}
                  bg="#0C0B86"
                  color="#fff"

                  borderRadius={"0px"}_focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                  onClick={()=>{
                    onMoonpayOpen()
                    onLowEthBalanceClose()
                  }
                  }
                >
                  Buy crypto with Moonpay
                </Button>
              </Grid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={onMakeOfferClose} isOpen={isMakeOfferOpen} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottom={"1px solid #D2D2D2"}
            color={"#363535"}
            px={6}
            py={5}
            lineHeight={"28px"}
            fontSize={"18px"}
            textAlign="center"
          >
            {convertEthr ? (
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="start"
              >
                <IoArrowBackSharp onClick={revertEther} />

                <Text mx={"auto"}> Add Funds</Text>
              </Box>
            ) : (
              "Make an offer"
            )}{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6}>
            <Formik
              initialValues={{ price: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                makeOffer(values, resetForm);
              }}
            >
              {(formikProps) => (
                <>
                  <Box
                    className="Box-card"
                    mx="auto"
                    bg="#fff"
                    borderRadius="0.5rem"
                    width={"100%"}
                  >
                    {convertEthr ? (
                      <Box classname="Uniswap">
                        <Text>
                          Account:{" "}
                          {account.slice(0, 6) + "..." + account.slice(38, 43)}
                        </Text>

                        <SwapWidget
                          jsonRpcEndpoint={infuraLink}
                          width={"100%"} // Custom width in pixels*/}
                          provider={provider}
                        />
                      </Box>
                    ) : (
                      <Box mb={4}>
                        <FormLabel
                          color="#636262"
                          fontWeight="500"
                          fontSize={"16px"}
                          lineHeight={"24px"}
                          mb={2}
                        >
                          Price
                        </FormLabel>
                        {account.slice(0, 6) + "..." + account.slice(38, 43)}
                        <InputGroup borderRadius="0px">
                          <InputLeftAddon borderRadius="0px">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Image
                                src={Wether}
                                height={"18px"}
                                maxH={"100%"}
                                mr={2}
                              />
                              <Text
                                fontWeight="500"
                                fontSize="16px"
                                color="#707070"
                              >
                                WETH
                              </Text>
                            </Box>
                          </InputLeftAddon>
                          <Input
                            type="text"
                            placeholder="Amount"
                            borderRadius="0px"
                            name="price"
                            id="price"
                            value={formikProps.values.price}
                            onChange={formikProps.handleChange("price")}
                            onBlur={formikProps.handleBlur("price")}
                            error={
                              formikProps.errors.price &&
                              formikProps.touched.price
                                ? true
                                : false
                            }
                          />
                          {formikProps.errors.price &&
                            formikProps.touched.price && (
                              <Alert status="error" color={'#DD2922'} pl={0} fontWeight={'400'} fontSize={'14px'} lineheight={'20px'}>

                                {formikProps.errors.price}
                              </Alert>
                            )}
                        </InputGroup>
                        <Text
                          my={2}
                          ml={"auto"}
                          fontWeight="500"
                          fontSize="14px"
                          color="#707070"
                        >
                          Balance : <Text as="span">{balance}</Text>
                        </Text>

                        <Box w="100%" my={4}>
                          <Button
                            textAlign={"center"}
                            border="1px solid #C4C4C4"
                            bg="#0C0B86"
                            color="#fff"

                            borderRadius={"0px"}
                            _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                            marginRight={"0.75rem"}
                            width={"calc(50% - 0.75rem)"}
                            onClick={formikProps.handleSubmit}
                          >
                            Make Offer
                          </Button>

                          <Button
                            textAlign={"center"}
                            border="1px solid #C4C4C4"
                            borderRadius={"0px"}
                            bg="transparent"
                            color="#4D4D4D"
                            _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                            marginLeft={"0.75rem"}
                            width={"calc(50% - 0.75rem)"}
                            onClick={convertether}
                          >
                            Convert Eth
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        onClose={onMoonpayClose}
        isOpen={isMoonpayOpen}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            onClick={() => {
              setMoonPaybtn(true);
            }}
          />
          <ModalBody py={"40px"} bg={"#f9f9f9"}>
           
             
              <Box>
                <iframe
                  allow="accelerometer; autoplay; camera; gyroscope; payment"
                  frameborder="0"
                  height="100%"
                  src={moonPayApiKey}
                  width="100%"
                  className="IframeStyling"
                ></iframe>
              </Box>
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default StoreFrontNftDetailCard;

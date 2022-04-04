import React from "react";
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
  Select,
  Link,
  Stack,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  FormLabel,
  Textarea,
  InputLeftAddon, Alert, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Divider,
} from "@chakra-ui/react";
import server from "../../apis/server";
import ReactSelect from "react-select";

import {
  AddIcon,
  ArrowForwardIcon,
  SearchIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import {
  Card,
  CardHeading,
  CustomBadge,
  NFTCustomCard,
} from "../../assets/StyledComponent/styeledComponent";
import Avatar from "../../assets/images/avatar.png";
import { ArtistListing } from "../index";
import moment from "moment";
import Dummy from "../../assets/images/dummy2.png";
import CryptoJS from "crypto-js";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Formik } from "formik";
import * as yup from "yup";
import { recentlyadded } from "../StoreFront/GalleryStoreFront/FilterFunctions";
import { navigate } from "@reach/router";
import { useToast, Spinner } from "@chakra-ui/react";

function Messages(props) {
  const [conversations, setConversations] = useState([]);
  const [sendMessage, setSendMessage] = useState(false);

  const [inboxMessagesDetails, setInboxMessagesDetails] = useState([]);
  const [sentMessagesDetails, setSentMessagesDetails] = useState([]);
  const [deletedMessagesDetails, setDeletedMessagesDetails] = useState([]);
  // const [inquiryName, setInquiryName] = useState("");
  // const [inquiryMessage, setInquiryMessage] = useState("");
  // const [inquiryNFT, setInquiryNFT] = useState("");
  // const [receiverEmail, setReceiverEmail] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const toast = useToast();
  const [publishStatus, setPublishStatus] = useState(true);
  const [galleryStatus, setGalleryStatus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [options, setOption] = useState([]);
  const [listingGalleryData, setListingGalleryData] = useState([]);
  const [listingCollectors, setListingCollectors] = useState([]);
  const User1 = JSON.parse(localStorage.getItem("User"));
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
  const user = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
  const galleryNAme = user?.name;

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

  //   useEffect(() => {
  //     socket.current = io("ws://localhost:8900");
  //     socket.current.on("getMessage", (data) => {
  //       setArrivalMessage({
  //         sender: data.senderId,
  //         text: data.text,
  //         createdAt: Date.now(),
  //       });
  //     });
  //   }, []);

  //   useEffect(() => {
  //     arrivalMessage &&
  //       currentChat?.members.includes(arrivalMessage.sender) &&
  //       setMessages((prev) => [...prev, arrivalMessage]);
  //   }, [arrivalMessage, currentChat]);

  //   useEffect(() => {
  //     socket.current.emit("addUser", user._id);
  //     socket.current.on("getUsers", (users) => {
  //       setOnlineUsers(
  //         user.followings.filter((f) => users.some((u) => u.userId === f))
  //       );
  //     });
  //   }, [user]);

  async function loadGalleriesData() {
    try {
      const { data } = await server.get(`/users/artist_profile/draft/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data)
      {
           console.log('dataaaaaaa',data?.data?.artist_artwork.filter(status=>status.status==5))
        setListingGalleryData(data?.data?.artist_artwork.filter(status=>status.status==5))

        
      }
    } catch (e) {
      // toast({
      //   title: "Failed",
      //   description: `${e}`,
      //   status: "error",
      //   duration: 4000,
      //   variant: "top-accent",
      //   isClosable: true,
      //   position: "top-right",
      // });
    }
  }

  async function loadCollectors() {
    try {
      const { data } = await server.get(`/users/allCollectors`, {
        headers: {
          "Content-Type": "application/json",
        },
        // gallery_profile: galleryName,
      });

      if (data) {
        if (!data?.error) {
          setListingCollectors(data.data);
        }
      }
    } catch (ex) {
      console.log("ex in collectos === ", ex);
    }
  }

  console.log("user ==== ", user);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoader(true);

        const res = await server.get("/users/conversations/" + user._id, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoader(false);

        console.log("conservationnnnnnnnnnn", res?.data?.data);
        setConversations(res?.data?.data);
      } catch (err) {
        setLoader(false);

        console.log(err);
      }
    };
    getConversations();
    user?.account_type === "gallery" && loadGalleriesData();
    user?.account_type === "gallery" && loadCollectors();
  }, [user._id, sendMessage]);

  useEffect(() => {
    const getRecipientDetails = async (recipient) => {
      try {
        let recipientMember = recipient.members.filter(
          (item) => item !== user._id
        );
        const res = await server.get("/users/recipient/" + recipientMember[0], {
          headers: {
            "Content-Type": "application/json",
          },
        });
        let conDetails = res?.data?.data;
        console.log("conDetails === ", conDetails);
        return {
          ...recipient,
          recipientName: conDetails.name,
          recipientGalleryLogo:
            conDetails.account_type === "collector"
              ? conDetails.collector_profile_image
              : conDetails.gallery_logo,
          recipientEmail: conDetails.email,

          date: conDetails.date,
        };
      } catch (err) {
        console.log(err);
        return {};
      }
    };
    (async function () {
      if (conversations && conversations.length > 0) {
        let conversationTableConstruction = await Promise.all(
          conversations.map(async (conversationDetails) => {
            return await getRecipientDetails(conversationDetails);
          })
        );
        let inboxConversationDetails = conversationTableConstruction.filter(
          (item) =>
            item.members &&
            item.members.includes(user._id) &&
            !item?.deletedBy?.includes(user._id) &&
            ([...new Set(item?.senders ? item?.senders : [])].length > 1 ||
              ([...new Set(item?.senders ? item?.senders : [])].length === 1 &&
                !item?.senders?.includes(user._id)))
        );
        await setInboxMessagesDetails([...inboxConversationDetails]);
        let sentConversationDetails = conversationTableConstruction.filter(
          (item) =>
            item.members &&
            item.members.includes(user._id) &&
            !item?.deletedBy?.includes(user._id) &&
            [...new Set(item?.senders ? item?.senders : [])].length === 1 &&
            item?.senders?.includes(user._id)
        );
        setSentMessagesDetails([...sentConversationDetails]);

        let deletedConversationDetails = conversationTableConstruction.filter(
          (item) => item?.deletedBy?.includes(user._id)
        );
        setDeletedMessagesDetails([...deletedConversationDetails]);
      }
    })();
  }, [conversations, sendMessage]);

  console.log("conversation === ", conversations);
  console.log("inboxMessagesDetails === ", inboxMessagesDetails);
  // inquiryName: "",
  //               inquiryMessage: "",
  //               inquiryNFT: "",
  //               receiverEmail: null,
  let validationSchema = yup.object({
    inquiryName: yup.string().required("Subject is Required"),
    receiverEmail: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Send to is required"),
    inquiryMessage: yup.string().required("Message is required"),
    inquiryNFT: yup.string().required("NFT is required"),
  });
  const deleteConversation = async (value) => {
    const { data } = await server.post(
      "users/conversations/delete",
      {
        userId: user._id,
        conversationId: value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data) {
      if (data.message) {
        let updateDeletedConversations = conversations.map((item) => {
          if (item._id === value) {
            item.deletedBy.push(user._id);
          }
          return item;
        });
        setConversations([...updateDeletedConversations]);
        toast({
          title: data?.message,
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
      console.log(data);
    }
  };
  const sendMessageOnClick = async (value) => {
    const { data } = await server.post(
      "users/conversations",
      {
        senderId: user._id,
        nftId: value?.inquiryNFT,
        subject: value?.inquiryName,
        textMessage: value?.inquiryMessage,
        receiverEmail: value?.receiverEmail,
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
        setSendMessage(true);
        toast({
          title: data?.message,
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
      console.log(data);
    }
  };
  console.log("listingCollectors === ", listingCollectors);
  if (loader) {
    return (
      <Box height="100vh" display="flex">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#0C0B86"
          size="xl"
          margin="auto"
        />
      </Box>
    );
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid #0C0B86!important' : '1px solid #D2D2D2',
    })
  }

  console.log("listingGalleryData ==== ", listingGalleryData);
  return (
    <>
      <Modal size={'full'} onClose={onInquiryNftClose} isOpen={isInquiryNftOpen}>
        <ModalOverlay />
        <ModalContent minW={"fit-content"}>
          <ModalCloseButton />
          <ModalBody p={6}>
          <Formik
                    enableReinitialize={true}
                    initialValues={{
                      inquiryName: "",
                      inquiryMessage: "",
                      inquiryNFT: "",
                      receiverEmail: "",
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      sendMessageOnClick(values);
                    }}
                  >
                    {(formikProps) => {
                      console.log("formikProps ==== ", formikProps);
                      return (
            <Box width={'100%'} maxW={'784px'} m={'auto'} pt={'2rem'} mb={'auto'}>
              <Box>
                <Heading fontWeight={'700'} color={'#363535'} fontSize={'1.5rem'} textAlign={'center'} >Send message</Heading>
                <Text fontSize={'16px'} textAlign={'center'} mt={2} mb={10} fontWeight={'300'} color={'#1a1a1a'}>Send a message to a potential collector about one of your NFTs for sale.</Text>
              </Box>
              <Grid templateColumns="repeat(1, 1fr)" gap={6} bg={'#F7F7F7'}>
                <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  
                        <Box
                          className="Box-card"
                          maxW="3xl"
                          mx="auto"
                          bg="#F7F7F7"
                          borderRadius="0.5rem"
                          width={"100%"}
                          minW={{
                            base: "98%",
                            sm: "98%",
                            md: "98%",
                            lg: "720px",
                            xl: "720px",
                          }}
                          p={8}
                        >
                          <Box mb={4}>
                            <FormLabel
                              color="#636262"
                              fontWeight="500"
                              fontSize={"16px"}
                              lineHeight={"24px"}
                              mb={2}
                              width={{ base: '100%', md: '50%' }}

                            >
                              Send To
                            </FormLabel>
                            {/*<Input*/}
                            {/*  width={{ base: '100%', md: '50%' }}*/}
                            {/*  type="email"*/}
                            {/*  name="inquiryName"*/}
                            {/*  id="inquiryName"*/}
                            {/*  color={"#363535"}*/}
                            {/*  bg={"#fff"}*/}
                            {/*  borderRadius={"0"}*/}
                            {/*  borderColor={"#D2D2D2"}*/}
                            {/*  onChange={formikProps.handleChange("inquiryName")}*/}
                            {/*  onFocus={() => {*/}
                            {/*    formikProps.touched["inquiryName"] = true;*/}
                            {/*  }}*/}
                            {/*// onChange={(e) => setInquiryName(e)}*/}
                            {/*/>*/}
                            <Box width={'50%'}>
                              <ReactSelect
                                  className={"customSelect"}
                                  styles={customStyles}
                                  // type="email"
                                  // type="text"
                                  name="receiverEmail"
                                  id="receiverEmail"
                                  // defaultValue={formikProps.values.receiverEmail}
                                  // value={formikProps.values.receiverEmail}
                                  onChange={(e) =>
                                      formikProps.setFieldValue("receiverEmail", e.value)
                                  }
                                  // onChange={(e) => {
                                  //   setReceiverEmail(e.value);
                                  // }}
                                  // onClick={(e) => {
                                  //   debugger;
                                  //   formikProps.setFieldValue("receiverEmail", e.value);

                                  // }}
                                  options={listingCollectors.map((item) => ({
                                    value: item.email,
                                    label: item.email,
                                  }))}
                              />
                              <div>
                                {formikProps.errors.receiverEmail &&
                                    formikProps.touched.receiverEmail && (
                                        <p
                                            style={{
                                              textAlign: "left",
                                              paddingLeft: 10,
                                              color: "red",
                                            }}
                                        >
                                          {formikProps.errors.receiverEmail}
                                        </p>
                                    )}
                              </div>

                            </Box>


                          </Box>

                          <Box mb={4}>
                            <FormLabel
                              color="#636262"
                              fontWeight="500"
                              fontSize={"16px"}
                              lineHeight={"24px"}
                              mb={2}
                              width={{ base: '100%', md: '50%' }}
                            >
                              Subject
                            </FormLabel>
                            <Input

                              width={{ base: '100%', md: '50%' }}

                              type="text"
                              name="inquiryName"
                              id="inquiryName"
                              color={"#363535"}
                              bg={"#fff"}
                              borderRadius={"0"}
                              borderColor={"#D2D2D2"}
                              onChange={formikProps.handleChange("inquiryName")}
                              onFocus={() => {
                                formikProps.touched["inquiryName"] = true;
                              }}
                            // onChange={(e) => setInquiryName(e)}
                            />
                            <div>
                              {formikProps.errors.inquiryName &&
                                formikProps.touched.inquiryName && (
                                  <p
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: 10,
                                      color: "red",
                                    }}
                                  >
                                    {formikProps.errors.inquiryName}
                                  </p>
                                )}
                            </div>
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
                              name="inquiryMessage"
                              id="inquiryMessage"
                              color={"#363535"}
                              // type="email"
                              bg={"#fff"}
                              borderRadius={"0"}
                              borderColor={"#D2D2D2"}
                              onChange={formikProps.handleChange("inquiryMessage")}
                              onFocus={() => {
                                formikProps.touched["inquiryMessage"] = true;
                              }}
                            // onChange={(e) => setInquiryMessage(e)}
                            />
                            <div>
                              {formikProps.errors.inquiryMessage &&
                                formikProps.touched.inquiryMessage && (
                                  <p
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: 10,
                                      color: "red",
                                    }}
                                  >
                                    {formikProps.errors.inquiryMessage}
                                  </p>
                                )}
                            </div>
                          </Box>

                          <Box mb={4}>
                            <FormLabel
                              color="#636262"
                              fontWeight="500"
                              fontSize={"16px"}
                              lineHeight={"24px"}
                              mb={2}
                            >
                              NFT
                            </FormLabel>
                            <Select
                              width={{ base: '100%', md: '50%' }}
                              type="text"
                              name="inquiryNFT"
                              id="inquiryNFT"
                              placeholder="Select NFT"
                              border={"1px solid #D2D2D2"}
                              borderRadius={"0px"}
                              bg={"#FFFFFF"}
                              className={"customSelect"}
                              color={"#636262"}
                              onChange={formikProps.handleChange("inquiryNFT")}

                            // name="NFT"
                            // id="nftId"
                            // onChange={(e) => setInquiryNFT(e)}
                            >
                              {listingGalleryData?.map((data) => {
                                  return (
                                    <option value={data._id}>{data.title}</option>
                                  );
                                })}
                            </Select>
                            <div>
                              {formikProps.errors.inquiryNFT &&
                                formikProps.touched.inquiryNFT && (
                                  <p
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: 10,
                                      color: "red",
                                    }}
                                  >
                                    {formikProps.errors.inquiryNFT}
                                  </p>
                                )}
                            </div>
                          </Box>
                          {/*  */}
                        </Box>
                     
                </Box>
              </Grid>
              <Box mt={'2.5rem'}>
                <Divider />
                <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6} mb='auto' name="form-name">
                  <Box display='flex' mb={'3'} flexWrap={'wrap'}>
                    <Button mb={3} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "transparent", }} _hover={{ bg: "transparent", }} _active={{ bg: "transparent", }} borderRadius={'0px'} marginLeft='auto' 
                                                  onClick={onInquiryNftClose}
                    >Cancel</Button>
                    <Button mb={3} bg='#0C0B86' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                            rightIcon={<ArrowForwardIcon />} marginLeft='1rem' borderRadius={'0px'}
                                                onClick={formikProps.handleSubmit}
                    >Continue</Button>
                  </Box>
                </Grid>
              </Box>
            </Box>
       )}}
          </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box height={"100vh"} overflowY={"scroll"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          marginBottom={"2rem"}
          alignItems={"start"}
          p={{ base: "2", sm: "4", md: "6", lg: "6" }}
          minH={"136"}
          bg={"#fff"}
        >
          <Flex
            w={"100%"}
            display={{ base: "block", sm: "flex", md: "flex", lg: "flex" }}
          >
            <Box mr={"auto"} d="flex" alignItems={"center"} minH={"40px"}>
              <Heading
                color={"#4D4D4D"}
                fontWeight="400"
                fontSize="14px"
                mb={{ base: 3, md: 0 }}
              >
                Messages
              </Heading>
            </Box>
            {user.account_type === "gallery" && (
              <Button
                ml={"auto"}
                mb={{ base: 3, md: 0 }}
                bg="#0F0EA7"
                fontSize={"14px"}
                color="#fff"
                borderRadius={"0px"}
                _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                width={"20%"}
                onClick={onInquiryNftOpen}
                leftIcon={<AddIcon />}
                minW={"140px"}
                maxW={"140px"}
              // isDisabled={props?.state4}
              >
                Send message
              </Button>
            )}
          </Flex>
          <Heading
            mt={"48px"}
            color={"#4D4D4D"}
            fontWeight="800"
            fontSize="20px"
            textAlign={"left"}
          >
            {galleryNAme}’s messages
          </Heading>
        </Box>
        {!conversations || conversations?.length === 0 ? (
          <Box as="section" className="Login" borderTop={"1px solid #BCBCBC"}>
            <Flex>
              <Container
                display={"flex"}
                flexDirection={"column"}
                align="center"
                justifyContent="center"
                direction="column"
              >
                <Box
                  mb={"2.5rem"}
                  className="Box-card"
                  p="1.5rem"
                  mt={"5rem"}
                  bg="#F7F7F7"
                  borderRadius="0px"
                  boxShadow={
                    "0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06)"
                  }
                >
                  <FormControl>
                    <Icon
                      width="48px"
                      height="48px"
                      mb={5}
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="48" rx="24" fill="#F4EBCC" />
                      <path
                        d="M23.2614 25.7967C23.457 25.9917 23.7219 26.1012 23.9981 26.1012C24.2743 26.1012 24.5392 25.9917 24.7348 25.7967L32.8064 17.725C32.8612 17.6704 32.8997 17.6016 32.9177 17.5264C32.9356 17.4511 32.9322 17.3724 32.9079 17.2989C32.8836 17.2255 32.8393 17.1602 32.78 17.1105C32.7208 17.0608 32.6488 17.0286 32.5723 17.0175C32.4931 17.0058 32.4131 17 32.3331 17H15.6664C15.5858 16.9999 15.5053 17.0058 15.4256 17.0175C15.349 17.0286 15.2771 17.0608 15.2178 17.1105C15.1585 17.1602 15.1143 17.2255 15.09 17.2989C15.0656 17.3724 15.0623 17.4511 15.0802 17.5264C15.0981 17.6016 15.1366 17.6704 15.1914 17.725L23.2614 25.7967Z"
                        fill="#795E00"
                      />
                      <path
                        d="M33.9067 18.5267C33.8788 18.5148 33.8481 18.5116 33.8184 18.5174C33.7887 18.5232 33.7614 18.5377 33.74 18.5592L28.5733 23.7258C28.5344 23.765 28.5125 23.818 28.5125 23.8733C28.5125 23.9286 28.5344 23.9816 28.5733 24.0208L32.7758 28.2233C32.8356 28.2809 32.8832 28.3499 32.916 28.4261C32.9488 28.5024 32.9661 28.5844 32.9668 28.6674C32.9676 28.7503 32.9518 28.8326 32.9204 28.9095C32.889 28.9863 32.8427 29.0561 32.784 29.1148C32.7253 29.1735 32.6556 29.22 32.5788 29.2514C32.502 29.2829 32.4197 29.2987 32.3367 29.2981C32.2537 29.2974 32.1717 29.2802 32.0954 29.2475C32.0192 29.2147 31.9502 29.1672 31.8925 29.1075L27.69 24.905C27.6706 24.8856 27.6477 24.8702 27.6223 24.8597C27.597 24.8492 27.5699 24.8438 27.5425 24.8438C27.5151 24.8438 27.488 24.8492 27.4627 24.8597C27.4373 24.8702 27.4144 24.8856 27.395 24.905L25.6208 26.6792C25.1911 27.1086 24.6084 27.3499 24.0008 27.3499C23.3933 27.3499 22.8106 27.1086 22.3808 26.6792L20.605 24.9067C20.5658 24.8677 20.5128 24.8458 20.4575 24.8458C20.4022 24.8458 20.3492 24.8677 20.31 24.9067L16.1075 29.1092C15.9896 29.2229 15.8317 29.2859 15.6678 29.2844C15.5039 29.2829 15.3472 29.2171 15.2314 29.1011C15.1155 28.9852 15.0499 28.8284 15.0485 28.6645C15.0472 28.5007 15.1103 28.3428 15.2242 28.225L19.4267 24.0225C19.4656 23.9833 19.4875 23.9303 19.4875 23.875C19.4875 23.8197 19.4656 23.7667 19.4267 23.7275L14.26 18.5608C14.2388 18.5392 14.2115 18.5245 14.1817 18.5187C14.152 18.5129 14.1211 18.5163 14.0933 18.5283C14.066 18.5397 14.0425 18.5589 14.0259 18.5835C14.0093 18.6081 14.0003 18.637 14 18.6667V28.6667C14 29.1087 14.1756 29.5326 14.4882 29.8452C14.8007 30.1577 15.2246 30.3333 15.6667 30.3333H32.3333C32.7754 30.3333 33.1993 30.1577 33.5118 29.8452C33.8244 29.5326 34 29.1087 34 28.6667V18.6667C34.0001 18.6367 33.9913 18.6074 33.9747 18.5824C33.958 18.5575 33.9344 18.5381 33.9067 18.5267V18.5267Z"
                        fill="#795E00"
                      />
                    </Icon>

                    <Text
                      fontWeight={"500"}
                      fontSize={"18px"}
                      textAlign={"center"}
                      color={"#363535"}
                    >
                      You have no messages
                    </Text>
                    <Text
                      fontWeight={"400"}
                      mb={"1.5rem"}
                      fontSize={"14px"}
                      textAlign={"center"}
                      color={"#8F8F8F"}
                    >
                      {" "}
                      Send a message to a potential collector today.
                    </Text>
                  </FormControl>
                  {user.account_type === "gallery" && (
                    <Button
                      ml={"auto"}
                      fontSize={"14px"}
                      mb={3}
                      bg="#0F0EA7"
                      color="#fff"
                      borderRadius={"0px"}
                      _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                      onClick={onInquiryNftOpen}
                      leftIcon={<AddIcon />}
                      maxW={"140px"}
                    // isDisabled={props?.state4}
                    >
                      Send Message
                    </Button>
                  )}
                </Box>
              </Container>
            </Flex>
          </Box>
        ) : (
          <Box h={"100%"} px={"24px"}>
            <Tabs
              onChange={(value) => {
                setSelectedTab(value);
              }}
            >
              <TabList>
                <Tab
                  color={"#666666"}
                  _selected={{
                    color: "#0C0B86",
                    borderBottom: "2px solid #0C0B86",
                  }}
                  fontSize={{ base: "12px", sm: "12px", md: "14", lg: "16px" }}
                  fontWeight={"400"}
                  _hover={{ color: "#0C0B86" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Inbox
                </Tab>
                <Tab
                  color={"#666666"}
                  _selected={{
                    color: "#0C0B86",
                    borderBottom: "2px solid #0C0B86",
                  }}
                  fontSize={{ base: "12px", sm: "12px", md: "14", lg: "16px" }}
                  fontWeight={"400"}
                  _hover={{ color: "#0C0B86" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Sent
                </Tab>
                <Tab
                  color={"#666666"}
                  _selected={{
                    color: "#0C0B86",
                    borderBottom: "2px solid #0C0B86",
                  }}
                  fontSize={{ base: "12px", sm: "12px", md: "14", lg: "16px" }}
                  fontWeight={"400"}
                  _hover={{ color: "#0C0B86" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Deleted
                </Tab>
              </TabList>
              <TabPanels h={"100%"} mb={10}>
                <TabPanel p={0} color={"#000"} h={"100%"} py={6}>
                  <Box p={0} color={"#000"} h={"100%"}>
                    <Box overflowX={"auto"}>
                      <Table
                        borderWidth="1px"
                        borderCollapse={"separate"}
                        borderSpacing={"0"}
                        p={0}
                        mb={"40px"}
                        minW={'800px'}
                      >
                        <Thead bg={"#F7F7F7"}>
                          <Tr>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"29%"}
                            >
                              RECIPIENT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"43%"}
                            >
                              SUBJECT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              TextTransform={"capitalize"}
                              fontSize={"12px"}
                              width={"14%"}
                            >
                              DATE
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"14%"}
                            ></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {inboxMessagesDetails.map((item) => (
                            <Tr mb="0" borderWidth="1px">
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                <Flex alignItems={"center"}>
                                  <Image
                                    src={`http://51.222.241.160:8001/api/users/artist_profile/${item.recipientGalleryLogo}`}
                                    width={"48px"}
                                    height={"48px"}
                                    borderRadius={"50px"}
                                  />
                                  <Box pl={"1rem"}>
                                    <Text
                                      fontWeight={"500"}
                                      fontSize={"14px"}
                                      textAlign={"left"}
                                      color={"#4D4C4C"}
                                    >
                                      {item.recipientName}
                                    </Text>
                                    <Text
                                      fontWeight={"400"}
                                      fontSize={"12px"}
                                      textAlign={"left"}
                                      color={"#797979"}
                                      wordBreak={'break-word'}
                                    >
                                      {item.recipientEmail}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Td>

                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                Inquiry about {item.nft.title}
                              </Td>
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                {moment(item.lastMessage).fromNow()}
                                {/* {item.lastMessage} */}
                              </Td>

                              <Td textAlign={"end"}>
                                <Link
                                  // href={`/MessageChatUI/${item._id}`}
                                  color={"#0C0B86"}
                                  border={"none"}
                                  fontSize={"16px"}
                                  fontWeight={"600"}
                                  onClick={() =>
                                    navigate(
                                      `/MessageChatUI/${item._id}`
                                      // ,{ state: {glry, gallery }}
                                    )
                                  }
                                >
                                  View message
                                </Link>
                                {/* <Button
                                  color="red"
                                  marginLeft={{
                                    base: "0rem",
                                    sm: "1rem",
                                    md: "0.75rem",
                                  }}
                                  onClick={() => {
                                    deleteConversation(item._id);
                                  }}
                                // onClick={sendMessageOnClick}
                                >
                                  Delete
                                </Button> */}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text color={"#8F8F8F"}>
                        {inboxMessagesDetails.length}{" "}
                        {inboxMessagesDetails.length > 1
                          ? "messages"
                          : "messages"}
                      </Text>
                      <Box ml={"auto"}>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          mr={2}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Previous
                        </Button>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel p={0} color={"#000"} h={"100%"} py={6}>
                  <Box p={0} color={"#000"} h={"100%"}>
                    <Box overflowX={"auto"}>
                      <Table
                        borderWidth="1px"
                        borderCollapse={"separate"}
                        borderSpacing={"0"}
                        p={0}
                        mb={"40px"}
                        minW={'800px'}
                      >
                        <Thead bg={"#F7F7F7"}>
                          <Tr>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"29%"}
                            >
                              RECIPIENT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"43%"}
                            >
                              SUBJECT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              TextTransform={"capitalize"}
                              fontSize={"12px"}
                              width={"14%"}
                            >
                              DATE
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"14%"}
                            ></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {sentMessagesDetails.map((item) => (
                            <Tr mb="0" borderWidth="1px">
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                <Flex alignItems={"center"}>
                                  <Image
                                    src={`http://51.222.241.160:8001/api/users/artist_profile/${item.recipientGalleryLogo}`}
                                    width={"48px"}
                                    height={"48px"}
                                    borderRadius={"50px"}
                                  />
                                  <Box pl={"1rem"}>
                                    <Text
                                      fontWeight={"500"}
                                      fontSize={"14px"}
                                      textAlign={"left"}
                                      color={"#4D4C4C"}
                                    >
                                      {item.recipientName}
                                    </Text>
                                    <Text
                                      fontWeight={"400"}
                                      fontSize={"12px"}
                                      textAlign={"left"}
                                      color={"#797979"}
                                      wordBreak={'break-word'}
                                    >
                                      {item.recipientEmail}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Td>

                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                Inquiry about {item.nft.title}
                              </Td>
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                {moment(item.lastMessage).fromNow()}
                              </Td>

                              <Td textAlign={"end"}>
                                <Link
                                  color={"#0C0B86"}
                                  border={"none"}
                                  fontSize={"16px"}
                                  fontWeight={"600"}
                                  onClick={() =>
                                    navigate(
                                      `/MessageChatUI/${item._id}`
                                      // ,{ state: {glry, gallery }}
                                    )
                                  }
                                >
                                  View message
                                </Link>
                                {/* <Button
                                  color="red"
                                  marginLeft={{
                                    base: "0rem",
                                    sm: "1rem",
                                    md: "0.75rem",
                                  }}
                                  onClick={() => {
                                    deleteConversation(item._id);
                                  }}
                                // onClick={sendMessageOnClick}
                                >
                                  Delete
                                </Button> */}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text color={"#8F8F8F"}>
                        {sentMessagesDetails.length}{" "}
                        {sentMessagesDetails.length > 1
                          ? "messages"
                          : "messages"}
                      </Text>
                      <Box ml={"auto"}>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          mr={2}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Previous
                        </Button>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel p={0} color={"#000"} h={"100%"} py={6}>
                  <Box p={0} color={"#000"} h={"100%"}>
                    <Box overflowX={"auto"}>
                      <Table
                        borderWidth="1px"
                        borderCollapse={"separate"}
                        borderSpacing={"0"}
                        p={0}
                        mb={"40px"}
                        minW={'800px'}
                      >
                        <Thead bg={"#F7F7F7"}>
                          <Tr>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"29%"}
                            >
                              RECIPIENT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"43%"}
                            >
                              SUBJECT
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              TextTransform={"capitalize"}
                              fontSize={"12px"}
                              width={"14%"}
                            >
                              DATE
                            </Th>
                            <Th
                              color={"#797979"}
                              fontWeight={"700"}
                              fontSize={"12px"}
                              width={"14%"}
                            ></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {deletedMessagesDetails.map((item) => (
                            <Tr mb="0" borderWidth="1px">
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                <Flex alignItems={"center"}>
                                  <Image
                                    src={`http://51.222.241.160:8001/api/users/artist_profile/${item.recipientGalleryLogo}`}
                                    width={"48px"}
                                    height={"48px"}
                                    borderRadius={"50px"}
                                  />
                                  <Box pl={"1rem"}>
                                    <Text
                                      fontWeight={"500"}
                                      fontSize={"14px"}
                                      textAlign={"left"}
                                      color={"#4D4C4C"}
                                    >
                                      {item.recipientName}
                                    </Text>
                                    <Text
                                      fontWeight={"400"}
                                      fontSize={"12px"}
                                      textAlign={"left"}
                                      color={"#797979"}
                                      wordBreak={'break-word'}
                                    >
                                      {item.recipientEmail}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Td>

                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                Inquiry about {item.nft.title}
                              </Td>
                              <Td
                                color={"#636262"}
                                border={"none"}
                                fontSize={"14px"}
                                fontWeight={"400"}
                              >
                                {moment(item.lastMessage).fromNow()}
                              </Td>

                              <Td textAlign={"end"}>
                                <Link
                                  // href={`/MessageChatUI/${item._id}`}
                                  color={"#0C0B86"}
                                  border={"none"}
                                  fontSize={"16px"}
                                  fontWeight={"600"}
                                  onClick={() =>
                                    navigate(
                                      `/MessageChatUI/${item._id}`
                                      // ,{ state: {glry, gallery }}
                                    )
                                  }
                                >
                                 Restore
                                </Link>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text color={"#8F8F8F"}>
                        {deletedMessagesDetails.length}{" "}
                        {deletedMessagesDetails.length > 1
                          ? "messages"
                          : "messages"}
                      </Text>
                      <Box ml={"auto"}>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          mr={2}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Previous
                        </Button>
                        <Button
                          color={"#8F8F8F"}
                          background={"none"}
                          fontSize={"16px"}
                          borderRadius={"0px"}
                          fontWeight={"600"}
                          border={"1px solid #D2D2D2"}
                          _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Messages;

import React, { useContext, useEffect, useRef, useState } from "react";
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
  Select,
  Divider,
  Link,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
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
  Checkbox,
  Square,
  HStack,
  VStack,
  useColorModeValue,
  StackProps,
  useId,
  useRadio,
  Textarea,
  UseRadioProps,
} from "@chakra-ui/react";
import moment from "moment";
import { navigate, Redirect, redirectTo, useParams } from "@reach/router";
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  ExternalLinkIcon,
  SearchIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import styled from "@emotion/styled";
import {
  BioRymHeading,
  Card,
  CardHeading,
  CustomBadge,
  NFTCardHeading,
  NFTCustomCard,
} from "../../assets/StyledComponent/styeledComponent";

import cardImge from "../../assets/images/cardimg.png";
import Dummy2 from "../../assets/images/dummy2.png";

import { useDispatch, useSelector } from "react-redux";
import { setMintSteps } from "../../redux/action/tradingBot";
import { setNFTMedium } from "../../redux/action/tradingBot";
import { ArtistInvite } from "../index";
import PreviewImg from "../../assets/images/image2.png";
import CryptoJS from "crypto-js";
import server from "../../apis/server";
import { NFTCARD } from "../../components/index";
import { FaChevronRight } from "react-icons/fa";
import { IoMdNavigate } from "react-icons/io";
import axios from "axios";
import { io } from "socket.io-client";
import { useToast, Spinner } from "@chakra-ui/react";

// import { Link as ReachLink, navigate } from "@reach/router";

function MessageChatUI() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const User1 = JSON.parse(localStorage.getItem("User"));
  const bytes = User1 ? CryptoJS.AES.decrypt(User1, "userObject") : "";
  const user = bytes ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) : "";
  const scrollRef = useRef();
  const toast = useToast();

  
  const { id } = useParams();
  //   const conversationId = useId();
  const conversationId = id;
  console.log("conversationId === ", conversationId);
  useEffect(() => {
    socket.current = io("http://51.222.241.160:8900");
    console.log("socket === ", socket.current);
    console.log("user === ", user);
    socket.current.on("getMessage", (data) => {
      console.log("data ==== ", data);
      console.log("currentChat ==== ", currentChat);
      if (data.conversationId === conversationId) {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      }
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", { userId: user._id, conversationId });
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await server.get("users/conversations/" + user._id, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // setConversations(res.data);
        let currentChatDetails = res?.data?.data
          ? res.data.data.filter((item) => item._id === conversationId)
          : [];

        setCurrentChat(
          currentChatDetails.length > 0 ? { ...currentChatDetails[0] } : null
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

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
        setOtherUser({
          ...conDetails,
          recipientGalleryLogo:
            conDetails?.account_type === "collector"
              ? conDetails?.collector_profile_image
              : conDetails?.gallery_logo,
        });
        // return {
        //   ...recipient,
        //   recipientName: conDetails.name,
        //   recipientGalleryLogo:
        //     conDetails.account_type === "collector"
        //       ? conDetails.collector_profile_image
        //       : conDetails.gallery_logo,
        //   recipientEmail: conDetails.email,

        //   date: conDetails.date,
        // };
      } catch (err) {
        console.log(err);
        return {};
      }
    };
    const getMessages = async () => {
      try {
        const res = await server.get("users/messages/" + conversationId, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
    getRecipientDetails(currentChat);
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage || newMessage.trim() === "") {
      return "";
    } else {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: conversationId,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        conversationId,
        text: newMessage,
      });

      try {
        const res = await server.post(
          "/users/messages",
          { ...message },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessages([...messages, res.data.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };



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
      navigate('/Message')
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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("messages === ", messages);
  console.log("currentChat === ", currentChat);

  return (
    <>
      <Box overflowY={"scroll"} background={"#fff"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          pt={"30px"}
          pb={"24px"}
          px={{ base: "2", sm: "4", md: "6", lg: "6" }}
          minH={"136"}
          bg={"#F7F7F7"}
        >
          <Flex
            w={"100%"}
            display={{ base: "block", sm: "flex", md: "flex", lg: "flex" }}
            mb={"40px"}
          >
            <Box
              mr={"auto"}
              my={"auto"}
              flex="1"
              display={"flex"}
              alignItems={"center"}
            >
              <Heading
                onClick={() => navigate(`/Messages`)}
                color={"#8F8F8F"}
                fontWeight="400"
                fontSize="14px"
                cursor={"pointer"}
                lineHeight={"20px"}
              >
                {" "}
                Messages{" "}
              </Heading>
              <Text px={2}>
                {" "}
                <Icon
                  width="6px"
                  height="10px"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.78132 4.99999L0.481323 1.69999L1.42399 0.757324L5.66666 4.99999L1.42399 9.24266L0.481323 8.29999L3.78132 4.99999Z"
                    fill="#8F8F8F"
                  />
                </Icon>
              </Text>
              <Text
                color={"#4D4C4C"}
                pl={2}
                fontWeight="400"
                fontSize="14px"
                lineHeight={"20px"}
              >
              Inquiry about  {currentChat?.nft?.title}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems={"center"}  flexWrap={'wrap'}>
            <Box maxW={'128px'} maxH={'128px'} height={'128px'} width={'128px'} mr={5} mb={2}>
              <Image maxW={'100%'} maxH={'100%'} height={'100%'} width={'100%'} objectFit={'cover'}
                     src={`http://51.222.241.160:8001/api/users/artist_profile/${otherUser?.recipientGalleryLogo}`} />
            </Box>
            <Box  pl={{base:0,sm:5}} mb={2}>
              <Heading
                color={"#4D4C4C"}
                fontWeight={"800"}
                fontSize={"20px"}
                mb={6}
              >
            Inquiry about {currentChat?.nft?.title}
              </Heading>
              <Flex>
                <Box pr={3} minW={"134px"} mb={{base:'1rem'}}>
                  <Text
                    color={"#8F8F8F"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                    lineHeight={"16px"}
                    mb={1}
                  >
                    From
                  </Text>
                  <Text
                    color={"#4D4C4C"}
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"20px"}
                    mb={{base:'1rem'}}
                  >
                    {currentChat?.nft?.artistName}
                  </Text>
                </Box>
                <Box px={4} minW={"134px"} height={"fit-content"}>
                  <Text
                    color={"#8F8F8F"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                    lineHeight={"16px"}
                    mb={1}
                  >
                    DATE
                  </Text>
                  <Text
                    color={"#4D4C4C"}
                    fontSize={"14px"}
                    fontWeight={"500"}
                    lineHeight={"20px"}
                  >
                    {moment(currentChat?.nft?.listed_Date).format("LL")}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          bg={"#fff"}
          height={"calc(100vh - 206px)"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            height={"65%"}
            overflowY={"scroll"}
            px={"48px"}
            py={"0.5rem"}
            display={"flex"}
            flexDirection={"column"}
          >
            {messages.map(
              (item) =>
                item.sender === user._id ? (
                  <Box
                    bg={"#E6F6F6"}
                    maxW={{base:'100%',md:'768px'} }
                    p={6}
                    mb={6}
                    marginLeft={"auto"}
                    ref={scrollRef}
                  >
                    <Text
                      color={"#4D4C4C"}
                      fontWeight={"400"}
                      fontSize={"16px"}
                      lineHeight={"24px"}
                    >
                      {item.text}
                    </Text>
                  </Box>
                ) : (
                  <Box
                    bg={"#FAEAF1"}
                    maxW={{base:'100%',md:'768px'} }
                    p={6}
                    mb={6}
                    ref={scrollRef}
                    width={'fit-content'}
                  >
                    <Text
                      color={"#4D4C4C"}
                      fontWeight={"400"}
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      marginLeft={"auto"}
                      wordBreak={"break-word"}
                    >
                      {item.text}
                    </Text>
                  </Box>
                )
              // <Box
              //   bg={"#E6F6F6"}
              //   maxW={"768px"}
              //   p={6}
              //   mb={6}
              //   marginLeft={"auto"}
              //   ref={scrollRef}
              // >
              //   <Text
              //     color={"#4D4C4C"}
              //     fontWeight={"400"}
              //     fontSize={"16px"}
              //     lineHeight={"24px"}
              //   >
              //     {item.text}
              //   </Text>
              // </Box>
            )}
          </Box>
          {/* <Box bg={"#E6F6F6"} maxW={"768px"} p={6} mb={6} marginLeft={"auto"}>
            <Text
              color={"#4D4C4C"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              Hey Adam
              <br />
              #E6E6E6 I’d like to know some more information about Andrew
              Stevovich.
              <br />I mainly collect Impressionist works but I’m very interested
              in still life paintings.
            </Text>
          </Box>
          <Box bg={"#FAEAF1"} maxW={"768px"} p={6} mb={6}>
            <Text
              color={"#4D4C4C"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
              marginLeft={"auto"}
              wordBreak={"break-word"}
            >
              Hey Adam
              <br />
              I’d like to know some more information about Andrew Stevovich.
              <br />I mainly collect Impressionist works but I’m very interested
              in still life paintings.
            </Text>
          </Box>
          <Box bg={"#E6F6F6"} maxW={"768px"} p={6} mb={6} marginLeft={"auto"}>
            <Text
              color={"#4D4C4C"}
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              Hey Adam
              <br />
              I’d like to know some more information about Andrew Stevovich.
              <br />I mainly collect Impressionist works but I’m very interested
              in still life paintings.
            </Text>
          </Box> */}
          <Box
            height={"35%"}
            mt={"auto"}
           p={{base:'10px',sm:'20px',md:'30px',lg:'48px'}}
            overflowY={"scroll"}
            bg={"#fff"}
            boxShadow={
              "0px 0px 0px 1px rgba(32, 31, 31, 0.1), 0px 5px 10px rgba(32, 31, 31, 0.2), 0px 15px 40px rgba(32, 31, 31, 0.4)"
            }
          >
            <Box>
              <Text
                color={"#636262"}
                fontSize={"16px"}
                fontWeight={"500"}
                lineHeight={"24px"}
                mb={2}
              >
                Respond
              </Text>
              <Textarea
                placeholder="Write your response"
                value={newMessage}
                color={"#201F1FA3"}
                borderRadius={"0px"}
                border={"2px solid #D2D2D2"}
                _focus={{ border: "2px solid #0F0EA7" }}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
              />
            </Box>
            <Box
              w={"100%"}
              pt={"1.5rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Button

       onClick={() => {
  deleteConversation(id);
         }}
                bg={"#fff"}
                color={"#201F1F"}

       _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
       border={"1px solid #D2D2D2"}
                borderRadius={"0px"}
              >
                <Icon
                  width="16px"
                  mr={2}
                  height="16px"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2511 5.50016H3.97056C3.93187 5.50001 3.89359 5.50793 3.85815 5.52343C3.8227 5.53892 3.79089 5.56165 3.76474 5.59015C3.73859 5.61866 3.71868 5.65231 3.70629 5.68895C3.6939 5.72559 3.6893 5.76442 3.69278 5.80294L4.40778 13.6563C4.43287 13.9324 4.56032 14.1892 4.76509 14.3762C4.96986 14.5632 5.23715 14.6669 5.51444 14.6668H10.7072C10.9845 14.6669 11.2518 14.5632 11.4566 14.3762C11.6613 14.1892 11.7888 13.9324 11.8139 13.6563L12.5278 5.80294C12.5312 5.76453 12.5266 5.72582 12.5143 5.68929C12.5019 5.65275 12.4821 5.61918 12.4561 5.59072C12.4301 5.56221 12.3984 5.53944 12.3631 5.52385C12.3279 5.50826 12.2897 5.50019 12.2511 5.50016ZM7.14 12.7224C7.14 12.8329 7.0961 12.9389 7.01796 13.017C6.93982 13.0952 6.83384 13.1391 6.72333 13.1391C6.61283 13.1391 6.50685 13.0952 6.42871 13.017C6.35057 12.9389 6.30667 12.8329 6.30667 12.7224V7.72239C6.30667 7.61188 6.35057 7.5059 6.42871 7.42776C6.50685 7.34962 6.61283 7.30572 6.72333 7.30572C6.83384 7.30572 6.93982 7.34962 7.01796 7.42776C7.0961 7.5059 7.14 7.61188 7.14 7.72239V12.7224ZM9.91778 12.7224C9.91778 12.8329 9.87388 12.9389 9.79574 13.017C9.7176 13.0952 9.61162 13.1391 9.50111 13.1391C9.3906 13.1391 9.28462 13.0952 9.20648 13.017C9.12834 12.9389 9.08444 12.8329 9.08444 12.7224V7.72239C9.08444 7.61188 9.12834 7.5059 9.20648 7.42776C9.28462 7.34962 9.3906 7.30572 9.50111 7.30572C9.61162 7.30572 9.7176 7.34962 9.79574 7.42776C9.87388 7.5059 9.91778 7.61188 9.91778 7.72239V12.7224ZM13.6667 3.55572H11.0278C10.9909 3.55572 10.9556 3.54109 10.9296 3.51504C10.9035 3.48899 10.8889 3.45367 10.8889 3.41683V2.72239C10.8889 2.35403 10.7426 2.00076 10.4821 1.74029C10.2216 1.47983 9.86836 1.3335 9.5 1.3335H6.72222C6.35387 1.3335 6.0006 1.47983 5.74013 1.74029C5.47966 2.00076 5.33333 2.35403 5.33333 2.72239V3.41683C5.33333 3.45367 5.3187 3.48899 5.29265 3.51504C5.26661 3.54109 5.23128 3.55572 5.19444 3.55572H2.55556C2.40821 3.55572 2.26691 3.61425 2.16272 3.71844C2.05853 3.82262 2 3.96393 2 4.11127C2 4.25862 2.05853 4.39992 2.16272 4.50411C2.26691 4.6083 2.40821 4.66683 2.55556 4.66683H13.6667C13.814 4.66683 13.9553 4.6083 14.0595 4.50411C14.1637 4.39992 14.2222 4.25862 14.2222 4.11127C14.2222 3.96393 14.1637 3.82262 14.0595 3.71844C13.9553 3.61425 13.814 3.55572 13.6667 3.55572ZM6.44444 3.41683V2.72239C6.44444 2.64871 6.47371 2.57806 6.5258 2.52597C6.5779 2.47387 6.64855 2.44461 6.72222 2.44461H9.5C9.57367 2.44461 9.64433 2.47387 9.69642 2.52597C9.74851 2.57806 9.77778 2.64871 9.77778 2.72239V3.41683C9.77778 3.45367 9.76315 3.48899 9.7371 3.51504C9.71105 3.54109 9.67572 3.55572 9.63889 3.55572H6.58333C6.5465 3.55572 6.51117 3.54109 6.48512 3.51504C6.45908 3.48899 6.44444 3.45367 6.44444 3.41683Z"
                    fill="#201F1F"
                  />
                </Icon>
                Delete
              </Button>
              <Button
                ml={"1rem"}
                bg={"#fff"}
                color={"#201F1F"}

                border={"1px solid #D2D2D2"}
                borderRadius={"0px"}
                onClick={handleSubmit}
                _focus={{ bg: "#D2D2D2", color: "#201F1F"  }}  _hover={{ bg: "#E6E6E6", color: "#201F1F"  }} _active={{ bg: "#D2D2D2", }}
                isDisabled={!newMessage ? true : false}
              >
                Send
                <Icon
                  width="16px"
                  height="16px"
                  ml={2}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7814 7.33336L7.20541 3.75736L8.14808 2.8147L13.3334 8.00003L8.14808 13.1854L7.20541 12.2427L10.7814 8.6667H2.66675V7.33336H10.7814Z"
                    fill="#201F1F"
                  />
                </Icon>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MessageChatUI;

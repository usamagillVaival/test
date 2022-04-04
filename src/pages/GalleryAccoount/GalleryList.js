import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Grid,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure, useColorModeValue as mode,
} from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import server from "../../apis/server";
import { navigate, Redirect, redirectTo } from "@reach/router";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import DV from "../../abis/DadaVault.json";

import { useWallet, UseWalletProvider } from "use-wallet";
const dadaVaultAddress = process.env.REACT_APP_DV_ADDRESS;
const GalleryList = () => {
  const [gallery, setGallery] = React.useState([]);
  const [name, setName] = React.useState();
  const [symbol, setSymbol] = React.useState();
  const [error, setError] = React.useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(); 
  const finalRef = React.useRef();
  const wallet = useWallet();
  const userObj = JSON.parse(localStorage.getItem("User"))
  let userType=""
  if(userObj)
  {
    const bytes = CryptoJS.AES.decrypt(userObj, "userObject");
    userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }
  useEffect(() => {
    
    loadGalleryList();
    
  }, []);
  function metamaskconnect() {
    wallet.connect();
  }
  function metamaskdisconnect() {
    wallet.reset();
  }
  const loadGalleryList = async () => {
    const { data } = await server.get("/users/GalleryList", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    let galleryObj = await Promise.all(
      data.filter((i) => i.name !== "").map(async (i) => {

          let gallery = {
            name: i.gallery_name,
            creator: i.name,
            email: i.gallery_email,
            deploy_status: i.gallery_deploy_status,
          };
          return gallery;
        }
      )
    );
    console.log(galleryObj)
    setGallery(galleryObj);
  };

  const deploy = async () => {
    console.log(name, symbol);
    if (wallet.status === "disconnected") {
      toast("Please connect your wallet");
      onClose();
    } else {
      

        const web3 = new Web3(wallet.ethereum);
        await window.ethereum.enable();
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const dv = new web3.eth.Contract(DV.abi, dadaVaultAddress);
        dv.methods
          .deploy(name, symbol)
          .send({ from: accounts[0] })
          .on("transactionHash", async function (hash) {
            console.log(hash);
            let data = {
              name: name,
              hash,
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
            onClose();
            loadGalleryList();
          })
          .catch((e) => console.log(e));
      
    }
  };

  const handleChange = (e) => {
    setSymbol(e.target.value);
    setError("");
  };

  const renderElement = (s, i, glry) => {
    if (s === "pending") {
      return (
        <Button
          bg="#ffc107"
          color="#000"
          id={i}
          _hover={{ bg: "#ffc107", color: "#000" }}
          _focus={{ bg: "#ffc107", color: "#000" }}
          isDisabled
        >
          Pending
        </Button>
      );
    } else if (s === "deployed") {
      return (
        <Button
          bg="#006400"
          color="#fff"
          colorScheme="success"
          id={i}
          isDisabled
        >
          Deployed
        </Button>
      );
    } else {
      return (
        <Button
            minW={'104px'}
          colorScheme="blue"
            _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

            id={i}
          onClick={(e) => {
            if (wallet.status === "disconnected") {
              toast("Please connect your wallet");
            } else {
              setName(glry.name);
              setSymbol("");
              onOpen();
            }
          }}
        >
          Deploy
        </Button>
      );
    }
  };

  return (
    <section className="Login">
      <ToastContainer />
      <Flex py={3}>
        <Container
          align="center"
          justifyContent="center"
          direction="column"
          minHeight="100vh"
          maxW="container.xl"
        >
          <Flex alignItems="center">
            {wallet.status == "connected" ? (
              <Text mt={3}>{wallet.account} </Text>
            ) : null}

            {wallet.status == "connected" ? (
              <Button minW={'104px'}
                colorScheme="blue"
                mt={3}
                mr={3}
                      _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                      ml="auto"
                onClick={metamaskdisconnect}
              >
                wallet disconnect
              </Button>
            ) : (
              <Button
                  minW={'104px'}
                colorScheme="blue"
                  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                  mt={3}
                mr={3}
                ml="auto"
                onClick={metamaskconnect}
              >
                Connect Wallet
              </Button>
            )}
          </Flex>
          <Grid
            marginTop="4rem"
            templateColumns="repeat(1, 1fr)"
            gap={6}
            mb="2rem"
          >
            <Box overflowX={"auto"}>
              <Table
                  borderWidth="1px"
                borderCollapse={"separate"}
                borderSpacing={"0"}
                p={0}
              >
                <Thead bg={mode('gray.50', 'gray.800')}>
                  <Tr >
                    <Th color={'#4A5568'} fontWeight={"700"}>Gallery Name</Th>
                    <Th color={'#4A5568'} fontWeight={"700"}>Creator</Th>
                    <Th color={'#4A5568'} fontWeightp={"700"}>Email</Th>
                    <Th color={'#4A5568'} fontWeight={"700"}>Deploy</Th>
                    <Th color={'#4A5568'} fontWeight={"700"}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gallery.map((glry, i) => (
                    <Tr mb="0"  borderWidth="1px">
                      <Td color={"#4D4D4D"} border={"none"} fontSize={'14px'} fontWeight={"600"}>
                        {glry.name}
                      </Td>
                      <Td color={"#4D4D4D"} border={"none"}>
                        {glry.creator}
                      </Td>
                      <Td color={"#4D4D4D"} border={"none"}>
                        {glry.email}
                      </Td>
                      <Td color={"#0039CC"} border={"none"}>
                        {renderElement(glry.deploy_status, i, glry)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Grid>
        </Container>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Deploy Gallery Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} value={name} isDisabled />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Symbol</FormLabel>
              <Input
                placeholder="Symbol"
                onChange={(e) => handleChange(e)}
                value={symbol}
              />
              <Text color="#FF0000">{error}</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={deploy} colorScheme="blue"  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                    mr={3}>
              Deploy
            </Button>
            <Button onClick={onClose} _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}
            >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};
export default GalleryList;

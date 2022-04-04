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
    Wrap, WrapItem, Center,
    Textarea,
    RadioGroup, Radio, Container, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure,
} from "@chakra-ui/react";
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon, ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"


function ArtistGallery(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef()




    return (
        <>
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'} color={'#000'}>
                    <Box>
                        <Text fontSize={'14ppx'} fontWeight={'400'} pl={'1rem'}>Viewing 1 - 5 of 10 artists</Text>
                    </Box>
                    <Box overflowX={'scroll'}>
                        <Table variant="simple" border={'transparent'}>
                            <Tbody border={'transparent'}>
                                <Tr border={'none'}>
                                    <Td border={'none'}>
                                        <Box d={'flex'} >
                                            <Image src={PreviewImg} maxW={'200px'}/>
                                        </Box>
                                    </Td>
                                    <Td border={'none'} verticalAlign={'middle'}>$ 200,000</Td>
                                    <Td border={'none'} verticalAlign={'middle'}>
                                        <Box>
                                            <Text>6 works</Text>
                                            <Text>3 minted</Text>
                                                <Text>1 sold</Text>

                                        </Box>
                                       </Td>
                                    <Td border={'none'} verticalAlign={'middle'}>
                                        <Box display={'flex'} >
                                        
                                            <Button ml={'auto'} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   >
                                            <Link as={ReachLink} to='/Artists/AddNewArtist'>
                                            View Artist
                                            </Link>
                                        </Button>

                                        </Box>
                                    </Td>
                                </Tr>

                            </Tbody>

                        </Table>

                    </Box>
                    <Box>
                        <Wrap>
                            <WrapItem>
                                <Center>
                                     1
                                </Center>
                            </WrapItem>
                            <WrapItem>
                                <Center>
                                     2
                                </Center>
                            </WrapItem>
                            <WrapItem>
                                <Center m={'auto'}>
                                    <Icon width="8px" height="12px"  viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.41 0L0 1.31417L4.58 5.59219L0 9.87022L1.41 11.1844L7.41 5.59219L1.41 0Z" fill="black"/>
                                    </Icon>
                                </Center>
                            </WrapItem>

                        </Wrap>
                    </Box>
                </Grid>


            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p={4}>
                        <Box py={4}>
                            <Box my={4}>
                                <Heading color={'#000'} fontSize={'16px'} fontWeight={'600'}>Search for artist you would like to add</Heading>
                                <Text color={'#666666'} fontSize={'16px'} fontWeight={'300'}>Read the full documentation for our products</Text>
                            </Box>
                            <Box d="flex" alignItems={"center"}>
                                <InputGroup mr={3}>
                                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="#969696" />} />
                                    <Input type="text" placeholder="Search" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />
                                </InputGroup>
                                <Stack spacing={3} direction="row" align="center">

                                    <Button bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                            fontWeight={'600'} fontSoze={'16px'}>
                                        <Link as={ReachLink} to='/Artists/ArtistDashboard'>
                                            Submit

                                        </Link>


                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </ModalBody>

                </ModalContent>
            </Modal>




        </>

    );
}

export default ArtistGallery;

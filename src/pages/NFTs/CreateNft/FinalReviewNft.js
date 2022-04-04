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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
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
    Textarea,
    RadioGroup, Radio, Container,
} from "@chakra-ui/react";
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../assets/images/image2.png';
import Signature from '../../../assets/images/signature.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import FLogoD from "../../../assets/images/flogoD.svg";


function FinalReviewNft(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef()





    return (
        <>
            <Box width={'100%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'}>

                    <Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Grid templateColumns={{base:"repeat(1, 2fr)" , sm:"repeat(1, 2fr)" ,md:"repeat(2, 2fr)"}}   pt={'3rem'} m={'auto'} width={'100%'}>
                                <Box pr={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                    <Box p={10} bg={'#C4C4C422'} minH={'600px'}>
                                        <Image src={PreviewImg} width={'100%'}  />
                                        <Grid templateColumns="repeat(2, 1fr)" gap={6}  pt={'3rem'} pb={'3rem'}>
                                            <Box>
                                                <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                                <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >Empty Diamonds,    2019, Ed. 1/1</Heading>
                                            </Box>
                                            <Box>
                                                <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ 2000</Text>
                                            </Box>
                                        </Grid>
                                        <Box mt={3} mb={3}>
                                            <Image  src={Signature} />
                                        </Box>
                                        <Box pt={7}>
                                            <Text color={'#000'} fontWeight={'500'} d={'flex'} >
                                                <Image src={FLogoD} w={'22px'} alt="image not avaiable" pr={2}/>
                                                Minted and certified by DadaVault
                                            </Text>

                                        </Box>
                                    </Box>

                                </Box>
                                <Box  pl={7} d={'flex'} flexDirection={'column'}  mt={{base:'2rem',md:'0rem'}}>
                                    <Box pb={8}>
                                        <Heading fontSize={'2.25rem'} fontWeight={'400'} lineHeight={'50px'}>Congratulations!<br/>
                                            Your NFT has been<br/> minted.</Heading>
                                    </Box>
                                    <Box display={{base:'block',sm:'flex'}} width={{base:'80%',md:'100%' ,lg:'100%' ,xl:'80'}}  mt={8}>
                                        <Button mx={'auto'} w={'inherit'} textAlign={'center'} border='1px solid #C4C4C4' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  marginLeft='auto' marginRight={'1rem'} >View in dashboard</Button>
                                        <Button mx={'auto'} w={'inherit'} textAlign={'center'} border='1px solid #C4C4C4' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  marginLeft='auto' marginRight={'1rem'} >Display in gallery</Button>
                                    </Box>
                                    <Box display={'flex'} flexWrap={'wrap'} >
                                        <Text display={'flex'} alignItem={'center'} m={0} fontSize={'18px'} fontWeight={'700'} color={'#C4C4C4'}>Contract address :</Text>
                                        <Text display={'flex'} alignItem={'center'}  fontSize={'18px'} fontWeight={'400'} color={'#000'} pl={2}>000222333abcabcabcabcxyz</Text>

                                    </Box>
                                    <Box display={'flex'} flexWrap={'wrap'} mb={8}>
                                        <Text display={'flex'} alignItem={'center'} m={0} fontSize={'18px'} fontWeight={'700'} color={'#C4C4C4'}>Token ID :</Text>
                                        <Text display={'flex'} alignItem={'center'}  fontSize={'18px'} fontWeight={'400'} color={'#000'} pl={2}>450</Text>
                                    </Box>
                                    <Box display={'flex'} flexWrap={'wrap'} flexDirection={'column'}>
                                        <Text display={'flex'} alignItem={'center'}  fontSize={'18px'} fontWeight={'700'} color={'#000'} pl={2}>
                                            View on Etherscan</Text>
                                            <Text display={'flex'} alignItem={'center'}  fontSize={'16px'} fontWeight={'700'} color={'#000'} pl={2}>View on IPFS</Text>
                                            <Text display={'flex'} alignItem={'center'}  fontSize={'16px'} fontWeight={'700'} color={'#000'} pl={2}>View IPFS Metadata</Text>

                                    </Box>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>

            </Box>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p={4}>
                        <Box>
                            <Text fontSize={'12px'} color={'#718096'} textAlign={'center'} mb={3} fontWeight={'700'}>Mint Tiger Ed. 1/1</Text>
                            <Text fontSize={'18px'} color={'#1A202C'} textAlign={'center'} fontWeight={'400'}>Count:1</Text>
                            <Box display={'flex'}>
                                <Box display={'flex'} width={'50%'} mx={'auto'}>
                                    <Button mx={'auto'} w={'48%'} onClick={onClose} textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  marginLeft='auto' marginRight={'1rem'} >Cancel</Button>
                                    <Button mx={'auto'} w={'50%'} textAlign={'center'} border='1px solid #C4C4C4' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  marginLeft='auto'  >Mint</Button>

                                </Box>
                            </Box>
                        </Box>
                    </ModalBody>

                </ModalContent>
            </Modal>




        </>

    );
}

export default FinalReviewNft;

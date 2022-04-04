import React,{useEffect} from "react";
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
    Modal,
    ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, Avatar
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
import CreateNFTStep1 from "../../NFTs/CreateNft/CreateNftStep1.js";
import CreateNFTStep2 from "../../NFTs/CreateNft/CreateNftStep2";
import CreateNFTStepPreview from "../../NFTs/CreateNft/CreateNftStepPreview";
import CreateNFTStep3 from "../../NFTs/CreateNft/CreateNftStep3";
import CreateNftAgreement from "../../NFTs/CreateNft/CreateNftAgreement";
import CreateNftAgreementPreview from "../../NFTs/CreateNft/CreateNftAgreementPreview ";
import CreateNftSendAgreement from "../../NFTs/CreateNft/CreateNftSendAgreement";
// import CreateNftAgreementPreview from "./CreateNft/CreateNftAgreementPreview ";
// import CreateNftAgreement from './CreateNft/CreateNftAgreement';
// import CreateNftSendAgreement from "./CreateNft/CreateNftSendAgreement";
import ReviewNft from "../../NFTs/CreateNft/ReviewNft";
import FinalReviewNft from "../../NFTs/CreateNft/FinalReviewNft";
import cardImge from "../../../assets/images/cardimg.png";
import {Link as ReachLink} from "@reach/router";
import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"
import { setNFTMedium } from "../../../redux/action/tradingBot";
// import {ArtistInvite} from "../index";
import PreviewImg from "../../../assets/images/image2.png";
import NFTReview from "./component/NFTReview"
function AddNewArtist(props) {

    useEffect(() => {
        dispatch(setMintSteps(0))
         },[]);


    const state = useSelector(state => state);
    const {mintsteps,accountInfo,nftmedium}  =   state?.TradingBot
    
    const dispatch = useDispatch();
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
    const exit =async() => {
        dispatch(setMintSteps(0))
    };
    const back =async() => {
        dispatch(setMintSteps(mintsteps-1))
    };

    const { isOpen: isPreviewArtistOpen , onOpen: onPreviewArtistOpen, onClose: onPreviewArtistClose } = useDisclosure();
    const finalRef = React.useRef();
    return (
        <>
            <Box>
                <Box h={'100%'}>
                            {mintsteps===0 &&(
                            <Box minH={'500px'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                            <CardHeading>Create your first NFT</CardHeading>
                            <Text color={'#666666'} fontWeight={'400'} mb={'1rem'}>It takes only a few minutes to configure, mint, and list.</Text>

                            <Button onClick={handleClick}  bg='#0048FF' color='#fff' _hover={{color: "#fff"}} _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                            >
                                <Icon mr={2} width={"17px"} height={"16px"} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 9.12489C8.20163 9.12489 7.91548 9.00636 7.7045 8.79538C7.49353 8.5844 7.375 8.29826 7.375 7.99989C7.375 7.70152 7.49353 7.41537 7.7045 7.20439C7.91548 6.99341 8.20163 6.87489 8.5 6.87489C8.79837 6.87489 9.08452 6.99341 9.2955 7.20439C9.50647 7.41537 9.625 7.70152 9.625 7.99989C9.625 8.29826 9.50647 8.5844 9.2955 8.79538C9.08452 9.00636 8.79837 9.12489 8.5 9.12489ZM8.104 11.3704C8.23525 11.5279 8.36725 11.6809 8.5 11.8271C8.63275 11.6809 8.76475 11.5286 8.896 11.3704C8.63203 11.376 8.36797 11.376 8.104 11.3704ZM6.60775 11.2766C6.0318 11.2167 5.45965 11.1246 4.894 11.0006C4.83775 11.2631 4.795 11.5181 4.7665 11.7626C4.624 12.9499 4.82275 13.6714 5.125 13.8454C5.42725 14.0201 6.151 13.8311 7.10875 13.1149C7.306 12.9671 7.50475 12.8029 7.70425 12.6236C7.31387 12.1955 6.9478 11.7458 6.60775 11.2766ZM12.106 11.0006C11.5683 11.1206 10.9937 11.2136 10.3923 11.2766C10.0522 11.7458 9.68613 12.1955 9.29575 12.6236C9.49525 12.8036 9.694 12.9671 9.89125 13.1149C10.849 13.8311 11.5728 14.0201 11.875 13.8454C12.1772 13.6714 12.3752 12.9499 12.2343 11.7626C12.2033 11.5068 12.1608 11.2526 12.1068 11.0006H12.106ZM13.1935 10.7104C13.6262 12.6896 13.399 14.2654 12.4375 14.8204C11.476 15.3754 9.99775 14.7844 8.5 13.4201C7.00225 14.7844 5.524 15.3746 4.5625 14.8196C3.601 14.2646 3.37375 12.6896 3.80575 10.7096C1.87525 10.0954 0.625 9.10989 0.625 7.99989C0.625 6.88989 1.87525 5.90514 3.80575 5.28939C3.37375 3.31014 3.601 1.73439 4.5625 1.17939C5.524 0.624387 7.00225 1.21539 8.5 2.57964C9.99775 1.21539 11.476 0.625137 12.4375 1.18014C13.399 1.73514 13.6263 3.31014 13.1943 5.29014C15.1248 5.90439 16.375 6.88989 16.375 7.99989C16.375 9.10989 15.1248 10.0946 13.1943 10.7104H13.1935ZM7.7035 3.37614C7.51277 3.20349 7.31432 3.03957 7.10875 2.88489C6.151 2.16864 5.42725 1.97964 5.125 2.15439C4.82275 2.32839 4.62475 3.04989 4.76575 4.23714C4.79575 4.48239 4.83775 4.73664 4.89325 4.99914C5.45915 4.87519 6.03154 4.78304 6.60775 4.72314C6.964 4.23339 7.3315 3.78264 7.70425 3.37614H7.7035ZM10.3923 4.72314C10.9937 4.78614 11.5683 4.87989 12.106 4.99914C12.1623 4.73664 12.205 4.48164 12.2335 4.23714C12.376 3.04989 12.1772 2.32839 11.875 2.15439C11.5728 1.97964 10.849 2.16864 9.89125 2.88489C9.68543 3.03956 9.48673 3.20347 9.29575 3.37614C9.6685 3.78264 10.036 4.23339 10.3923 4.72314ZM8.896 4.62939C8.76475 4.47189 8.63275 4.31889 8.5 4.17264C8.36725 4.31889 8.23525 4.47114 8.104 4.62939C8.36797 4.62378 8.63203 4.62378 8.896 4.62939ZM5.779 10.0279C5.64217 9.80221 5.51014 9.57366 5.383 9.34239C5.31175 9.53514 5.24575 9.72489 5.18575 9.91314C5.3785 9.95514 5.5765 9.99339 5.77825 10.0279H5.779ZM7.228 10.2034C8.07483 10.2663 8.92517 10.2663 9.772 10.2034C10.2499 9.50135 10.6751 8.76483 11.044 7.99989C10.6751 7.23495 10.2499 6.49842 9.772 5.79639C8.92517 5.73349 8.07483 5.73349 7.228 5.79639C6.7501 6.49842 6.32493 7.23495 5.956 7.99989C6.32493 8.76483 6.7501 9.50135 7.228 10.2034ZM11.617 6.65739C11.6883 6.46464 11.7543 6.27489 11.8143 6.08664C11.6176 6.04397 11.4201 6.00571 11.2218 5.97189C11.3583 6.19757 11.4901 6.42612 11.617 6.65739ZM4.0975 6.37764C3.8425 6.46014 3.601 6.55014 3.3745 6.64764C2.27575 7.11864 1.75 7.65114 1.75 7.99989C1.75 8.34864 2.275 8.88114 3.3745 9.35214C3.601 9.44964 3.8425 9.53964 4.0975 9.62214C4.264 9.09714 4.47025 8.55264 4.71625 7.99989C4.47987 7.47112 4.27329 6.92952 4.0975 6.37764ZM5.185 6.08664C5.24575 6.27414 5.31175 6.46464 5.383 6.65664C5.51015 6.42561 5.64218 6.19731 5.779 5.97189C5.5765 6.00639 5.3785 6.04464 5.18575 6.08664H5.185ZM12.9025 9.62214C13.1575 9.53964 13.399 9.44964 13.6255 9.35214C14.7242 8.88114 15.25 8.34864 15.25 7.99989C15.25 7.65114 14.725 7.11864 13.6255 6.64764C13.3887 6.54676 13.1475 6.45667 12.9025 6.37764C12.736 6.90264 12.5297 7.44714 12.2838 7.99989C12.5297 8.55264 12.736 9.09639 12.9025 9.62214ZM11.815 9.91314C11.7543 9.72564 11.6883 9.53514 11.617 9.34314C11.4899 9.57416 11.3578 9.80246 11.221 10.0279C11.4235 9.99339 11.6215 9.95514 11.8143 9.91314H11.815Z" fill="white"/>
                                </Icon>
                                Create NFT
                            </Button>
                            </Box>
                            )}
                                {mintsteps===1&&(
                                <Box>  
                                    <CreateNFTStep1/>
                                </Box>
                                )}
                                {mintsteps===2&&(
                                <Box>
                                    <CreateNFTStep2/>
                               
                                   
                                </Box>
                                )}
                                
                                {mintsteps===3&&(
                                <Box>
                                    <CreateNFTStep3/>
                                    
                                </Box>
                                )}
                                {mintsteps===4&&(
                                <Box>
                                    <NFTReview/>
          
                                </Box>
                                )}
                                {mintsteps===5&&(
                                <Box>
                                     <CreateNftAgreement/>
                                </Box>
                                )}
                                
                                {mintsteps===6&&(
                                <Box>
                                    <CreateNftAgreementPreview/>
                                    <Divider/>
                                    <Grid marginTop='1rem' templateColumns="repeat(1, 1fr)" gap={6}   mb='auto'   name="form-name">
                                        <Box display='flex' mb={'3'}>
                                            <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D'_focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}   marginLeft='auto' marginRight={'1rem'} onClick={exit}>Save & exit</Button>
                                            <Button  textAlign={'center'} border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  rightIcon={<ExternalLinkIcon />}  > Preview</Button>
                                            <Button bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}

                                                    rightIcon={<ArrowForwardIcon />} marginLeft='1rem' onClick={handleClick}>Continue</Button>
                                        </Box>
                                    </Grid>
                                </Box>
                                )}
                                {mintsteps===7&&(
                                <Box>
                                    <CreateNftSendAgreement/>
                                </Box>)}
                                {mintsteps===8&&(
                                <Box>
                                    <ReviewNft />
                                </Box>
                                )}
                                {mintsteps===9&&(
                                <Box>
                                    <FinalReviewNft />
                                </Box>
                                )}
                                                          
                            
                                {/* <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(2, 1fr)"}} gap={6}  pt={'3rem'}>
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
                                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'} color={'#000'}>
                    <Box overflowX={'auto'}>
                        <Table variant="simple" border={'transparent'}>
                            <Thead border={'transparent'}>
                                <Tr bborder={'none'}>
                                    <Th border={'none'} color={'#000000'} fontSize={'16px'} fontWeight={'400'}>Art Work</Th>
                                    <Th border={'none'} color={'#000000'} fontSize={'16px'} fontWeight={'400'}>Price</Th>
                                    <Th border={'none'} color={'#000000'} fontSize={'16px'} fontWeight={'400'}>Availability</Th>
                                    <Th border={'none'} color={'#000000'} fontSize={'16px'} fontWeight={'400'}>NFT Minting</Th>
                                </Tr>
                            </Thead>
                            <Tbody border={'transparent'}>
                                <Tr border={'none'}>
                                    <Td border={'none'}>
                                        <Box d={'flex'} >
                                            <Image src={PreviewImg} maxW={'200px'}/>
                                            <Box pl={2}>
                                                <Heading color={'#000'} fontWeight={'700'} fontSize={'16px'}>Empty Diamonds, 2019</Heading>
                                                <Text color={'#000'} fontWeight={'400'}>Ed. 1/1</Text>
                                            </Box>
                                        </Box>
                                    </Td>
                                    <Td border={'none'} verticalAlign={'baseline'}>$ 200,000</Td>
                                    <Td border={'none'} verticalAlign={'baseline'}>For Sale</Td>
                                    <Td border={'none'} verticalAlign={'baseline'}>Drafted</Td>
                                </Tr>

                            </Tbody>

                        </Table>

                    </Box>
                </Grid> */}
                            
                </Box>
            </Box>
            <Modal
                onClose={onPreviewArtistClose}
                isOpen={isPreviewArtistOpen}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                <Flex    pt={'3rem'} m={'auto'} width={{base:'100%',md:'100%',lg:'100%'}}>
                                    <Box width={{base:'100%',md:'100%'}} pr={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                        <Box p={10} bg={'#C4C4C422'} minH={'600px'}>
                                            <Image src={PreviewImg} width={'100%'}  />
                                            <Grid templateColumns={{base: "repeat(1, 1fr)",md: "repeat(2, 1fr)"}} gap={6}  pt={'3rem'}>
                                                <Box>
                                                    <Text color={'#000000'} fontWeight={'300'} fontSize={'16px'}>Magdalena Murua</Text>
                                                    <Heading color={'#000000'} fontWeight={'600'} fontSize={'16px'} >Empty Diamonds,    2019, Ed. 1/1</Heading>
                                                </Box>
                                                <Box>
                                                    <Text color={'#000000'} fontWeight={'300'} textAlign={'right'}>$ 2000</Text>
                                                </Box>

                                            </Grid>



                                        </Box>

                                    </Box>
                                </Flex>
                            </Box>
                        </Box>

                    </ModalBody>
                </ModalContent>
            </Modal>

        </>

    );
}

export default AddNewArtist;

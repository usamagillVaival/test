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
    Textarea,
    RadioGroup, Radio, Container, FormControl, InputRightElement,
} from "@chakra-ui/react";
import {BioRymHeading, BioRymHeadingNew , SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react"

import {ArrowBackIcon, ArrowForwardIcon, ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"
import Preview from "../../../assets/images/image1.png";
import PreviewImg from "../../../assets/images/image2.png";

import {   useDispatch, useSelector} from 'react-redux'
import {setMintSteps} from "../../../redux/action/tradingBot"
import FLogoD from "../../../assets/images/flogoD.svg";

function CreateNftSendAgreement(props) {
    const state = useSelector(state => state);
    const {mintsteps,accountInfo}  =   state?.TradingBot
    const dispatch = useDispatch();
    const handleClick =async() => {
        dispatch(setMintSteps(mintsteps+1))
    };
    return (

        <>
            <Box width={'100%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Box w={{base:"100%",md:"80%", lg:'80%',xl:'60%'}}  margin='auto auto  0.5rem' p='2rem'  borderRadius='0.5rem' boxShadow='0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)' display='flex' bg='#fff'   align='center' justifyContent='center' flexDirection="column">
                    <Flex m='auto' pb={10} >
                        <Image src={FLogoD} w={'50px'} alt="image not avaiable" pr={2}/>
                        <Box flex="1">
                            <Text fontSize="24px">Dada Vault</Text>
                        </Box>
                    </Flex>
                    <Box minH={'250px'} display={'flex'} >
                        <Text m={'auto'} color={'#000'} fontSize={'1.5rem'} fontWeight={'500'}>Your agreement has been sent!</Text>
                    </Box>
                    <Box>
                        <BioRymHeadingNew textAlign={'center'} >Send agreement to Artist</BioRymHeadingNew>
                        <Text textAlign={'center'}  mt={4}  mb={4} color={'#1A1A1A'} fontWeight={'400'}>Select name of artist to send</Text>
                    </Box>
                    <Box>
                        <Text textAlign={'left'}>Name</Text>
                        <InputGroup mr={3} borderColor={'#C4C4C4'}>

                            <InputRightElement pointerEvents="none" children={ <Icon width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V15H20V0H0ZM1.53846 1.5H18.4615V13.5H15.8415C15.7815 13.3973 15.8085 13.257 15.7208 13.1715C15.4308 12.888 15.0177 12.75 14.6154 12.75C14.2131 12.75 13.8008 12.888 13.5092 13.1722C13.4223 13.257 13.4492 13.3973 13.3892 13.5H6.61077C6.55077 13.3973 6.57769 13.257 6.49077 13.1715C6.19846 12.888 5.78692 12.75 5.38462 12.75C4.98231 12.75 4.57 12.888 4.27846 13.1722C4.19154 13.257 4.21846 13.3973 4.15846 13.5H1.53846V1.5ZM6.92308 3C5.23077 3 3.84615 4.35 3.84615 6C3.84615 6.83475 4.21308 7.58775 4.78385 8.133C4.26049 8.47773 3.83141 8.94189 3.53393 9.48512C3.23645 10.0283 3.07957 10.6342 3.07692 11.25H4.61538C4.61538 10.6533 4.85852 10.081 5.29129 9.65901C5.72407 9.23705 6.31104 9 6.92308 9C7.53512 9 8.12209 9.23705 8.55486 9.65901C8.98764 10.081 9.23077 10.6533 9.23077 11.25H10.7692C10.7666 10.6342 10.6097 10.0283 10.3122 9.48512C10.0147 8.94189 9.58567 8.47773 9.06231 8.133C9.63308 7.58775 10 6.8355 10 6C10 4.35 8.61539 3 6.92308 3ZM6.92308 4.5C7.78231 4.5 8.46154 5.16225 8.46154 6C8.46154 6.83775 7.78231 7.5 6.92308 7.5C6.06385 7.5 5.38462 6.83775 5.38462 6C5.38462 5.16225 6.06385 4.5 6.92308 4.5ZM12.3077 5.25V6.75H16.9231V5.25H12.3077ZM12.3077 8.25V9.75H16.9231V8.25H12.3077Z" fill="#C4C4C4"/>
                            </Icon>} />
                            <Input type="text" bg={'#fff'} color={'#000'} border="1px" borderColor={'#C4C4C4'} />

                        </InputGroup>


                    </Box>
                    <Grid marginTop='1rem' templateColumns="repeat(2, 1fr)"  gap={2}   mb='auto'   name="form-name">
                        <Box d={'flex'}>
                            <Link mr={'auto'}  color={'#0048FF'}><Icon mr={1} width="14px" height="14px" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#0048FF"/>
                            </Icon>
                                Add another information</Link>
                        </Box>
                        <Box d={'flex'}>
                            <Button  bg='#0048FF' color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  ml={'auto'} onClick={handleClick}>Send</Button>
                        </Box>
                    </Grid>

                </Box>


            </Box>




        </>

    );
}

export default CreateNftSendAgreement;

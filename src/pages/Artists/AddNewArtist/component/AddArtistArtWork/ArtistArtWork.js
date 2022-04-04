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
    RadioGroup, Radio, Container,
} from "@chakra-ui/react";
import {BioRymHeading,SppinnerMain,SppinnerInner,SppinnerNummber ,SppinnerBar ,SppinnerBarProgress} from '../../../../../assets/StyledComponent/styeledComponent';
import { Spinner } from "@chakra-ui/react";
import PreviewImg from '../../../../../assets/images/image2.png';

import {ArrowBackIcon, ArrowForwardIcon , ExternalLinkIcon} from "@chakra-ui/icons";
import { Link as ReachLink } from "@reach/router"


function ArtistArtWork(props) {




    return (
        <>
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Grid templateColumns={{base:"repeat(1, 1fr)", md:"repeat(2, 1fr)"}} gap={6}  pt={'3rem'}>
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
                </Grid>


            </Box>




        </>

    );
}

export default ArtistArtWork;

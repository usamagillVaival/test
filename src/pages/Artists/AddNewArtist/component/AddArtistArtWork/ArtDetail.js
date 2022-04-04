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


function ArtDetail(props) {




    return (
        <>
            <Box width={'90%'} m={'auto'} pt={'2rem'} pb={'6rem'} mb={'auto'}>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}  pt={'3rem'}>
                    <BioRymHeading textAlign={'center'} >Add Detail</BioRymHeading>

                    <Box>
                        <Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Grid templateColumns={{base:"repeat(`1, 1fr)",md:"repeat(1, 1fr)",lg:"repeat(2, 1fr)"}} gap={10}  pt={'3rem'} width={'100%'}>
                                <Box>
                                    <Image src={PreviewImg} width={'100%'} />
                                </Box>
                                <Box>
                                    <Box>

                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Title</FormLabel>

                                        </Box>
                                        <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                            <Input type="text" color={'#4D4D4D'} placeholder={'Enter Title'} />
                                        </Box>
                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Year</FormLabel>

                                        </Box>
                                        <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                            <Input type="text" color={'#4D4D4D'} placeholder={'Enter year'} />
                                        </Box>
                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Description</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Textarea color={'#4D4D4D'} placeholder="Enter description" />
                                        </Box>

                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Tags</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                            <Input color={'#4D4D4D'} color={'#4D4D4D'} type="text" placeholder={'Enter tags here'}  />
                                        </Box>
                                        <Box mb={3}>
                                            <Stack direction="row">
                                                <Badge bg={'#F17A0E'} p={1} pl={2} pr={2} fontSize={'12px'} borderRadius={'6px'} fontWeight={'500'} colorScheme="#F17A0E">Success</Badge>
                                                <Badge bg={'#F17A0E'} p={1} pl={2} pr={2} fontSize={'12px'} borderRadius={'6px'} fontWeight={'500'} colorScheme="#F17A0E">Success</Badge>
                                                <Badge bg={'#F17A0E'} p={1} pl={2} pr={2} fontSize={'12px'} borderRadius={'6px'} fontWeight={'500'} colorScheme="#F17A0E">Success</Badge>
                                                <Badge bg={'#F17A0E'} p={1} pl={2} pr={2} fontSize={'12px'} borderRadius={'6px'} fontWeight={'500'} colorScheme="#F17A0E">Success</Badge>
                                                <Badge bg={'#F17A0E'} p={1} pl={2} pr={2} fontSize={'12px'} borderRadius={'6px'} fontWeight={'500'} colorScheme="#F17A0E">Success</Badge>
                                            </Stack>
                                        </Box>

                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Edition</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={'2rem'}>
                                            <Input type="text" color={'#4D4D4D'} placeholder={'Enter edition number'} />
                                        </Box>

                                        <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                            <FormLabel color='#4D4D4D' fontWeight='500' fontSize={'16px'} m={0}>Price</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={6}>
                                            <Input type="text" color={'#4D4D4D'} placeholder={'Enter USD'} />
                                        </Box>

                                    </Box>



                                </Box>
                            </Grid>
                        </Box>
                    </Box>

                </Grid>

            </Box>




        </>

    );
}

export default ArtDetail;

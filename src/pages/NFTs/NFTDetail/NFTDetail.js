import React from "react";
import {   useDispatch, useSelector} from 'react-redux'
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
    Checkbox,
    Container
} from "@chakra-ui/react";
import {ExternalLinkIcon, ChevronLeftIcon, SearchIcon} from '@chakra-ui/icons'
import managNFT from '../../../assets/images/managNFT.png';
import {setMintSteps} from "../../../redux/action/tradingBot"
import { navigate } from "@reach/router";

function NFTDetail(props) {
    const dispatch = useDispatch();
    const nftDraftList = props.location.state.nftDraftList
    const [disabled, setDisabled] = React.useState(true);
    const state = useSelector(state => state);
    const {mintsteps,accountInfo,nftmedium}  =   state?.TradingBot
    console.log(mintsteps)
    function handleEdit()
    {
         let draftState=nftDraftList?.artDraftingStatus+1
        // dispatch(setMintSteps(nftDraftList?.artDraftingStatus+1))
        navigate('/NFTs', { state: {draftState} })
    }
console.log()
    return (
        <>
            <Box height={'100vh'} overflowY={'scroll'}>
                <Box backgroundColor="#F2F2F2" display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} py={15} px={12} minH={'136'}>
                    <Box mr={'auto'}>
                        <Link color={'#0039CC'}> <ChevronLeftIcon/> Back to NFTs</Link>
                    </Box>
                    <Flex w={'100%'} display={{base: "block", sm:"flex", md: "flex", lg: "flex"}} >
                        <Box mr={'auto'} flex="1">
                            <Heading color={'#4D4D4D'} fontWeight="700" fontSize="30px">Activistes</Heading>
                            <Text color={'#808080'} fontWeight="400" fontSize="14px">Updated 5 seconds ago</Text>
                        </Box>
                        <Box d="flex" alignItems={"center"}>
                            <Stack spacing={3} direction="row" align="center">
                                ExternalLinkIcon
                                <Button leftIcon={<ExternalLinkIcon />} bg={'#fff'} borderColor={'#0048FF'} color={"#0048FF"} variant="outline">
                                    Preview 
                                </Button>
                                <Button bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}
                                        onClick={handleEdit}>
                                     Edit
                                </Button>
                            </Stack>
                        </Box>
                    </Flex>
                </Box>
                <Box pt={10} pl={14}>
                    <Box width={{base: "90%", sm:"75%", md: "50%", lg: "33.33%"}} >
                        <Grid marginTop='1rem' templateColumns="repeat(2, 1fr)" gap={6}   mb='auto'   name="form-name">
                            <Box><Image src={`http://51.222.241.160:8001/api/users/artist_profile/${nftDraftList?.file}`}/></Box>
                            <Box display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'center'}>
                                <Text fontSize={'16px'} fontWeight={'400'} color={'#000'}>Jacob Collins</Text>
                                <Text fontSize={'16px'} fontWeight={'400'} color={'#000'}>Painting</Text>
                                <Text fontSize={'16px'} fontWeight={'400'} color={'#000'}> 2012</Text>
                                <Text fontSize={'16px'} fontWeight={'400'} color={'#000'}>details</Text>
                            </Box>
                        </Grid>
                    </Box>
                    <Box  width={{base: "95%", sm:"85%", md: "75%", lg: "60%"}} pt={14} mb={5}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Image</FormLabel>
                                <Text color={'#4A5568'} >Sapien, tortor eget eu fermentum. Sit ultricies mi.</Text>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>
                                    <Box width={'70px'} height={'70px'} borderRadius={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_96:20422)">
                                                <rect width="64" height="64" rx="32" fill="#EDF2F7"/>
                                                <path d="M64 55.9842V64.0028H0V56.0135C3.72253 51.0387 8.55442 47.0011 14.1114 44.2216C19.6685 41.4422 25.7973 39.9976 32.0107 40.0028C45.088 40.0028 56.704 46.2802 64 55.9842ZM42.672 24.0002C42.672 26.8291 41.5482 29.5422 39.5478 31.5426C37.5474 33.543 34.8343 34.6668 32.0053 34.6668C29.1764 34.6668 26.4632 33.543 24.4629 31.5426C22.4625 29.5422 21.3387 26.8291 21.3387 24.0002C21.3387 21.1712 22.4625 18.4581 24.4629 16.4577C26.4632 14.4573 29.1764 13.3335 32.0053 13.3335C34.8343 13.3335 37.5474 14.4573 39.5478 16.4577C41.5482 18.4581 42.672 21.1712 42.672 24.0002Z" fill="#A0AEC0"/>
                                                <path opacity="0.14" d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z" fill="#171923"/>
                                                <path d="M41.219 27.3817C40.6981 26.8709 40.0698 26.6155 39.3337 26.6155H37.0003L36.4691 25.2261C36.3371 24.8925 36.0959 24.6047 35.7451 24.3628C35.3943 24.121 35.035 24 34.6669 24H29.3334C28.9653 24 28.6059 24.121 28.2552 24.3628C27.9045 24.6047 27.6632 24.8925 27.5313 25.2261L27 26.6155H24.6667C23.9304 26.6155 23.3021 26.8709 22.7812 27.3817C22.2604 27.8925 22 28.5088 22 29.2308V38.3846C22 39.1066 22.2604 39.723 22.7812 40.2337C23.3021 40.7445 23.9305 41 24.6667 41H39.3334C40.0696 41 40.6978 40.7445 41.2188 40.2337C41.7395 39.723 42 39.1066 42 38.3846V29.2308C42.0001 28.5088 41.7397 27.8925 41.219 27.3817ZM35.2969 37.0412C34.3838 37.9369 33.2849 38.3848 32.0001 38.3848C30.7152 38.3848 29.6164 37.9369 28.7032 37.0412C27.7899 36.1457 27.3334 35.0678 27.3334 33.808C27.3334 32.5478 27.79 31.4701 28.7032 30.5745C29.6163 29.6788 30.7153 29.231 32.0001 29.231C33.2849 29.231 34.3838 29.6789 35.2969 30.5745C36.2102 31.47 36.6668 32.5478 36.6668 33.808C36.6668 35.0678 36.2102 36.1456 35.2969 37.0412Z" fill="white"/>
                                                <path d="M31.9991 30.8672C31.1727 30.8672 30.4661 31.155 29.8793 31.7306C29.2924 32.3061 28.999 32.999 28.999 33.8097C28.999 34.6201 29.2924 35.3131 29.8793 35.8886C30.4661 36.4641 31.1727 36.7518 31.9991 36.7518C32.8255 36.7518 33.5321 36.4641 34.119 35.8886C34.7058 35.3131 34.9993 34.6201 34.9993 33.8097C34.9993 32.999 34.7058 32.3061 34.119 31.7306C33.5322 31.155 32.8255 30.8672 31.9991 30.8672Z" fill="white"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_96:20422">
                                                    <rect width="64" height="64" rx="32" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>



                                    </Box>

                                    <Input type="file" display={'none'} borderRadius={'50px'} width={'50px'} height={'50px'} background={'red'} visibility={'hidden'}/>

                                </FormLabel>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Title</FormLabel>
                                <Text color={'#4A5568'} >Personalize your profile</Text>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                <Input type="text" value={nftDraftList.title}
                                isDisabled={disabled}
                                />
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Year</FormLabel>
                                <Text color={'#4A5568'} >Accurate email address is needed for your
                                    account’s safety</Text>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='center' mb={3}>
                                <Input type="text"
                                value={nftDraftList.year} 
                                isDisabled={disabled}
                                />
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Classification</FormLabel>
                                <Text color={'#4A5568'} >Iaculis velit elementum lorem pharetra lobortis vulputate dui</Text>
                            </Box>
                            <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                <Select color={'#718096'} placeholder="Select country">
                                    <option>United Arab Emirates</option>
                                    <option>Nigeria</option>
                                </Select>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Medium</FormLabel>
                            </Box>
                            <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                <Select color={'#718096'} placeholder="Select country">
                                    <option>United Arab Emirates</option>
                                    <option>Nigeria</option>
                                </Select>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Categories</FormLabel>
                                <Text color={'#4A5568'} >Orci laoreet a donec semper</Text>
                            </Box>
                            <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                <Select color={'#718096'} placeholder="Lorem ipsum">
                                    <option>Lorem ipsum</option>
                                    <option>Lorem ipsum</option>
                                </Select>
                            </Box>
                            <Box display='flex'  alignItems='start' justifyContent='start' mb={3} flexDirection={'column'}>
                                <FormLabel color='#1A202C' fontWeight='600' fontSize={'16px'} m={0}>Dimensions / Size</FormLabel>
                            </Box>

                            <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                <Select color={'#718096'} placeholder="Lorem ipsum">
                                    <option>Lorem ipsum</option>
                                    <option>Lorem ipsum</option>
                                </Select>
                            </Box>

                        </Grid>


                    </Box>


                </Box>

            </Box>

        </>

    );
}

export default NFTDetail;

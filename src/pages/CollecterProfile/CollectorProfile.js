import React from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Badge, Grid, Icon, Text} from "@chakra-ui/react";
import {AddIcon,ArrowForwardIcon, SearchIcon} from '@chakra-ui/icons';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Heading,
    InputGroup,
    Spacer,
    FormLabel,
    FormControl ,
    Box,
    Select,
    Checkbox,
    InputLeftElement,
    ChakraProvider,
    Flex , Input , FormHelperText
     ,InputRightElement ,  Button, Container} from "@chakra-ui/react"
import {BioRymHeading}  from '../../assets/StyledComponent/styeledComponent'





const CollecterProfile = () =>{
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const wallet=useWallet()
    function walletConnection()
    {
        alert(wallet.status)
        wallet.connect()
    }
    return(
        <>
            <Box height='100vh'>
                <Box height='20%'
                     background='#F2F2F2'
                     display='flex'
                     alignItems='center'
                     justifyContent='end'
                >
                    <Box display='flex' width={{base:'100%',md:'60%' ,lg:'50%',xl:'40%'}}>
                        <InputGroup me='1rem' borderColor='#C4C4C4'>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<SearchIcon color="gray.300" />}
                            />
                            <Input type="text" placeholder="Search NFTs" />
                        </InputGroup>
                        <Button me='1rem' fontSize='1rem' px='1rem'  bg='#0048FF' width={'inherit'} color='#fff' _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }} rightIcon={<AddIcon />} marginLeft='auto' onClick={walletConnection}>Connect wallet</Button>
                    </Box>
                </Box>
                <Box height='80%'>
                    <Tabs>
                        <TabList  background='#F2F2F2'>
                            <Container maxW="container.xl" display='flex' flexWrap={'wrap'}>
                                <Tab  fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight='600'>About You</Tab>
                                <Tab  fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight='600'>Saves  and Follows</Tab>
                                <Tab  fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight='600'>Order history</Tab>
                                <Tab  fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight='600'>Settings</Tab>
                                <Tab  fontSize={{base: '12px', sm:'12px', md: '14', lg: '16px' }} fontWeight='600'>Wallet</Tab>
                            </Container>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Container maxW="container.md">
                                    <Box display='flex' flexDirection='column' paddingBlock='3rem' >
                                        <Badge marginBlock='1rem' padding='0.5rem' bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" colorScheme="green">
                                            Step 2
                                        </Badge>
                                        <BioRymHeading textAlign='center' fontSize='1.9rem' mb='1rem'>
                                            Let’s set up your Collector profile.
                                        </BioRymHeading>
                                        <Text textAlign='center' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                            Customize your preferences here.
                                        </Text>
                                    </Box>
                                    <Grid templateColumns={{base:"repeat(1, 1fr)" , md:"repeat(2, 1fr)" }} gap={3}>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Full name *</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Input type="text" />
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Location</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Input type="text" />
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Price Range</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Select placeholder="Select country">
                                                <option>United Arab Emirates</option>
                                                <option>Nigeria</option>
                                            </Select>
                                        </Box>
                                        <Box display='flex' flexDirection='column'  alignItems='start' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Artists you collect</FormLabel>
                                            <Text textAlign='left' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                                Customize your preferences here.
                                            </Text>

                                        </Box>
                                        <Box display='flex'  flexDirection='column'  alignItems='start' justifyContent='start' mb={3}>
                                            <InputGroup  borderColor='#C4C4C4' width='100%' >
                                                <InputLeftElement
                                                    pointerEvents="none"
                                                    children={<SearchIcon color="gray.300" />}
                                                />
                                                <Input type="text" placeholder="Search Artist" />
                                            </InputGroup>
                                            <Box display='flex' mt='1rem'>
                                                <Box width='30px' height='30px' bg='gray' mr='1rem'></Box>
                                                <Text color='#000'> Jelly Beans</Text>
                                            </Box>

                                        </Box>
                                        <Box  display='flex'  alignItems='center' justifyContent='start'>
                                            <Text textAlign='left' fontSize='0.8rem' mb='0' color='#1A1A1A'>
                                                Share information with galleries
                                            </Text>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='end'>
                                            <Checkbox></Checkbox>
                                        </Box>
                                        <Box></Box>
                                        <Box>
                                            <Button mt='2rem' display='flex' ml='auto' fontSize='1rem' px='1rem' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}  marginLeft='auto' >Save</Button>

                                        </Box>

                                    </Grid>

                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container maxW="container.lg">
                                    <p>two!</p>
                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container maxW="container.lg">
                                    <p>three!</p>
                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container maxW="container.lg">
                                    <Box display='flex' flexDirection='column' paddingBlock='3rem' >
                                        <Badge marginBlock='1rem' padding='0.5rem' bg='#0048FF' color='#fff' m="auto" fontSize="0.8em" colorScheme="green">
                                            Step 2
                                        </Badge>
                                        <BioRymHeading textAlign='center' fontSize='1.9rem' mb='1rem'>
                                            Let’s set up your Collector profile.
                                        </BioRymHeading>
                                        <Text textAlign='center' fontSize='0.8rem' mb='1rem' color='#1A1A1A'>
                                            Customize your preferences here.
                                        </Text>
                                    </Box>
                                    <Grid templateColumns={{base:"repeat(1, 1fr)",md:"repeat(3, 1fr)"}} gap={3}>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Full name *</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Input type="text" />
                                        </Box>
                                        <Box></Box>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Email</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Input type="email"  placeholder='abd@abc.com'/>
                                        </Box>
                                        <Box></Box>
                                        <Box display='flex'  alignItems='center' justifyContent='start' mb={3}>
                                            <FormLabel color='#1A202C' fontWeight='600' m={0}>Current Password</FormLabel>
                                        </Box>
                                        <Box display='flex'  alignItems='center' justifyContent='center' mb={3}>
                                            <Input type="password" />
                                         </Box>
                                        <Box>
                                            <Button  display='flex' mr='auto' fontSize='1rem' px='1rem' border='1px solid #C4C4C4' bg='transparent' color='#4D4D4D' minWidth='200px' _focus={{ bg: "#D2D2D2", }}  _hover={{ bg: "#E6E6E6", }} _active={{ bg: "#D2D2D2", }}  >Create new password</Button>

                                        </Box>

                                        <Box></Box>
                                        <Box>
                                            <Button mt='4rem' display='flex' ml='auto' fontSize='1rem' px='1rem' bg='#0048FF' color='#fff'  _focus={{ bg: "#090864", }}  _hover={{ bg: "#0C0B86", }} _active={{ bg: "#090864", }}   marginLeft='auto' >Save Changes</Button>

                                        </Box>

                                    </Grid>

                                </Container>
                            </TabPanel>
                            <TabPanel>
                                <Container maxW="container.lg">
                                    {wallet.status=="connected"?
                                    <p>Connected Wallet : {wallet.account}</p>
                                    :<p>Wallet not connected</p>
    }
                                </Container>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Box>

            </Box>

        </>


    );
}
export default CollecterProfile;
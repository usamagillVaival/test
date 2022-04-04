import React , { useState }  from "react";
import {
    Wrap, WrapItem ,
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputRightElement, Table, Tbody, Td, Image,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, Radio, Divider,Center ,List, ListItem,UnorderedList
} from "@chakra-ui/react";
import {InterHeading,RobotoHeading} from '../../assets/StyledComponent/styeledComponent';
import DVLogo from '../../assets/images/DVlOGO.png';
import {ArrowForwardIcon, ExternalLinkIcon, SearchIcon} from "@chakra-ui/icons";

function Footer(props) {

    return (
        <>
            <footer >
              <Flex flexWrap={'wrap'}>
                  <Box width={{base:'50%' , md:'33.33%' ,lg:'16.66%'}} px={'1rem'}>
                      <InterHeading fontSize={'0.90rem'} fontWeight={'700'} >Products</InterHeading>
                      <UnorderedList listStyleType={'none'} ml={'0'}>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>How it works</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Features</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Integration</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Pricing</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Examples</Link></InterHeading></ListItem>
                      </UnorderedList>

                  </Box>
                  <Box width={{base:'50%' , md:'33.33%' ,lg:'16.66%'}} px={'1rem'} mb={3}>
                      <InterHeading fontSize={'0.90rem'} fontWeight={'700'} >RESOURCES</InterHeading>
                      <UnorderedList listStyleType={'none'} ml={'0'}>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Learn Center</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Support</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Slack Community</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Events</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Terms of Service</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Privacy Policy</Link></InterHeading></ListItem>
                      </UnorderedList>

                  </Box>
                  <Box width={{base:'50%' , md:'33.33%' ,lg:'16.66%'}} px={'1rem'} mb={3}>
                      <InterHeading fontSize={'0.90rem'} fontWeight={'700'} >ABOUT</InterHeading>
                      <UnorderedList listStyleType={'none'} ml={'0'}>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Our story</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Media Kit</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Blog</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Email Us</Link></InterHeading></ListItem>
                      </UnorderedList>
                  </Box>
                  <Box width={{base:'50%' , md:'33.33%' ,lg:'16.66%'}} px={'1rem'} mb={3}>
                      <InterHeading fontSize={'0.90rem'} fontWeight={'700'} >GET STARTED</InterHeading>
                      <UnorderedList listStyleType={'none'} ml={'0'}>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Start for free</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Sign in</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Download MacOS</Link></InterHeading></ListItem>
                          <ListItem py={'0.5rem'} fontSize={'0.90rem'} fontWeight={'400'} ><InterHeading fontSize={'0.90rem'} fontWeight={'400'} ><Link>Download Windows</Link></InterHeading></ListItem>
                      </UnorderedList>
                  </Box>
                  <Box  width={{base:'100%' , md:'50%' ,lg:'33.33%'}} px={{base:'1rem' ,md:'3rem'}} mb={3}>
                      <RobotoHeading fontWeight={'500'} fontSize={'2.5rem'} mb={'1rem'} > Join Us </RobotoHeading>

                      <RobotoHeading fontWeight={'500'} fontSize={'1rem'} mb={'1rem'}>  The DadaVault Private Beta Program</RobotoHeading>

                          <RobotoHeading  fontWeight={'300'} fontSize={'1rem'} mb={'1rem'}>Request early access to the DadaVault platform.</RobotoHeading>
                      <InputGroup size="md">
                          <Input bg={'#fff '}

                              placeholder="Your email"
                          />
                          <InputRightElement width="4.5rem">
                              <Button borderTopLeftRadius={'0px'} borderBottomLeftRadius={'0px'} px={'1rem'} height={'100%'} minW={'140px'} color={'#fff'} bg={'#3182CE'}  _focus={{ bg: "#3182CE", }}  _hover={{ bg: "#3182CE", }} _active={{ bg: "#3182CE", }}>
                               Submit
                              </Button>
                          </InputRightElement>
                      </InputGroup>

                  </Box>


              </Flex>
                <Box width={'100%'} px={'1rem'} display={'flex'} py={'2rem'}>
                    <Box >
                        <InterHeading fontWeight={'400'} fontSize={'14px'} color={'#1A202C'}>© 2021 DadaVault</InterHeading>
                    </Box>
                    <Box display={'flex'} ml={4} alignItems={'center'} justifyContent={'center'} >
                        <Link color={'#1A202C'} fontSize={'18px'} px={'0.5rem'}><i className="fab fa-facebook-square"></i></Link>
                        <Link color={'#1A202C'} fontSize={'18px'} px={'0.5rem'}><i className="fab fa-linkedin"></i></Link>
                        <Link color={'#1A202C'} fontSize={'18px'} px={'0.5rem'}><i className="fab fa-github"></i></Link>
                        <Link color={'#1A202C'} fontSize={'18px'} px={'0.5rem'}><i className="fab fa-twitter"></i></Link>
                    </Box>

                </Box>

            </footer>

        </>

    );
}

export default Footer;

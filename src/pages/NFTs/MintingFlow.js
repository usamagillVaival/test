import React from "react";
import {
    Box, Button,
    Flex, Grid, Badge,
    Heading, Input, InputGroup, InputLeftElement, Table, Tbody, Td, Image, Select, Divider,
    Text, Tfoot, Th, Thead, Tr, Link, Stack, Icon, Tabs, TabList, Tab, TabPanels, TabPanel, FormLabel
} from "@chakra-ui/react";
import {ArrowForwardIcon,ArrowBackIcon, ExternalLinkIcon, SearchIcon, TriangleUpIcon} from '@chakra-ui/icons'
import styled from "@emotion/styled";
import {
    Card,
    CardHeading,
    CustomBadge,
    NFTCardHeading,
    NFTCustomCard
} from '../../assets/StyledComponent/styeledComponent';


import {NFTCARD} from '../../components/index'
import CreateFirst from "./CreateNft/CreateFirst";
import CreateNFTStep1 from "./CreateNft/CreateNftStep1";
import CreateNFTStep2 from "./CreateNft/CreateNftStep2";
import CreateNFTStepPreview from "./CreateNft/CreateNftStepPreview";
import CreateNFTStep3 from "./CreateNft/CreateNftStep3";
import CreateNFTStep4 from "./CreateNft/CreateNftStep4";
import CreateNftAgreementPreview from "./CreateNft/CreateNftAgreementPreview ";
import CreateNftAgreement from './CreateNft/CreateNftAgreement';
import CreateNftSendAgreement from "./CreateNft/CreateNftSendAgreement";
import ReviewNft from "./CreateNft/ReviewNft";
import FinalReviewNft from "./CreateNft/FinalReviewNft";
import cardImge from "../../assets/images/cardimg.png";
import {Link as ReachLink} from "@reach/router";
import { useSelector, useDispatch } from 'react-redux'
import CreateNftStepPreview from "./CreateNft/CreateNftStepPreview";


function MintingFlow(props) {

    const state = useSelector(state => state);
    const {mintsteps}  =   state?.TradingBot
    return (
        
        <>
        {mintsteps===0 &&(
            <CreateFirst  /> 
        )}
        {mintsteps===1&&(
            <CreateNFTStep1/>
        )}
        
        {mintsteps===2&&(
            <CreateNFTStep2/>
        )}
        {mintsteps===3&&(
            <CreateNFTStepPreview/>
        )}
        {mintsteps===4&&(
            <CreateNFTStep3/>
        )}
        {mintsteps===5&&(
            <CreateNFTStep4/>
        )}

     </>

);
}

export default MintingFlow;
import React, { useEffect,useState} from "react";
import Routes from "./routes";
import {
  LandingPage,
  ArtistStoreFront,
  Signup,
  Login,
  CollecterProfile,
  GalleryAccount,
  AdminLogin,
} from "./pages/index";
import { Box, Flex } from "@chakra-ui/react";
import { Switch, Route } from 'react-router-dom';
import { SideBar } from "./components";
import { useWallet, UseWalletProvider } from "use-wallet";
import {   useDispatch, useSelector} from 'react-redux'
import { Link as ReachLink, navigate } from "@reach/router"
import { setToken } from "./redux/action/tradingBot";
import { setUser } from "./redux/action/tradingBot";


const infuraLink = process.env.REACT_APP_INFURA_LINK
const chain = process.env.CHAIN_ID

const  App=() =>
{
  

    const dispatch = useDispatch();

    const [HomePage, setHomePage] = useState(window.location.pathname);
    const state = useSelector((state) => state);
    const {User}  =   state?.TradingBot

    useEffect(() => {
        const handleInvalidToken = e => {
            console.log('eeeeeeee',e)
          if (e.key == null ) {
            // Your logout logic here
    
            console.log(e)
         //   logoutAction(history);

         dispatch(setToken(''))
         dispatch(setUser(''))
      localStorage.clear()
  
  
  
  
          navigate("/Login")
      
       
          }
        }
        window.addEventListener('storage', handleInvalidToken)
        return function cleanup() {
          window.removeEventListener('storage', handleInvalidToken)
        }
      }, [User])
        // console.log(HomePage);





        // console.log(HomePage);

 
    return (
        <>
        <UseWalletProvider
        autoConnect
        // connectors={{ injected:{ chainId: [1] } }}
            chainId={chain} 
            connectors={{
                walletconnect:{rpc:{chain:infuraLink}}
              // This is how connectors get configuredwalletco
            }}
          >
            <Box className={'Wrapper'} position={'relative'} color="white" justifyContent="center">
                    <>
                                {/* <SideBar /> */}
                             
                                    <Routes  />
               </>
                  
                </Box>
    
     {/* <Flex width={'100%'}>
        <Signin />
    </Flex>
       <Flex width={'100%'}>
            <ArtistStoreFront />
        </Flex>
            <Flex>
                <CollecterProfile/>
           </Flex>
            <Box >
               <GalleryAccount/>
            </Box>  */}
       </UseWalletProvider>
        </>
    );
}
export default App;
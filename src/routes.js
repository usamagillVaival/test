import "./App.css";
import {

  AddPaymentGateway,

  AdminGalleryDetail,
  ArtistDetailNew,
  GalleryProfile,
  SmartContractUserDetail,
  AccountSetting,
  ArtistOnBoardingUserDetail,
  LoginAdmin,
  SmartContract,


  EnabledTwoFactorAuthentication,
  NFTsDetailNew,

  TwoFactorAuthentication,
  SendDraft,
  AddDetails,
  UploadMedia,
  SelectMedium,

  Dashboard,
  Message,
 
  NFTs,
  NFTDetail,
  Artists,
  
 
  ArtistDashboard,

  ArtistStoreFront,
 
  GalleryAccount,
  CollecterProfile,
  AdminLogin,
  AdminDashboardNew,

  Verify,
  InvitationSignUp,
  InviteGallery,
  ArtistListing,
  OnBoardingUserDetail,
  ResetPassword,
  ForgetPassword,
  Authenticator,
  AdminGalleries,
  GalleryStoreFront,
  CollectorOnBoarding,
  CollectorPaymentGateway,
  Messages,
  MessageChatUI,
  Sales,
  SalesDetail,
  ArtistSale,
  Purchase,
  PurchaseDetail,
  PaymentCheck,
  CollectorDashboardNew,
  VideoTesting,
  CollectorSignUp,
  ArtistProfile,
  CollectorProfileNew,
  CollectorNft,
  ArtistDashboardNew,
  LoginAuthenticator,
  Error404,
  ArtistPaymentGateway,
  ArtistSaleDetail,
  
} from "./pages/index";
import { Router, Redirect } from "@reach/router";
import { globalHistory, Location } from "@reach/router";
import CryptoJS from "crypto-js";
import React, { useState, useEffect } from "react";
import { SideBar } from "./components";
import { Box, Flex } from "@chakra-ui/react";

function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);

  const userObj = JSON.parse(localStorage.getItem("User"));
  let userType = "";
  if (userObj) {
    const bytes = CryptoJS.AES.decrypt(userObj, "userObject");
    userType = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const [HomePage, setHomePage] = useState(window.location.pathname);

  React.useEffect(() => {
    globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        setHomePage(window.location.pathname);
      }
    });

    // do something when path changes ...
  }, [window.location.href]);

  // console.log(HomePage);

  return (
    <>
      {HomePage === "/Login" ||
                HomePage === "/" ||

        HomePage.includes("/Invitation") ||
        HomePage == "/artist/CreateProfile" ||
        HomePage == "/OnBoardingUserDetail" ||
        HomePage == "/SignUpPage" ||
        HomePage.includes("/SignUp") ||
        HomePage == "/ResetPassword" ||
        HomePage.includes("/GalleryStoreFront") ||
        HomePage.includes("/error404") ||

        HomePage == "/2fa" ||
        HomePage == "/enabled2fa" ||
        HomePage.includes("/ForgetPassword") ||
        HomePage == "/AddPaymentGateway" ||
        HomePage == "/Review" ||
        HomePage == "/confirminfo" ||
        HomePage.includes("/Verify") ||
        HomePage == "/LoginAuthenticator" ||
        HomePage == "/LoginnAuthenticator" ||
        HomePage.includes("/PaymentVerify") ||

        HomePage == "/CollectorOnBoarding" ||
                HomePage == "/artistpaymentgateway" ||
                HomePage == "/error404" ||

                
        
        HomePage == "/CollectorPaymentGateway" ? (
        <></>
      ) : (
        <SideBar />
      )}
      <Box
        className={"ContentArea"}
        width={
          HomePage === "/Login" ||
          HomePage === "/" ||
            HomePage.includes("/Invitation") ||
            HomePage == "/artist/CreateProfile" ||
            HomePage == "/OnBoardingUserDetail" ||
            HomePage == "/SignUpPage" ||
            HomePage.includes("/SignUp") ||
            HomePage == "/ResetPassword" ||
            // || HomePage=='/GalleryStoreFront'
            HomePage.includes("/GalleryStoreFront") ||
            HomePage == "/2fa" ||
            HomePage == "/enabled2fa" ||
            HomePage.includes("/ForgetPassword") ||
            HomePage == "/AddPaymentGateway" ||
            HomePage == "/Review" ||
            HomePage == "/confirminfo" ||
            HomePage.includes("/Verify") ||
            HomePage == "/LoginAuthenticator" ||
            HomePage == "/LoginnAuthenticator" ||

            HomePage == "/CollectorOnBoarding" ||
            HomePage == "/artistpaymentgateway" ||
            HomePage == "/error404" ||
            HomePage.includes("/PaymentVerify") ||


            HomePage == "/CollectorPaymentGateway"
            ? [
              "calc(100%)",
              "calc(100% )",
              "calc(100% )",
              "calc(100%)",
              "calc(100% )",
            ]
            : [
              "calc(100%)",
              "calc(100% )",
              "calc(100% )",
              "calc(100% - 256px)",
              "calc(100% - 256px)",
            ]
        }
        color={"#000"}
        ml={
          HomePage === "/Login" ||
          HomePage === "/" ||
            HomePage.includes("/Invitation") ||
            HomePage == "/artist/CreateProfile" ||
            HomePage == "/OnBoardingUserDetail" ||
            HomePage == "/SignUpPage" ||
            HomePage.includes("/SignUp") ||
            
            HomePage.includes("/PaymentVerify") ||
            HomePage == "/ResetPassword" ||
            HomePage.includes("/GalleryStoreFront") ||
            HomePage == "/2fa" ||
            HomePage == "/enabled2fa" ||
            HomePage.includes("/ForgetPassword") ||
            HomePage == "/AddPaymentGateway" ||
            HomePage == "/Review" ||
            HomePage == "/confirminfo" ||
            HomePage.includes("/Verify") ||
            HomePage == "/LoginAuthenticator" ||
            HomePage == "/LoginnAuthenticator" ||
            
            HomePage == "/CollectorOnBoarding" ||
            HomePage == "/artistpaymentgateway" ||
            HomePage == "/error404" ||

            HomePage == "/CollectorPaymentGateway"
            ? [0, 0, 0, "0px", "0px"]
            : [0, 0, 0, "256px", "256px"]
        }
      >
        {/* <Box className={'ContentArea'}  width={['calc(100%)','calc(100% )','calc(100% )','calc(100%)','calc(100% )',]} color={"#000"} ml={[0,0,0,'0px','0px']}  > */}

        <Router>


      {/* admin routes */}
     
      {userType?.account_type == "admin" ? (
            <>
             
             <AdminDashboardNew path="admin/Dashboard" />
          <AdminGalleries path="admin/Galleries" />
          <SmartContract path="admin/SmartContract" />
          <SmartContractUserDetail path="admin/SmartContractDetails" />
          <AdminGalleryDetail path="admin/GalleryDetails" />


            </>
          ) : (
            <>
            
              <Redirect from="admin/Dashboard" to="/Login" noThrow />
            </>
          )}



          

            {/* Onboarding */}
          <AdminLogin path="/Login" />

          <AdminLogin path="/"  />
          <Redirect default noThrow from="*" to="/" />
          <PaymentCheck path="/PaymentVerify/:userId" />
          <ResetPassword path="/ResetPassword" />
          <TwoFactorAuthentication path="/2fa" />
          <EnabledTwoFactorAuthentication path="/enabled2fa" />
          <ForgetPassword path="/ForgetPassword/:ForgetPassword" />
          <AddPaymentGateway path="/AddPaymentGateway" />
        



          {/*Profile pages start*/}
          {/*Gallery Profile */}
          <GalleryProfile path="gallery/Profile" />
          {/*Profile pages end*/}
          {/*     Store Front*/}
          <GalleryStoreFront path="/GalleryStoreFront/:id" />
          {/*     onBoarding */}
          {/*     collectorOnboarding*/}
          <CollectorOnBoarding path={"/CollectorOnBoarding"} />
          <CollectorPaymentGateway path={"/CollectorPaymentGateway"} />
          {/*     Messages Screens*/}
          <Messages path={"/Messages"} />
          <MessageChatUI path={"/MessageChatUI/:id"} />
          {/*   Sales Screens*/}
          <Sales path={"/Sales"} />
          <SalesDetail path={"/salesDetail"} />

          <ArtistSale path={"/ArtistSales"} />
          <ArtistSaleDetail path ={"/ArtistSaleDetail"} />
          {/*  Purchase*/}
          
          <Purchase path={"/purchase"} />
          <PurchaseDetail path={"/purchaseDetail"} />

          {/* <SideBar /> */}
          <LoginAdmin path="admin/login" />
          <VideoTesting path="Video" />
          
          <ArtistOnBoardingUserDetail path="artist/CreateProfile" />
          {/*Admin Pages end*/}
          <AccountSetting path={"/accountSetting"} />
          <ArtistStoreFront path="/ArtistStoreFront" />
          {/*<LandingPage path="/" /> */}
          {/*<LandingPage path="*" />*/}
          <Dashboard path="gallery/Dashboard" />
          <Message path="/Message" />
         
          <NFTs path="/NFTs" />
          <NFTDetail path="/NFTdetail" />
          <OnBoardingUserDetail path="/OnBoardingUserDetail" />
          <ArtistPaymentGateway path="/artistpaymentgateway" />
          <Artists path="/Artists" />
          <ArtistProfile path={"/artistProfile"} />
          <CollectorDashboardNew path={"/collector/Dashboard"} />
          <ArtistDashboardNew path={"/ArtistDashboardNew"} />
          <ArtistDetailNew path="/Artists/ArtistDetailNew/:id" />
          <NFTsDetailNew path="/NFTsDetailNew/:id" />
         
          
          {/* <Login path='/LoginPage' /> */}
          <GalleryAccount path="/SignUp/:InvitationCode" />
          {/* <InvitationSignUp  path="/Invitation/:InvitationCode" /> */}
          <InvitationSignUp path="/Invitation/:InvitationCode" />
         
          
         
          
          {userType?.account_type == "admin" ? (
            <>
              <InviteGallery path="/admin/InviteGallery" />
            </>
          ) : (
            <>
            
              <Redirect from="/admin/InviteGallery" to="/Login" noThrow />
            </>
          )}

          {userType?.account_type == "artist" ? (
            <ArtistDashboard path="/Artists/ArtistDashboard" />
          ) : (
            <Redirect from="/Artists/ArtistDashboard" to="/Login" noThrow />
          )}
          <CollecterProfile path="/collectorProfile" />
          {userType?.account_type == "collector" ? (
            <CollecterProfile path="/collectorProfile" />
          ) : (
            <Redirect from="/collectorProfile" to="/Login" noThrow />
          )}

          <Verify path="/Verify/:VerifyAccount" />

          <SelectMedium path="/selectMedium" />
          <UploadMedia path="/uploadMedia" />
          {/* <NftPreview path="/nftPreview" /> */}
          <AddDetails path="/addDetails" />
          <SendDraft path="/sendDraft" />
          
          
        
          
        
          <ArtistListing path="/artistlist" />
          <Authenticator path="/LoginAuthenticator" />
          <LoginAuthenticator path="/LoginnAuthenticator" />

          {/* Collector Routes */}

          <CollectorSignUp path="collector/SignUp" />
          <CollectorProfileNew path={"/collector/Profile"} />
          <CollectorNft path={"/collector/Nfts"} />



          {/*  Error Page*/}
          <Error404 path={'/error404'}  />
           
        </Router> 
      </Box>
    </>
  );
}
export default Routes;

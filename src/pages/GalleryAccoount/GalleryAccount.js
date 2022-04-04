import React,{useEffect} from 'react';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux'
import SignUp from './SignUp'
import GalleryAccountProfile from '../OnBoarding/OnBoardingUserDetail'
import  PaymentStep  from './ConfirmInformation/PaymentStep';
import PaymentInfo from './ConfirmInformation/PaymentInfo'

    const GalleryProfile =({InvitationCode})=>{
        const state = useSelector(state => state);
        const {steps}  =   state?.TradingBot

    return(
      
        <>


{steps===0 &&(

<SignUp InvitationCode={InvitationCode} />     
 )}  
  {steps===1 &&(
    <GalleryAccountProfile  /> 
 )}

   {steps===2 &&(
    <PaymentStep />
 )}  

 {
     steps===3 && (
         <PaymentInfo />
     )
 }
          
            </>
			 

    );
}
export default GalleryProfile;
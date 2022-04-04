import React,{useEffect} from 'react';
import server from '../apis/server'

import Routes from '../routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { navigate, Redirect, redirectTo } from "@reach/router";

const Verify=({VerifyAccount})=>{
  
    useEffect(() => {
      // localStorage.clear()

        validateConfirmationCode() 
       },[]);
       const validateConfirmationCode =async() => {
           try  { 
           const {data} = await server.get(
               `users/verifyAccount/${VerifyAccount}`,
               { 
                 headers: {
                   "Content-Type": "application/json",
                 },
               } 
             )
             console.log(data.error)
           //    alert(JSON.stringify(data))
             if(data){
               if(data?.message){

                navigate("/2fa", { state: { value: data?.user } })


                // toast(data.message)
                // navigate("/Login");
            }
               else{
                 toast(data.error)
              
               }
           
             }
            
         } catch (e) {
             toast(e.message)
         }
     };
    return (
        <>
                  <ToastContainer />

        <p>Verify</p>
        </>
    )
}
export default Verify
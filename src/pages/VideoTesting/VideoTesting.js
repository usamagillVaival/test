import React,{useState} from 'react';
import { AspectRatio,Image } from '@chakra-ui/react'
import Iframe from 'react-iframe'
  

    const AdminLogin=()=>{
      

    return(

<>
<h1>Assalam o Alikum</h1>


<Iframe url="https://firebasestorage.googleapis.com/v0/b/chatapp-d3504.appspot.com/o/18a043d957bb00fead234c211c199bf6.mp4?alt=media&token=8742a229-994a-492d-9d55-67c96d128eb7"
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>

{/* IFRame testing  */}
{/* 
<AspectRatio maxW='560px' width={100} height={100} ratio={1}>
  <iframe
    title='naruto'
    src='https://firebasestorage.googleapis.com/v0/b/chatapp-d3504.appspot.com/o/18a043d957bb00fead234c211c199bf6.mp4?alt=media&token=8742a229-994a-492d-9d55-67c96d128eb7'
    allowFullScreen
  />
</AspectRatio> */}
{/* 
 <AspectRatio maxW='200px' ratio={1}>
  <iframe
    title='naruto'
    src='https://www.youtube.com/embed/cWDJoK8zw58'
    allowFullScreen
  />
</AspectRatio>  */}


{/* 
<AspectRatio maxW='400px' ratio={4 / 3}>
  <Image src='https://bit.ly/naruto-sage' alt='naruto' objectFit='cover' />
</AspectRatio> */}
</>



    );
}
export default AdminLogin;
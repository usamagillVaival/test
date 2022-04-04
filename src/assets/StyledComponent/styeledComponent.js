import styled from "@emotion/styled";
import '../fonts/urwdin/stylesheet.css';
export const Card=styled.div`
box-shadow:${props => props.boxShadow ? props.boxShadow :'0px 1px 3px rgba(0, 0, 0, 0.1), 1px 2px 0px rgba(0, 0, 0, 0.06)'};
background:#fff;
border-radius:0.5rem;
padding:${props => props.p  ? props.p : "2rem"};
display:flex;
align-items:${props => props.alignItems ? props.alignItems : 'center' };
justify-content:center;
flex-direction:column;
cursor:${props => props.cursor  ? props.cursor : "default"}
`;
export const CardHeading=styled.div`
display:flex;
width:100%;
align-itmes:center;
justify-content:center;
font-size:2.4rem;
color:#000;
font-weight:bold;
font-family: 'Libre Franklin', sans-serif;
`;
export const CustomBadge=styled.p`
padding:0.5rem;
width:fit-content;
background: ${props => props.live  ? " #F17A0E" : "#E73D18"};
font-weight:400;
font-family: 'Libre Franklin', sans-serif;
font-size:14px;
color:#fff;
border-radius:0.5rem;
`;

export const NFTCustomCard=styled.div`box-shadow:0px 1px 3px rgba(32, 31, 31, 0.1), 0px 1px 2px rgba(32, 31, 31, 0.06);
background:#fff;
border-radius:0px;
border:1px solid #D2D2D2;
padding:2rem;
display:flex;
align-items:${props => props.alignItems ? props.alignItems : 'center' };
justify-content:center;
flex-direction:column;
font-family: 'Libre Franklin', sans-serif!important;
`;
export const RobotoMono=styled.p`font-weight:${props => props.fontWeight ? props.fontWeight :'400'};
    font-size:${props => props.fontSize ? props.fontSize :'16px'};
    color:${props => props.color ? props.color :'#1A1A1A'};
    line-height:${props => props.lineHeight ? props.lineHeight :'1rem'} ;
    font-family: 'Roboto Mono', monospace!important;
    text-align:${props => props.mb ? props.textAlign :'center'};
    margin-bottom:${props => props.mb};
    `;
export const BioRymHeading=styled.h2`font-weight:700;
    font-size:${props => props.fontSize ? props.fontSize :'36px'};
    color:${props => props.color ? props.color :'#1A1A1A'};
    line-height:${props => props.lineHeight ? props.lineHeight :'2.25rem'} ;
    font-family: 'URW DIN'!important;
    text-align:${props => props.textAlign ? props.textAlign :'center'};
    margin-bottom:${props => props.mb};
    word-break:break-word;
    `;

export const BioRymHeadingNew=styled.h2`font-weight:700;
    font-size:30px;
    color:#1A1A1A;
    line-height:2.25rem;
    font-family: 'BioRhyme', serif;
    text-align:${props => props.mb ? props.textAlign :'center'};
     margin-bottom:${props => props.mb};
    `;
export const SppinnerMain=styled.div`
height:100px;
  width: 100px;
  position: relative;
  background:#DBDBDB;
  border-radius:50px;  
 `;
export const SppinnerInner=styled.div`
position: absolute;
  z-index: 6;
  top: 50%;
  left: 50%;
  height: 80px;
  width: 80px;
  margin: -40px 0 0 -40px;
  background: #fff;
  border-radius: 100%;`;
export const SppinnerNummber=styled.div`
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  z-index:10;
  font-size:18px;
  font-weight:500;
  color:#4D4D4D;
  font-size:14px`;
export const SppinnerBar=styled.div`
   position: absolute;
  height: 100%;
  width: 100%;
  background:#95E718 ;
  -webkit-border-radius: 100%;
  clip: rect(0px, 100px, 100px, 50px);`;

export const SppinnerBarProgress=styled.div`
     position: absolute;
  height: 100%;
  width: 100%;
  -webkit-border-radius: 100%;
  clip: rect(0px, 50px, 100px, 0px);
  background: #4158d0;`;


//Steps for Artist screen

export const StepsMain=styled.div`width:100%;
 display: flex;
  justify-content: space-between;
  position: relative;
   max-width: 100%; 
  margin-bottom: 2.5em;
   background-color: #C4C4C4;
   height:8px;
   border-radius:10px;
`;
export const StepsProgress=styled.div` position: absolute;
  top: 0%;
  left: 0;
  width: ${props => props.width };
  height: 8px;
  z-index: 1;
  transition: all .5s ease-in;
   background-color:#0048FF;
`;
export const StepsCircle=styled.div` position: absolute;
  top: -17px;
  left:${props => props.left ? props.left : "-1%"  } ;
  width: 40px;
 border-radius:50px;
 display:flex;
 align-items:center;
 justify-content:center;
  height: 40px;
  background-color: ${props => props.bgBLue  ? " #0048FF" : "#C4C4C4"} ;
  z-index: 1;
  transition: all .5s ease-in;
  font-weight:600;
  color: ${props => props.bgBLue  ? " #fff" : "#666666"} ;
`;
export const AbsoluteText=styled.div` position: absolute;
  top: 33px;
  left:${props => props.left} ;
 display:flex;
 align-items:center;
 justify-content:center;
  z-index: 1;
  transition: all .5s ease-in;
  font-weight:600;
  color: #000;
  font-size:16px
`;
//Roboto  Heading
export const RobotoHeading=styled.h2`font-weight:500;
    font-size:${props => props.fontSize };
    color:#000;
    font-weight: ${props => props.fontWeight };
    line-height:2.25rem;
    font-family: 'Roboto', sans-serif;
    text-align:left;
       margin-bottom: ${props => props.mb }
    `;

export const InterHeading=styled.h2`font-weight:500;
    font-size:${props => props.fontSize };
    color:#000;
    font-weight: ${props => props.fontWeight };
    font-family: 'Inter', sans-serif;
    text-align:left;
    margin-bottom: ${props => props.mb }
    `;


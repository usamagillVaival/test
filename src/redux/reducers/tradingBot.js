import {STEPS,GALLERY,ACCOUNT,ACCOUNT_TYPE,TOKEN,USER,MINTSTEPS,PAYMENT_STEPS,SIGNUP, SELECTED_ARTIST_LABEL,NFTMEDIUM,NFTDETAILS,ARTISTAGREEMENT, PREVIEWINFO,PREVIEW,NFTUPLOAD,GALLERY_PROFILE_DETAILS} from '../action/types'
const initialState={
  
   steps : 0,
   mintsteps: 0,
   galleryInfo:'',
   accountInfo:'',
   accountType:'',
   token :'',
   darkMode:false,
   User:'',
   signUp:{},
  payment:'',
   nftmedium:'',
   nftdetails:'',
   artistagreement:'',
   selectedArtistLabel:'',
   nftmedium:'',
   previewInfo: '',
   preview: '',
   nftupload:'',
   galleryProfileDetails:''
} 
export default function TradingBot(state=initialState,action){
    
    switch (action.type) {
                  case GALLERY_PROFILE_DETAILS:
                  return{
                    ...state,  galleryProfileDetails: action.payload,
                  }
                  case PREVIEW:
                  return{
                    ...state,  preview: action.payload,
                  }
               case PREVIEWINFO:
                  return{
                    ...state,  previewInfo: action.payload,
                  }
                case SELECTED_ARTIST_LABEL:
                  return{
                    ...state,  selectedArtistLabel: action.payload,
                  }
                  case NFTUPLOAD:
                  return{
                    ...state,  nftupload: action.payload,
                  }
                case MINTSTEPS:
                  return{
                    ...state,  mintsteps: action.payload,
                  }
                  case NFTMEDIUM:
                  return{
                    ...state,  nftmedium: action.payload,
                  }
                  case ARTISTAGREEMENT:
                  return{
                    ...state,  artistagreement: action.payload,
                  }
                case STEPS:
                return{
                  ...state,  steps: action.payload,
                }
                case PAYMENT_STEPS:
                return{
                  ...state,  payment: action.payload,
                }
                case NFTDETAILS:
                return{
                  ...state,  nftdetails: action.payload,
                }

                case GALLERY:
                return{
                  ...state,  galleryInfo: action.payload,
                }
                case ACCOUNT:
                  return{
                    ...state,  accountInfo: action.payload,
                  }
                  case ACCOUNT_TYPE:
                  return{
                    ...state,  accountType: action.payload,
                  }
                  case ACCOUNT_TYPE:
                    return{
                      ...state,  accountType: action.payload,
                    }
                    case TOKEN:
                      return{
                        ...state,  token: action.payload,
                      }
                      case USER:
                      return{
                        ...state,  User: action.payload,
                      }
                      case SIGNUP:
                      return{
                        ...state,  signUp: action.payload,
                      }
               
  
                        
         default:
           return state;
        }

        


        
}
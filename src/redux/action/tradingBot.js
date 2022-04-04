import {STEPS,DARK_MODE,GALLERY,ACCOUNT,ACCOUNT_TYPE,TOKEN,USER,SIGNUP,MINTSTEPS,PAYMENT_STEPS,SELECTED_ARTIST_LABEL,NFTMEDIUM, PREVIEWINFO, PREVIEW, NFTDETAILS,ARTISTAGREEMENT,NFTUPLOAD,GALLERY_PROFILE_DETAILS} from './types'


export const setGalleryProfileDetails=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:GALLERY_PROFILE_DETAILS,
                    payload:data,
                }) 
    }
}

export const setPreview=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:PREVIEW,
                    payload:data,
                }) 
    }
}
export const setNftUpload=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:NFTUPLOAD,
                    payload:data,
                }) 
    }
}
export const setPreviewInfo=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:PREVIEWINFO,
                    payload:data,
                }) 
    }
}

export const setMintSteps=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:MINTSTEPS,
                    payload:data,
                }) 
    }
}
export const setArtistAggrement=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:ARTISTAGREEMENT,
                    payload:data,
                }) 
    }
}
export const setNftDetails=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:NFTDETAILS,
                    payload:data,
                }) 
    }
}

 export const setPayment_Steps =(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:PAYMENT_STEPS,
                    payload:data,
                }) 
    }
 }
 export const setSelectedArtistLabel=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:SELECTED_ARTIST_LABEL,
                    payload:data,
                }) 
    }
}
export const setSteps=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:STEPS,
                    payload:data,
                }) 
    }
}
export const setNFTMedium=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:NFTMEDIUM,
                    payload:data,
                }) 
    }
}

export const setGallery=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:GALLERY,
                    payload:data,
                }) 
    }
}
export const setAccount=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:ACCOUNT,
                    payload:data,
                }) 
    }
}


export const setDarkMode =(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:DARK_MODE,
                    payload:data,
                }) 
    }
}

export const setAccountType=(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:ACCOUNT_TYPE,
                    payload:data,
                }) 
    }
}

export const setToken =(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:TOKEN,
                    payload:data,
                }) 
    }
    

}

export const setUser =(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:USER,
                    payload:data,
                }) 
    }
}

export const setSignUp =(data)=>{
    return(dispatch)=>{
        dispatch({
                    type:SIGNUP,
                    payload:data,
                }) 
    }
}
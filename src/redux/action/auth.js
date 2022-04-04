import {USER_LOGIN} from './types'


export const userData=(data)=>{
    // alert(data)
    
    return(dispatch)=>{
        dispatch({
                    type:USER_LOGIN,
                    payload:data,
                }) 
    }
}
 

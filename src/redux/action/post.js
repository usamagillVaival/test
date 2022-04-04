import * as types from "./types";
import Api from "../lib/requests/api";
import { notification } from "antd";
function setIsLoading(isLoading) {
  return {
    type: types.SET_ISLOADING,
    isLoading,
  };
}
export const uploadImage = (params,setImageFromApi) => {
  const OpenNotification = (data, title) => {
    notification.open({
      message: title,
      description: data,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
console.log("in action",JSON.stringify (params))
  return (dispatch) => {
    dispatch(setIsLoading(true));
    fetch("https://market221.herokuapp.com/api/v1/uploadFile", {
      method: 'POST',
      body: params
    })
    .then(async (res) => {  
      //console.log("res", await res.json());
        let data = await res.json();
        setImageFromApi(data.data)
        console.log("Data : ",data.data)
        OpenNotification("", "Uploaded Successfully");
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        console.log("err", err);
        OpenNotification(err?.message, "Error while Upload");
      });
  };
}
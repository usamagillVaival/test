import * as types from "./types";
import Api from "../lib/requests/api";
import { notification } from "antd";

function setIsLoading(isLoading) {
    return {
      type: types.SET_ISLOADING,
      isLoading,
    };
  }

//   export function authHeader() {
//     // return authorization header with basic auth credentials
//     let user = JSON.parse();

//     if (user) {
//         console.log(user);
//     }
// }

export const createAdd = (params) => {
    const OpenNotification = (data, title) => {
      notification.open({
        message: title,
        description: data,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
  
    console.log("categoryId 1: ", { params });
    return (dispatch) => {
      dispatch(setIsLoading(true));
      Api.post("ad", params)
      .then((res) => {
          console.log("res", res);
          OpenNotification("Can Login now", "Created Successfully");
          dispatch(setIsLoading(false));
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
          console.log("err", err);
          OpenNotification(err?.message, "Error while Creation");
        });
    };
  }


  
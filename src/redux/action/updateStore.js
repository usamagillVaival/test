import * as types from "./types";
import Api from "../lib/requests/api";
import { notification } from "antd";

function setIsLoading(isLoading) {
    return {
      type: types.SET_ISLOADING,
      isLoading,
    };
  }


export const updateStore = (params) => {
    const OpenNotification = (data, title) => {
      notification.open({
        message: title,
        description: data,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
  
    console.log("Update values : ", { params });
    return (dispatch) => {
      dispatch(setIsLoading(true));
      Api.post("user", params)
      .then((res) => {
          console.log("res", res);
          OpenNotification("Store is Updated", "Updated Successfully");
          dispatch(setIsLoading(false));
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
          console.log("err", err);
          OpenNotification(err?.message, "Error while Updating");
        });
    };
  }

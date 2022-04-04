import { notification } from 'antd';

import Api from "../lib/requests/api";
import * as types from "./types";

function setIsLoading(isLoading) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setAddShop(addShopData) {
    return {
      type: types.ADD_SHOP,
      addShopData,
    };
  }


  export const addShop = (param) => {
    const OpenNotification = (data, title) => {
      notification.open({
        message: title,
        description: data,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };
    
    //JSON.stringify(add)
    return (dispatch) => {
      dispatch(setIsLoading(true));
      Api.post("shop", param)
      .then((resp) => {
          console.log("res", resp);
          OpenNotification("Shop Created", "Successfully");
          dispatch(setAddShop(resp));
          dispatch(setIsLoading(false));
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
          console.log("err", err);
          OpenNotification(err?.message, "Error while Creation");
        });
    };
  }

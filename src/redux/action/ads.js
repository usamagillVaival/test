import Api from "../lib/requests/api";
import * as types from "./types";

function setIsLoading(isLoading) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setAds(adData) {
  return {
    type: types.ALL_ADS,
    adData,
  };
}

export const allAds = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    Api.get("ad")
      .then((resp) => {
        console.log("ad res", resp);
        dispatch(setAds(resp));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
      });
  };
};

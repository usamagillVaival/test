import Api from "../lib/requests/api";
import * as types from "./types";

function setIsLoading(isLoading) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setConsults(consultData) {
  return {
    type: types.CONSULTS,
    consultData,
  };
}

export const consults = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    Api.get("ad")
      .then((resp) => {
        console.log("consult res", resp);
        dispatch(setConsults(resp));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
      });
  };
};

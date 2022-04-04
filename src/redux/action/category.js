import * as types from "./types";
import Api from "../lib/requests/api";

function setIsLoading(isLoading) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setAllCategory(allCategoryData) {
  return {
    type: types.SET_CATEGORY,
    allCategoryData,
  };
}

export const allCategory = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    Api.get("category")
      .then((resp) => {
        console.log("cat", resp);
        dispatch(setAllCategory(resp));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
      });
  };
};


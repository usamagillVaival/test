import * as types from "./types";
import Api from "../lib/requests/api";

function setIsLoading(isLoading) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setSearchAd(searchData) {
  return {
    type: types.SEARCH_AD,
    searchData,
  };
}

export const searchAds = (
  region,
  listingType,
  categoryName,
  subCategoryName,
  title
) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    Api.get(
      `ad/?region=${region}&listingType=${listingType}&categoryName=${categoryName}&subCategoryName=${subCategoryName}&title=${title}`
    )
      .then((resp) => {
        console.log("search", resp);
        dispatch(setSearchAd(resp));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
      });
  };
};

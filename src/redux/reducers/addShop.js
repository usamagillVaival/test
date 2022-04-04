import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
    isLoading: false,
  };
  
  const addShopReducer = createReducer(INITIAL_STATE, {
    [types.IS_LOADING](state, action) {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    },
    [types.ADD_SHOP](state, action) {
      return {
        ...state,
        addShopData: action.addShopData,
      };
    },
  });
  
  export default addShopReducer;
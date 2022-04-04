import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

const categoryReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
  [types.SET_CATEGORY](state, action) {
    return {
      ...state,
      allCategoryData: action.allCategoryData,
    };
  },
});

export default categoryReducer;

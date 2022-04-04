import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

const searchReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
  [types.SEARCH_AD](state, action) {
    return {
      ...state,
      searchData: action.searchData,
    };
  },
});

export default searchReducer;

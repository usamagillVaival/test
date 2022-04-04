import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

const consultReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
  [types.CONSULTS](state, action) {
    return {
      ...state,
      consultData: action.consultData,
    };
  },
});

export default consultReducer;

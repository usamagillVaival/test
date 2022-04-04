import createReducer from "../store/createReducer";
import * as types from "../action/types";
const INITIAL_STATE = {
  isLoading: false,
};
const authReducer = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state, action) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
  [types.USER_LOGIN](state, action) {
    return {
      ...state,
      userData: action.userData,
    };
  },
});
export default authReducer;


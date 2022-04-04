import createReducer from "../store/createReducer";
import * as types from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
};

export const post = createReducer(INITIAL_STATE, {
   [types.IMAGE_DATA](state, action) {
     return {
     ...state,
     imageData: action.imageData,
     };
   },
  // [types.UPDATE_POST](state, action) {
  //   return {
  //     ...state,
  //     updatePost: action.updatePost,
  //   };
  // },
  // [types.ADD_COMMENT](state, action) {
  //   return {
  //     ...state,
  //     commentData: action.commentData,
  //   };
  // },
  // [types.ALL_COMMENTS](state, action) {
  //   return {
  //     ...state,
  //     allComments: action.allComments,
  //   };
  // },
});

import { userConstants } from '../constants';

export const users = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false
      };
    default:
      return state;
  }
};

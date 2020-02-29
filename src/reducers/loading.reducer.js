import { loadingConstants } from '../constants';

const initialState = false;

export const loading = (state = initialState, action) => {
  switch (action.type) {
    case loadingConstants.LOADING_START:
      return true;
    case loadingConstants.LOADING_END:
      return false;
    default:
      return state;
  }
};

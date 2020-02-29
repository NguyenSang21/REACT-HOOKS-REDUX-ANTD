import { loadingConstants } from '../constants';

export const loadingActions = {
  start,
  end
};

function start() {
  return { type: loadingConstants.LOADING_START };
}

function end() {
  return { type: loadingConstants.LOADING_END };
}

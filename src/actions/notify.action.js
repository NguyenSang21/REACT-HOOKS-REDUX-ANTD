import { notifConstants } from '../constants';

export const notifyActions = {
  success,
  failure
};

function success(message) {
  return { type: notifConstants.NOTIF_SUCCESS, message };
}

function failure(message) {
  return { type: notifConstants.NOTIF_FAILURE, message };
}

import { notifConstants } from '../constants';
import { notification as notifAntd } from 'antd';

const initialState = '';

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case notifConstants.NOTIF_SUCCESS:
      notifAntd.success({
        message: 'Notification Title',
        description: action.message
      });
      return {
        loading: false
      };
    case notifConstants.NOTIF_FAILURE:
      notifAntd.error({
        message: 'Notification Title',
        description: action.message
      });
      return true;
    default:
      return state;
  }
};

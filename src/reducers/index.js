import { combineReducers } from 'redux';
import { loading } from './loading.reducer';
import { authentication } from './authentication.reducer';
import { notification } from './notification.reducer';

const rootReducer = combineReducers({
  authentication,
  notification,
  loading
});

export default rootReducer;

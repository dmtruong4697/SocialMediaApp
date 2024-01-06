import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import postReducer from './post.reducer';
import profileReducer from './profile.reducer'
const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  profile: profileReducer
});

export default rootReducer;

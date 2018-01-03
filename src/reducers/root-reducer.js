import { combineReducers } from 'redux';
import analyticsReducer from "./analytics-reducer";

export default combineReducers({
  analytics: analyticsReducer
});

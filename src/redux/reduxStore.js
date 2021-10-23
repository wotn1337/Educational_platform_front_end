import thunkMiddleware from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import mainPageReducer from "./mainPageReducer";
import navbarReducer from "./navbarReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import adminReducer from "./adminReducer";
import createFragmentReducer from "./createFragmentReducer";


const reducers = combineReducers({
	mainPage: mainPageReducer,
	navbar: navbarReducer,
	auth: authReducer,
	profile: profileReducer,
	admin: adminReducer,
	createFragment: createFragmentReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
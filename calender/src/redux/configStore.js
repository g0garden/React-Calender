//store만들기 
//리듀서들의 합(rootReducer = combineReducers({bucket: bucket, cat: cat,...} )이랑 미들웨어를 합친거
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import todo from './modules/todo';
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
//프로젝트 하나에는 스토어가 하나만 있어야 하니까, 스토어에는 리듀서도 하나만 있어야해서 combine 
//지금은 리듀서todo 하나니까 걍 이렇게 
const rootReducer = combineReducers({ todo });
const store = createStore(rootReducer,enhancer);

export default store;


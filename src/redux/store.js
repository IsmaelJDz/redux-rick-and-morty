import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import userReducer, { restoreSessionAcion } from "./userDuck";
import charsReducer, { getCharacteresAction, retreiveFavs } from "./charsDuck";

let rootReducer = combineReducers({
  user: userReducer,
  charsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(Thunk))
  );
  getCharacteresAction()(store.dispatch, store.getState);
  restoreSessionAcion()(store.dispatch)
  retreiveFavs()(store.dispatch, store.getState)
  return store;
}

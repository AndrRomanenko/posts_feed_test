import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const middlewares = [thunk];
const persistedReducer = persistReducer(persistConfig, reducer);

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return { store };
};

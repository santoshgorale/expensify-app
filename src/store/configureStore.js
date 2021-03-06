import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

// when we use middleware, need to change dev tool setting
// to change dev tool setting we use dev tool property mnetion below
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

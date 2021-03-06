import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import meals from './meals';
import user from './user';
import exercises from './exercises';
import checkIns from './checkIns';
import recommendedMeals from './recommendedMeals';
import recommendedFoods from './recommendedFoods';
import favoriteMeals from './favoriteMeals'

const reducer = combineReducers({
  meals,
  user,
  exercises,
  checkIns,
  recommendedMeals,
  recommendedFoods,
  favoriteMeals
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

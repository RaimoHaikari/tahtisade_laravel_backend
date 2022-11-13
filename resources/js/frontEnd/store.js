import { configureStore } from '@reduxjs/toolkit';

import movieListReducer from './reducers/movieListReducer';
import recommenderReducer from './reducers/recommenderReducer';
import sharedReducer from './reducers/sharedReducer';

const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        recommender: recommenderReducer,
        shared: sharedReducer
    }
});

export default store;
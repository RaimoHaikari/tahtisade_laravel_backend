import { configureStore } from '@reduxjs/toolkit';

import movieListReducer from './reducers/movieListReducer';
import recommenderReducer from './reducers/recommenderReducer';
import sharedReducer from './reducers/sharedReducer';
import singleMovieReducer from './reducers/singleMovieReducer';

const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        recommender: recommenderReducer,
        shared: sharedReducer,
        singleMovie: singleMovieReducer
    }
});

export default store;
import { configureStore } from '@reduxjs/toolkit';

import movieListReducer from './reducers/movieListReducer';
import recommenderReducer from './reducers/recommenderReducer';
import reviewerListReducer from './reducers/reviewerListReducer';
import sharedReducer from './reducers/sharedReducer';
import singleMovieReducer from './reducers/singleMovieReducer';
import singleReviewerReducer from './reducers/singleReviewerReducer';

const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        recommender: recommenderReducer,
        reviewerList: reviewerListReducer,
        shared: sharedReducer,
        singleMovie: singleMovieReducer,
        singleReviewer: singleReviewerReducer
    }
});

export default store;
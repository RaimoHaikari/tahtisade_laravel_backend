import { configureStore } from '@reduxjs/toolkit';

import genreListReducer from './reducers/genreListReducer';
import movieListReducer from './reducers/movieListReducer';
import recommenderReducer from './reducers/recommenderReducer';
import reviewerListReducer from './reducers/reviewerListReducer';
import sharedReducer from './reducers/sharedReducer';
import singleGenreReducer from './reducers/singleGenreReducer';
import singleMovieReducer from './reducers/singleMovieReducer';
import singleReviewerReducer from './reducers/singleReviewerReducer';

const store = configureStore({
    reducer: {
        genreList: genreListReducer,
        movieList: movieListReducer,
        recommender: recommenderReducer,
        reviewerList: reviewerListReducer,
        shared: sharedReducer,
        singleGenre: singleGenreReducer,
        singleMovie: singleMovieReducer,
        singleReviewer: singleReviewerReducer
    }
});

export default store;
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { movieApi } from './apis/movieApi';
import { showtimeApi } from './apis/showtimeApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [showtimeApi.reducerPath]: showtimeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(movieApi.middleware)
            .concat(showtimeApi.middleware),
});
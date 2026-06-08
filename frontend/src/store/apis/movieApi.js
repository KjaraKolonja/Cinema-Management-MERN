import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Movie'],
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => '/movies',
            providesTags: ['Movie'],
        }),
        createMovie: builder.mutation({
            query: (movieData) => ({
                url: '/movies',
                method: 'POST',
                body: movieData,
            }),
            invalidatesTags: ['Movie'],
        }),
        updateMovie: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/movies/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Movie'],
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `/movies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Movie'],
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
} = movieApi;
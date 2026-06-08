import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const showtimeApi = createApi({
    reducerPath: 'showtimeApi',
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
    tagTypes: ['Showtime'],
    endpoints: (builder) => ({
        getShowtimes: builder.query({
            query: () => '/showtimes',
            providesTags: ['Showtime'],
        }),
        createShowtime: builder.mutation({
            query: (data) => ({
                url: '/showtimes',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Showtime'],
        }),
        updateShowtime: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/showtimes/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Showtime'],
        }),
        deleteShowtime: builder.mutation({
            query: (id) => ({
                url: `/showtimes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Showtime'],
        }),
    }),
});

export const {
    useGetShowtimesQuery,
    useCreateShowtimeMutation,
    useUpdateShowtimeMutation,
    useDeleteShowtimeMutation,
} = showtimeApi;
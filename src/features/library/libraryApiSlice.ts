import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {BookApiResponse} from "./types";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const bookTags = {
    bookList: "bookList"
}

export const libraryApi = createApi({
    reducerPath: "libraryApi",
    tagTypes: [bookTags.bookList],
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
    endpoints: (build) => ({
        getBooks: build.query<BookApiResponse, void>({
            query: () => "books",
            providesTags: [bookTags.bookList]
        }),

        deleteBook: build.mutation({
            query: (id: string) => ({
                url: `books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [bookTags.bookList]
        })
    }),
});

export const {useGetBooksQuery, useDeleteBookMutation} = libraryApi;

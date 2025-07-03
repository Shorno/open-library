import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Book, BookApiResponse} from "./types";
import type {BookFormValues} from "../../components/AddBookForm.tsx";

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
        addBook: build.mutation<BookApiResponse, BookFormValues>({
            query: (data: Book) => ({
                url: "books",
                method: "POST",
                body: data
            }),
            invalidatesTags: [bookTags.bookList],
        }),
        deleteBook: build.mutation({
            query: (id: string) => ({
                url: `books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [bookTags.bookList]
        }),
        updateBook: build.mutation<BookApiResponse, { bookId: string, data: BookFormValues }>({
            query: ({bookId, data}) => ({
                url: `books/${bookId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [bookTags.bookList],
        }),
    }),
});

export const {useGetBooksQuery, useDeleteBookMutation, useAddBookMutation, useUpdateBookMutation} = libraryApi;

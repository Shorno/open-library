import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Book, BookApiResponse, BooksApiResponse} from "./types";
import type {BookFormValues} from "../../components/AddBookForm.tsx";
import type {Dayjs} from "dayjs";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const bookTags = {
    bookList: "bookList",
    bookDetails: "bookDetails"
}

export const libraryApi = createApi({
    reducerPath: "libraryApi",
    tagTypes: [bookTags.bookList],
    baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
    endpoints: (build) => ({
        getBooks: build.query<BooksApiResponse, void>({
            query: () => "books",
            providesTags: [bookTags.bookList]
        }),
        addBook: build.mutation<BooksApiResponse, BookFormValues>({
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
        updateBook: build.mutation<BooksApiResponse, { bookId: string, data: BookFormValues }>({
            query: ({bookId, data}) => ({
                url: `books/${bookId}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [bookTags.bookList, bookTags.bookDetails],
        }),
        getBookDetails: build.query<BookApiResponse, { bookId: string }>({
            query: ({bookId}) => ({
                url: `books/${bookId}`,
                method: "GET",
            }),
            providesTags: [bookTags.bookDetails],
        }),

        borrowBook: build.mutation<BooksApiResponse, {
            data: { book: string, quantity: number, dueDate: Dayjs | string }
        }>({
            query: ({data}) => ({
                url: "/borrow",
                method: "POST",
                body: data
            }),
            invalidatesTags: [bookTags.bookList, bookTags.bookDetails],
        }),

    }),
});

export const {
    useGetBooksQuery,
    useDeleteBookMutation,
    useAddBookMutation,
    useUpdateBookMutation,
    useGetBookDetailsQuery,
    useBorrowBookMutation
} = libraryApi;

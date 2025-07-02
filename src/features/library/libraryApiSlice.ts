import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {BookApiResponse} from "./types";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const libraryApi = createApi({
    reducerPath: "libraryApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (build) => ({
        getBooks: build.query<BookApiResponse, void>({
            query: () => "books",
        }),
    }),
});

export const { useGetBooksQuery } = libraryApi;

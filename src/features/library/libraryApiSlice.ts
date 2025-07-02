import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {BookApiResponse} from "./types";

const BASE_API_URL = "http://localhost:5000/api/";

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

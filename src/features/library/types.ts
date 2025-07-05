export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface BooksApiResponse extends Book {
    data: Book[]
    message: string,
    success: boolean
}

export interface BookApiResponse extends Book {
    data: Book
    message: string,
    success: boolean
}


export interface BookSummary {
    book: {
        isbn: string;
        title: string;
    };
    totalQuantity: number;
}

export interface SummaryApiResponse {
    data: BookSummary[];
    message: string;
    success: boolean;
}
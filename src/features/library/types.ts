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

export interface BookApiResponse extends Book {
    data: Book[]
    message: string,
    success: boolean
}

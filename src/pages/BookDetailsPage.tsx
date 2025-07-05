import {useParams} from "react-router";
import {useGetBookDetailsQuery} from "../features/library/libraryApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {Row, Col, Alert} from "antd";
import {BookDetailsCardSkeleton} from "../components/BookDetailsCardSkeleton.tsx";
import {BookDetailsCard} from "../components/BookDetailsCard.tsx";
import type {Book} from "../features/library/types.ts";

export default function BookDetailsPage() {
    const {id} = useParams();
    const {
        data: bookDetails,
        isLoading,
        isError,
    } = useGetBookDetailsQuery(id ? {bookId: id} : skipToken);

    const book: Book | undefined = bookDetails?.data


    return (
        <Row justify="center" className="py-10 min-h-screen">
            <Col xs={24} sm={20} md={16} lg={12}>
                {isLoading && <BookDetailsCardSkeleton/>}
                {!isLoading && isError && (
                    <Alert
                        message="Error"
                        description="Could not load book details. Please try again later."
                        type="error"
                        showIcon
                    />
                )}
                {!isLoading && !isError && !book && (
                    <Alert
                        message="Book Not Found"
                        description="The requested book could not be found."
                        type="warning"
                        showIcon
                    />
                )}
                {!isLoading && !isError && book && <BookDetailsCard book={book}/>}
            </Col>
        </Row>
    );
}

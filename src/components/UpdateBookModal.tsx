import {Modal, Form, notification} from "antd";
import {useUpdateBookMutation} from "../features/library/libraryApiSlice";
import type {Book} from "../features/library/types";
import {useEffect} from "react";
import BookForm from "./BookForm.tsx";
import type {BookFormValues} from "./AddBookForm.tsx";

interface UpdateBookModalProps {
    open: boolean;
    onClose: () => void;
    book: Book | null;
}

export default function UpdateBookModal({open, onClose, book}: UpdateBookModalProps) {
    const [form] = Form.useForm();
    const [updateBook, {isLoading}] = useUpdateBookMutation();

    useEffect(() => {
        if (book) {
            form.setFieldsValue({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
            });
        }
    }, [book, form]);

    const onFinish = async (values: BookFormValues) => {
        if (!book) return;
        try {
            const response = await updateBook({bookId: book._id, data: values}).unwrap();
            notification.success({message: response.message || "Book updated successfully"});
            onClose();
        } catch (error: any) {
            notification.error({
                message: error.data?.message || "Update failed",
                description: error.data?.error?.message,
            });
        }
    };

    return (
        <Modal
            open={open}
            title="Update Book"
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            <BookForm form={form} onFinish={onFinish} initialValues={book ? {...book} : undefined}
                      submitLabel={"Update Book"} loading={isLoading}/>
        </Modal>
    );
}

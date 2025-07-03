import {Modal, Form, Input, InputNumber, Switch, Button, notification, Flex} from "antd";
import {useUpdateBookMutation} from "../features/library/libraryApiSlice";
import type {Book} from "../features/library/types";
import {useEffect} from "react";

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

    const onFinish = async (values: Omit<Book, "createdAt" | "updatedAt">) => {
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
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{available: true, copies: 1}}
            >
                <Form.Item label="Title" name="title"
                           rules={[{required: true, message: "Please enter the book title"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Author" name="author"
                           rules={[{required: true, message: "Please enter the author's name"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Genre" name="genre" rules={[{required: true, message: "Please enter the genre"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[
                        {required: true, message: "Please enter the ISBN"},
                        {pattern: /^[0-9-]+$/, message: "ISBN must be numbers and dashes only"},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item label="Description" name="description"
                           rules={[{required: true, message: "Please enter a description"}]}>
                    <Input.TextArea rows={3}/>
                </Form.Item>
                <Flex justify={"space-between"}>
                    <Form.Item
                        label="Copies"
                        name="copies"
                        rules={[
                            {required: true, message: "Please enter the number of copies"},
                            {type: "number", min: 1, message: "At least 1 copy is required"},
                        ]}
                    >
                        <InputNumber min={1}/>
                    </Form.Item>
                    <Form.Item label="Available" name="available" valuePropName="checked">
                        <Switch/>
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading} block>
                        Update Book
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

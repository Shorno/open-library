// components/BookForm.tsx
import { Form, Input, InputNumber, Switch, Button, Flex } from "antd";
import type {FormInstance} from "antd";
import type {BookFormValues} from "./AddBookForm.tsx";

type BookFormProps = {
    form: FormInstance<BookFormValues>;
    initialValues?: Partial<BookFormValues>;
    onFinish: (values: BookFormValues) => void;
    loading?: boolean;
    submitLabel?: string;
};

export default function BookForm({
                                     form,
                                     initialValues,
                                     onFinish,
                                     loading,
                                     submitLabel = "Submit",
                                 }: BookFormProps) {
    return (
        <Form
            layout="vertical"
            form={form}
            name="book-form"
            onFinish={onFinish}
            initialValues={{ available: true, copies: 1, ...initialValues }}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the book title" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Author"
                name="author"
                rules={[{ required: true, message: "Please enter the author's name" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Genre"
                name="genre"
                rules={[{ required: true, message: "Please enter the genre" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="ISBN"
                name="isbn"
                rules={[
                    { required: true, message: "Please enter the ISBN" },
                    { pattern: /^[0-9-]+$/, message: "ISBN must be numbers and dashes only" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter a description" }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>
            <Flex justify="space-between">
                <Form.Item
                    label="Copies"
                    name="copies"
                    rules={[
                        { required: true, message: "Please enter the number of copies" },
                        { type: "number", min: 1, message: "At least 1 copy is required" },
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item label="Available" name="available" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Flex>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                    {submitLabel}
                </Button>
            </Form.Item>
        </Form>
    );
}
